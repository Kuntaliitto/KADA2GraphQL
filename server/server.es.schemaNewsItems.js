module.exports = {
    "size": 1000,
    "from": 0,
    "query": {
        "multi_match": {
            "query": "news_item",
            "fields": ["type"]
        }
    }
};