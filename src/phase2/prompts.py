# Customized prompts for LLM
RESOLUTION_PROMPT = """
Resolve the following entities and relations into a directed acyclic graph (DAG).

Entities:
{entities}

Relations:
{relations}

Return the resolved graph in JSON format.
"""
