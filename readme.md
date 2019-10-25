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
  page(nid:3) {
    title
    uuid
    changed
    type
    nid
    search_api_language
  }
}

query FindNewsByNid{
  news(nid:2811) {
    title
    uuid
    changed
    type
    nid
    search_api_language
  }
}
'''