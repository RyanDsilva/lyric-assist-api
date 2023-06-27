import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { ApolloGateway } from "@apollo/gateway";

export async function startSubGraph(typeDefs: any, resolvers: any) {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT ?? "3000") },
  });
  return url;
}

export async function startGateway(supergraphSdl: string) {
  const gateway = new ApolloGateway({
    supergraphSdl,
  });
  const server = new ApolloServer({
    gateway,
    introspection: true,
    includeStacktraceInErrorResponses: process.env.NODE_ENV !== "production",
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT ?? "3000") },
  });
  return url;
}
