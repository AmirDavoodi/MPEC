# Helper functions for Neo4J
from neo4j import GraphDatabase


class Neo4JUtils:
    def __init__(self, uri, auth):
        self.driver = GraphDatabase.driver(uri, auth=auth)

    def create_node(self, entity):
        with self.driver.session() as session:
            session.execute_write(
                lambda tx: tx.run(
                    "CREATE (a:Entity {id: $id, label: $label, type: $type})",
                    id=entity.id,
                    label=entity.label,
                    type=entity.type,
                )
            )

    def create_relation(self, relation):
        with self.driver.session() as session:
            session.execute_write(
                lambda tx: tx.run(
                    "MATCH (a:Entity {id: $source}), (b:Entity {id: $target}) "
                    "CREATE (a)-[:RELATION {type: $type}]->(b)",
                    source=relation.source,
                    target=relation.target,
                    type=relation.type,
                )
            )

    def close(self):
        self.driver.close()
