import { createClient, Client } from "../../src";

describe("libraries/database/src/client.ts", () => {
  it("creates ElasticSearch client", () => {
    const result = createClient();
    expect(result).toBeInstanceOf(Client);
  });
});
