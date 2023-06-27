jest.mock("fs", () => {
  return {
    readFileSync: jest.fn(fileName => {
      return Buffer.from("extend type Query {\n" + "_ping: Boolean\n" + "}");
    }),
  };
});

jest.mock("@library/graph-helper", () => {
  return {
    graphHelper: {
      startSubGraph: jest.fn(() => Promise.resolve("http://localhost:3000")),
    },
    configHelper: {
      getServiceName: jest.fn(() => "songs-subgraph-test"),
    },
  };
});

import { startSubGraphService } from "../../src";

describe("services/songs-subgraph/src/index.ts", () => {
  it("starts server", () => {
    expect(startSubGraphService()).resolves.not.toThrow();
  });
});
