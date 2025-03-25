# Helper functions for file I/O
import os


def read_proof(file_path: str) -> str:
    """
    Reads a LaTeX proof file and returns its content as a string.

    Args:
        file_path (str): Path to the LaTeX proof file.

    Returns:
        str: Content of the LaTeX proof file.
    """
    adjusted_path = os.path.join("..", file_path)
    if not os.path.exists(adjusted_path):
        raise FileNotFoundError(f"File not found: {adjusted_path}")

    with open(adjusted_path, "r", encoding="utf-8") as file:
        content = file.read()

    return content
