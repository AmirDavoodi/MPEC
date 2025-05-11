"use client";

import { useState, useEffect } from "react";
import { API_URL } from "../src/config";
import GraphVisualization from "./components/GraphVisualization";

interface Neo4jPath {
  p: {
    start: {
      identity: string;
      properties: {
        name: string;
        label: string;
        color?: string;
        start?: boolean;
        end?: boolean;
        x?: number;
        y?: number;
      };
      labels: string[];
    };
    end: {
      identity: string;
      properties: {
        name: string;
        label: string;
        color?: string;
        start?: boolean;
        end?: boolean;
        x?: number;
        y?: number;
      };
      labels: string[];
    };
    segments: {
      relationship: {
        type: string;
        properties: {
          label: string;
        };
      };
    }[];
  };
}

export default function Home() {
  const [courseContent, setCourseContent] = useState("");
  const [proofContent, setProofContent] = useState("");
  const [testContent, setTestContent] = useState("");
  const [graphData, setGraphData] = useState<Neo4jPath[] | null>(null);
  const [courseTriplets, setCourseTriplets] = useState(null);
  const [proofTriplets, setProofTriplets] = useState(null);

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
    } catch (error) {
      console.error("Error loading triplets from localStorage:", error);
    }
  }, []);

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
      
      // Instead of passing visualization queries, pass the actual course pattern
      setGraphData(data.coursePattern);
      setCourseTriplets(data.coursePattern);
      
      // Save course triplets to localStorage
      localStorage.setItem('courseTriplets', JSON.stringify(data.coursePattern));
      console.log("Course triplets saved to localStorage");
      
    } catch (error: unknown) {
      console.error("Error extracting course pattern:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      alert(`Error extracting course pattern: ${errorMessage}`);
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
          // If not in localStorage either, show error
          alert("Please extract course pattern first");
          return;
        }
      } catch (error) {
        console.error("Error loading triplets from localStorage:", error);
        alert("Error loading course pattern. Please extract course pattern first.");
        return;
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
      
      // Instead of passing visualization queries, pass the actual proof triplets
      setGraphData(data.proofTriplets);
      setProofTriplets(data.proofTriplets);
      
      // Save proof triplets to localStorage
      localStorage.setItem('proofTriplets', JSON.stringify(data.proofTriplets));
      console.log("Proof triplets saved to localStorage");
      
    } catch (error: unknown) {
      console.error("Error applying pattern to proof:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      alert(`Error applying pattern to proof: ${errorMessage}`);
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
          alert("Please extract course pattern first");
          return;
        }
      } catch (error) {
        console.error("Error loading course triplets from localStorage:", error);
        alert("Error loading course pattern. Please extract course pattern first.");
        return;
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
          alert("Please apply pattern to proof first");
          return;
        }
      } catch (error) {
        console.error("Error loading proof triplets from localStorage:", error);
        alert("Error loading proof triplets. Please apply pattern to proof first.");
        return;
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
      
      // Instead of passing visualization queries, pass the actual test triplets
      setGraphData(data.testTriplets);
    } catch (error: unknown) {
      console.error("Error testing content:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      alert(`Error testing content: ${errorMessage}`);
    }
  };

  return (
    <main className="main">
      <div className="visualization">
        <h2>Graph Visualization</h2>
        <div className="graph-container">
          {graphData ? (
            <GraphVisualization data={graphData as any} />
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
            disabled={!courseTriplets}
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
            disabled={!courseTriplets || !proofTriplets}
          >
            Test Content
          </button>
        </div>
      </div>
    </main>
  );
}
