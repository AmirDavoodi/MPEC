# Customized prompts for LLM
TRIPLET_EXTRACTION_PROMPT = """
Extract entities and relations from the following LaTeX proof. Return the output in JSON format.

LaTeX Proof:
{proof}

Entities should include axioms, lemmas, and conclusions. Relations should describe connections between them, such as "grounds" or "explains".
"""
