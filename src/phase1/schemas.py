# Pydantic schemas for structured output
from pydantic import BaseModel, Field
from typing import List


class Entity(BaseModel):
    id: str = Field(..., description="Unique identifier for the entity")
    name: str = Field(..., description="Name or text representation of the entity")
    label: str = Field(..., description="Label or short descriptor for the entity")
    type: str = Field(
        ...,
        description="Type of mathematical entity (e.g., 'axiom', 'lemma', 'conclusion')",
    )
    start: bool = Field(..., description="Whether the entity is the start of the proof")
    end: bool = Field(..., description="Whether the entity is the end of the proof")


class Relation(BaseModel):
    source: str = Field(..., description="ID of the source entity")
    target: str = Field(..., description="ID of the target entity")
    type: str = Field(
        ...,
        description="Type of relation between entities (e.g., 'grounds', 'explains')",
    )
    name: str = Field(..., description="Name or description of the relation")


class Triplet(BaseModel):
    entities: List[Entity] = Field(..., description="List of extracted entities")
    relations: List[Relation] = Field(
        ..., description="List of relations between entities"
    )
