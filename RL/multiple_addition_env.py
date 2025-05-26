import numpy as np
from typing import List, Tuple, Dict, Any, Optional


class MultipleAdditionState:
    """Represents a state in the multiple addition chain."""

    def __init__(self, expression: str, step_num: int = 0):
        self.expression = expression
        self.step_num = step_num

    def __str__(self):
        return self.expression

    def __eq__(self, other):
        if not isinstance(other, MultipleAdditionState):
            return False
        return self.expression == other.expression

    def __hash__(self):
        return hash(self.expression)


class MultipleAdditionEnv:
    """Environment for multiple addition problems."""

    def __init__(self, initial_expression: str, target_result: int):
        """
        Initialize the environment with an initial expression and target result.

        Args:
            initial_expression: The starting mathematical expression (e.g., "2 + 3 + 4")
            target_result: The expected final result (e.g., 9)
        """
        self.initial_state = MultipleAdditionState(initial_expression)
        self.current_state = self.initial_state
        self.target_result = target_result
        self.done = False
        self.max_steps = 20  # Increased for multiple additions
        self.step_count = 0

        # Parse the initial expression
        self.numbers = [int(n.strip()) for n in initial_expression.split("+")]
        self.n = len(self.numbers)

    def reset(self) -> MultipleAdditionState:
        """Reset the environment to the initial state."""
        self.current_state = self.initial_state
        self.done = False
        self.step_count = 0
        return self.current_state

    def get_valid_actions(self) -> List[str]:
        """Get list of valid actions from current state."""
        expression = self.current_state.expression

        # If we have a simple expression without parentheses
        if "(" not in expression:
            if "+" in expression:
                return ["group_left", "group_right"]
            else:
                try:
                    value = int(expression.strip())
                    if value == self.target_result:
                        return ["finish"]
                    else:
                        return []
                except ValueError:
                    return []

        # If we have a grouped expression
        if "(" in expression:
            # If we have a simple addition inside parentheses
            if expression.count("+") == 1:
                return ["calculate"]
            else:
                return ["group_left", "group_right"]

        return []

    def step(
        self, action: str
    ) -> Tuple[MultipleAdditionState, float, bool, Dict[str, Any]]:
        """
        Take a step in the environment by applying the chosen action.

        Args:
            action: The action to take

        Returns:
            next_state: The new state after taking the action
            reward: The reward for taking the action
            done: Whether the episode is done
            info: Additional information
        """
        self.step_count += 1
        reward = 0
        info = {}

        if action == "group_left":
            # Group from left to right
            # Example: "2 + 3 + 4" to "(2 + 3) + 4"
            parts = self.current_state.expression.split("+")
            if len(parts) >= 2:
                left = parts[0].strip()
                right = parts[1].strip()
                new_expression = f"({left} + {right})"
                if len(parts) > 2:
                    new_expression += " + " + " + ".join(parts[2:])
                reward = 1.0
            else:
                new_expression = self.current_state.expression
                reward = -1.0

        elif action == "group_right":
            # Group from right to left
            # Example: "2 + 3 + 4" to "2 + (3 + 4)"
            parts = self.current_state.expression.split("+")
            if len(parts) >= 2:
                left = " + ".join(parts[:-1])
                right = parts[-1].strip()
                new_expression = f"{left} + ({right})"
                reward = 1.0
            else:
                new_expression = self.current_state.expression
                reward = -1.0

        elif action == "calculate":
            # Calculate the result of a simple addition
            try:
                # Remove parentheses and evaluate
                expr = self.current_state.expression.replace("(", "").replace(")", "")
                result = eval(expr)
                new_expression = str(result)
                reward = 1.0
            except:
                new_expression = self.current_state.expression
                reward = -1.0

        elif action == "finish":
            # Finish the calculation
            new_expression = self.current_state.expression
            try:
                result = int(new_expression.strip())
                if result == self.target_result:
                    reward = 5.0
                    self.done = True
                else:
                    reward = -5.0
            except:
                reward = -5.0

        else:
            new_expression = self.current_state.expression
            reward = -1.0

        # Update current state
        self.current_state = MultipleAdditionState(new_expression, self.step_count)

        # Check if we've reached the maximum number of steps
        if self.step_count >= self.max_steps:
            self.done = True
            try:
                result = int(new_expression.strip())
                if result != self.target_result:
                    reward -= 3.0
            except:
                reward -= 3.0

        return self.current_state, reward, self.done, info
