import numpy as np
from typing import List, Tuple, Dict, Any, Optional

class MathExpressionState:
    """Represents a state in the mathematical expression chain."""
    
    def __init__(self, expression: str, step_num: int = 0):
        self.expression = expression
        self.step_num = step_num
    
    def __str__(self):
        return self.expression
    
    def __eq__(self, other):
        if not isinstance(other, MathExpressionState):
            return False
        return self.expression == other.expression
    
    def __hash__(self):
        return hash(self.expression)


class AdditionRecursionEnv:
    """Environment for addition via recursion problems."""
    
    def __init__(self, initial_expression: str, target_result: int):
        """
        Initialize the environment with an initial expression and target result.
        
        Args:
            initial_expression: The starting mathematical expression (e.g., "2 + 3")
            target_result: The expected final result (e.g., 5)
        """
        self.initial_state = MathExpressionState(initial_expression)
        self.current_state = self.initial_state
        self.target_result = target_result
        self.done = False
        self.max_steps = 10
        self.step_count = 0
        
        # Parse the initial expression
        parts = initial_expression.split('+')
        self.a = int(parts[0].strip())
        self.b = int(parts[1].strip())
    
    def reset(self) -> MathExpressionState:
        """Reset the environment to the initial state."""
        self.current_state = self.initial_state
        self.done = False
        self.step_count = 0
        return self.current_state
    
    def get_valid_actions(self) -> List[str]:
        """Get list of valid actions from current state."""
        # If we're at the initial state with "a + b"
        if '+' in self.current_state.expression and self.step_count == 0:
            return ["decompose"]
        
        # If we have a decomposed expression with (a + (b-1)) + 1
        if '(' in self.current_state.expression and '+' in self.current_state.expression:
            # If we have (a + 0) form, apply base case
            if '+ 0)' in self.current_state.expression:
                return ["apply_base_case"]
            else:
                return ["further_decompose", "increment"]
        
        # If we have a simple addition like "4 + 1"
        if '+' in self.current_state.expression and not '(' in self.current_state.expression:
            return ["calculate"]
        
        # If we're at a final number
        try:
            value = int(self.current_state.expression.strip())
            if value == self.target_result:
                return ["finish"]
            else:
                return []
        except ValueError:
            return []
    
    def step(self, action: str) -> Tuple[MathExpressionState, float, bool, Dict[str, Any]]:
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
        
        if action == "decompose":
            # Transform "a + b" to "(a + (b-1)) + 1"
            a, b = self._parse_expression(self.current_state.expression)
            if b > 0:
                new_expression = f"({a} + {b-1}) + 1"
                reward = 1.0
            else:
                new_expression = f"{a}"
                reward = 0.5
            
        elif action == "further_decompose":
            # Further decompose the expression
            # Example: ((a + (b-1)) + 1) to (((a + (b-2)) + 1) + 1)
            inner_expr = self._extract_inner_expression(self.current_state.expression)
            if inner_expr:
                a, b = self._parse_expression(inner_expr)
                if b > 0:
                    new_inner = f"({a} + {b-1}) + 1"
                    new_expression = self.current_state.expression.replace(inner_expr, new_inner)
                    reward = 1.0
                else:
                    new_expression = self.current_state.expression
                    reward = -0.5
            else:
                new_expression = self.current_state.expression
                reward = -1.0
                
        elif action == "apply_base_case":
            # Apply the base case: (a + 0) = a
            new_expression = self.current_state.expression.replace("(a + 0)", "a")
            new_expression = self.current_state.expression.replace(f"({self.a} + 0)", f"{self.a}")
            reward = 1.0
            
        elif action == "increment":
            # Perform an increment operation
            # Example: (3 + 1) to 4
            try:
                parts = self.current_state.expression.split('+')
                left = parts[0].strip()
                right = parts[1].strip()
                
                # Remove parentheses if present
                if left.startswith('(') and left.endswith(')'):
                    left = left[1:-1]
                
                left_val = eval(left)
                right_val = eval(right)
                new_expression = str(left_val + right_val)
                reward = 1.0
            except:
                new_expression = self.current_state.expression
                reward = -1.0
                
        elif action == "calculate":
            # Calculate the final result
            try:
                result = eval(self.current_state.expression)
                new_expression = str(result)
                reward = 1.0
            except:
                new_expression = self.current_state.expression
                reward = -1.0
                
        elif action == "finish":
            # Finish the calculation
            new_expression = self.current_state.expression
            if new_expression.strip() == str(self.target_result):
                reward = 5.0
                self.done = True
            else:
                reward = -5.0
                
        else:
            new_expression = self.current_state.expression
            reward = -1.0
            
        # Update current state
        self.current_state = MathExpressionState(new_expression, self.step_count)
        
        # Check if we've reached the maximum number of steps
        if self.step_count >= self.max_steps:
            self.done = True
            if new_expression.strip() != str(self.target_result):
                reward -= 3.0
        
        return self.current_state, reward, self.done, info
    
    def _parse_expression(self, expression: str) -> Tuple[int, int]:
        """Parse an expression of the form 'a + b' into integers a and b."""
        try:
            parts = expression.replace('(', '').replace(')', '').split('+')
            a = int(parts[0].strip())
            b = int(parts[1].strip())
            return a, b
        except:
            return self.a, self.b
    
    def _extract_inner_expression(self, expression: str) -> Optional[str]:
        """Extract the innermost expression from a nested expression."""
        # Find the innermost parenthesized expression
        start = expression.rfind('(')
        if start == -1:
            return None
        
        # Find the matching closing parenthesis
        count = 1
        for i in range(start + 1, len(expression)):
            if expression[i] == '(':
                count += 1
            elif expression[i] == ')':
                count -= 1
                if count == 0:
                    return expression[start:i+1]
        
        return None