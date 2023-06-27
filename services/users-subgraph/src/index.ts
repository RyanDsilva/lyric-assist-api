import { gql } from "graphql-tag";
import * as fs from "fs";
import { graphHelper, configHelper } from "@library/graph-helper";

const typeDefs = gql(
  fs.readFileSync("./schema.graphql", { encoding: "utf-8" }).toString(),
);
const serviceName = "users-subgraph";

const resolvers = {
  Query: {
    me() {
      return { id: "1", username: "@ava" };
    },
  },
};

export async function startSubGraphService() {
  const url = await graphHelper.startSubGraph(typeDefs, resolvers);
  return url;
}

startSubGraphService().then((url: string) => {
  console.log(`🚀 ${configHelper.getServiceName(serviceName)} at ${url}`);
});
