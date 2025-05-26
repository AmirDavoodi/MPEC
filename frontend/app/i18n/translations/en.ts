// English translations
export const en = {
  // Page title
  title: 'Graph Visualization',
  
  // Graph visualization section
  graphVisualization: {
    title: 'Graph Visualization',
    combinedGraphButton: {
      showCombined: 'Show Combined Graph',
      showIndividual: 'Show Individual Graphs'
    },
    noData: 'No graph data available',
    layout: {
      force: 'Force Layout',
      radial: 'Radial Layout',
      resetZoom: 'Reset Zoom'
    },
    legend: {
      title: 'Legend',
      coursePattern: 'Course Pattern',
      proof: 'Proof',
      test: 'Test'
    }
  },
  
  // Content sections
  content: {
    course: {
      title: 'Course Content (LaTeX)',
      placeholder: 'Enter course content in LaTeX format...',
      extractPattern: 'Extract Course Pattern'
    },
    proof: {
      title: 'Proof Content (LaTeX)',
      placeholder: 'Enter proof content in LaTeX format...',
      applyPattern: 'Apply Pattern to Proof'
    },
    test: {
      title: 'Test Content (LaTeX)',
      placeholder: 'Enter test content in LaTeX format...',
      processTest: 'Test Content'
    }
  },
  
  // Toast messages
  toast: {
    success: {
      coursePattern: 'Course pattern extracted successfully!',
      patternApplied: 'Pattern applied to proof successfully!',
      testProcessed: 'Test content processed successfully!'
    },
    error: {
      coursePattern: 'Error extracting course pattern:',
      patternApplication: 'Error applying pattern to proof:',
      testProcessing: 'Error testing content:',
      loadCourse: 'Error loading course pattern. Please extract course pattern first.',
      loadProof: 'Error loading proof triplets. Please apply pattern to proof first.',
      default: 'An unknown error occurred'
    },
    noCoursePattern: 'Please extract course pattern first',
    noProofTriplets: 'Please apply pattern to proof first'
  }
};