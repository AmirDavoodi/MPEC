# Test Examples and Mock Data for MPEC Programming Test

## Additional LaTeX Course Content Examples

### 1. Multiplication Course Content
```latex
\section{Recursive Definition of Multiplication}
For non-negative integers \(a\) and \(b\):
\[
    a \times b = \begin{cases}
        0                     & \text{if } b = 0 \quad \text{(Base Case)}      \\
        a + (a \times (b-1))  & \text{if } b > 0 \quad \text{(Recursive Case)}
    \end{cases}
\]

\section{Explanation}
Multiplication is defined as repeated addition:
\begin{itemize}
    \item Base case: Any number multiplied by 0 equals 0
    \item Recursive case: \(a \times b\) equals \(a\) added to \(a \times (b-1)\)
\end{itemize}
```

### 2. Subtraction Course Content
```latex
\section{Recursive Definition of Subtraction}
For non-negative integers \(a\) and \(b\) where \(a \geq b\):
\[
    a - b = \begin{cases}
        a                     & \text{if } b = 0 \quad \text{(Base Case)}      \\
        (a - 1) - (b - 1)     & \text{if } b > 0 \quad \text{(Recursive Case)}
    \end{cases}
\]
```

## Additional Example Problems

### 1. Multiplication Example
```latex
\section{Example: \( 4 \times 3 \)}
\[
    \begin{aligned}
        4 \times 3 & = 4 + (4 \times 2) \quad       & \text{(First decomposition)}  \\
                   & = 4 + (4 + (4 \times 1)) \quad & \text{(Second decomposition)} \\
                   & = 4 + (4 + (4 + (4 \times 0))) \quad & \text{(Third decomposition)} \\
                   & = 4 + (4 + (4 + 0)) \quad      & \text{(Base case applied)}    \\
                   & = 4 + (4 + 4) \quad            & \text{(Simplification)}       \\
                   & = 4 + 8 \quad                  & \text{(Addition)}              \\
                   & = 12 \quad                     & \text{(Final result)}
    \end{aligned}
\]
```

### 2. Subtraction Example
```latex
\section{Example: \( 7 - 3 \)}
\[
    \begin{aligned}
        7 - 3 & = (7-1) - (3-1) \quad & \text{(First decomposition)}  \\
              & = 6 - 2 \quad         & \text{(Simplification)}       \\
              & = (6-1) - (2-1) \quad & \text{(Second decomposition)} \\
              & = 5 - 1 \quad         & \text{(Simplification)}       \\
              & = (5-1) - (1-1) \quad & \text{(Third decomposition)}  \\
              & = 4 - 0 \quad         & \text{(Simplification)}       \\
              & = 4 \quad             & \text{(Base case applied)}
    \end{aligned}
\]
```

## Test Questions for Different Operations

### Addition Test Questions
1. `Calculate \( 5 + 4 \) using the recursive definition.`
2. `Show all steps for \( 2 + 6 \) using recursive addition.`
3. `Prove that \( 1 + 1 = 2 \) using the recursive definition.`

### Multiplication Test Questions
1. `Calculate \( 3 \times 4 \) using the recursive definition.`
2. `Show all steps for \( 2 \times 5 \) using recursive multiplication.`
3. `Demonstrate \( 6 \times 2 \) step by step.`

### Subtraction Test Questions
1. `Calculate \( 8 - 3 \) using the recursive definition.`
2. `Show all steps for \( 10 - 4 \) using recursive subtraction.`
3. `Demonstrate \( 5 - 2 \) step by step.`

## Mock API Response Templates

### Mock Course Pattern for Multiplication
```typescript
{
  success: true,
  coursePattern: {
    entities: [
      {
        id: "mult_base_case",
        name: "Base Case: a × 0 = 0",
        label: "Multiplication Base",
        type: "axiom",
        start: true,
        end: false
      },
      {
        id: "mult_recursive_def",
        name: "Recursive Definition: a × b = a + (a × (b-1))",
        label: "Multiplication Rule",
        type: "definition",
        start: false,
        end: false
      },
      {
        id: "addition_step",
        name: "Addition Step: a + previous_result",
        label: "Addition Operation",
        type: "operation",
        start: false,
        end: false
      },
      {
        id: "mult_result",
        name: "Multiplication Result",
        label: "Final Product",
        type: "conclusion",
        start: false,
        end: true
      }
    ],
    relations: [
      {
        source: "mult_base_case",
        target: "mult_recursive_def",
        type: "grounds",
        name: "provides foundation for"
      },
      {
        source: "mult_recursive_def",
        target: "addition_step",
        type: "requires",
        name: "requires addition"
      },
      {
        source: "addition_step",
        target: "mult_result",
        type: "produces",
        name: "accumulates to result"
      }
    ]
  }
}
```

### Mock Test Solution for Addition
```typescript
{
  success: true,
  solution: {
    answer: "9",
    explanatoryChain: {
      entities: [
        {
          id: "problem_5_4",
          name: "Problem: 5 + 4",
          label: "Initial Problem",
          type: "problem",
          start: true,
          end: false
        },
        {
          id: "decomp_1",
          name: "First Decomposition: (5 + 3) + 1",
          label: "Step 1",
          type: "step",
          start: false,
          end: false
        },
        {
          id: "decomp_2",
          name: "Second Decomposition: ((5 + 2) + 1) + 1",
          label: "Step 2",
          type: "step",
          start: false,
          end: false
        },
        {
          id: "decomp_3",
          name: "Third Decomposition: (((5 + 1) + 1) + 1) + 1",
          label: "Step 3",
          type: "step",
          start: false,
          end: false
        },
        {
          id: "decomp_4",
          name: "Fourth Decomposition: ((((5 + 0) + 1) + 1) + 1) + 1",
          label: "Step 4",
          type: "step",
          start: false,
          end: false
        },
        {
          id: "base_applied",
          name: "Base Case Applied: (((5 + 1) + 1) + 1) + 1",
          label: "Base Case",
          type: "step",
          start: false,
          end: false
        },
        {
          id: "final_calc",
          name: "Final Calculation: 9",
          label: "Result",
          type: "conclusion",
          start: false,
          end: true
        }
      ],
      relations: [
        {
          source: "problem_5_4",
          target: "decomp_1",
          type: "decomposes_to",
          name: "applies recursive rule"
        },
        {
          source: "decomp_1",
          target: "decomp_2",
          type: "decomposes_to",
          name: "continues decomposition"
        },
        {
          source: "decomp_2",
          target: "decomp_3",
          type: "decomposes_to",
          name: "continues decomposition"
        },
        {
          source: "decomp_3",
          target: "decomp_4",
          type: "decomposes_to",
          name: "continues decomposition"
        },
        {
          source: "decomp_4",
          target: "base_applied",
          type: "applies",
          name: "applies base case"
        },
        {
          source: "base_applied",
          target: "final_calc",
          type: "evaluates_to",
          name: "evaluates to result"
        }
      ],
      steps: [
        {
          stepNumber: 1,
          description: "Start with the problem 5 + 4",
          calculation: "5 + 4",
          reasoning: "We need to add 5 and 4 using the recursive definition"
        },
        {
          stepNumber: 2,
          description: "Apply recursive rule: 5 + 4 = (5 + 3) + 1",
          calculation: "5 + 4 = (5 + 3) + 1",
          reasoning: "Since 4 > 0, we use a + b = (a + (b-1)) + 1"
        },
        {
          stepNumber: 3,
          description: "Continue: (5 + 3) + 1 = ((5 + 2) + 1) + 1",
          calculation: "(5 + 3) + 1 = ((5 + 2) + 1) + 1",
          reasoning: "Apply recursive rule to 5 + 3"
        },
        {
          stepNumber: 4,
          description: "Continue: ((5 + 2) + 1) + 1 = (((5 + 1) + 1) + 1) + 1",
          calculation: "((5 + 2) + 1) + 1 = (((5 + 1) + 1) + 1) + 1",
          reasoning: "Apply recursive rule to 5 + 2"
        },
        {
          stepNumber: 5,
          description: "Continue: (((5 + 1) + 1) + 1) + 1 = ((((5 + 0) + 1) + 1) + 1) + 1",
          calculation: "(((5 + 1) + 1) + 1) + 1 = ((((5 + 0) + 1) + 1) + 1) + 1",
          reasoning: "Apply recursive rule to 5 + 1"
        },
        {
          stepNumber: 6,
          description: "Apply base case: 5 + 0 = 5",
          calculation: "((((5 + 0) + 1) + 1) + 1) + 1 = (((5 + 1) + 1) + 1) + 1",
          reasoning: "Base case: any number plus 0 equals itself"
        },
        {
          stepNumber: 7,
          description: "Evaluate: (((5 + 1) + 1) + 1) + 1 = 9",
          calculation: "(((6) + 1) + 1) + 1 = ((7) + 1) + 1 = (8) + 1 = 9",
          reasoning: "Perform the arithmetic operations from inside out"
        }
      ]
    }
  }
}
```

## Graph Visualization Test Cases

### Small Graph (3-5 nodes)
- Test basic rendering
- Test node positioning
- Test edge connections

### Medium Graph (6-10 nodes)
- Test layout algorithms
- Test performance
- Test interactivity

### Large Graph (11+ nodes)
- Test scalability
- Test zoom/pan functionality
- Test node clustering

## Error Handling Test Cases

### Invalid LaTeX Input
```latex
\invalid{command}
\begin{nonexistent}
content without proper structure
```

### Empty Inputs
- Empty course content
- Empty example content
- Empty test question

### Malformed API Responses
- Missing required fields
- Invalid entity/relation structures
- Network timeouts

## Performance Test Scenarios

### Large Mathematical Content
- Course content with 50+ mathematical expressions
- Complex nested LaTeX structures
- Multiple theorem proofs

### Rapid Input Changes
- Fast typing in input fields
- Quick switching between different examples
- Rapid API calls

### Memory Management
- Multiple graph renderings
- Large datasets
- Browser resource usage

## Accessibility Test Cases

### Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate buttons
- Arrow keys for graph navigation

### Screen Reader Support
- Proper ARIA labels
- Descriptive text for mathematical content
- Graph structure description

### Visual Accessibility
- High contrast mode support
- Font size adjustments
- Color blind friendly color schemes
