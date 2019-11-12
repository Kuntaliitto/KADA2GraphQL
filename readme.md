# GraphQL API

## Example queries

'''
query FindAllPages{
  pages {
    title
    uuid
    changed
    type
    nid
    search_api_language
  }
}

query FindAllNewsItems{
  news_items {
    title
    uuid
    changed
    type
    nid
    search_api_language
  }
}

query FindPageByNid{
  page(nid:5) {
    title
    uuid
    changed
    type
    bodyValue
    bodySummary
    search_api_language
  }
}

query FindNewsByNid{
  news(nid:2) {
    title
    uuid
    changed
    type
    bodyValue
    nid
    search_api_language
  }
}

query FindTermById{
  term(tid:55) {
    name
    uuid
    url
  }
}
'''

## Schema

```
    type Pages {
        id: Int
        nid: Int!
        title: String
        type: String
        uuid: String
        changed: String
        bodySummary: String    
        bodyValue: String
        field_keywords: [Keywords]
        keywords: Keywords
        search_api_language: String
        pori_rendered_entity: String
    }
```