"use client";

import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';

interface GraphData {
  entities: Array<{
    id: string;
    name: string;
    type: string;
    color?: string;
    source?: string;
    originalId?: string;
  }>;
  relations: Array<{
    source: string;
    target: string;
    type: string;
    label: string;
    color?: string;
    source_type?: string;
  }>;
}

interface Props {
  data: GraphData;
}

export default function GraphVisualization({ data }: Props) {
  const { lang } = useLanguage();
  const t = translations[lang];
  
  // Using any type for now as the ForceGraph2D ref type is not easily accessible
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState(true);
  const [layout, setLayout] = React.useState('force');

  // Transform the Neo4j response into a format that react-force-graph can use
  const transformData = React.useCallback((data: any): GraphData => {
    console.log("Received data:", JSON.stringify(data, null, 2));
    
    // Handle case when we receive visualization queries instead of path data
    if (!Array.isArray(data) && data.coursePattern) {
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
    
    // Handle case when we receive triplet data directly
    if (!Array.isArray(data) && data.entities && data.relations) {
      const nodes = data.entities.map((entity: any) => ({
        id: entity.id,
        name: entity.name,
        label: entity.label,
        type: entity.type,
        color: entity.color || (entity.start ? "#4CAF50" : entity.end ? "#F44336" : "#1f77b4"),
        start: entity.start,
        end: entity.end
      }));
      
      const links = data.relations.map((relation: any) => ({
        source: relation.source,
        target: relation.target,
        type: relation.type,
        label: relation.name
      }));
      
      return { nodes, links };
    }
    
    // Original code for handling Neo4j path data
    const nodes = new Map<string, Node>();
    const links: Link[] = [];

    // Only process paths if it's an array
    if (Array.isArray(data)) {
      data.forEach((path) => {
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

  const resetZoom = () => {
    if (graphRef.current) {
      graphRef.current.centerAt(0, 0, 1000);
      graphRef.current.zoom(1.5, 1000);
    }
  };

  return (
    <div className="graph-visualization">
      <div className="controls">
        <button onClick={() => setLayout('force')}>{t.graphVisualization.layout.force}</button>
        <button onClick={() => setLayout('radial')}>{t.graphVisualization.layout.radial}</button>
        <button onClick={resetZoom}>{t.graphVisualization.layout.resetZoom}</button>
      </div>
      <div ref={containerRef} className="graph-container">
        {loading && <div className="loading">{t.graphVisualization.noData}</div>}
      </div>
      <div className="legend">
        <h3>{t.graphVisualization.legend.title}</h3>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#4CAF50' }}></span>
          <span>{t.graphVisualization.legend.coursePattern}</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#2196F3' }}></span>
          <span>{t.graphVisualization.legend.proof}</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#FF9800' }}></span>
          <span>{t.graphVisualization.legend.test}</span>
        </div>
      </div>
    </div>
  );
}
