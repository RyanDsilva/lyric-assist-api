import { readFileSync } from "fs";
import { graphHelper, configHelper } from "@library/graph-helper";

const serviceName = 'graph-gateway';
const supergraphSdl = readFileSync("supergraph.graphql").toString();

export async function startGatewayService() {
  const url = graphHelper.startGateway(supergraphSdl);
  return url;
}

startGatewayService().then((url: string) => {
  console.log(`🚀 ${configHelper.getServiceName(serviceName)} at ${url}`);
});
