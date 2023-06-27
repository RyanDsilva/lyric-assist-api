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
      startGateway: jest.fn(() => Promise.resolve("http://localhost:3000")),
    },
    configHelper: {
      getServiceName: jest.fn(() => "graph-gateway-test"),
    },
  };
});

import { startGatewayService } from "../../src";

describe("services/graph-gateway/src/index.ts", () => {
  it("starts server", () => {
    expect(startGatewayService()).resolves.not.toThrow();
  });
});
