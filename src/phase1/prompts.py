# Customized prompts for LLM
TRIPLET_EXTRACTION_PROMPT = """
Extract entities and relations from the following LaTeX proof. Return the output in JSON format.

LaTeX Proof:
{proof}

Entities should include axioms, lemmas, and conclusions. Relations should describe connections between them, such as "grounds" or "explains".
"""

HIGH_LEVEL_TRIPLET_EXTRACTION_PROMPT = """
Given the following LaTeX proof, extract a very high-level abstract graph as triplets.
Group detailed steps into broad concepts.
Output triplets in the form: <Source Entity, Relationship, Target Entity>

Proof:
{proof}
"""

MID_LEVEL_TRIPLET_EXTRACTION_PROMPT = """
Given the following LaTeX proof, extract an intermediate-level graph as triplets.
Capture key steps and their relations.
Output triplets in the form: <Source Entity, Relationship, Target Entity>

Proof:
{proof}
"""

FINE_GRAINED_TRIPLET_EXTRACTION_PROMPT = """
Given the following LaTeX proof, extract a detailed graph as triplets.
Include all relevant entities, equations, and their relations.
Output triplets in the form: <Source Entity, Relationship, Target Entity>

Proof:
{proof}
"""

CALCULATION_GRAPH_EXTRACTION_PROMPT = """
Extract a detailed step-by-step calculation graph from the following mathematical proof.
For each step, identify the mathematical expression, the operation performed, and whether it's a starting or final step.
For each transition between steps, identify the mathematical rule applied and provide a brief explanation.

Mathematical Proof:
{proof}
"""

CALCULATION_GRAPH_SYSTEM_MESSAGE = "You are a mathematical assistant that extracts calculation steps and transitions from mathematical proofs."
