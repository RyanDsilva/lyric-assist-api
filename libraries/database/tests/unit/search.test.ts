import { searchQuery } from "../../src";

describe("libraries/database/src/search.ts", () => {
  it("returns full text search query", () => {
    const searchTermKey = "key";
    const searchTermValue = "test";
    const result = searchQuery.fuzzyTextSearch(searchTermKey, searchTermValue);
    expect(result).toStrictEqual({
      query: {
        fuzzy: {
          "key.keyword": {
            value: "test",
          },
        },
      },
    });
  });
});
