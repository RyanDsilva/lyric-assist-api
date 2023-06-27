interface SearchQuery {
  [key: string]: any;
}

export function fuzzyTextSearch(key: string, value: string) {
  let search: SearchQuery = {
    query: {
      fuzzy: {},
    },
  };
  const keyword: string = `${key}.keyword`;
  search.query.fuzzy[keyword] = { value: value };
  return search;
}
