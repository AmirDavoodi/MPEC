#!/bin/bash

# Script to prepare candidate package for distribution
# Usage: ./prepare_candidate_package.sh [candidate_name]

CANDIDATE_NAME=${1:-"candidate"}
PACKAGE_DIR="mpec_test_package_${CANDIDATE_NAME}"

echo "📦 Preparing MPEC Programming Test package for: $CANDIDATE_NAME"

# Create package directory
echo "📁 Creating package directory..."
mkdir -p "$PACKAGE_DIR"

# Copy candidate files
echo "📋 Copying candidate materials..."

# Check if PDF exists, if not try to generate it
if [ ! -f "programming_test_instructions.pdf" ]; then
    echo "📄 PDF not found, attempting to generate..."
    ./generate_pdf.sh
fi

# Copy main instruction files
if [ -f "programming_test_instructions.pdf" ]; then
    cp programming_test_instructions.pdf "$PACKAGE_DIR/"
    echo "  ✅ Main instructions (PDF)"
else
    echo "  ⚠️  Warning: PDF instructions not available"
    echo "  📝 Copying markdown version instead..."
    cp FULLSTACK_PROGRAMMING_TEST.md "$PACKAGE_DIR/programming_test_instructions.md"
fi

# Copy reference materials
cp sample_latex_content.md "$PACKAGE_DIR/"
echo "  ✅ Sample LaTeX content"

cp mock_api_responses.json "$PACKAGE_DIR/"
echo "  ✅ Mock API responses"

cp typescript_interfaces.ts "$PACKAGE_DIR/"
echo "  ✅ TypeScript interfaces"

# Create a candidate-specific README
cat > "$PACKAGE_DIR/README.md" << EOF
# MPEC Programming Test - Candidate Package

Welcome to the MPEC (Mathematical Proof Explanatory Chain) programming test!

## 📋 Your Task

Implement a fullstack TypeScript application that processes mathematical content and creates knowledge graphs with explanatory chains.

## 📁 Package Contents

- **\`programming_test_instructions.pdf\`** - Main test instructions and requirements
- **\`sample_latex_content.md\`** - Sample LaTeX mathematical content to work with
- **\`mock_api_responses.json\`** - Mock API responses for your backend implementation
- **\`typescript_interfaces.ts\`** - TypeScript interface definitions
- **\`README.md\`** - This file

## 🚀 Quick Start

1. **Read the Instructions**: Start with the PDF instructions document
2. **Review Sample Content**: Check the sample LaTeX content and mock responses
3. **Set Up Projects**: Create NestJS backend and Next.js frontend projects
4. **Implement Features**: Follow the three-step workflow described in the instructions
5. **Test and Document**: Ensure everything works and write clear setup instructions

## 🎯 What You'll Build

- **Backend API**: 3 REST endpoints with mock OpenAI integration
- **Frontend Interface**: Responsive web app with graph visualization
- **Core Workflow**: Course pattern extraction → Example analysis → Test solving

## 💡 Key Points

- **No OpenAI API Key Required**: Use the provided mock responses
- **No Database Setup**: Use in-memory storage
- **Focus on Core Features**: Get the main workflow working first
- **Be Creative**: Show your skills in graph visualization and UI design

## 📊 Evaluation Focus

- Functionality (30%): All features work correctly
- Code Quality (25%): Clean, well-structured TypeScript
- UI/UX Design (20%): Responsive, intuitive interface
- Graph Visualization (15%): Creative and effective
- Technical Implementation (10%): Error handling, testing, docs

## 📞 Questions?

If you have any questions about the requirements, please contact the hiring team.

## 📝 Submission

When complete, provide:
- Complete source code (backend + frontend)
- README with setup instructions
- Brief explanation of your design decisions
- Any additional features you implemented

---

**Good luck! We're excited to see your implementation.**

*Generated on: $(date)*
*Candidate: $CANDIDATE_NAME*
EOF

echo "  ✅ Candidate README created"

# Create a quick reference card
cat > "$PACKAGE_DIR/QUICK_REFERENCE.md" << EOF
# Quick Reference - MPEC Test

## API Endpoints to Implement

### 1. Extract Course Pattern
\`\`\`
POST /api/extract-course-pattern
Body: { courseContent: string }
Response: { success: boolean, coursePattern: KnowledgeGraph }
\`\`\`

### 2. Apply Pattern to Example
\`\`\`
POST /api/apply-pattern-to-example
Body: { coursePattern: KnowledgeGraph, exampleContent: string }
Response: { success: boolean, explanatoryChain: ExplanatoryChain }
\`\`\`

### 3. Solve Test Question
\`\`\`
POST /api/solve-test-question
Body: { coursePattern: KnowledgeGraph, exampleContent: string, testQuestion: string }
Response: { success: boolean, solution: { answer: string, explanatoryChain: ExplanatoryChain } }
\`\`\`

## Entity Types
- \`axiom\`: Base cases and fundamental rules
- \`definition\`: Recursive definitions
- \`step\`: Individual calculation steps
- \`operation\`: Mathematical operations
- \`conclusion\`: Final results
- \`problem\`: Initial problems

## Relation Types
- \`grounds\`: Provides foundation for
- \`enables\`: Makes possible
- \`requires\`: Needs as prerequisite
- \`produces\`: Creates as result
- \`decomposes_to\`: Breaks down into
- \`applies\`: Uses a rule or case
- \`evaluates_to\`: Calculates to

## Sample LaTeX Input
\`\`\`latex
\\section{Recursive Definition}
For non-negative integers \\(a\\) and \\(b\\):
\\[
    a + b = \\begin{cases}
        a                 & \\text{if } b = 0 \\\\
        (a + (b - 1)) + 1 & \\text{if } b > 0
    \\end{cases}
\\]
\`\`\`

## Time Allocation Suggestion
- Backend API: 3-4 hours
- Frontend: 3-4 hours  
- Graph Visualization: 2-3 hours
- Testing & Docs: 1-2 hours
- Polish: 1 hour

**Total: ~8 hours (1 day)**
EOF

echo "  ✅ Quick reference created"

# Create package archive
echo "📦 Creating package archive..."
tar -czf "${PACKAGE_DIR}.tar.gz" "$PACKAGE_DIR"
zip -r "${PACKAGE_DIR}.zip" "$PACKAGE_DIR" > /dev/null 2>&1

echo ""
echo "✅ Package prepared successfully!"
echo ""
echo "📁 Package directory: $PACKAGE_DIR/"
echo "📦 Archives created:"
echo "  - ${PACKAGE_DIR}.tar.gz"
echo "  - ${PACKAGE_DIR}.zip"
echo ""
echo "📋 Package contents:"
ls -la "$PACKAGE_DIR/"
echo ""
echo "🎯 Ready to send to candidate: $CANDIDATE_NAME"
echo ""
echo "💡 Next steps:"
echo "1. Review the package contents"
echo "2. Send the archive to the candidate"
echo "3. Use EVALUATION_RUBRIC.md for assessment when they submit"

# Optional: Open the package directory
if command -v open &> /dev/null; then
    echo ""
    read -p "📂 Open package directory? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        open "$PACKAGE_DIR"
    fi
elif command -v xdg-open &> /dev/null; then
    echo ""
    read -p "📂 Open package directory? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        xdg-open "$PACKAGE_DIR"
    fi
fi

echo ""
echo "✨ Package preparation complete!"
