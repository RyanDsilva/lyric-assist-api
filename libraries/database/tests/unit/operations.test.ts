import { es, Client, searchQuery } from "../../src";
import Mock from "@elastic/elasticsearch-mock";

let mock: Mock = new Mock();
let testClient: Client = new Client({
  node: "http://localhost:9200",
  Connection: mock.getConnection(),
});

describe("libraries/database/src/operations.ts", () => {
  describe("createIndex", () => {
    beforeEach(() => {
      mock.add(
        {
          method: "PUT",
          path: "/:index",
        },
        () => {
          return {
            acknowledged: true,
            shards_acknowledged: true,
            index: "test-index",
          };
        },
      );
    });

    afterEach(() => {
      mock.clearAll();
    });

    it("successfully creates a new index", async () => {
      const indexName = "test-index";
      await expect(
        es.createIndex(testClient, indexName),
      ).resolves.not.toThrow();
    });
  });

  describe("insertDocument", () => {
    beforeEach(() => {
      mock.add(
        {
          method: "POST",
          path: "/:index/_doc",
        },
        () => {
          return {
            _index: "test-index",
            _id: "M4Oz-ogB1LnjePE3_Qtw",
            _version: 1,
            result: "created",
            _shards: {
              total: 2,
              successful: 1,
              failed: 0,
            },
            _seq_no: 0,
            _primary_term: 2,
          };
        },
      );
    });

    afterEach(() => {
      mock.clearAll();
    });

    it("successfully adds a new document to the index", async () => {
      const indexName = "test-index";
      const document = {
        name: "test",
      };
      const result = await es.insertDocument(testClient, indexName, document);
      expect(result.result).toBe("created");
    });
  });

  describe("searchDocument - fuzzy text search", () => {
    beforeEach(() => {
      mock.add(
        {
          method: "POST",
          path: "/:index/_search",
        },
        () => {
          return {
            took: 1,
            timed_out: false,
            _shards: {
              total: 1,
              successful: 1,
              skipped: 0,
              failed: 0,
            },
            hits: {
              total: {
                value: 1,
                relation: "eq",
              },
              max_score: 0.2876821,
              hits: [
                {
                  _index: "test-index",
                  _id: "M4Oz-ogB1LnjePE3_Qtw",
                  _score: 0.2876821,
                  _source: {
                    name: "test",
                  },
                },
              ],
            },
          };
        },
      );
    });

    afterEach(() => {
      mock.clearAll();
    });

    it("searches for a document in the index", async () => {
      const key = "name";
      const value = "test";
      const indexName = "test-index";
      const query = searchQuery.fuzzyTextSearch(key, value);
      const result = await es.searchDocuments(testClient, indexName, query);
      expect(result.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("updateDocument", () => {
    beforeEach(() => {
      mock.add(
        {
          method: "POST",
          path: "/:index/_update/:id",
        },
        () => {
          return {
            _index: "test-index",
            _id: "M4Oz-ogB1LnjePE3_Qtw",
            _version: 2,
            result: "updated",
            _shards: {
              total: 2,
              successful: 1,
              failed: 0,
            },
            _seq_no: 1,
            _primary_term: 2,
          };
        },
      );
    });

    afterEach(() => {
      mock.clearAll();
    });

    it("successfully updates existing document in the index", async () => {
      const indexName = "test-index";
      const id = "test-id";
      const document = {
        name: "test-update",
      };
      const result = await es.updateDocument(
        testClient,
        indexName,
        id,
        document,
      );
      expect(result.result).toBe("updated");
    });
  });

  describe("deleteDocument", () => {
    beforeEach(() => {
      mock.add(
        {
          method: "DELETE",
          path: "/:index/_doc/:id",
        },
        () => {
          return {
            _index: "test-index",
            _id: "M4Oz-ogB1LnjePE3_Qtw",
            _version: 3,
            result: "deleted",
            _shards: {
              total: 2,
              successful: 1,
              failed: 0,
            },
            _seq_no: 2,
            _primary_term: 2,
          };
        },
      );
    });

    afterEach(() => {
      mock.clearAll();
    });

    it("successfully deletes existing document from the index", async () => {
      const indexName = "test-index";
      const id = "test-id";
      const result = await es.deleteDocument(testClient, indexName, id);
      expect(result.result).toBe("deleted");
    });
  });

  describe("deleteIndex", () => {
    beforeEach(() => {
      mock.add(
        {
          method: "DELETE",
          path: "/:index",
        },
        () => {
          return {
            acknowledged: true,
          };
        },
      );
    });

    afterEach(() => {
      mock.clearAll();
    });

    it("successfully deletes the index", async () => {
      const indexName = "test-index";
      await expect(
        es.deleteIndex(testClient, indexName),
      ).resolves.not.toThrow();
    });
  });
});
