from neo4j import GraphDatabase
from typing import Dict, Any, Tuple, List, Optional


class Neo4JUtils:
    """Utility class for interacting with Neo4j database."""

    def __init__(self, uri: str, auth: Tuple[str, str]):
        """
        Initialize the Neo4j connection.

        Args:
            uri: Neo4j connection URI (e.g., "bolt://localhost:7687")
            auth: Tuple of (username, password)
        """
        self.driver = GraphDatabase.driver(uri, auth=auth)
        self.current_step = 0

    def close(self):
        """Close the Neo4j connection."""
        self.driver.close()

    def clean_database(self):
        """Delete all nodes and relationships in the database."""
        with self.driver.session() as session:
            session.run("MATCH (n) DETACH DELETE n")

    def create_node(self, entity: Dict[str, Any]) -> str:
        """
        Create a node in Neo4j.

        Args:
            entity: Entity dictionary with properties

        Returns:
            ID of the created node
        """
        properties = {k: v for k, v in entity.items() if k != "id"}
        properties["step"] = self.current_step

        with self.driver.session() as session:
            result = session.run(
                """
                CREATE (n:Entity $properties)
                RETURN id(n) as node_id
                """,
                properties=properties,
            )
            record = result.single()
            return str(record["node_id"]) if record else None

    def create_node_with_id(self, node_id: str, properties: Dict[str, Any]) -> None:
        """
        Create a node with a specific ID.

        Args:
            node_id: ID to assign to the node
            properties: Node properties
        """
        properties["id"] = node_id
        properties["step"] = self.current_step

        with self.driver.session() as session:
            session.run(
                """
                CREATE (n:Entity $properties)
                """,
                properties=properties,
            )

    def create_relation(self, relation: Dict[str, Any]) -> None:
        """
        Create a relationship between two nodes.

        Args:
            relation: Relation dictionary with source, target, and type
        """
        properties = {
            k: v for k, v in relation.items() if k not in ["source", "target", "type"]
        }
        properties["step"] = self.current_step

        with self.driver.session() as session:
            session.run(
                """
                MATCH (source:Entity {id: $source}), (target:Entity {id: $target})
                CREATE (source)-[r:RELATION {type: $type, properties: $properties}]->(target)
                """,
                source=relation["source"],
                target=relation["target"],
                type=relation["type"],
                properties=properties,
            )

    def create_relation_with_ids(
        self, source_id: str, target_id: str, rel_type: str, properties: Dict[str, Any]
    ) -> None:
        """
        Create a relationship between two nodes using their IDs.

        Args:
            source_id: Source node ID
            target_id: Target node ID
            rel_type: Relationship type
            properties: Relationship properties
        """
        properties["step"] = self.current_step

        with self.driver.session() as session:
            session.run(
                f"""
                MATCH (source:Entity {{id: $source_id}}), (target:Entity {{id: $target_id}})
                CREATE (source)-[r:{rel_type} $properties]->(target)
                """,
                source_id=source_id,
                target_id=target_id,
                properties=properties,
            )

    def increment_step(self) -> None:
        """Increment the step counter for tracking changes over time."""
        self.current_step += 1

    def store_triplets(
        self, triplets: Dict[str, List[Dict[str, Any]]], graph_name: str
    ) -> None:
        """
        Store a set of triplets (entities and relations) in Neo4j.

        Args:
            triplets: Dictionary with 'entities' and 'relations' lists
            graph_name: Name to identify this graph
        """
        # Clean the database first
        self.clean_database()

        # Create entities
        for entity in triplets.get("entities", []):
            entity_copy = entity.copy()
            entity_copy["graph"] = graph_name
            self.create_node(entity_copy)

        # Create relations
        for relation in triplets.get("relations", []):
            relation_copy = relation.copy()
            relation_copy["graph"] = graph_name
            self.create_relation(relation_copy)
