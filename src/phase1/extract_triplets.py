# Main script for triplet extraction
from langchain.chat_models import init_chat_model
from langchain.schema import HumanMessage, SystemMessage
from langchain.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field
from langchain.output_parsers import PydanticOutputParser

from configs.settings import (
    OPENAI_API_KEY,
    OPENAI_LLM_MODEL,
    OPENAI_LLM_TEMPERATURE,
    OPENAI_MODEL_PROVIDER,
)
from .schemas import Triplet
from .prompts import TRIPLET_EXTRACTION_PROMPT


def extract_triplets(
    proof: str, custom_prompt: str = TRIPLET_EXTRACTION_PROMPT
) -> Triplet:
    # Initialize the LLM
    llm = init_chat_model(
        model=OPENAI_LLM_MODEL,
        model_provider=OPENAI_MODEL_PROVIDER,
        temperature=OPENAI_LLM_TEMPERATURE,
        api_key=OPENAI_API_KEY,
    )

    # Define the prompt
    prompt = ChatPromptTemplate.from_messages(
        [
            SystemMessage(
                content="You are a helpful assistant that extracts entities and relations from mathematical proofs."
            ),
            HumanMessage(content=custom_prompt.format(proof=proof)),
        ]
    )

    # Format the prompt into a list of BaseMessages
    formatted_prompt = prompt.format_messages(proof=proof)

    # Use with_structured_output to enforce the Triplet schema
    structured_llm = llm.with_structured_output(Triplet)

    # Invoke the LLM with the formatted prompt
    triplet = structured_llm.invoke(formatted_prompt)

    return triplet
