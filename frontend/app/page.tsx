"use client";

import { useState, useEffect } from "react";
import GraphVisualization from "./components/GraphVisualization";
import { ToastContainer, showErrorToast, showSuccessToast } from './components/SimpleToast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Function to merge triplets with different colors for each source
const mergeTriplets = (triplets: Record<string, any>) => {
  const mergedTriplets = {
    entities: [] as any[],
    relations: [] as any[]
  };
  
  // Color mapping for different triplet sources
  const colorMap = {
    course: "#4CAF50", // Green for course pattern
    proof: "#2196F3",  // Blue for proof triplets
    test: "#FF9800"    // Orange for test triplets
  };
  
  // Process each triplet source
  Object.entries(triplets).forEach(([source, triplet]) => {
    if (!triplet || !triplet.entities || !triplet.relations) return;
    
    // Add prefix to IDs to avoid conflicts
    const prefix = source + "_";
    
    // Add entities with source-specific color
    const baseColor = colorMap[source as keyof typeof colorMap] || "#9C27B0";
    
    // Map entities with prefixed IDs and source-specific properties
    const entities = triplet.entities.map((entity: any) => ({
      ...entity,
      id: prefix + entity.id,
      originalId: entity.id, // Keep original ID for reference
      color: entity.color || (entity.start ? baseColor : entity.end ? baseColor : baseColor),
      source: source // Add source information
    }));
    
    // Map relations with prefixed source/target IDs
    const relations = triplet.relations.map((relation: any) => ({
      ...relation,
      source: prefix + relation.source,
      target: prefix + relation.target,
      originalSource: relation.source, // Keep original source for reference
      originalTarget: relation.target, // Keep original target for reference
      color: baseColor,
      source_type: source // Add source information
    }));
    
    mergedTriplets.entities.push(...entities);
    mergedTriplets.relations.push(...relations);
  });
  
  return mergedTriplets;
};

export default function Home() {
  const [courseContent, setCourseContent] = useState("");
  const [proofContent, setProofContent] = useState("");
  const [testContent, setTestContent] = useState("");
  const [graphData, setGraphData] = useState<any | null>(null);
  const [courseTriplets, setCourseTriplets] = useState<any>(null);
  const [proofTriplets, setProofTriplets] = useState<any>(null);
  const [testTriplets, setTestTriplets] = useState<any>(null);
  const [showCombinedGraph, setShowCombinedGraph] = useState(false);

  // Load saved triplets from localStorage on component mount
  useEffect(() => {
    try {
      const savedCourseTriplets = localStorage.getItem('courseTriplets');
      if (savedCourseTriplets) {
        const parsedTriplets = JSON.parse(savedCourseTriplets);
        setCourseTriplets(parsedTriplets);
        console.log("Loaded course triplets from localStorage");
      }
      
      const savedProofTriplets = localStorage.getItem('proofTriplets');
      if (savedProofTriplets) {
        const parsedTriplets = JSON.parse(savedProofTriplets);
        setProofTriplets(parsedTriplets);
        console.log("Loaded proof triplets from localStorage");
      }
      
      const savedTestTriplets = localStorage.getItem('testTriplets');
      if (savedTestTriplets) {
        const parsedTriplets = JSON.parse(savedTestTriplets);
        setTestTriplets(parsedTriplets);
        console.log("Loaded test triplets from localStorage");
      }
    } catch (error) {
      console.error("Error loading triplets from localStorage:", error);
    }
  }, []);
  
  // Update graph data when triplets change or combined view is toggled
  useEffect(() => {
    if (showCombinedGraph) {
      // Merge all available triplets
      const tripletsToMerge: Record<string, any> = {};
      if (courseTriplets) tripletsToMerge.course = courseTriplets;
      if (proofTriplets) tripletsToMerge.proof = proofTriplets;
      if (testTriplets) tripletsToMerge.test = testTriplets;
      
      if (Object.keys(tripletsToMerge).length > 0) {
        const mergedData = mergeTriplets(tripletsToMerge);
        setGraphData(mergedData);
      }
    }
  }, [courseTriplets, proofTriplets, testTriplets, showCombinedGraph]);

  // Toggle between combined view and single view
  const toggleCombinedView = () => {
    setShowCombinedGraph(prev => !prev);
  };

  const handleExtractCoursePattern = async () => {
    try {
      console.log("Sending request to:", `${API_URL}/extract-course-pattern`);
      
      const response = await fetch(`${API_URL}/extract-course-pattern`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseContent,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Received course pattern:", JSON.stringify(data, null, 2));
      
      // Set course triplets in state
      setCourseTriplets(data.coursePattern);
      
      // Save course triplets to localStorage
      localStorage.setItem('courseTriplets', JSON.stringify(data.coursePattern));
      console.log("Course triplets saved to localStorage");
      
      // If not in combined view, show only course triplets
      if (!showCombinedGraph) {
        setGraphData(data.coursePattern);
      }
      
      // Show success toast
      showSuccessToast("Course pattern extracted successfully!");
    } catch (error: unknown) {
      console.error("Error extracting course pattern:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      showErrorToast(`Error extracting course pattern: ${errorMessage}`);
    }
  };

  const handleApplyPatternToProof = async () => {
    // First check if courseTriplets is already in state
    if (!courseTriplets) {
      // If not in state, try to load from localStorage
      try {
        const savedCourseTriplets = localStorage.getItem('courseTriplets');
        if (savedCourseTriplets) {
          // Parse and set the course triplets
          const parsedTriplets = JSON.parse(savedCourseTriplets);
          setCourseTriplets(parsedTriplets);
          console.log("Loaded course triplets from localStorage");
        } else {
          // If not in localStorage either, show error but don't disable button
          showErrorToast("Please extract course pattern first");
          return; // Return early to prevent API call
        }
      } catch (error) {
        console.error("Error loading triplets from localStorage:", error);
        showErrorToast("Error loading course pattern. Please extract course pattern first.");
        return; // Return early to prevent API call
      }
    }

    try {
      console.log("Sending request to:", `${API_URL}/apply-pattern-to-proof`);
      
      const response = await fetch(`${API_URL}/apply-pattern-to-proof`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proofContent,
          coursePattern: courseTriplets,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Received proof triplets:", JSON.stringify(data, null, 2));
      
      // Set proof triplets in state
      setProofTriplets(data.proofTriplets);
      
      // Save proof triplets to localStorage
      localStorage.setItem('proofTriplets', JSON.stringify(data.proofTriplets));
      console.log("Proof triplets saved to localStorage");
      
      // If not in combined view, show only proof triplets
      if (!showCombinedGraph) {
        setGraphData(data.proofTriplets);
      }
      
      // Show success toast
      showSuccessToast("Pattern applied to proof successfully!");
    } catch (error: unknown) {
      console.error("Error applying pattern to proof:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      showErrorToast(`Error applying pattern to proof: ${errorMessage}`);
    }
  };

  const handleTestContent = async () => {
    // Check if courseTriplets and proofTriplets exist in state
    let currentCourseTriplets = courseTriplets;
    let currentProofTriplets = proofTriplets;
    
    // If courseTriplets not in state, try to load from localStorage
    if (!currentCourseTriplets) {
      try {
        const savedCourseTriplets = localStorage.getItem('courseTriplets');
        if (savedCourseTriplets) {
          currentCourseTriplets = JSON.parse(savedCourseTriplets);
          setCourseTriplets(currentCourseTriplets);
          console.log("Loaded course triplets from localStorage");
        } else {
          showErrorToast("Please extract course pattern first");
          return; // Return early to prevent API call
        }
      } catch (error) {
        console.error("Error loading course triplets from localStorage:", error);
        showErrorToast("Error loading course pattern. Please extract course pattern first.");
        return; // Return early to prevent API call
      }
    }
    
    // If proofTriplets not in state, try to load from localStorage
    if (!currentProofTriplets) {
      try {
        const savedProofTriplets = localStorage.getItem('proofTriplets');
        if (savedProofTriplets) {
          currentProofTriplets = JSON.parse(savedProofTriplets);
          setProofTriplets(currentProofTriplets);
          console.log("Loaded proof triplets from localStorage");
        } else {
          showErrorToast("Please apply pattern to proof first");
          return; // Return early to prevent API call
        }
      } catch (error) {
        console.error("Error loading proof triplets from localStorage:", error);
        showErrorToast("Error loading proof triplets. Please apply pattern to proof first.");
        return; // Return early to prevent API call
      }
    }

    try {
      console.log("Sending request to:", `${API_URL}/test-content`);
      
      const response = await fetch(`${API_URL}/test-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testContent,
          coursePattern: currentCourseTriplets,
          proofTriplets: currentProofTriplets,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Received test triplets:", JSON.stringify(data, null, 2));
      
      // Save test triplets to localStorage
      localStorage.setItem('testTriplets', JSON.stringify(data.testTriplets));
      console.log("Test triplets saved to localStorage");
      
      // Set test triplets in state
      setTestTriplets(data.testTriplets);
      
      // If not in combined view, show only test triplets
      if (!showCombinedGraph) {
        setGraphData(data.testTriplets);
      }
      
      // Show success toast
      showSuccessToast("Test content processed successfully!");
    } catch (error: unknown) {
      console.error("Error testing content:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      showErrorToast(`Error testing content: ${errorMessage}`);
    }
  };

  return (
    <main className="main">
      {/* Add ToastContainer at the bottom of your component */}
      <ToastContainer position="bottom-center" />
      
      <div className="visualization">
        <div className="visualization-header">
          <h2>Graph Visualization</h2>
          <button 
            className={`button ${showCombinedGraph ? 'active' : ''}`} 
            onClick={toggleCombinedView}
            disabled={!courseTriplets && !proofTriplets && !testTriplets}
          >
            {showCombinedGraph ? 'Show Individual Graphs' : 'Show Combined Graph'}
          </button>
        </div>
        <div className="graph-container">
          {graphData ? (
            <GraphVisualization data={graphData} />
          ) : (
            <p>No graph data available</p>
          )}
        </div>
      </div>
      <div className="content">
        <div>
          <h2>Course Content (LaTeX)</h2>
          <textarea
            className="textarea"
            value={courseContent}
            onChange={(e) => setCourseContent(e.target.value)}
            placeholder="Enter course content in LaTeX format..."
          />
          <button className="button" onClick={handleExtractCoursePattern}>
            Extract Course Pattern
          </button>
        </div>
        <div>
          <h2>Proof Content (LaTeX)</h2>
          <textarea
            className="textarea"
            value={proofContent}
            onChange={(e) => setProofContent(e.target.value)}
            placeholder="Enter proof content in LaTeX format..."
          />
          <button 
            className="button" 
            onClick={handleApplyPatternToProof}
            // Remove the disabled attribute so the button is always clickable
          >
            Apply Pattern to Proof
          </button>
        </div>
        <div>
          <h2>Test Content (LaTeX)</h2>
          <textarea
            className="textarea"
            value={testContent}
            onChange={(e) => setTestContent(e.target.value)}
            placeholder="Enter test content in LaTeX format..."
          />
          <button 
            className="button" 
            onClick={handleTestContent}
            // Remove the disabled attribute so the button is always clickable
          >
            Test Content
          </button>
        </div>
      </div>
    </main>
  );
}
