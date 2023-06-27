import { Client } from "@elastic/elasticsearch";

export function createClient() {
  const esClient = new Client({
    name: "es-client",
    nodes: [process.env.ELASTICSEARCH_CLIENT || "http://localhost:9200"],
  });
  return esClient;
}

export { Client };
