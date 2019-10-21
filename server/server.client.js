const ElasticSearch = require('elasticsearch');

/**
 * *** ElasticSearch *** client
 * @type {Client}
 */
const client = new ElasticSearch.Client({
    hosts: ['http://elasticsearch.poripoc.localhost:9200']
});

module.exports = client;