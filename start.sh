#!/bin/bash

rm services/users-subgraph/dist/schema.graphql
cp services/users-subgraph/schema.graphql services/users-subgraph/dist/schema.graphql

rm services/songs-subgraph/dist/schema.graphql
cp services/songs-subgraph/schema.graphql services/songs-subgraph/dist/schema.graphql

set -e
rover supergraph compose --config ./supergraph.yaml > services/graph-gateway/supergraph.graphql --elv2-license=accept
set +e

docker compose up