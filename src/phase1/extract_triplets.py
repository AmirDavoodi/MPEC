# Main script for triplet extraction
from langchain.chat_models import init_chat_model
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from langchain.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field
from langchain.output_parsers import PydanticOutputParser

from configs.settings import OPENAI_API_KEY, OPENAI_LLM_MODEL, OPENAI_LLM_TEMPERATURE
from .schemas import Triplet, CalculationGraph
from .prompts import (
    TRIPLET_EXTRACTION_PROMPT,
    CALCULATION_GRAPH_EXTRACTION_PROMPT,
    CALCULATION_GRAPH_SYSTEM_MESSAGE,
)


def extract_triplets(
    custom_prompt: str = TRIPLET_EXTRACTION_PROMPT,
    system_message: str = "You are a helpful assistant that extracts entities and relations from mathematical proofs.",
) -> Triplet:
    # Initialize the LLM
    llm = ChatOpenAI(
        model_name=OPENAI_LLM_MODEL,
        temperature=OPENAI_LLM_TEMPERATURE,
        openai_api_key=OPENAI_API_KEY,
    )

    # Format the custom prompt with the proof content
    # formatted_custom_prompt = custom_prompt.format(proof=proof)
    formatted_custom_prompt = custom_prompt

    # Define the prompt
    prompt = ChatPromptTemplate.from_messages(
        [
            SystemMessage(content=system_message),
            HumanMessage(content=formatted_custom_prompt),
        ]
    )

    # Format the prompt into a list of BaseMessages
    formatted_prompt = prompt.format_messages()

    print(formatted_prompt)

    # Use with_structured_output to enforce the Triplet schema
    structured_llm = llm.with_structured_output(Triplet)

    # Invoke the LLM with the formatted prompt
    triplet = structured_llm.invoke(formatted_prompt)

    return triplet


def extract_calculation_graph(
    custom_prompt: str = CALCULATION_GRAPH_EXTRACTION_PROMPT,
    system_message: str = CALCULATION_GRAPH_SYSTEM_MESSAGE,
) -> CalculationGraph:
    # Initialize the LLM
    llm = ChatOpenAI(
        model_name=OPENAI_LLM_MODEL,
        temperature=OPENAI_LLM_TEMPERATURE,
        openai_api_key=OPENAI_API_KEY,
    )

    # Define the prompt
    prompt = ChatPromptTemplate.from_messages(
        [
            SystemMessage(content=system_message),
            HumanMessage(content=custom_prompt),
        ]
    )

    # Format the prompt into a list of BaseMessages
    formatted_prompt = prompt.format_messages()

    print(formatted_prompt)

    # Use with_structured_output to enforce the CalculationGraph schema
    structured_llm = llm.with_structured_output(CalculationGraph)

    # Invoke the LLM with the formatted prompt
    calculation_graph = structured_llm.invoke(formatted_prompt)

    return calculation_graph
