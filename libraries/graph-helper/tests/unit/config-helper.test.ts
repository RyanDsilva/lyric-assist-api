import { configHelper } from "../../src";

describe("libraries/graph-helper/src/config-helper.ts", () => {
  it("returns the service name with the environment", () => {
    const serviceName = "test";
    const result = configHelper.getServiceName(serviceName);
    expect(result).toBe("test-test");
  });
});
