/// Mirrors the TypeScript StyleRule interface
#[derive(Debug, Clone)]
pub struct StyleRule {
    pub declarations: Vec<(String, String)>,
    pub selectors: Vec<String>,
    pub media_queries: Vec<String>,
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

    pub fn merge(rules: &[StyleRule]) -> Self {
        let mut declarations = vec![];
        let mut selectors = vec![];
        let mut media_queries = vec![];
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
        }
        Self {
            declarations,
            selectors,
            media_queries,
        }
    }
}
