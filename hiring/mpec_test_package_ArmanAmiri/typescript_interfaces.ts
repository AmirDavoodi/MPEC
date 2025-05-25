/**
 * TypeScript Interfaces for MPEC Programming Test
 * 
 * These interfaces define the data structures used throughout the application.
 * Use these as a reference for implementing your backend and frontend.
 */

// ============================================================================
// Core Entity and Relation Types
// ============================================================================

/**
 * Represents a mathematical entity in the knowledge graph
 */
export interface Entity {
  /** Unique identifier for the entity */
  id: string;
  /** Full name or description of the entity */
  name: string;
  /** Short label for display purposes */
  label: string;
  /** Type of mathematical entity */
  type: 'axiom' | 'definition' | 'step' | 'operation' | 'conclusion' | 'problem';
  /** Whether this entity is a starting point in the graph */
  start: boolean;
  /** Whether this entity is an ending point in the graph */
  end: boolean;
}

/**
 * Represents a relationship between two entities
 */
export interface Relation {
  /** ID of the source entity */
  source: string;
  /** ID of the target entity */
  target: string;
  /** Type of relationship */
  type: 'grounds' | 'enables' | 'requires' | 'produces' | 'decomposes_to' | 'applies' | 'evaluates_to';
  /** Human-readable description of the relationship */
  name: string;
}

/**
 * Represents a step in the explanatory chain
 */
export interface ExplanatoryStep {
  /** Step number in the sequence */
  stepNumber: number;
  /** Description of what happens in this step */
  description: string;
  /** The mathematical calculation performed */
  calculation: string;
  /** Reasoning behind this step */
  reasoning: string;
}

/**
 * Complete knowledge graph structure
 */
export interface KnowledgeGraph {
  /** List of entities in the graph */
  entities: Entity[];
  /** List of relations between entities */
  relations: Relation[];
}

/**
 * Extended knowledge graph with explanatory steps
 */
export interface ExplanatoryChain extends KnowledgeGraph {
  /** Ordered list of explanatory steps */
  steps: ExplanatoryStep[];
}

// ============================================================================
// API Request/Response Types
// ============================================================================

/**
 * Request to extract course pattern from LaTeX content
 */
export interface ExtractCoursePatternRequest {
  /** LaTeX mathematical course content */
  courseContent: string;
}

/**
 * Response from course pattern extraction
 */
export interface ExtractCoursePatternResponse {
  /** Whether the extraction was successful */
  success: boolean;
  /** Extracted course pattern as knowledge graph */
  coursePattern: KnowledgeGraph;
  /** Optional error message if success is false */
  error?: string;
}

/**
 * Request to apply pattern to example content
 */
export interface ApplyPatternToExampleRequest {
  /** Previously extracted course pattern */
  coursePattern: KnowledgeGraph;
  /** LaTeX example content with question and answer */
  exampleContent: string;
}

/**
 * Response from applying pattern to example
 */
export interface ApplyPatternToExampleResponse {
  /** Whether the application was successful */
  success: boolean;
  /** Generated explanatory chain */
  explanatoryChain: ExplanatoryChain;
  /** Optional error message if success is false */
  error?: string;
}

/**
 * Request to solve test question
 */
export interface SolveTestQuestionRequest {
  /** Previously extracted course pattern */
  coursePattern: KnowledgeGraph;
  /** Example content used for learning */
  exampleContent: string;
  /** Test question to solve */
  testQuestion: string;
}

/**
 * Response from solving test question
 */
export interface SolveTestQuestionResponse {
  /** Whether the solving was successful */
  success: boolean;
  /** Complete solution with answer and explanation */
  solution: {
    /** Final answer to the test question */
    answer: string;
    /** Explanatory chain showing how the answer was derived */
    explanatoryChain: ExplanatoryChain;
  };
  /** Optional error message if success is false */
  error?: string;
}

// ============================================================================
// Frontend Component Props
// ============================================================================

/**
 * Props for the main application component
 */
export interface AppProps {
  /** Initial course content (optional) */
  initialCourseContent?: string;
  /** Initial example content (optional) */
  initialExampleContent?: string;
  /** Initial test question (optional) */
  initialTestQuestion?: string;
}

/**
 * Props for the course input component
 */
export interface CourseInputProps {
  /** Current course content value */
  value: string;
  /** Callback when content changes */
  onChange: (content: string) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
}

/**
 * Props for the example input component
 */
export interface ExampleInputProps {
  /** Current example content value */
  value: string;
  /** Callback when content changes */
  onChange: (content: string) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
}

/**
 * Props for the test input component
 */
export interface TestInputProps {
  /** Current test question value */
  value: string;
  /** Callback when content changes */
  onChange: (question: string) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
}

/**
 * Props for the graph visualization component
 */
export interface GraphVisualizationProps {
  /** Knowledge graph data to visualize */
  data: KnowledgeGraph;
  /** Width of the visualization container */
  width?: number;
  /** Height of the visualization container */
  height?: number;
  /** Callback when a node is clicked */
  onNodeClick?: (entity: Entity) => void;
  /** Callback when an edge is clicked */
  onEdgeClick?: (relation: Relation) => void;
  /** Whether to show node labels */
  showLabels?: boolean;
  /** Whether to enable zoom and pan */
  enableZoom?: boolean;
}

/**
 * Props for the results display component
 */
export interface ResultsDisplayProps {
  /** Course pattern result */
  coursePattern?: KnowledgeGraph;
  /** Example analysis result */
  explanatoryChain?: ExplanatoryChain;
  /** Test solution result */
  testSolution?: {
    answer: string;
    explanatoryChain: ExplanatoryChain;
  };
  /** Loading states for each section */
  loading?: {
    coursePattern?: boolean;
    example?: boolean;
    test?: boolean;
  };
  /** Error states for each section */
  errors?: {
    coursePattern?: string;
    example?: string;
    test?: string;
  };
}

/**
 * Props for the loading spinner component
 */
export interface LoadingSpinnerProps {
  /** Size of the spinner */
  size?: 'small' | 'medium' | 'large';
  /** Loading message to display */
  message?: string;
  /** Whether to show the spinner */
  visible?: boolean;
}

// ============================================================================
// Application State Types
// ============================================================================

/**
 * Main application state
 */
export interface AppState {
  /** Current course content */
  courseContent: string;
  /** Current example content */
  exampleContent: string;
  /** Current test question */
  testQuestion: string;
  /** Extracted course pattern */
  coursePattern: KnowledgeGraph | null;
  /** Generated explanatory chain */
  explanatoryChain: ExplanatoryChain | null;
  /** Test solution */
  testSolution: {
    answer: string;
    explanatoryChain: ExplanatoryChain;
  } | null;
  /** Loading states */
  loading: {
    coursePattern: boolean;
    example: boolean;
    test: boolean;
  };
  /** Error states */
  errors: {
    coursePattern: string | null;
    example: string | null;
    test: string | null;
  };
}

/**
 * Actions for state management
 */
export type AppAction =
  | { type: 'SET_COURSE_CONTENT'; payload: string }
  | { type: 'SET_EXAMPLE_CONTENT'; payload: string }
  | { type: 'SET_TEST_QUESTION'; payload: string }
  | { type: 'SET_LOADING'; payload: { section: keyof AppState['loading']; loading: boolean } }
  | { type: 'SET_ERROR'; payload: { section: keyof AppState['errors']; error: string | null } }
  | { type: 'SET_COURSE_PATTERN'; payload: KnowledgeGraph }
  | { type: 'SET_EXPLANATORY_CHAIN'; payload: ExplanatoryChain }
  | { type: 'SET_TEST_SOLUTION'; payload: { answer: string; explanatoryChain: ExplanatoryChain } }
  | { type: 'RESET_STATE' };

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Configuration for graph visualization styling
 */
export interface GraphVisualizationConfig {
  /** Node styling configuration */
  nodes: {
    /** Default node size */
    defaultSize: number;
    /** Color mapping for different entity types */
    colors: Record<Entity['type'], string>;
    /** Shape mapping for different entity types */
    shapes: Record<Entity['type'], 'circle' | 'rectangle' | 'diamond'>;
  };
  /** Edge styling configuration */
  edges: {
    /** Default edge width */
    defaultWidth: number;
    /** Color mapping for different relation types */
    colors: Record<Relation['type'], string>;
    /** Style mapping for different relation types */
    styles: Record<Relation['type'], 'solid' | 'dashed' | 'dotted'>;
  };
  /** Layout configuration */
  layout: {
    /** Force strength for node repulsion */
    repulsion: number;
    /** Force strength for link attraction */
    attraction: number;
    /** Gravity strength */
    gravity: number;
  };
}

/**
 * API client configuration
 */
export interface ApiClientConfig {
  /** Base URL for the API */
  baseUrl: string;
  /** Request timeout in milliseconds */
  timeout: number;
  /** Default headers to include with requests */
  headers: Record<string, string>;
}

/**
 * Mock data configuration for development
 */
export interface MockDataConfig {
  /** Whether to use mock data instead of real API calls */
  enabled: boolean;
  /** Delay to simulate network latency (in milliseconds) */
  delay: number;
  /** Probability of simulating errors (0-1) */
  errorRate: number;
}
