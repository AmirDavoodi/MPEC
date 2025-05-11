"use client";

import { useState } from "react";
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
  const [graphData, setGraphData] = useState<Neo4jPath[] | null>(null);
  const [courseTriplets, setCourseTriplets] = useState(null);

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
      setGraphData(data.visualizationQueries);
      setCourseTriplets(data.coursePattern);
    } catch (error: unknown) {
      console.error("Error extracting course pattern:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      alert(`Error extracting course pattern: ${errorMessage}`);
    }
  };

  const handleApplyPatternToProof = async () => {
    if (!courseTriplets) {
      alert("Please extract course pattern first");
      return;
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
      setGraphData(data.visualizationQueries);
    } catch (error: unknown) {
      console.error("Error applying pattern to proof:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      alert(`Error applying pattern to proof: ${errorMessage}`);
    }
  };

  return (
    <main className="main">
      <div className="visualization">
        <h2>Graph Visualization</h2>
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
            disabled={!courseTriplets}
          >
            Apply Pattern to Proof
          </button>
        </div>
      </div>
    </main>
  );
}
