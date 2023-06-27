import { Client } from "@library/database";

export async function createIndex(esClient: Client, indexName: string) {
  await esClient.indices.create({ index: indexName });
}

export async function insertDocument(
  esClient: Client,
  indexName: string,
  document: any,
) {
  const now = new Date().toISOString();
  const response = await esClient.index({
    index: indexName,
    body: {
      ...document,
      createdAt: now,
      updatedAt: now,
    },
  });
  return response;
}

export async function searchDocuments(
  esClient: Client,
  indexName: string,
  query: any,
) {
  const response = await esClient.search({
    index: indexName,
    body: {
      query: query,
    },
  });
  return response.hits.hits;
}

export async function updateDocument(
  esClient: Client,
  indexName: string,
  documentId: string,
  document: any,
) {
  const now = new Date().toISOString();
  const response = await esClient.update({
    index: indexName,
    id: documentId,
    doc: {
      ...document,
      updatedAt: now,
    },
  });
  return response;
}

export async function deleteDocument(
  esClient: Client,
  indexName: string,
  documentId: string,
) {
  const response = await esClient.delete({
    index: indexName,
    id: documentId,
  });
  return response;
}

export async function deleteIndex(esClient: Client, indexName: string) {
  await esClient.indices.delete({
    index: indexName,
  });
}
