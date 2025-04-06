from neo4j import GraphDatabase
from typing import Optional
from src.phase1.schemas import Entity, Relation


class Neo4JUtils:
    def __init__(self, uri: str, auth: tuple[str, str]) -> None:
        self.driver = GraphDatabase.driver(uri, auth=auth)
        self.step: int = 0  # Initialize step counter

    def close(self) -> None:
        """Close the Neo4J driver connection."""
        self.driver.close()

    def create_node(self, entity: Entity, step: Optional[int] = None) -> None:
        """
        Create a node with a step attribute.
        If step is not provided, use the current step counter.
        """
        if step is None:
            step = self.step
        with self.driver.session() as session:
            session.execute_write(self._create_node, entity, step)

    def create_relation(self, relation: Relation, step: Optional[int] = None) -> None:
        """
        Create a relationship with a step attribute.
        If step is not provided, use the current step counter.
        """
        if step is None:
            step = self.step
        with self.driver.session() as session:
            session.execute_write(self._create_relation, relation, step)

    def clean_database(self, step: Optional[int] = None) -> None:
        """
        Clean the database by deleting nodes and relationships with a step attribute
        greater than the input parameter. If no step is provided, delete all nodes and relationships.
        """
        with self.driver.session() as session:
            session.execute_write(self._clean_database, step)

    def increment_step(self) -> None:
        """Increment the step counter."""
        self.step += 1

    @staticmethod
    def _create_node(tx, entity: Entity, step: int) -> None:
        """
        Internal method to create a node with a step attribute.
        """
        query = (
            "CREATE (a:`"
            + entity.label
            + "` {id: $id, name: $name, type: $type, step: $step})"
        )
        tx.run(query, id=entity.id, name=entity.name, type=entity.type, step=step)

    @staticmethod
    def _create_relation(tx, relation: Relation, step: int) -> None:
        """
        Internal method to create a relationship with a step attribute.
        """
        # Ensure the relationship type is valid and enclosed in backticks if necessary
        relationship_type = relation.type.strip()  # Remove leading/trailing spaces
        if not relationship_type:
            raise ValueError("Relationship type cannot be empty.")
        if " " in relationship_type or not relationship_type.isalnum():
            relationship_type = f"`{relationship_type}`"  # Enclose in backticks

        query = (
            "MATCH (a {id: $source}), (b {id: $target}) "
            f"CREATE (a)-[r:{relationship_type} {{name: $name, step: $step}}]->(b)"
        )
        tx.run(
            query,
            source=relation.source,
            target=relation.target,
            name=relation.name,  # Use the name attribute for the relationship
            step=step,
        )

    @staticmethod
    def _clean_database(tx, step: Optional[int]) -> None:
        """
        Internal method to delete nodes and relationships with a step attribute
        smaller than the input parameter. If no step is provided, delete all nodes and relationships.
        """
        if step is not None:
            # Delete nodes and relationships with step < input step
            tx.run("MATCH (n) WHERE n.step > $step DETACH DELETE n", step=step)
        else:
            # Delete all nodes and relationships
            tx.run("MATCH (n) DETACH DELETE n")
