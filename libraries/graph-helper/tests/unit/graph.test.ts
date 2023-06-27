jest.mock("@apollo/gateway", () => {
  return {
    ApolloGateway: jest.fn().mockImplementation(() => {
      return {
        start: () => Promise.resolve(),
        stop: () => Promise.resolve(),
      };
    }),
  };
});

jest.mock("@apollo/server", () => {
  return {
    ApolloServer: jest.fn().mockImplementation(() => {
      return {
        start: () => Promise.resolve(),
        stop: () => Promise.resolve(),
      };
    }),
  };
});

const buildSubgraphSchemaMock = jest.fn();
jest.mock("@apollo/subgraph", () => {
  return {
    buildSubgraphSchema: buildSubgraphSchemaMock,
  };
});

const startStandaloneServerMock = jest.fn();
jest.mock("@apollo/server/standalone", () => {
  return {
    startStandaloneServer: startStandaloneServerMock,
  };
});

import { graphHelper } from "../../src";

describe("libraries/graph-helper/src/graph.ts", () => {
  it("starts subgraph", async () => {
    const typeDefs = "test";
    const resolvers = {};
    startStandaloneServerMock.mockResolvedValue(() =>
      Promise.resolve({ url: "http://localhost:3000" }),
    );
    await expect(
      graphHelper.startSubGraph(typeDefs, resolvers),
    ).resolves.not.toThrow();
  });

  it("starts gateway", async () => {
    const supergraphSdl = "test";
    startStandaloneServerMock.mockResolvedValue(() =>
      Promise.resolve({ url: "http://localhost:3000" }),
    );
    await expect(
      graphHelper.startGateway(supergraphSdl),
    ).resolves.not.toThrow();
  });
});
