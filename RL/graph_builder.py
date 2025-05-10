from typing import List, Dict, Any
import networkx as nx
from .environment import MathExpressionState


class KnowledgeGraphBuilder:
    """Builds a knowledge graph from the solution path of the RL agent."""

    def __init__(self):
        self.graph = nx.DiGraph()

    def build_graph_from_solution(self, solution_path: List[tuple]) -> nx.DiGraph:
        """
        Build a knowledge graph from the solution path.

        Args:
            solution_path: List of (state, action, reward) tuples

        Returns:
            A directed graph representing the solution
        """
        self.graph.clear()

        # Add nodes and edges based on the solution path
        prev_state = None

        for i, (state, action, reward) in enumerate(solution_path):
            # Skip actions with negative rewards (incorrect steps)
            if reward < 0:
                continue

            # Get the state string representation
            state_str = str(state)

            # Add the state as a node if it doesn't exist
            if not self.graph.has_node(state_str):
                # Determine if this is a start or end node
                is_start = i == 0
                is_end = i == len(solution_path) - 1

                self.graph.add_node(
                    state_str, label=state_str, type="step", start=is_start, end=is_end
                )

            # Add an edge from the previous state to the current state
            if prev_state is not None:
                self.graph.add_edge(prev_state, state_str, type="grounds", name=action)

            prev_state = state_str

        return self.graph

    def export_to_triplets(self) -> Dict[str, List[Dict[str, Any]]]:
        """
        Export the graph as triplets in the format used by the project.

        Returns:
            Dictionary with entities and relations lists
        """
        entities = []
        relations = []

        # Create entities
        for i, (node, data) in enumerate(self.graph.nodes(data=True)):
            entity = {
                "id": str(i),
                "name": node,
                "label": data.get("label", node),
                "type": data.get("type", "step"),
                "start": data.get("start", False),
                "end": data.get("end", False),
            }
            entities.append(entity)

            # Store the mapping from node to entity id
            data["entity_id"] = str(i)

        # Create relations
        for edge in self.graph.edges(data=True):
            source_node, target_node, data = edge
            source_id = self.graph.nodes[source_node]["entity_id"]
            target_id = self.graph.nodes[target_node]["entity_id"]

            relation = {
                "source": source_id,
                "target": target_id,
                "type": data.get("type", "grounds"),
                "name": data.get("name", "leads_to"),
            }
            relations.append(relation)

        return {"entities": entities, "relations": relations}
