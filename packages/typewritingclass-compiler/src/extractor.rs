use std::collections::HashMap;

use oxc_allocator::Allocator;
use oxc_ast::ast::*;
use oxc_parser::Parser;
use oxc_span::SourceType;

use crate::css;
use crate::hash;
use crate::modifiers;
use crate::style_rule::StyleRule;
use crate::theme::ThemeData;
use crate::utilities::{self, Value};

/// What a local name is bound to after import resolution
#[derive(Debug, Clone)]
enum Binding {
    /// A utility function (e.g., bg, p, rounded)
    Utility(String),
    /// A modifier (e.g., hover, focus, dark, sm)
    Modifier(String),
    /// cx() core function
    Cx,
    /// when() core function
    When,
    /// css() escape hatch
    Css,
    /// dynamic() wrapper
    Dynamic,
    /// A color scale object (e.g., blue, red) — value is the color name
    ColorScale(String),
    /// A resolved string value (e.g., theme token like border radius, shadow, size, weight)
    ResolvedValue(String),
    /// A text size token — stores (font_size, line_height)
    TextSize(String, String),
    /// A namespace import (e.g., `import * as shadows from '...'`)
    Namespace(String),
}

pub struct DiagnosticInfo {
    pub message: String,
    pub line: u32,
    pub column: u32,
    pub severity: String,
}

/// Result of a single file transform
pub struct TransformResult {
    pub code: String,
    pub css_rules: Vec<(String, String, u32)>, // (class_name, css_text, layer)
    pub next_layer: u32,
    pub has_dynamic: bool,
    pub diagnostics: Vec<DiagnosticInfo>,
}

/// All known utility function names exported from typewritingclass
const UTILITY_NAMES: &[&str] = &[
    "p", "px", "py", "pt", "pr", "pb", "pl", "m", "mx", "my", "mt", "mr", "mb", "ml", "gap",
    "gapX", "gapY", "bg", "textColor", "borderColor", "text", "font", "tracking", "leading",
    "textAlign", "flex", "flexCol", "flexRow", "flexWrap", "inlineFlex", "grid", "gridCols",
    "gridRows", "w", "h", "size", "minW", "minH", "maxW", "maxH", "display", "items", "justify",
    "self", "overflow", "overflowX", "overflowY", "relative", "absolute", "fixed", "sticky",
    "top", "right", "bottom", "left", "inset", "z", "rounded", "roundedT", "roundedB", "roundedL",
    "roundedR", "border", "borderT", "borderR", "borderB", "borderL", "ring", "shadow", "opacity",
    "backdrop", "cursor", "select", "pointerEvents",
];

/// Counter for dynamic variable IDs (per-file)
struct DynCounter {
    next: u32,
}

impl DynCounter {
    fn new() -> Self { Self { next: 0 } }
    fn next_id(&mut self) -> String {
        let id = format!("--twc-d{}", self.next);
        self.next += 1;
        id
    }
}

pub fn transform(source: &str, filename: &str, layer_offset: u32, theme: &ThemeData, strict: bool) -> TransformResult {
    let allocator = Allocator::default();
    let source_type = SourceType::from_path(filename).unwrap_or_default();
    let ret = Parser::new(&allocator, source, source_type).parse();

    if ret.panicked || !ret.errors.is_empty() {
        return TransformResult {
            code: source.to_string(),
            css_rules: vec![],
            next_layer: layer_offset,
            has_dynamic: false,
            diagnostics: vec![],
        };
    }

    let program = &ret.program;

    // Phase 1: Collect import bindings
    let bindings = collect_imports(program, theme);

    if bindings.is_empty() {
        return TransformResult {
            code: source.to_string(),
            css_rules: vec![],
            next_layer: layer_offset,
            has_dynamic: false,
            diagnostics: vec![],
        };
    }

    // Check if there's a cx binding
    let has_cx = bindings.values().any(|b| matches!(b, Binding::Cx));
    let has_dynamic_import = bindings.values().any(|b| matches!(b, Binding::Dynamic));

    if !has_cx {
        // No cx() usage, just prepend inject import
        let code = prepend_inject(source);
        return TransformResult {
            code,
            css_rules: vec![],
            next_layer: layer_offset,
            has_dynamic: false,
            diagnostics: vec![],
        };
    }

    // Phase 2: Find cx() calls and try to extract them
    let mut layer = layer_offset;
    let mut css_rules = vec![];
    let mut replacements: Vec<(u32, u32, String)> = vec![];
    let mut has_dynamic = false;
    let mut diagnostics: Vec<DiagnosticInfo> = vec![];
    let mut dyn_counter = DynCounter::new();

    visit_expressions(program, &mut |expr| {
        if let Expression::CallExpression(call) = expr {
            if is_cx_call(call, &bindings) {
                match try_extract_cx(call, &bindings, &mut layer, theme, &mut dyn_counter) {
                    Some(ExtractedCx::Static(class_str, rules)) => {
                        let span = call.span;
                        replacements.push((span.start, span.end, format!("'{}'", class_str)));
                        css_rules.extend(rules);
                    }
                    Some(ExtractedCx::Dynamic(class_str, rules, dyn_bindings)) => {
                        has_dynamic = true;
                        let span = call.span;
                        // Build the bindings object literal
                        let bindings_obj = format_bindings_object(&dyn_bindings);
                        replacements.push((
                            span.start,
                            span.end,
                            format!("__twcDynamic('{}', {})", class_str, bindings_obj),
                        ));
                        css_rules.extend(rules);
                    }
                    None => {
                        // Could not statically extract
                        if strict && !has_dynamic_import {
                            let span = call.span;
                            diagnostics.push(DiagnosticInfo {
                                message: format!(
                                    "cx() call could not be statically evaluated. Wrap runtime values with dynamic() or disable strict mode."
                                ),
                                line: span.start,
                                column: 0,
                                severity: "error".to_string(),
                            });
                        }
                    }
                }
            }
        }
    });

    // Phase 3: Apply replacements (reverse order to preserve spans)
    let mut code = source.to_string();
    replacements.sort_by(|a, b| b.0.cmp(&a.0));
    for (start, end, replacement) in &replacements {
        code.replace_range(*start as usize..*end as usize, replacement);
    }

    // Phase 4: Inject appropriate imports
    if has_dynamic {
        // Import runtime helper for dynamic values
        if !code.contains("typewritingclass/runtime") {
            code = format!("import {{ __twcDynamic }} from 'typewritingclass/runtime';\n{}", code);
        }
    }

    if !has_dynamic && replacements.len() == count_cx_calls(program, &bindings) {
        // All cx() calls were statically extracted and no dynamic — no runtime needed
        // Just ensure virtual CSS import is there (handled by plugin)
    } else {
        // Some cx() calls need runtime fallback
        code = prepend_inject(&code);
    }

    TransformResult {
        code,
        css_rules,
        next_layer: layer,
        has_dynamic,
        diagnostics,
    }
}

fn format_bindings_object(bindings: &[(String, String)]) -> String {
    let pairs: Vec<String> = bindings
        .iter()
        .map(|(key, expr)| format!("'{}': {}", key, expr))
        .collect();
    format!("{{ {} }}", pairs.join(", "))
}

fn count_cx_calls(program: &Program, bindings: &HashMap<String, Binding>) -> usize {
    let mut count = 0;
    visit_expressions(program, &mut |expr| {
        if let Expression::CallExpression(call) = expr {
            if is_cx_call(call, bindings) {
                count += 1;
            }
        }
    });
    count
}

fn prepend_inject(source: &str) -> String {
    if source.contains("typewritingclass/inject") {
        source.to_string()
    } else {
        format!("import 'typewritingclass/inject';\n{}", source)
    }
}

/// Collect all imports from typewritingclass modules and resolve them to Bindings
fn collect_imports(program: &Program, theme: &ThemeData) -> HashMap<String, Binding> {
    let mut bindings = HashMap::new();

    for stmt in &program.body {
        let Statement::ImportDeclaration(import) = stmt else {
            continue;
        };
        let source_value = import.source.value.as_str();

        // Only process typewritingclass imports
        if !source_value.starts_with("typewritingclass") {
            continue;
        }

        let Some(specifiers) = &import.specifiers else {
            continue;
        };

        for spec in specifiers {
            match spec {
                ImportDeclarationSpecifier::ImportSpecifier(named) => {
                    let imported_name = match &named.imported {
                        ModuleExportName::IdentifierName(id) => id.name.as_str(),
                        ModuleExportName::IdentifierReference(id) => id.name.as_str(),
                        ModuleExportName::StringLiteral(s) => s.value.as_str(),
                    };
                    let local_name = named.local.name.as_str().to_string();

                    let binding = resolve_import(source_value, imported_name, theme);
                    if let Some(b) = binding {
                        bindings.insert(local_name, b);
                    }
                }
                ImportDeclarationSpecifier::ImportNamespaceSpecifier(ns) => {
                    let local_name = ns.local.name.as_str().to_string();
                    bindings.insert(local_name, Binding::Namespace(source_value.to_string()));
                }
                ImportDeclarationSpecifier::ImportDefaultSpecifier(_) => {
                    // Default imports from typewritingclass modules aren't typical
                }
            }
        }
    }

    bindings
}

/// Given an import source and exported name, determine the Binding
fn resolve_import(source: &str, name: &str, theme: &ThemeData) -> Option<Binding> {
    match source {
        "typewritingclass" => {
            // Core API
            if name == "cx" {
                return Some(Binding::Cx);
            }
            if name == "when" {
                return Some(Binding::When);
            }
            if name == "css" {
                return Some(Binding::Css);
            }
            if name == "dynamic" {
                return Some(Binding::Dynamic);
            }
            // Modifiers
            if modifiers::is_modifier(name) {
                return Some(Binding::Modifier(name.to_string()));
            }
            // Utilities
            if UTILITY_NAMES.contains(&name) {
                return Some(Binding::Utility(name.to_string()));
            }
            None
        }
        "typewritingclass/theme/colors" => {
            // Named color constants
            if let Some(val) = theme.resolve_named_color(name) {
                return Some(Binding::ResolvedValue(val.to_string()));
            }
            // Color scales
            if theme.colors.contains_key(name) {
                return Some(Binding::ColorScale(name.to_string()));
            }
            None
        }
        "typewritingclass/theme/typography" => {
            // Text size tokens
            if let Some((fs, lh)) = theme.resolve_text_size(name) {
                return Some(Binding::TextSize(fs.to_string(), lh.to_string()));
            }
            // Font weight tokens
            if let Some(val) = theme.resolve_font_weight(name) {
                return Some(Binding::ResolvedValue(val.to_string()));
            }
            None
        }
        "typewritingclass/theme/borders" => {
            if let Some(val) = theme.resolve_radius(name) {
                return Some(Binding::ResolvedValue(val.to_string()));
            }
            None
        }
        "typewritingclass/theme/shadows" => {
            if let Some(val) = theme.resolve_shadow(name) {
                return Some(Binding::ResolvedValue(val.to_string()));
            }
            None
        }
        "typewritingclass/theme/sizes" => {
            if let Some(val) = theme.resolve_size(name) {
                return Some(Binding::ResolvedValue(val.to_string()));
            }
            None
        }
        _ if source.starts_with("typewritingclass/theme") => {
            // Generic theme sub-path
            None
        }
        _ => None,
    }
}

/// Check if a call expression is a cx() call
fn is_cx_call(call: &CallExpression, bindings: &HashMap<String, Binding>) -> bool {
    if let Expression::Identifier(id) = &call.callee {
        if let Some(Binding::Cx) = bindings.get(id.name.as_str()) {
            return true;
        }
    }
    false
}

enum ExtractedCx {
    /// All arguments were static — just class names
    Static(String, Vec<(String, String, u32)>),
    /// Some arguments had dynamic() — class names + dynamic bindings
    Dynamic(String, Vec<(String, String, u32)>, Vec<(String, String)>),
}

/// Try to statically extract a cx() call.
/// Returns None if any argument can't be evaluated (falls back to runtime).
fn try_extract_cx(
    call: &CallExpression,
    bindings: &HashMap<String, Binding>,
    layer: &mut u32,
    theme: &ThemeData,
    dyn_counter: &mut DynCounter,
) -> Option<ExtractedCx> {
    let mut class_names = vec![];
    let mut rules = vec![];
    let mut all_dynamic_bindings: Vec<(String, String)> = vec![];

    for arg in &call.arguments {
        let expr = arg.as_expression()?;
        match evaluate_cx_arg(expr, bindings, theme, dyn_counter)? {
            CxArg::Rule(rule) => {
                let l = *layer;
                *layer += 1;
                // Collect dynamic bindings before generating hash/css
                for (var_name, expr_text) in &rule.dynamic_bindings {
                    all_dynamic_bindings.push((var_name.clone(), expr_text.clone()));
                }
                let class_name = hash::generate_hash(&rule, l);
                let css_text = css::render_rule(&class_name, &rule);
                class_names.push(class_name.clone());
                rules.push((class_name, css_text, l));
            }
            CxArg::ClassName(s) => {
                class_names.push(s);
            }
        }
    }

    let class_str = class_names.join(" ");

    if all_dynamic_bindings.is_empty() {
        Some(ExtractedCx::Static(class_str, rules))
    } else {
        Some(ExtractedCx::Dynamic(class_str, rules, all_dynamic_bindings))
    }
}

enum CxArg {
    Rule(StyleRule),
    ClassName(String),
}

/// Evaluate a single argument to cx()
fn evaluate_cx_arg(
    expr: &Expression,
    bindings: &HashMap<String, Binding>,
    theme: &ThemeData,
    dyn_counter: &mut DynCounter,
) -> Option<CxArg> {
    match expr {
        Expression::StringLiteral(s) => Some(CxArg::ClassName(s.value.to_string())),

        Expression::CallExpression(call) => {
            // Could be: utility call, when(mod)(rules), css({...})
            evaluate_call_as_cx_arg(call, bindings, theme, dyn_counter)
        }

        _ => None, // Can't evaluate — bail
    }
}

/// Evaluate a call expression that appears as a cx() argument
fn evaluate_call_as_cx_arg(
    call: &CallExpression,
    bindings: &HashMap<String, Binding>,
    theme: &ThemeData,
    dyn_counter: &mut DynCounter,
) -> Option<CxArg> {
    match &call.callee {
        Expression::Identifier(id) => {
            let binding = bindings.get(id.name.as_str())?;
            match binding {
                Binding::Utility(name) => {
                    let args = evaluate_call_args(&call.arguments, bindings, theme, dyn_counter)?;
                    // Special handling for text() with TextSize tokens
                    if name == "text" && call.arguments.len() == 1 {
                        if let Some(expr) = call.arguments[0].as_expression() {
                            if let Expression::Identifier(arg_id) = expr {
                                if let Some(Binding::TextSize(fs, lh)) =
                                    bindings.get(arg_id.name.as_str())
                                {
                                    let rule = utilities::evaluate_text_with_size(fs, lh);
                                    return Some(CxArg::Rule(rule));
                                }
                            }
                        }
                    }
                    let rule = utilities::evaluate(name, &args, theme)?;
                    Some(CxArg::Rule(rule))
                }
                Binding::Css => {
                    // css({ key: value, ... })
                    let rule = evaluate_css_call(call, bindings)?;
                    Some(CxArg::Rule(rule))
                }
                _ => None,
            }
        }
        // when(modifier)(rules) pattern: callee is a CallExpression
        Expression::CallExpression(inner_call) => {
            if let Expression::Identifier(id) = &inner_call.callee {
                if let Some(Binding::When) = bindings.get(id.name.as_str()) {
                    return evaluate_when_call(inner_call, call, bindings, theme, dyn_counter);
                }
            }
            None
        }
        _ => None,
    }
}

/// Evaluate a when(modifier1, modifier2)(rule1, rule2) call
fn evaluate_when_call(
    when_call: &CallExpression,   // when(modifier, ...)
    outer_call: &CallExpression,  // (rule, ...)
    bindings: &HashMap<String, Binding>,
    theme: &ThemeData,
    dyn_counter: &mut DynCounter,
) -> Option<CxArg> {
    // Collect modifier names
    let mut modifier_names = vec![];
    for arg in &when_call.arguments {
        let expr = arg.as_expression()?;
        if let Expression::Identifier(id) = expr {
            if let Some(Binding::Modifier(name)) = bindings.get(id.name.as_str()) {
                modifier_names.push(name.clone());
            } else {
                return None;
            }
        } else {
            return None;
        }
    }

    // Evaluate the rules (outer call arguments)
    let mut style_rules = vec![];
    for arg in &outer_call.arguments {
        let expr = arg.as_expression()?;
        match evaluate_cx_arg(expr, bindings, theme, dyn_counter)? {
            CxArg::Rule(rule) => style_rules.push(rule),
            _ => return None,
        }
    }

    // Combine rules
    let mut combined = StyleRule::merge(&style_rules);

    // Apply modifiers in reverse order (matching TS reduceRight)
    for name in modifier_names.iter().rev() {
        combined = modifiers::apply(name, combined)?;
    }

    Some(CxArg::Rule(combined))
}

/// Evaluate a css({ key: 'value', ... }) call
fn evaluate_css_call(
    call: &CallExpression,
    _bindings: &HashMap<String, Binding>,
) -> Option<StyleRule> {
    if call.arguments.len() != 1 {
        return None;
    }
    let expr = call.arguments[0].as_expression()?;
    if let Expression::ObjectExpression(obj) = expr {
        let mut declarations = vec![];
        for prop in &obj.properties {
            if let ObjectPropertyKind::ObjectProperty(p) = prop {
                let key = match &p.key {
                    PropertyKey::StaticIdentifier(id) => id.name.as_str().to_string(),
                    PropertyKey::StringLiteral(s) => s.value.to_string(),
                    _ => return None,
                };
                let value = match &p.value {
                    Expression::StringLiteral(s) => s.value.to_string(),
                    _ => return None,
                };
                declarations.push((key, value));
            } else {
                return None; // SpreadProperty etc
            }
        }
        Some(StyleRule {
            declarations,
            selectors: vec![],
            media_queries: vec![],
            dynamic_bindings: vec![],
        })
    } else {
        None
    }
}

/// Resolve call arguments to Values
fn evaluate_call_args(
    args: &oxc_allocator::Vec<Argument>,
    bindings: &HashMap<String, Binding>,
    theme: &ThemeData,
    dyn_counter: &mut DynCounter,
) -> Option<Vec<Value>> {
    let mut values = vec![];
    for arg in args {
        let expr = arg.as_expression()?;
        values.push(evaluate_value(expr, bindings, theme, dyn_counter)?);
    }
    Some(values)
}

/// Evaluate an expression to a Value (string, number, or dynamic)
fn evaluate_value(
    expr: &Expression,
    bindings: &HashMap<String, Binding>,
    theme: &ThemeData,
    dyn_counter: &mut DynCounter,
) -> Option<Value> {
    match expr {
        Expression::StringLiteral(s) => Some(Value::Str(s.value.to_string())),
        Expression::NumericLiteral(n) => Some(Value::Num(n.value)),

        Expression::Identifier(id) => {
            match bindings.get(id.name.as_str())? {
                Binding::ResolvedValue(val) => Some(Value::Str(val.clone())),
                Binding::TextSize(fs, _lh) => {
                    // When a text size token is used as a plain value (not with text()),
                    // just return the fontSize as a string
                    Some(Value::Str(fs.clone()))
                }
                _ => None,
            }
        }

        // dynamic(expr) pattern
        Expression::CallExpression(call) => {
            if let Expression::Identifier(callee_id) = &call.callee {
                if let Some(Binding::Dynamic) = bindings.get(callee_id.name.as_str()) {
                    // dynamic() call — generate a CSS custom property ID
                    if call.arguments.len() == 1 {
                        let inner_expr = call.arguments[0].as_expression()?;
                        let id = dyn_counter.next_id();
                        // Get the source text of the inner expression
                        let expr_text = extract_source_text(inner_expr);
                        return Some(Value::Dynamic(id, expr_text));
                    }
                }
            }
            None
        }

        // blue[500] pattern — computed member expression
        Expression::ComputedMemberExpression(computed) => {
            if let Expression::Identifier(obj_id) = &computed.object {
                if let Some(Binding::ColorScale(color_name)) =
                    bindings.get(obj_id.name.as_str())
                {
                    // The property should be a numeric literal (shade)
                    if let Expression::NumericLiteral(n) = &computed.expression {
                        let shade = format!("{}", n.value as u32);
                        if let Some(hex) = theme.resolve_color(color_name, &shade) {
                            return Some(Value::Str(hex.to_string()));
                        }
                    }
                }
            }
            None
        }

        // namespace.member pattern — e.g., typography.bold, shadows.lg
        Expression::StaticMemberExpression(member) => {
            if let Expression::Identifier(obj_id) = &member.object {
                let prop_name = member.property.name.as_str();
                if let Some(Binding::Namespace(source)) = bindings.get(obj_id.name.as_str()) {
                    return resolve_namespace_member(source, prop_name, theme);
                }
            }
            None
        }

        _ => None,
    }
}

/// Extract the source text representation of an expression for use in generated code
fn extract_source_text(expr: &Expression) -> String {
    match expr {
        Expression::Identifier(id) => id.name.to_string(),
        Expression::StringLiteral(s) => format!("'{}'", s.value),
        Expression::NumericLiteral(n) => format!("{}", n.value),
        Expression::StaticMemberExpression(member) => {
            let obj = extract_source_text(&member.object);
            format!("{}.{}", obj, member.property.name)
        }
        Expression::ComputedMemberExpression(computed) => {
            let obj = extract_source_text(&computed.object);
            let prop = extract_source_text(&computed.expression);
            format!("{}[{}]", obj, prop)
        }
        Expression::CallExpression(call) => {
            let callee = extract_source_text(&call.callee);
            let args: Vec<String> = call.arguments.iter().filter_map(|a| {
                a.as_expression().map(extract_source_text)
            }).collect();
            format!("{}({})", callee, args.join(", "))
        }
        Expression::TemplateLiteral(tmpl) => {
            // Simple case: reconstruct template literal
            let mut result = String::from("`");
            for (i, quasi) in tmpl.quasis.iter().enumerate() {
                result.push_str(quasi.value.raw.as_str());
                if i < tmpl.expressions.len() {
                    result.push_str("${");
                    result.push_str(&extract_source_text(&tmpl.expressions[i]));
                    result.push('}');
                }
            }
            result.push('`');
            result
        }
        Expression::BinaryExpression(bin) => {
            let left = extract_source_text(&bin.left);
            let right = extract_source_text(&bin.right);
            let op = match bin.operator {
                BinaryOperator::Addition => "+",
                BinaryOperator::Subtraction => "-",
                BinaryOperator::Multiplication => "*",
                BinaryOperator::Division => "/",
                _ => "?",
            };
            format!("{} {} {}", left, op, right)
        }
        _ => "undefined".to_string(),
    }
}

/// Resolve a namespace.member access (e.g., typography.bold, shadows.md)
fn resolve_namespace_member(source: &str, member: &str, theme: &ThemeData) -> Option<Value> {
    match source {
        "typewritingclass/theme/typography" => {
            if let Some((fs, _lh)) = theme.resolve_text_size(member) {
                // For font weights, return as resolved value
                return Some(Value::Str(fs.to_string()));
            }
            if let Some(val) = theme.resolve_font_weight(member) {
                return Some(Value::Str(val.to_string()));
            }
            None
        }
        "typewritingclass/theme/shadows" => {
            if let Some(val) = theme.resolve_shadow(member) {
                return Some(Value::Str(val.to_string()));
            }
            None
        }
        "typewritingclass/theme/borders" => {
            if let Some(val) = theme.resolve_radius(member) {
                return Some(Value::Str(val.to_string()));
            }
            None
        }
        "typewritingclass/theme/sizes" => {
            if let Some(val) = theme.resolve_size(member) {
                return Some(Value::Str(val.to_string()));
            }
            None
        }
        "typewritingclass/theme/colors" => {
            if let Some(val) = theme.resolve_named_color(member) {
                return Some(Value::Str(val.to_string()));
            }
            None
        }
        _ => None,
    }
}

/// Visit all expressions in a program (simple recursive walker)
fn visit_expressions<'a>(program: &'a Program, visitor: &mut dyn FnMut(&'a Expression<'a>)) {
    for stmt in &program.body {
        visit_statement(stmt, visitor);
    }
}

fn visit_statement<'a>(stmt: &'a Statement<'a>, visitor: &mut dyn FnMut(&'a Expression<'a>)) {
    match stmt {
        Statement::ExpressionStatement(expr_stmt) => {
            visit_expr(&expr_stmt.expression, visitor);
        }
        Statement::VariableDeclaration(var_decl) => {
            for decl in &var_decl.declarations {
                if let Some(init) = &decl.init {
                    visit_expr(init, visitor);
                }
            }
        }
        Statement::ReturnStatement(ret) => {
            if let Some(arg) = &ret.argument {
                visit_expr(arg, visitor);
            }
        }
        Statement::IfStatement(if_stmt) => {
            visit_expr(&if_stmt.test, visitor);
            visit_statement(&if_stmt.consequent, visitor);
            if let Some(alt) = &if_stmt.alternate {
                visit_statement(alt, visitor);
            }
        }
        Statement::BlockStatement(block) => {
            for s in &block.body {
                visit_statement(s, visitor);
            }
        }
        Statement::ForStatement(f) => {
            if let Some(body) = Some(&f.body) {
                visit_statement(body, visitor);
            }
        }
        Statement::ForInStatement(f) => {
            visit_statement(&f.body, visitor);
        }
        Statement::ForOfStatement(f) => {
            visit_statement(&f.body, visitor);
        }
        Statement::WhileStatement(w) => {
            visit_expr(&w.test, visitor);
            visit_statement(&w.body, visitor);
        }
        Statement::ExportDefaultDeclaration(def) => {
            if let Some(expr) = def.declaration.as_expression() {
                visit_expr(expr, visitor);
            }
        }
        Statement::ExportNamedDeclaration(named) => {
            if let Some(Declaration::VariableDeclaration(var_decl)) = &named.declaration {
                for decl in &var_decl.declarations {
                    if let Some(init) = &decl.init {
                        visit_expr(init, visitor);
                    }
                }
            }
        }
        Statement::FunctionDeclaration(func) => {
            if let Some(body) = &func.body {
                for s in &body.statements {
                    visit_statement(s, visitor);
                }
            }
        }
        _ => {}
    }
}

fn visit_expr<'a>(expr: &'a Expression<'a>, visitor: &mut dyn FnMut(&'a Expression<'a>)) {
    visitor(expr);

    match expr {
        Expression::CallExpression(call) => {
            visit_expr(&call.callee, visitor);
            for arg in &call.arguments {
                if let Some(e) = arg.as_expression() {
                    visit_expr(e, visitor);
                }
            }
        }
        Expression::AssignmentExpression(assign) => {
            visit_expr(&assign.right, visitor);
        }
        Expression::BinaryExpression(bin) => {
            visit_expr(&bin.left, visitor);
            visit_expr(&bin.right, visitor);
        }
        Expression::ConditionalExpression(cond) => {
            visit_expr(&cond.test, visitor);
            visit_expr(&cond.consequent, visitor);
            visit_expr(&cond.alternate, visitor);
        }
        Expression::SequenceExpression(seq) => {
            for e in &seq.expressions {
                visit_expr(e, visitor);
            }
        }
        Expression::TemplateLiteral(tmpl) => {
            for e in &tmpl.expressions {
                visit_expr(e, visitor);
            }
        }
        Expression::ArrayExpression(arr) => {
            for elem in &arr.elements {
                if let Some(e) = elem.as_expression() {
                    visit_expr(e, visitor);
                }
            }
        }
        Expression::ObjectExpression(obj) => {
            for prop in &obj.properties {
                if let ObjectPropertyKind::ObjectProperty(p) = prop {
                    visit_expr(&p.value, visitor);
                }
            }
        }
        Expression::ArrowFunctionExpression(arrow) => {
            if arrow.expression {
                if let Some(stmt) = arrow.body.statements.first() {
                    if let Statement::ExpressionStatement(es) = stmt {
                        visit_expr(&es.expression, visitor);
                    }
                }
            } else {
                for s in &arrow.body.statements {
                    visit_statement(s, visitor);
                }
            }
        }
        Expression::ParenthesizedExpression(paren) => {
            visit_expr(&paren.expression, visitor);
        }
        _ => {}
    }
}
