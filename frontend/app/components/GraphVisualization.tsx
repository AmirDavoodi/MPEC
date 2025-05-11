"use client";

import { useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

interface Node {
  id: string;
  name: string;
  label: string;
  type: string;
  color?: string;
  start?: boolean;
  end?: boolean;
  x?: number;
  y?: number;
  [key: string]: unknown; // Allow additional properties required by ForceGraph
}

interface Link {
  source: string;
  target: string;
  type: string;
  label: string;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

interface Neo4jPath {
  p: {
    start: {
      identity: {
        low: number;
        high: number;
      };
      labels: string[];
      properties: {
        name: string;
        label: string;
        color?: string;
        start?: boolean;
        end?: boolean;
        x?: number;
        y?: number;
      };
    };
    end: {
      identity: {
        low: number;
        high: number;
      };
      labels: string[];
      properties: {
        name: string;
        label: string;
        color?: string;
        start?: boolean;
        end?: boolean;
        x?: number;
        y?: number;
      };
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

interface GraphVisualizationProps {
  data: Neo4jPath[] | any; // Allow for different data formats
}

export default function GraphVisualization({ data }: GraphVisualizationProps) {
  // Using any type for now as the ForceGraph2D ref type is not easily accessible
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphRef = useRef<any>(null);

  // Transform the Neo4j response into a format that react-force-graph can use
  const transformData = useCallback((paths: any): GraphData => {
    console.log("Received paths:", JSON.stringify(paths, null, 2));
    
    // Handle case when we receive visualization queries instead of path data
    if (!Array.isArray(paths) && paths.coursePattern) {
      // Create a simple demo graph when we only have queries
      return {
        nodes: [
          { id: "1", name: "Start", label: "Start", type: "step", color: "#4CAF50", start: true },
          { id: "2", name: "End", label: "End", type: "step", color: "#F44336", end: true }
        ],
        links: [
          { source: "1", target: "2", type: "leads_to", label: "Leads to" }
        ]
      };
    }
    
    const nodes = new Map<string, Node>();
    const links: Link[] = [];

    // Only process paths if it's an array
    if (Array.isArray(paths)) {
      paths.forEach((path) => {
        const startNode = path.p.start;
        const endNode = path.p.end;
        const relationship = path.p.segments[0].relationship;

        // Convert Neo4j ID to string
        const startId = typeof startNode.identity === 'string' 
          ? startNode.identity 
          : startNode.identity.low.toString();
          
        const endId = typeof endNode.identity === 'string'
          ? endNode.identity
          : endNode.identity.low.toString();

        // Add start node if not already present
        if (!nodes.has(startId)) {
          nodes.set(startId, {
            id: startId,
            name: startNode.properties.name,
            label: startNode.properties.label,
            type: startNode.labels[0],
            color: startNode.properties.color,
            start: startNode.properties.start,
            end: startNode.properties.end,
            x: startNode.properties.x,
            y: startNode.properties.y,
          });
        }

        // Add end node if not already present
        if (!nodes.has(endId)) {
          nodes.set(endId, {
            id: endId,
            name: endNode.properties.name,
            label: endNode.properties.label,
            type: endNode.labels[0],
            color: endNode.properties.color,
            start: endNode.properties.start,
            end: endNode.properties.end,
            x: endNode.properties.x,
            y: endNode.properties.y,
          });
        }

        // Add link
        links.push({
          source: startId,
          target: endId,
          type: relationship.type,
          label: relationship.properties.label,
        });
      });
    }

    const result = {
      nodes: Array.from(nodes.values()),
      links,
    };

    console.log("Transformed graph data:", JSON.stringify(result, null, 2));
    return result;
  }, []);

  const graphData = transformData(data);
  console.log("Final graph data:", JSON.stringify(graphData, null, 2));

  useEffect(() => {
    if (graphRef.current) {
      // Center the graph and set initial zoom
      graphRef.current.centerAt(0, 0, 1000);
      graphRef.current.zoom(1.5, 1000);
    }
  }, [graphData]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "400px",
        maxHeight: "600px",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        width={800}
        height={500}
        nodeLabel="name"
        linkLabel={(link: unknown) => {
          const l = link as Link;
          return l.label;
        }}
        linkColor={() => "#999"}
        linkWidth={2}
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.2}
        linkCanvasObjectMode={() => "after"}
        linkCanvasObject={(
          link: unknown,
          ctx: CanvasRenderingContext2D,
          globalScale: number
        ) => {
          const l = link as Link;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#666";

          // Get the source and target nodes from the graph data
          const sourceNode = graphData.nodes.find((n) => n.id === l.source);
          const targetNode = graphData.nodes.find((n) => n.id === l.target);

          if (sourceNode && targetNode) {
            // Calculate the midpoint of the link
            const midX = (sourceNode.x! + targetNode.x!) / 2;
            const midY = (sourceNode.y! + targetNode.y!) / 2;

            // Draw a background for better visibility
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            const textWidth = ctx.measureText(l.label).width;
            const padding = 4;
            ctx.fillRect(
              midX - textWidth / 2 - padding,
              midY - fontSize / 2 - padding,
              textWidth + padding * 2,
              fontSize + padding * 2
            );

            // Draw the label
            ctx.fillStyle = "#666";
            ctx.fillText(l.label, midX, midY);
          }
        }}
        nodeColor={(node: unknown) => (node as Node).color || "#1f77b4"}
        nodeCanvasObject={(
          node: unknown,
          ctx: CanvasRenderingContext2D,
          globalScale: number
        ) => {
          const n = node as Node;
          const label = n.label;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = n.color || "#1f77b4";
          ctx.beginPath();
          ctx.arc(n.x!, n.y!, 5, 0, 2 * Math.PI);
          ctx.fill();
          ctx.fillStyle = "#000";
          ctx.fillText(label, n.x!, n.y! + 10);
        }}
        cooldownTicks={100}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
        warmupTicks={50}
      />
    </div>
  );
}
