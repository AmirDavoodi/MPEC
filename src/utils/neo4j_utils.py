from neo4j import GraphDatabase
from typing import Optional, Literal
from src.phase1.schemas import Entity, Relation, Triplet


class Neo4JUtils:
    def __init__(self, uri: str, auth: tuple[str, str]) -> None:
        self.driver = GraphDatabase.driver(uri, auth=auth)
        self.step: int = 0  # Initialize step counter

    def close(self) -> None:
        """Close the Neo4J driver connection."""
        self.driver.close()

    def create_node_with_props(
        self, entity: Entity, properties: Optional[dict] = None
    ) -> None:
        """
        Create a node with additional properties (e.g., graph_level).
        """
        props = properties.copy() if properties else {}
        # Always include required properties
        props.update(
            {
                "id": entity.id,
                "name": entity.name,
                "type": entity.type,
                "step": self.step,
            }
        )
        with self.driver.session() as session:
            session.execute_write(self._create_node_with_props, entity.label, props)

    def create_relation_with_props(
        self, relation: Relation, properties: Optional[dict] = None
    ) -> None:
        """
        Create a relationship with additional properties (e.g., graph_level).
        """
        props = properties.copy() if properties else {}
        # Always include required properties
        props.update({"type": relation.type, "step": self.step})
        with self.driver.session() as session:
            session.execute_write(self._create_relation_with_props, relation, props)

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

    def store_triplets(
        self,
        triplet_obj: Triplet,
        graph_type: Literal["course_pattern", "proof_example"],
    ) -> None:
        # First pass: create all nodes with their properties
        for entity in triplet_obj.entities:
            # Create a properties dictionary that includes all entity properties
            props = {
                "id": f"{graph_type}_{entity.id}",
                "name": f"{graph_type}_{entity.name}",
                "type": entity.type,
                "label": entity.label,  # Add entity label as property
                "graph_type": graph_type,
                "start": getattr(entity, "start", False),  # Default to False if not set
                "end": getattr(entity, "end", False),  # Default to False if not set
            }
            # Prefix the label with graph type
            entity_label = f"{graph_type}_{entity.label}"
            with self.driver.session() as session:
                session.execute_write(self._create_node_with_props, entity_label, props)

        # Second pass: create all relationships
        for relation in triplet_obj.relations:
            props = {
                "type": relation.type,
                "name": f"{graph_type}_{relation.name}",
                "label": relation.name,  # Add relation label as property
                "graph_type": graph_type,
            }
            # Update source and target IDs to match the prefixed node IDs
            source_id = f"{graph_type}_{relation.source}"
            target_id = f"{graph_type}_{relation.target}"
            with self.driver.session() as session:
                session.execute_write(
                    self._create_relation_with_props,
                    relation,
                    props,
                    source_id,
                    target_id,
                )

        # Third pass: set colors for start and end nodes
        with self.driver.session() as session:
            session.execute_write(self._set_node_colors)

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
    def _create_node_with_props(tx, label: str, props: dict) -> None:
        """
        Internal method to create a node with arbitrary properties.
        """
        prop_keys = ", ".join([f"{k}: ${k}" for k in props.keys()])
        query = f"CREATE (a:`{label}` {{{prop_keys}}})"
        tx.run(query, **props)

    @staticmethod
    def _create_relation_with_props(
        tx, relation: Relation, props: dict, source_id: str, target_id: str
    ) -> None:
        """
        Internal method to create a relationship with arbitrary properties.
        """
        # Ensure the relationship type is valid and enclosed in backticks if necessary
        relationship_name = relation.name.strip()
        if not relationship_name:
            raise ValueError("Relationship name cannot be empty.")
        if " " in relationship_name or not relationship_name.isalnum():
            relationship_name = f"`{relationship_name}`"

        prop_keys = ", ".join([f"{k}: ${k}" for k in props.keys()])
        query = (
            "MATCH (a {id: $source_id}), (b {id: $target_id}) "
            f"CREATE (a)-[r:{relationship_name} {{{prop_keys}}}]->(b)"
        )
        tx.run(query, source_id=source_id, target_id=target_id, **props)

    @staticmethod
    def _create_relation(tx, relation: Relation, step: int) -> None:
        """
        Internal method to create a relationship with a step attribute.
        """
        # Ensure the relationship type is valid and enclosed in backticks if necessary
        relationship_name = relation.name.strip()  # Remove leading/trailing spaces
        if not relationship_name:
            raise ValueError("Relationship name cannot be empty.")
        if " " in relationship_name or not relationship_name.isalnum():
            relationship_name = f"`{relationship_name}`"  # Enclose in backticks

        query = (
            "MATCH (a {id: $source}), (b {id: $target}) "
            f"CREATE (a)-[r:{relationship_name} {{type: $type, step: $step}}]->(b)"
        )
        tx.run(
            query,
            source=relation.source,
            target=relation.target,
            type=relation.type,
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

    @staticmethod
    def _set_node_colors(tx) -> None:
        """Set colors for start and end nodes."""
        # Set green color for start nodes
        query = """
        MATCH (n {start: true})
        SET n.color = '#00ff00'
        """
        tx.run(query)

        # Set red color for end nodes
        query = """
        MATCH (n {end: true})
        SET n.color = '#ff0000'
        """
        tx.run(query)

    def get_visualization_queries(self) -> str:
        return """
## Visualization and Analysis

You can visualize and analyze the graphs in Neo4j Browser using these queries:

### View Course Pattern:
```cypher
MATCH p=()-[r]->() 
WHERE r.graph_type = 'course_pattern' 
RETURN p
```

### View Proof Graph:
```cypher
MATCH p=()-[r]->() 
WHERE r.graph_type = 'proof_example' 
RETURN p
```

### View Both Graphs Side by Side:
```cypher
MATCH pattern=()-[r1]->() 
WHERE r1.graph_type = 'course_pattern'
WITH collect(pattern) as patterns
MATCH proof=()-[r2]->() 
WHERE r2.graph_type = 'proof_example'
WITH patterns, collect(proof) as proofs
RETURN patterns, proofs
```
"""
