# Quick Reference - MPEC Test

## API Endpoints to Implement

### 1. Extract Course Pattern
```
POST /api/extract-course-pattern
Body: { courseContent: string }
Response: { success: boolean, coursePattern: KnowledgeGraph }
```

### 2. Apply Pattern to Example
```
POST /api/apply-pattern-to-example
Body: { coursePattern: KnowledgeGraph, exampleContent: string }
Response: { success: boolean, explanatoryChain: ExplanatoryChain }
```

### 3. Solve Test Question
```
POST /api/solve-test-question
Body: { coursePattern: KnowledgeGraph, exampleContent: string, testQuestion: string }
Response: { success: boolean, solution: { answer: string, explanatoryChain: ExplanatoryChain } }
```

## Entity Types
- `axiom`: Base cases and fundamental rules
- `definition`: Recursive definitions
- `step`: Individual calculation steps
- `operation`: Mathematical operations
- `conclusion`: Final results
- `problem`: Initial problems

## Relation Types
- `grounds`: Provides foundation for
- `enables`: Makes possible
- `requires`: Needs as prerequisite
- `produces`: Creates as result
- `decomposes_to`: Breaks down into
- `applies`: Uses a rule or case
- `evaluates_to`: Calculates to

## Sample LaTeX Input
```latex
\section{Recursive Definition}
For non-negative integers \(a\) and \(b\):
\[
    a + b = \begin{cases}
        a                 & \text{if } b = 0 \\
        (a + (b - 1)) + 1 & \text{if } b > 0
    \end{cases}
\]
```

## Time Allocation Suggestion
- Backend API: 3-4 hours
- Frontend: 3-4 hours  
- Graph Visualization: 2-3 hours
- Testing & Docs: 1-2 hours
- Polish: 1 hour

**Total: ~8 hours (1 day)**
