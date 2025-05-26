import numpy as np
import random
from typing import Dict, List, Tuple
from collections import defaultdict

from environment import MathExpressionState, AdditionRecursionEnv


class QLearningAgent:
    """Q-learning agent for learning mathematical reasoning steps."""

    def __init__(
        self,
        learning_rate: float = 0.1,
        discount_factor: float = 0.9,
        exploration_rate: float = 0.1,
    ):
        """
        Initialize the Q-learning agent.

        Args:
            learning_rate: Alpha - learning rate
            discount_factor: Gamma - discount factor for future rewards
            exploration_rate: Epsilon - probability of taking a random action
        """
        self.q_table = defaultdict(lambda: defaultdict(float))
        self.lr = learning_rate
        self.gamma = discount_factor
        self.epsilon = exploration_rate
        self.action_history = []

    def get_action(self, state: MathExpressionState, valid_actions: List[str]) -> str:
        """
        Choose an action using epsilon-greedy policy.

        Args:
            state: Current state
            valid_actions: List of valid actions from this state

        Returns:
            Selected action
        """
        if not valid_actions:
            return "finish"  # Default action if no valid actions

        # Exploration: choose a random action
        if random.random() < self.epsilon:
            return random.choice(valid_actions)

        # Exploitation: choose the best action based on Q-values
        # If all Q-values are the same, choose randomly
        state_key = str(state)
        q_values = {action: self.q_table[state_key][action] for action in valid_actions}

        max_q = max(q_values.values()) if q_values else 0
        best_actions = [
            action
            for action, q_val in q_values.items()
            if q_val == max_q or abs(q_val - max_q) < 1e-9
        ]

        return random.choice(best_actions)

    def update(
        self,
        state: MathExpressionState,
        action: str,
        reward: float,
        next_state: MathExpressionState,
        next_valid_actions: List[str],
    ) -> None:
        """
        Update Q-values using the Q-learning update rule.

        Args:
            state: Current state
            action: Action taken
            reward: Reward received
            next_state: Next state
            next_valid_actions: Valid actions from next state
        """
        state_key = str(state)
        next_state_key = str(next_state)

        # Calculate maximum Q-value for next state
        max_next_q = (
            max([self.q_table[next_state_key][a] for a in next_valid_actions])
            if next_valid_actions
            else 0
        )

        # Q-learning update formula
        current_q = self.q_table[state_key][action]
        new_q = current_q + self.lr * (reward + self.gamma * max_next_q - current_q)
        self.q_table[state_key][action] = new_q

        # Record the action taken
        self.action_history.append((state_key, action, reward))

    def decay_exploration(self, decay_rate: float = 0.995) -> None:
        """Decay the exploration rate to reduce exploration over time."""
        self.epsilon = max(0.01, self.epsilon * decay_rate)

    def get_solution_path(self) -> List[Tuple[str, str]]:
        """Get the sequence of states and actions that led to the solution."""
        return self.action_history
