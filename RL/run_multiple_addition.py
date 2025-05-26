import numpy as np
from agent import QLearningAgent
from multiple_addition_env import MultipleAdditionEnv
from graph_builder import KnowledgeGraphBuilder
from neo4j_utils import Neo4JUtils
from typing import Tuple, List


def train_multiple_addition_agent(
    initial_expression: str,
    target_result: int,
    num_episodes: int = 1000,
    max_steps: int = 20,
    learning_rate: float = 0.1,
    discount_factor: float = 0.9,
    exploration_rate: float = 0.1,
) -> Tuple[QLearningAgent, List[Tuple[str, str]]]:
    """
    Train a Q-learning agent to solve multiple addition problems.

    Args:
        initial_expression: The starting expression (e.g., "2 + 3 + 4")
        target_result: The expected result
        num_episodes: Number of training episodes
        max_steps: Maximum steps per episode
        learning_rate: Learning rate for Q-learning
        discount_factor: Discount factor for future rewards
        exploration_rate: Initial exploration rate

    Returns:
        Trained agent and best solution path
    """
    # Initialize environment and agent
    env = MultipleAdditionEnv(initial_expression, target_result)
    agent = QLearningAgent(
        learning_rate=learning_rate,
        discount_factor=discount_factor,
        exploration_rate=exploration_rate,
    )

    best_reward = float("-inf")
    best_solution = None

    # Training loop
    for episode in range(num_episodes):
        state = env.reset()
        episode_reward = 0

        for step in range(max_steps):
            # Get valid actions and choose one
            valid_actions = env.get_valid_actions()
            action = agent.get_action(state, valid_actions)

            # Take action and observe result
            next_state, reward, done, _ = env.step(action)
            episode_reward += reward

            # Update agent
            next_valid_actions = env.get_valid_actions()
            agent.update(state, action, reward, next_state, next_valid_actions)

            state = next_state

            if done:
                break

        # Track best solution
        if episode_reward > best_reward:
            best_reward = episode_reward
            best_solution = agent.get_solution_path()

        # Decay exploration rate
        agent.decay_exploration()

        # Print progress
        if (episode + 1) % 100 == 0:
            print(f"Episode {episode + 1}/{num_episodes}, Best Reward: {best_reward}")

    return agent, best_solution


def main():
    # Example: Solve 2 + 3 + 4 = 9
    initial_expression = "2 + 3 + 4"
    target_result = 9

    print(f"Training agent to solve: {initial_expression} = {target_result}")

    # Train the agent
    agent, solution_path = train_multiple_addition_agent(
        initial_expression=initial_expression,
        target_result=target_result,
        num_episodes=1000,
    )

    # Build knowledge graph
    graph_builder = KnowledgeGraphBuilder()
    graph_builder.build_graph_from_solution(solution_path)

    # Store in Neo4j
    conn = Neo4JUtils(uri="bolt://localhost:7687", auth=("neo4j", "password"))
    conn.clean_database()
    conn.store_triplets(
        graph_builder.export_to_triplets(), graph_name="addition_solution"
    )
    conn.close()

    print("\nSolution path:")
    for state, action in solution_path:
        print(f"State: {state}, Action: {action}")


if __name__ == "__main__":
    main()
