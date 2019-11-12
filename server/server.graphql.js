const { ElasticSearchClient } = require('./server.elasticsearch');
const { ElasticSearchClientTerms } = require('./server.elasticsearch');
const elasticSearchSchema = require('./server.es.schema');
const { makeExecutableSchema } = require('graphql-tools');

// Construct a schema, using GraphQL schema language
const typeDefs = `
    type Query {
        pages: [Pages]
        page(nid: Int!): [Pages]
        news(nid: Int!): [NewsItems]
        news_items: [NewsItems]
        term(tid: Int!): [Keywords]
    }

    type Pages {
        id: Int
        nid: Int!
        title: String
        type: String
        uuid: String
        changed: String
        bodySummary: String    
        bodyValue: String
        search_api_language: String
        pori_rendered_entity: String
    }

    type NewsItems {
        id: Int
        nid: Int!
        title: String
        type: String
        uuid: String
        changed: String
        bodySummary: String    
        bodyValue: String
        search_api_language: String
        pori_rendered_entity: String
    }

    type Keywords {
        id: Int
        name: String
        description: String
        uuid: String
        vocabulary: Int
        node_count: String
        url: String
        search_api_viewed: String
    }
`;

// The root provides a resolver function for each API endpoint
const resolvers = {
    Query: {
        term: (_, { tid }) => new Promise((resolve, reject) => {
            ElasticSearchClientTerms({
                "query": {
                    "multi_match": {
                        "query": tid,
                        "fields": ["tid", "id"]
                    }
                } })
                .then(r => {
                    let _source = r['hits']['hits'];
                    _source.map((item, i) => _source[i] = item._source);

                    resolve(_source);
                });
        }),

        pages: () => new Promise((resolve, reject) => {
            ElasticSearchClient({
                "query": {
                    "multi_match": {
                        "query": "page",
                        "fields": ["type"]
                    }
                } })
                .then(r => {
                    let _source = r['hits']['hits'];
                    _source.map((item, i) => _source[i] = item._source);

                    resolve(_source);
                });
        }),
        page: (_, { nid }) => new Promise((resolve, reject) => {
            ElasticSearchClient({
                "query": {
                    "multi_match": {
                        "query": nid,
                        "fields": ["nid","id"]
                    }
                }
            })
                .then(r => {
                    let _source = r['hits']['hits'];
                    //Clean some drupal fields
                    _source.forEach(item => {
                        //console.log(item);
                        item._source['bodyValue'] = item._source['body:value'];
                        item._source['bodySummary'] = item._source['body:summary'];
                        delete item._source['body:value'];
                        delete item._source['body:summary'];
                    })
                    
                    _source.map((item, i) => _source[i] = item._source);
                    
                    resolve(_source);
                });
        }),

        news_items: () => new Promise((resolve, reject) => {
            ElasticSearchClient({
                "query": {
                    "multi_match": {
                        "query": "news_item",
                        "fields": ["type"]
                    }
                } })
                .then(r => {
                    let _source = r['hits']['hits'];
                    _source.map((item, i) => _source[i] = item._source);

                    resolve(_source);
                });
        }),
        news: (_, { nid }) => new Promise((resolve, reject) => {
            ElasticSearchClient({
                "query": {
                    "multi_match": {
                        "query": nid,
                        "fields": ["nid", "id"]
                    }
                }
            })
                .then(r => {
                    let _source = r['hits']['hits'];
                    //Clean some drupal fields
                    _source.forEach(item => {
                        //console.log(item);
                        item._source['bodyValue'] = item._source['body:value'];
                        item._source['bodySummary'] = item._source['body:summary'];
                        delete item._source['body:value'];
                        delete item._source['body:summary'];
                    })
                    _source.map((item, i) => _source[i] = item._source);

                    resolve(_source);
                });
        }),
    }
};

module.exports = makeExecutableSchema({
    "typeDefs": [typeDefs],
    "resolvers": resolvers
});