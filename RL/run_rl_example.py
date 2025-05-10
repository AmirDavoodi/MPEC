#!/usr/bin/env python3
"""
Run the RL agent to solve an addition problem and store the result in Neo4j.
"""

import os
import sys

# Add the parent directory to the path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import directly from the same directory
from run_example import main

if __name__ == "__main__":
    print("Starting RL example for addition via recursion...")
    main()
    print("RL example completed.")
