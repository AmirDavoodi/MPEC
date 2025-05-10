from typing import Dict, List, Any
import random
import numpy as np
from tqdm import tqdm

from .environment import AdditionRecursionEnv
from .agent import QLearningAgent
from .graph_builder import KnowledgeGraphBuilder


class RLTrainer:
    """Trains an RL agent to solve mathematical reasoning problems."""

    def __init__(
        self,
        env: AdditionRecursionEnv,
        agent: QLearningAgent,
        graph_builder: KnowledgeGraphBuilder,
        num_episodes: int = 1000,
    ):
        """
        Initialize the trainer.

        Args:
            env: The environment
            agent: The RL agent
            graph_builder: The knowledge graph builder
            num_episodes: Number of episodes to train for
        """
        self.env = env
        self.agent = agent
        self.graph_builder = graph_builder
        self.num_episodes = num_episodes
        self.best_reward = float("-inf")
        self.best_solution = None

    def train(self, verbose: bool = False) -> Dict[str, Any]:
        """
        Train the agent.

        Args:
            verbose: Whether to print progress

        Returns:
            Training statistics
        """
        episode_rewards = []

        for episode in tqdm(range(self.num_episodes), desc="Training"):
            state = self.env.reset()
            done = False
            total_reward = 0
            self.agent.action_history = []  # Reset action history

            while not done:
                valid_actions = self.env.get_valid_actions()
                action = self.agent.get_action(state, valid_actions)
                next_state, reward, done, _ = self.env.step(action)

                next_valid_actions = self.env.get_valid_actions() if not done else []
                self.agent.update(state, action, reward, next_state, next_valid_actions)

                state = next_state
                total_reward += reward

            episode_rewards.append(total_reward)

            # Keep track of the best solution
            if total_reward > self.best_reward:
                self.best_reward = total_reward
                self.best_solution = self.agent.action_history.copy()

            # Decay exploration rate
            if episode % 100 == 0:
                self.agent.decay_exploration()

            if verbose and episode % 100 == 0:
                print(
                    f"Episode {episode}, Reward: {total_reward}, Epsilon: {self.agent.epsilon:.4f}"
                )

        # Build the knowledge graph from the best solution
        if self.best_solution:
            self.graph_builder.build_graph_from_solution(self.best_solution)

        return {
            "episode_rewards": episode_rewards,
            "best_reward": self.best_reward,
            "best_solution": self.best_solution,
            "knowledge_graph": (
                self.graph_builder.export_to_triplets() if self.best_solution else None
            ),
        }

    def solve_problem(
        self, problem_expression: str, target_result: int
    ) -> Dict[str, Any]:
        """
        Solve a specific problem using the trained agent.

        Args:
            problem_expression: The mathematical expression to solve
            target_result: The expected result

        Returns:
            Solution information including the knowledge graph
        """
        # Create a new environment for this problem
        problem_env = AdditionRecursionEnv(problem_expression, target_result)

        # Solve the problem
        state = problem_env.reset()
        done = False
        total_reward = 0
        self.agent.action_history = []  # Reset action history

        while not done:
            valid_actions = problem_env.get_valid_actions()
            action = self.agent.get_action(state, valid_actions)
            next_state, reward, done, _ = problem_env.step(action)

            state = next_state
            total_reward += reward

        # Build the knowledge graph from the solution
        self.graph_builder.build_graph_from_solution(self.agent.action_history)

        return {
            "total_reward": total_reward,
            "solution_path": self.agent.action_history,
            "knowledge_graph": self.graph_builder.export_to_triplets(),
        }
