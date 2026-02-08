/// Mirrors the TypeScript StyleRule interface
#[derive(Debug, Clone)]
pub struct StyleRule {
    pub declarations: Vec<(String, String)>,
    pub selectors: Vec<String>,
    pub media_queries: Vec<String>,
    pub dynamic_bindings: Vec<(String, String)>,
}

impl StyleRule {
    pub fn new(declarations: Vec<(&str, &str)>) -> Self {
        Self {
            declarations: declarations
                .into_iter()
                .map(|(k, v)| (k.to_string(), v.to_string()))
                .collect(),
            selectors: vec![],
            media_queries: vec![],
            dynamic_bindings: vec![],
        }
    }

    pub fn with_selector(mut self, selector: &str) -> Self {
        self.selectors.push(selector.to_string());
        self
    }

    pub fn with_media_query(mut self, query: &str) -> Self {
        self.media_queries.push(query.to_string());
        self
    }

    pub fn with_dynamic_binding(mut self, var_name: &str, expr: &str) -> Self {
        self.dynamic_bindings.push((var_name.to_string(), expr.to_string()));
        self
    }

    pub fn has_dynamic(&self) -> bool {
        !self.dynamic_bindings.is_empty()
    }

    pub fn merge(rules: &[StyleRule]) -> Self {
        let mut declarations = vec![];
        let mut selectors = vec![];
        let mut media_queries = vec![];
        let mut dynamic_bindings = vec![];
        for rule in rules {
            declarations.extend(rule.declarations.clone());
            for s in &rule.selectors {
                if !selectors.contains(s) {
                    selectors.push(s.clone());
                }
            }
            for mq in &rule.media_queries {
                if !media_queries.contains(mq) {
                    media_queries.push(mq.clone());
                }
            }
            for db in &rule.dynamic_bindings {
                if !dynamic_bindings.contains(db) {
                    dynamic_bindings.push(db.clone());
                }
            }
        }
        Self {
            declarations,
            selectors,
            media_queries,
            dynamic_bindings,
        }
    }
}
