# Pydantic schemas for structured output
from pydantic import BaseModel
from typing import List


class Entity(BaseModel):
    id: str
    name: str
    label: str
    type: str  # e.g., "axiom", "lemma", "conclusion"


class Relation(BaseModel):
    source: str
    target: str
    type: str  # e.g., "grounds", "explains"
    name: str


class Triplet(BaseModel):
    entities: List[Entity]
    relations: List[Relation]
