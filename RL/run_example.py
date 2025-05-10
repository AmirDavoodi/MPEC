import os
import sys
from typing import Dict, Any

# Add the project root to the path to ensure imports work correctly
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from RL.environment import AdditionRecursionEnv, MathExpressionState
from RL.agent import QLearningAgent
from RL.graph_builder import KnowledgeGraphBuilder
from RL.trainer import RLTrainer
from RL.neo4j_utils import (
    Neo4JUtils,
)  # Use the local Neo4j utils to avoid import issues


def solve_addition_problem(a: int, b: int, num_episodes: int = 1000) -> Dict[str, Any]:
    """
    Solve an addition problem using the RL agent and store the result in Neo4j.

    Args:
        a: First number in the addition
        b: Second number in the addition
        num_episodes: Number of training episodes

    Returns:
        Solution information
    """
    # Create the problem expression and expected result
    problem_expression = f"{a} + {b}"
    target_result = a + b

    print(f"Solving problem: {problem_expression} = {target_result}")

    # Initialize environment, agent, and graph builder
    env = AdditionRecursionEnv(problem_expression, target_result)
    agent = QLearningAgent(learning_rate=0.1, discount_factor=0.9, exploration_rate=0.3)
    graph_builder = KnowledgeGraphBuilder()

    # Create and train the RL agent
    trainer = RLTrainer(env, agent, graph_builder, num_episodes=num_episodes)
    training_stats = trainer.train(verbose=True)

    print(f"Training completed. Best reward: {training_stats['best_reward']}")

    # Solve the specific problem
    solution = trainer.solve_problem(problem_expression, target_result)

    print("\nSolution path:")
    for i, (state, action, reward) in enumerate(solution["solution_path"]):
        print(f"Step {i+1}: State: {state}, Action: {action}, Reward: {reward}")

    # Ensure we have a valid solution path
    if not solution["solution_path"]:
        print(
            "WARNING: Solution path is empty. Creating a manual solution path for demonstration."
        )
        # Create a manual solution path for demonstration
        manual_path = [
            (MathExpressionState(f"{a} + {b}"), "decompose", 1.0),
            (MathExpressionState(f"({a} + {b-1}) + 1"), "further_decompose", 1.0),
            (MathExpressionState(f"(({a} + {b-2}) + 1) + 1"), "further_decompose", 1.0),
        ]

        # Continue decomposing until b becomes 0
        current_b = b - 2
        current_expr = f"(({a} + {b-2}) + 1) + 1"

        while current_b > 0:
            next_expr = f"({current_expr.replace(f'{a} + {current_b}', f'({a} + {current_b-1}) + 1')}"
            manual_path.append(
                (MathExpressionState(next_expr), "further_decompose", 1.0)
            )
            current_b -= 1
            current_expr = next_expr

        # Apply base case
        base_expr = current_expr.replace(f"{a} + 0", str(a))
        manual_path.append((MathExpressionState(base_expr), "apply_base_case", 1.0))

        # Calculate step by step
        for i in range(b):
            calc_expr = str(a + i + 1)
            manual_path.append((MathExpressionState(calc_expr), "calculate", 1.0))

        # Build graph from manual path
        graph_builder.build_graph_from_solution(manual_path)
        solution["solution_path"] = manual_path
        solution["knowledge_graph"] = graph_builder.export_to_triplets()

    # Print the knowledge graph
    print("\nKnowledge Graph:")
    if solution["knowledge_graph"]:
        print(f"Entities: {len(solution['knowledge_graph']['entities'])}")
        print(f"Relations: {len(solution['knowledge_graph']['relations'])}")

        # Print first few entities and relations for debugging
        print("\nSample Entities:")
        for i, entity in enumerate(solution["knowledge_graph"]["entities"][:3]):
            print(f"  Entity {i}: {entity}")

        print("\nSample Relations:")
        for i, relation in enumerate(solution["knowledge_graph"]["relations"][:3]):
            print(f"  Relation {i}: {relation}")
    else:
        print("No knowledge graph generated!")

    return solution


def store_graph_in_neo4j(solution: Dict[str, Any], problem_name: str) -> None:
    """
    Store the solution graph in Neo4j.

    Args:
        solution: Solution information including the knowledge graph
        problem_name: Name to identify this problem in Neo4j
    """
    # Connect to Neo4j
    # Use the credentials from your docker-compose.yml
    neo4j = Neo4JUtils("bolt://localhost:7687", ("neo4j", "password"))

    # Clean the database to remove any existing nodes and relationships
    print("Cleaning Neo4j database...")
    neo4j.clean_database()

    # Extract entities and relations from the solution
    knowledge_graph = solution["knowledge_graph"]

    if knowledge_graph:
        entities = knowledge_graph["entities"]
        relations = knowledge_graph["relations"]

        print(
            f"Storing {len(entities)} nodes and {len(relations)} relationships in Neo4j..."
        )

        # Create nodes
        for entity in entities:
            properties = {
                "name": entity["name"],
                "label": entity["label"],
                "type": entity["type"],
                "problem": problem_name,
            }
            if entity["start"]:
                properties["start"] = True
            if entity["end"]:
                properties["end"] = True

            neo4j.create_node_with_id(entity["id"], properties)

        # Create relationships
        for relation in relations:
            properties = {
                "name": relation["name"],
                "type": relation["type"],
                "problem": problem_name,
            }
            neo4j.create_relation_with_ids(
                relation["source"], relation["target"], relation["type"], properties
            )

        print("Graph stored successfully in Neo4j!")

        # Print a Cypher query to view the graph
        print("\nTo view the graph in Neo4j Browser, run this Cypher query:")
        print(
            f'MATCH (n:Entity {{problem: "{problem_name}"}}) OPTIONAL MATCH (n)-[r]-(m) RETURN n, r, m'
        )
    else:
        print("No knowledge graph available to store.")

    # Close the Neo4j connection
    neo4j.close()


def main():
    # Solve the addition problem 8 + 9
    solution = solve_addition_problem(8, 9, num_episodes=1000)

    # Store the solution graph in Neo4j
    store_graph_in_neo4j(solution, "addition_8_plus_9")

    print("\nProcess completed successfully!")


if __name__ == "__main__":
    main()
