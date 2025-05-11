/**
 * Prompt templates for OpenAI API
 */

/**
 * Basic triplet extraction prompt
 */
export const TRIPLET_EXTRACTION_PROMPT = `
Extract entities and relations from the following LaTeX proof. Return the output in JSON format.

LaTeX Proof:
{proof}

Entities should include axioms, lemmas, and conclusions. Relations should describe connections between them, such as "grounds" or "explains".
`;

/**
 * High-level triplet extraction prompt
 */
export const HIGH_LEVEL_TRIPLET_EXTRACTION_PROMPT = `
Given the following LaTeX proof, extract a very high-level abstract graph as triplets.
Group detailed steps into broad concepts.
Output triplets in the form: <Source Entity, Relationship, Target Entity>

Proof:
{proof}
`;

/**
 * Mid-level triplet extraction prompt
 */
export const MID_LEVEL_TRIPLET_EXTRACTION_PROMPT = `
Given the following LaTeX proof, extract an intermediate-level graph as triplets.
Capture key steps and their relations.
Output triplets in the form: <Source Entity, Relationship, Target Entity>

Proof:
{proof}
`;

/**
 * Fine-grained triplet extraction prompt
 */
export const FINE_GRAINED_TRIPLET_EXTRACTION_PROMPT = `
Given the following LaTeX proof, extract a detailed graph as triplets.
Include all relevant entities, equations, and their relations.
Output triplets in the form: <Source Entity, Relationship, Target Entity>

Proof:
{proof}
`;

/**
 * Course pattern extraction prompt
 */
export const COURSE_PATTERN_PROMPT = `
Given the following mathematic course content in LaTeX format, extract the key steps of the mathematical proof in minimum steps and structure that form the knowledge graph triplets as the pattern of mathematical proofs for this course.

Focus on identifying:
1. The core steps of mathematical proof
2. The relationships between these proof steps
3. The typical structure and flow of mathematical proofs of this type
4. Key steps and their relationships
5. The entities and relationships in the proof
6. The final triplets of the knowledge graph should have a single or multiple start and single or multiple end nodes/entities which are the steps in the proof. Please make sure the final graph is a single connected component and have label of the start and end nodes/entities.

Extract triplets in the form <Source Step/Entity, Relationship, Target Step/Entity> that represent this pattern.

Course Content:
{proof}
`;

/**
 * Proof pattern application prompt
 */
export const PROOF_PATTERN_APPLICATION_PROMPT = `
Given the following mathematical proof and the given pattern of mathematical proof extracted from the course, construct a knowledge graph that follows the given pattern.

The pattern components are:
{course_pattern}

For the given proof, extract triplets in the form <Source Entity, Relationship, Target Entity> that:
1. Follow the structure of mathematical proof pattern
2. Map to the steps identified in the course pattern
3. Capture the specific details and relationships in this proof which may be different from the course pattern

Proof:
{proof}
`;

/**
 * Resolution prompt for Phase 2
 */
export const RESOLUTION_PROMPT = `
Resolve the following entities and relations into a directed acyclic graph (DAG).

Entities:
{entities}

Relations:
{relations}

Return the resolved graph in JSON format.
`;

/**
 * System message for triplet extraction
 */
export const TRIPLET_EXTRACTION_SYSTEM_MESSAGE =
  'You are a helpful assistant that extracts entities and relations from mathematical proofs.';

/**
 * System message for course pattern extraction
 */
export const COURSE_PATTERN_SYSTEM_MESSAGE =
  'You are an expert in mathematical proof analysis, specializing in extracting structured knowledge graph from mathematical texts. Your task is to identify key steps in a mathematical proof and relationships in mathematical content and represent them as knowledge graph triplets.';

/**
 * System message for triplet resolution
 */
export const RESOLUTION_SYSTEM_MESSAGE =
  'You are a helpful assistant that resolves entities and relations into a DAG.';

/**
 * Test content application prompt
 */
export const TEST_CONTENT_APPLICATION_PROMPT = `
Given the following:
1. A course pattern that defines the general structure of proofs in this domain
2. A proof triplet that shows how the pattern was applied to a specific proof
3. A new test content in LaTeX format

Your task is to analyze the test content and extract triplets that follow the same pattern as the proof triplet.
Compare the test content with the proof triplet to identify corresponding steps and relationships.

Course Pattern:
{coursePattern}

Proof Triplet:
{proofTriplet}

Test Content:
{testContent}

Return the extracted triplets in JSON format with entities and relations.
`;
