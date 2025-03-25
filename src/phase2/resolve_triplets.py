# Main script for triplet resolution
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from .schemas import Triplet
from .clustering import cluster_entities
import json


def resolve_triplets(triplet: Triplet) -> Triplet:
    # Cluster entities
    labels = cluster_entities(triplet.entities)
    # Resolve using LLM
    llm = ChatOpenAI(model="gpt-4")
    messages = [
        SystemMessage(
            content="You are a helpful assistant that resolves entities and relations into a DAG."
        ),
        HumanMessage(
            content=RESOLUTION_PROMPT.format(
                entities=triplet.entities, relations=triplet.relations
            )
        ),
    ]
    response = llm(messages)
    return Triplet(**json.loads(response.content))
