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

  const handleProcess = async () => {
    try {
      console.log("Sending request to:", `${API_URL}/process`);
      console.log("Request body:", { courseContent, proofContent });

      const response = await fetch(`${API_URL}/process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseContent,
          proofContent,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();
      console.log(
        "Received response from backend:",
        JSON.stringify(data, null, 2)
      );
      setGraphData(data);
    } catch (error: unknown) {
      console.error("Error processing content:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      alert(`Error processing content: ${errorMessage}`);
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
        </div>
        <div>
          <h2>Proof Content (LaTeX)</h2>
          <textarea
            className="textarea"
            value={proofContent}
            onChange={(e) => setProofContent(e.target.value)}
            placeholder="Enter proof content in LaTeX format..."
          />
        </div>
        <button className="button" onClick={handleProcess}>
          Process Content
        </button>
      </div>
    </main>
  );
}
