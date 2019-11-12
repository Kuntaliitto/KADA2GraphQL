const ElasticSearch = require('elasticsearch');

/**
 * *** ElasticSearch *** client
 * @type {Client}
 */
const client = new ElasticSearch.Client({
    log: ['error', 'trace'],
    hosts: ['http://elasticsearch.poripoc.localhost:9200']
});

module.exports = client;