const { ElasticSearchClient } = require('./server.elasticsearch');
const elasticSearchSchema = require('./server.es.schema');
const { makeExecutableSchema } = require('graphql-tools');

// Construct a schema, using GraphQL schema language
const typeDefs = `
    type Pages {
        id: String
        nid: String
        pori_rendered_entity: String
    }
    type Query {
        pages: [Pages]
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
    }
};

module.exports = makeExecutableSchema({
    "typeDefs": [typeDefs],
    "resolvers": resolvers
});