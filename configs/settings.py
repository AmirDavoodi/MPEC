import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_LLM_MODEL = os.getenv("OPENAI_LLM_MODEL", "gpt-4o-mini")
OPENAI_MODEL_PROVIDER = os.getenv("OPENAI_MODEL_PROVIDER", "openai")
OPENAI_LLM_TEMPERATURE = float(os.getenv("OPENAI_LLM_TEMPERATURE", 0.0))
