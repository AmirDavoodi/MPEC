# Pydantic schemas for structured output
from pydantic import BaseModel, Field
from typing import List


class MathStep(BaseModel):
    id: str = Field(..., description="Unique identifier for the calculation step")
    expression: str = Field(..., description="Mathematical expression at this step")
    operation: str = Field(
        ...,
        description="Operation performed (e.g., 'addition', 'substitution', 'factoring')",
    )
    is_start: bool = Field(..., description="Whether this is the starting expression")
    is_end: bool = Field(..., description="Whether this is the final result")


class MathTransition(BaseModel):
    source: str = Field(..., description="ID of the source step")
    target: str = Field(..., description="ID of the target step")
    rule: str = Field(
        ...,
        description="Mathematical rule applied (e.g., 'distributive_property', 'substitution')",
    )
    explanation: str = Field(
        ..., description="Natural language explanation of the transition"
    )


class CalculationGraph(BaseModel):
    steps: List[MathStep] = Field(..., description="List of calculation steps")
    transitions: List[MathTransition] = Field(
        ..., description="List of transitions between steps"
    )


class Entity(BaseModel):
    id: str
    name: str
    label: str = None
    type: str = None


class Relation(BaseModel):
    source: str
    target: str
    name: str
    type: str = None


class Triplet(BaseModel):
    entities: List[Entity]
    relations: List[Relation]
