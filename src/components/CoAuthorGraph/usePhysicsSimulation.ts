"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  forceSimulation,
  forceCollide,
  forceX,
  forceY,
  Simulation,
} from "d3-force";
import { CoAuthor, Position, SimulationNode } from "./types";

interface UsePhysicsSimulationProps {
  coAuthors: CoAuthor[];
  positions: Map<string, Position>;
}

interface UsePhysicsSimulationResult {
  nodePositions: Map<string, Position>;
  startDrag: (nodeId: string) => void;
  drag: (nodeId: string, x: number, y: number) => void;
  endDrag: (nodeId: string) => void;
}

export function usePhysicsSimulation({
  coAuthors,
  positions,
}: UsePhysicsSimulationProps): UsePhysicsSimulationResult {
  const simulationRef = useRef<Simulation<SimulationNode, undefined> | null>(null);
  const nodesRef = useRef<SimulationNode[]>([]);
  const [isClient, setIsClient] = useState(false);
  // Use the original positions initially to avoid hydration mismatch
  const [nodePositions, setNodePositions] = useState<Map<string, Position>>(
    () => new Map(positions)
  );

  // Mark that we're on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sync positions when they change (for SSR compatibility)
  useEffect(() => {
    if (!isClient) {
      setNodePositions(new Map(positions));
    }
  }, [positions, isClient]);

  // Initialize simulation when coAuthors or positions change (client-side only)
  useEffect(() => {
    // Only run simulation on client to avoid hydration mismatch
    if (!isClient) return;

    // Create simulation nodes from coAuthors
    const nodes: SimulationNode[] = coAuthors.map((author) => {
      const pos = positions.get(author.name) || { x: 0, y: 0 };
      return {
        id: author.name,
        x: pos.x,
        y: pos.y,
        originalX: pos.x,
        originalY: pos.y,
        radius: author.radius,
      };
    });

    nodesRef.current = nodes;

    // Time counter for smooth organic motion
    let time = 0;

    // Custom force for gentle organic floating using smooth noise
    const floatForce = () => {
      const strength = 0.025; // Gentle but noticeable
      return () => {
        time += 0.035; // Moderate time progression
        nodesRef.current.forEach((node, i) => {
          // Only apply to unfixed nodes
          if (node.fx !== null && node.fx !== undefined) return;

          // Use multiple sine waves with different frequencies for organic motion
          // Each node has unique phase offsets based on its index
          const phaseX1 = i * 0.7;
          const phaseX2 = i * 1.3;
          const phaseY1 = i * 0.9;
          const phaseY2 = i * 1.1;

          // Combine multiple frequencies for irregular paths
          const noiseX =
            Math.sin(time * 0.5 + phaseX1) * 0.6 +
            Math.sin(time * 0.3 + phaseX2) * 0.4 +
            Math.sin(time * 0.7 + phaseX1 * 2) * 0.2;
          const noiseY =
            Math.sin(time * 0.4 + phaseY1) * 0.6 +
            Math.sin(time * 0.6 + phaseY2) * 0.4 +
            Math.sin(time * 0.25 + phaseY1 * 2) * 0.2;

          node.vx = (node.vx || 0) + noiseX * strength;
          node.vy = (node.vy || 0) + noiseY * strength;
        });
      };
    };

    // Create force simulation
    const simulation = forceSimulation<SimulationNode>(nodes)
      // Collision detection with bouncing
      .force(
        "collide",
        forceCollide<SimulationNode>((d) => d.radius + 3).strength(1)
      )
      // Slowly pull nodes back to original positions
      .force(
        "returnX",
        forceX<SimulationNode>((d) => d.originalX).strength(0.02)
      )
      .force(
        "returnY",
        forceY<SimulationNode>((d) => d.originalY).strength(0.02)
      )
      // Gentle random floating
      .force("float", floatForce())
      // Keep simulation running indefinitely
      .alphaDecay(0)
      .alphaMin(0)
      .alpha(0.3)
      .velocityDecay(0.4);

    // Update positions on each tick
    simulation.on("tick", () => {
      const newPositions = new Map<string, Position>();
      nodesRef.current.forEach((node) => {
        newPositions.set(node.id, { x: node.x, y: node.y });
      });
      setNodePositions(newPositions);
    });

    simulationRef.current = simulation;

    return () => {
      simulation.stop();
    };
  }, [coAuthors, positions, isClient]);

  // Drag handlers
  const startDrag = useCallback((nodeId: string) => {
    const simulation = simulationRef.current;
    if (!simulation) return;

    // Reheat simulation
    simulation.alphaTarget(0.3).restart();

    // Find and fix the node
    const node = nodesRef.current.find((n) => n.id === nodeId);
    if (node) {
      node.fx = node.x;
      node.fy = node.y;
    }
  }, []);

  const drag = useCallback((nodeId: string, x: number, y: number) => {
    const node = nodesRef.current.find((n) => n.id === nodeId);
    if (node) {
      node.fx = x;
      node.fy = y;
    }
  }, []);

  const endDrag = useCallback((nodeId: string) => {
    const simulation = simulationRef.current;
    if (!simulation) return;

    // Cool down simulation
    simulation.alphaTarget(0);

    // Release the node
    const node = nodesRef.current.find((n) => n.id === nodeId);
    if (node) {
      node.fx = null;
      node.fy = null;
    }
  }, []);

  return {
    nodePositions,
    startDrag,
    drag,
    endDrag,
  };
}
