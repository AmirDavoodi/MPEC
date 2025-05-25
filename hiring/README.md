# MPEC Programming Test - Hiring Package

This directory contains all the materials needed for the fullstack TypeScript developer programming test.

## 📁 Files Overview

### Core Test Documents
- **`programming_test_instructions.tex`** - LaTeX source for the professional PDF instructions
- **`FULLSTACK_PROGRAMMING_TEST.md`** - Complete test requirements and specifications
- **`EVALUATION_RUBRIC.md`** - Detailed scoring criteria and evaluation guidelines

### Reference Materials for Candidates
- **`sample_latex_content.md`** - Sample LaTeX mathematical content and examples
- **`mock_api_responses.json`** - Complete mock API responses for development
- **`typescript_interfaces.ts`** - TypeScript interface definitions
- **`TEST_EXAMPLES_AND_MOCK_DATA.md`** - Extended examples and test cases

## 🎯 How to Use This Package

### For Hiring Managers

1. **Generate PDF Instructions**:
   ```bash
   cd hiring
   pdflatex programming_test_instructions.tex
   ```

2. **Send to Candidates**:
   - `programming_test_instructions.pdf` (generated from .tex file)
   - `sample_latex_content.md`
   - `mock_api_responses.json`
   - `typescript_interfaces.ts`

3. **Evaluation**:
   - Use `EVALUATION_RUBRIC.md` for consistent scoring
   - Reference `FULLSTACK_PROGRAMMING_TEST.md` for detailed requirements

### For Candidates

You will receive:
- **PDF Instructions** - Main test document with overview and requirements
- **Sample Content** - LaTeX examples to work with
- **Mock API Responses** - JSON responses to implement in your mock service
- **TypeScript Interfaces** - Type definitions for your implementation

## 📋 Test Summary

### What Candidates Will Build
A simplified MPEC (Mathematical Proof Explanatory Chain) system with:

1. **Backend (NestJS)**:
   - 3 REST API endpoints
   - Mock OpenAI integration
   - TypeScript with proper typing
   - Error handling and validation

2. **Frontend (Next.js)**:
   - Responsive web interface
   - Interactive graph visualization
   - Real-time processing workflow
   - Modern UI/UX design

3. **Core Workflow**:
   - Extract patterns from LaTeX course content
   - Apply patterns to math examples
   - Solve test questions with explanatory chains

### Technology Stack
- **Backend**: NestJS + TypeScript
- **Frontend**: Next.js + TypeScript + React
- **Visualization**: Any graph library (D3.js, vis.js, react-force-graph, etc.)
- **Storage**: In-memory (no database required)
- **AI**: Mock responses (no API key needed)

## 🎨 Sample Mathematical Content

### Course Content Example
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

### Expected Knowledge Graph
- **Entities**: Base Case, Recursive Rule, Decomposition, Increment, Result
- **Relations**: grounds, enables, requires, produces
- **Visualization**: Interactive graph with different node types and edge styles

## 📊 Evaluation Criteria

| Category | Weight | Focus Areas |
|----------|--------|-------------|
| **Functionality** | 30% | API endpoints, core features, workflow |
| **Code Quality** | 25% | TypeScript usage, structure, error handling |
| **UI/UX Design** | 20% | Responsive design, user experience |
| **Graph Visualization** | 15% | Creativity, interactivity, effectiveness |
| **Technical Implementation** | 10% | Performance, testing, documentation |

### Scoring Scale
- **A+ (95-110)**: Exceptional work with bonus features
- **A (90-94)**: Excellent work meeting all requirements
- **B+ (85-89)**: Very good work with minor issues
- **B (80-84)**: Good work meeting basic requirements
- **C+ (75-79)**: Satisfactory work with some gaps
- **Below C+**: Needs improvement

## 🚀 Quick Start for Candidates

1. **Setup Projects**:
   ```bash
   # Backend
   npx @nestjs/cli new mpec-backend
   cd mpec-backend
   npm install
   
   # Frontend
   npx create-next-app@latest mpec-frontend --typescript
   cd mpec-frontend
   npm install
   ```

2. **Implement Core Features**:
   - Backend API endpoints with mock responses
   - Frontend interface with graph visualization
   - Integration between frontend and backend

3. **Test and Document**:
   - Ensure both projects run simultaneously
   - Write clear setup instructions
   - Include basic tests

## 💡 Tips for Success

### For Candidates
- **Start Simple**: Get basic functionality working first
- **Use Mock Data**: Focus on implementation, not AI integration
- **Be Creative**: Show your skills in graph visualization
- **Document Well**: Clear README and code comments
- **Test Thoroughly**: Ensure everything works as expected

### For Evaluators
- **Focus on Core Skills**: TypeScript, React, NestJS proficiency
- **Assess Problem-Solving**: How they approach the mathematical content processing
- **Evaluate Creativity**: Graph visualization and UI design choices
- **Check Code Quality**: Structure, typing, error handling
- **Consider Time Constraints**: This is a 1-day challenge

## 🔧 Technical Requirements

### Must Have
- ✅ TypeScript with strict mode
- ✅ All three API endpoints working
- ✅ Responsive frontend interface
- ✅ Graph visualization component
- ✅ Error handling and loading states
- ✅ Clear setup instructions

### Nice to Have
- 🌟 Advanced graph interactions
- 🌟 Additional mathematical operations
- 🌟 Comprehensive testing
- 🌟 Performance optimizations
- 🌟 Accessibility features

## 📞 Support

For questions about the test:
- Review the detailed requirements in `FULLSTACK_PROGRAMMING_TEST.md`
- Check the sample content and mock responses
- Refer to the TypeScript interfaces for data structures

## 📝 Submission Checklist

Candidates should provide:
- [ ] Complete source code (backend + frontend)
- [ ] README.md with setup instructions
- [ ] Working demo that runs locally
- [ ] Brief explanation of design decisions
- [ ] Any additional features implemented

---

**Good luck to all candidates! We're excited to see your implementations of the MPEC system.**
