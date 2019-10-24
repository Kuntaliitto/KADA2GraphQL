const { ElasticSearchClient } = require('./server.elasticsearch');
const elasticSearchSchema = require('./server.es.schema');
const elasticSearchSchemaNewsItems = require('./server.es.schemaNewsItems');
const { makeExecutableSchema } = require('graphql-tools');

// Construct a schema, using GraphQL schema language
const typeDefs = `
    type Query {
        pages: [Pages]
        page(nid: Int!): Pages,
        news_items: [NewsItems]
    }

    type Pages {
        id: Int
        nid: Int!
        title: String
        type: String
        uuid: ID!
        changed: String
        search_api_language: String
        pori_rendered_entity: String
    }

    type NewsItems {
        id: Int
        nid: Int!
        title: String
        type: String
        uuid: ID!
        changed: String
        search_api_language: String
        pori_rendered_entity: String
    }
`;

// The root provides a resolver function for each API endpoint
const resolvers = {
    Query: {
        pages: () => new Promise((resolve, reject) => {
            ElasticSearchClient({ ...elasticSearchSchema })
                .then(r => {
                    let _source = r['hits']['hits'];
                    _source.map((item, i) => _source[i] = item._source);

                    resolve(_source);
                });
        }),
        page: (_, { nid }) => new Promise((resolve, reject) => {
            ElasticSearchClient({ ...elasticSearchSchema })
                .then(r => {
                    let _source = r['hits']['hits'];
                    _source.map((item, i) => _source[i] = item._source);

                    resolve(_source);
                });
        }),

        news_items: () => new Promise((resolve, reject) => {
            ElasticSearchClient({ ...elasticSearchSchemaNewsItems })
                .then(r => {
                    let _source = r['hits']['hits'];
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