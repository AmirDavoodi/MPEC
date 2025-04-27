# Main script for triplet extraction
from langchain.chat_models import init_chat_model
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from langchain.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field
from langchain.output_parsers import PydanticOutputParser

from configs.settings import OPENAI_API_KEY, OPENAI_LLM_MODEL, OPENAI_LLM_TEMPERATURE
from .schemas import Triplet
from .prompts import TRIPLET_EXTRACTION_PROMPT


def extract_triplets(
    proof: str,
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
    formatted_custom_prompt = custom_prompt.format(proof=proof)

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
