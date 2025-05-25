# Fullstack TypeScript Developer Programming Test
## Mathematical Proof Explanatory Chain (MPEC) - 1 Day Coding Challenge

### Overview
You are tasked with implementing a simplified version of the MPEC (Mathematical Proof Explanatory Chain) system. This system processes mathematical course content in LaTeX format and extracts knowledge graphs to create explanatory chains for mathematical calculations.

### Project Requirements

#### Technology Stack
- **Backend**: NestJS with TypeScript
- **Frontend**: Next.js with TypeScript
- **Database**: In-memory storage (no Neo4j required for this test)
- **Graph Visualization**: Any responsive graph library of your choice
- **API Integration**: Mock OpenAI API responses (no real API key needed)

### Core Functionality to Implement

#### 1. Backend API Endpoints (NestJS)

Create the following REST API endpoints:

##### POST `/api/extract-course-pattern`
- **Input**:
  ```typescript
  {
    courseContent: string; // LaTeX mathematical course content
  }
  ```
- **Output**:
  ```typescript
  {
    success: boolean;
    coursePattern: {
      entities: Array<{
        id: string;
        name: string;
        label: string;
        type: string;
        start: boolean;
        end: boolean;
      }>;
      relations: Array<{
        source: string;
        target: string;
        type: string;
        name: string;
      }>;
    };
  }
  ```

##### POST `/api/apply-pattern-to-example`
- **Input**:
  ```typescript
  {
    coursePattern: CoursePattern;
    exampleContent: string; // LaTeX math example with question and answer
  }
  ```
- **Output**:
  ```typescript
  {
    success: boolean;
    explanatoryChain: {
      entities: Entity[];
      relations: Relation[];
      steps: Array<{
        stepNumber: number;
        description: string;
        calculation: string;
        reasoning: string;
      }>;
    };
  }
  ```

##### POST `/api/solve-test-question`
- **Input**:
  ```typescript
  {
    coursePattern: CoursePattern;
    exampleContent: string;
    testQuestion: string; // LaTeX test question
  }
  ```
- **Output**:
  ```typescript
  {
    success: boolean;
    solution: {
      answer: string;
      explanatoryChain: {
        entities: Entity[];
        relations: Relation[];
        steps: Array<{
          stepNumber: number;
          description: string;
          calculation: string;
          reasoning: string;
        }>;
      };
    };
  }
  ```

#### 2. Frontend Implementation (Next.js)

Create a responsive web application with the following features:

##### Main Interface
- **Course Content Input**: Textarea for LaTeX mathematical course content
- **Example Content Input**: Textarea for math example (question + answer)
- **Test Question Input**: Textarea for test question
- **Process Button**: Trigger the three-step process
- **Results Display**: Show extracted patterns, explanatory chains, and solutions

##### Graph Visualization
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Interactive Graph**:
  - Nodes represent mathematical entities/steps
  - Edges represent relationships
  - Different colors for different entity types
  - Hover effects showing entity details
  - Zoom and pan capabilities
- **Multiple Graph Views**:
  - Course Pattern Graph
  - Example Explanatory Chain Graph
  - Test Solution Graph

##### UI/UX Requirements
- Clean, modern interface
- Loading states during API calls
- Error handling and user feedback
- Responsive layout (mobile-first approach)
- Accessibility considerations

#### 3. Mock OpenAI Integration

Since no real OpenAI API key will be provided, implement mock responses that simulate realistic mathematical analysis:

##### Mock Course Pattern Extraction
For addition-related course content, return a knowledge graph with entities like:
- "Base Case" (start node)
- "Recursive Definition"
- "Decomposition Step"
- "Increment Operation"
- "Final Result" (end node)

##### Mock Example Analysis
For math examples, generate explanatory chains that break down the solution into logical steps with mathematical reasoning.

##### Mock Test Question Solving
For test questions, provide step-by-step solutions following the established pattern.

### Sample Data

#### Sample Course Content (LaTeX)
```latex
\section{Recursive Definition}
For non-negative integers \(a\) and \(b\):
\[
    a + b = \begin{cases}
        a                 & \text{if } b = 0 \quad \text{(Base Case)}      \\
        (a + (b - 1)) + 1 & \text{if } b > 0 \quad \text{(Recursive Case)}
    \end{cases}
\]
```

#### Sample Example Content (LaTeX)
```latex
\section{Example: \( 3 + 2 \)}
\[
    \begin{aligned}
        3 + 2 & = (3 + 1) + 1 \quad       & \text{(First decomposition)}  \\
              & = ((3 + 0) + 1) + 1 \quad & \text{(Second decomposition)} \\
              & = (3 + 1) + 1 \quad       & \text{(Base case applied)}    \\
              & = 4 + 1 \quad             & \text{(First increment)}      \\
              & = 5 \quad                 & \text{(Final result)}
    \end{aligned}
\]
```

#### Sample Test Question
```latex
Calculate \( 4 + 3 \) using the recursive definition of addition.
```

### Technical Requirements

#### Backend (NestJS)
- Use TypeScript with strict mode
- Implement proper error handling
- Use DTOs for request/response validation
- Include unit tests for core services
- Follow NestJS best practices and conventions
- Use dependency injection properly

#### Frontend (Next.js)
- Use TypeScript with strict mode
- Implement responsive design with CSS-in-JS or Tailwind CSS
- Use React hooks for state management
- Implement proper error boundaries
- Include loading states and user feedback
- Follow Next.js best practices

#### Code Quality
- Clean, readable, and well-documented code
- Proper TypeScript types and interfaces
- Error handling and edge cases
- Responsive design principles
- Accessibility considerations

### Deliverables

1. **Complete Source Code**: Both backend and frontend implementations
2. **README.md**: Setup instructions and project documentation
3. **Demo**: Working application that can be run locally
4. **Tests**: Unit tests for critical functionality
5. **Documentation**: API documentation and component documentation

### Evaluation Criteria

1. **Functionality** (30%): All required features work correctly
2. **Code Quality** (25%): Clean, maintainable, and well-structured code
3. **UI/UX Design** (20%): Responsive, intuitive, and visually appealing interface
4. **Graph Visualization** (15%): Creative and effective graph representation
5. **Error Handling** (10%): Proper error handling and user feedback

### Time Allocation Suggestion

- **Backend API Development**: 3-4 hours
- **Frontend Implementation**: 3-4 hours
- **Graph Visualization**: 2-3 hours
- **Testing and Documentation**: 1-2 hours
- **Integration and Polish**: 1 hour

### Bonus Points

- Creative graph visualization features
- Advanced mathematical LaTeX parsing
- Smooth animations and transitions
- Comprehensive test coverage
- Performance optimizations
- Additional mathematical operations support

### Setup Instructions

1. Create a new NestJS project for the backend
2. Create a new Next.js project for the frontend
3. Implement the required functionality
4. Ensure both projects can run simultaneously
5. Provide clear setup and run instructions

### Submission

Please provide:
1. Complete source code in a Git repository
2. README with setup instructions
3. Brief explanation of your design decisions
4. Any additional features or improvements you implemented

### Detailed Mock Response Examples

#### Mock Course Pattern Response
```typescript
{
  success: true,
  coursePattern: {
    entities: [
      {
        id: "base_case",
        name: "Base Case: a + 0 = a",
        label: "Base Case",
        type: "axiom",
        start: true,
        end: false
      },
      {
        id: "recursive_def",
        name: "Recursive Definition",
        label: "Recursive Rule",
        type: "definition",
        start: false,
        end: false
      },
      {
        id: "decomposition",
        name: "Decomposition: a + b = (a + (b-1)) + 1",
        label: "Decomposition Step",
        type: "step",
        start: false,
        end: false
      },
      {
        id: "increment",
        name: "Increment Operation: +1",
        label: "Increment",
        type: "operation",
        start: false,
        end: false
      },
      {
        id: "final_result",
        name: "Final Result",
        label: "Result",
        type: "conclusion",
        start: false,
        end: true
      }
    ],
    relations: [
      {
        source: "base_case",
        target: "recursive_def",
        type: "grounds",
        name: "provides foundation for"
      },
      {
        source: "recursive_def",
        target: "decomposition",
        type: "enables",
        name: "enables decomposition"
      },
      {
        source: "decomposition",
        target: "increment",
        type: "requires",
        name: "requires increment"
      },
      {
        source: "increment",
        target: "final_result",
        type: "produces",
        name: "produces result"
      }
    ]
  }
}
```

#### Mock Explanatory Chain Response
```typescript
{
  success: true,
  explanatoryChain: {
    entities: [
      {
        id: "step_1",
        name: "Initial Problem: 3 + 2",
        label: "Initial State",
        type: "problem",
        start: true,
        end: false
      },
      {
        id: "step_2",
        name: "First Decomposition: (3 + 1) + 1",
        label: "Decomposition 1",
        type: "step",
        start: false,
        end: false
      },
      {
        id: "step_3",
        name: "Second Decomposition: ((3 + 0) + 1) + 1",
        label: "Decomposition 2",
        type: "step",
        start: false,
        end: false
      },
      {
        id: "step_4",
        name: "Base Case Applied: (3 + 1) + 1",
        label: "Base Case",
        type: "step",
        start: false,
        end: false
      },
      {
        id: "step_5",
        name: "Final Result: 5",
        label: "Solution",
        type: "conclusion",
        start: false,
        end: true
      }
    ],
    relations: [
      {
        source: "step_1",
        target: "step_2",
        type: "decomposes_to",
        name: "applies recursive rule"
      },
      {
        source: "step_2",
        target: "step_3",
        type: "decomposes_to",
        name: "continues decomposition"
      },
      {
        source: "step_3",
        target: "step_4",
        type: "applies",
        name: "applies base case"
      },
      {
        source: "step_4",
        target: "step_5",
        type: "evaluates_to",
        name: "evaluates to final result"
      }
    ],
    steps: [
      {
        stepNumber: 1,
        description: "Start with the initial problem",
        calculation: "3 + 2",
        reasoning: "We need to add 3 and 2 using recursive definition"
      },
      {
        stepNumber: 2,
        description: "Apply recursive rule for b > 0",
        calculation: "3 + 2 = (3 + (2-1)) + 1 = (3 + 1) + 1",
        reasoning: "Since 2 > 0, we use the recursive case: a + b = (a + (b-1)) + 1"
      },
      {
        stepNumber: 3,
        description: "Continue decomposition",
        calculation: "(3 + 1) + 1 = ((3 + (1-1)) + 1) + 1 = ((3 + 0) + 1) + 1",
        reasoning: "Apply recursive rule again since 1 > 0"
      },
      {
        stepNumber: 4,
        description: "Apply base case",
        calculation: "((3 + 0) + 1) + 1 = (3 + 1) + 1",
        reasoning: "Base case: 3 + 0 = 3, so we get (3 + 1) + 1"
      },
      {
        stepNumber: 5,
        description: "Evaluate final result",
        calculation: "(3 + 1) + 1 = 4 + 1 = 5",
        reasoning: "Perform the arithmetic to get the final answer"
      }
    ]
  }
}
```

### Additional Technical Specifications

#### Graph Visualization Requirements
- **Node Styling**: Different shapes/colors for different entity types
  - Axioms: Green circles
  - Steps: Blue rectangles
  - Operations: Orange diamonds
  - Conclusions: Red circles
- **Edge Styling**: Different line styles for different relation types
  - "grounds": Solid line
  - "enables": Dashed line
  - "requires": Dotted line
  - "produces": Bold line
- **Layout**: Force-directed layout with proper spacing
- **Interactivity**:
  - Click nodes to highlight connected paths
  - Hover for detailed information tooltips
  - Drag nodes to rearrange
  - Zoom and pan functionality

#### Error Handling Scenarios
- Invalid LaTeX input
- Empty content fields
- Network request failures
- Malformed API responses
- Graph rendering errors

#### Performance Considerations
- Debounced input for real-time processing
- Efficient graph rendering for large datasets
- Proper loading states and progress indicators
- Memory management for graph visualizations

### Project Structure Suggestions

#### Backend Structure
```
backend/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── math-analysis/
│   │   ├── math-analysis.module.ts
│   │   ├── math-analysis.controller.ts
│   │   ├── math-analysis.service.ts
│   │   └── dto/
│   │       ├── course-pattern.dto.ts
│   │       ├── example-analysis.dto.ts
│   │       └── test-solution.dto.ts
│   ├── mock-ai/
│   │   ├── mock-ai.module.ts
│   │   └── mock-ai.service.ts
│   └── common/
│       ├── interfaces/
│       └── types/
├── test/
└── package.json
```

#### Frontend Structure
```
frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── components/
│   │       ├── CourseInput.tsx
│   │       ├── ExampleInput.tsx
│   │       ├── TestInput.tsx
│   │       ├── GraphVisualization.tsx
│   │       ├── ResultsDisplay.tsx
│   │       └── LoadingSpinner.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   └── types.ts
│   └── styles/
├── public/
└── package.json
```

Good luck! We're excited to see your implementation and creativity in solving this mathematical proof analysis challenge.
