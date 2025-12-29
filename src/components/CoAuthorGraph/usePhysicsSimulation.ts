"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  forceSimulation,
  forceCollide,
  forceX,
  forceY,
  Simulation,
} from "d3-force";
import { CoAuthor, Position, SimulationNode, GraphDimensions } from "./types";

interface UsePhysicsSimulationProps {
  coAuthors: CoAuthor[];
  positions: Map<string, Position>;
  centerPosition: Position;
  dimensions: GraphDimensions;
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
  centerPosition,
  dimensions,
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

    // Time counter for chaotic motion
    let time = 0;

    // Custom force for gentle chaotic drifting (no orbital motion)
    const driftForce = () => {
      const chaosStrength = 0.05; // Gentle drifting

      return () => {
        time += 0.04; // Slower time progression for calmer movement
        nodesRef.current.forEach((node, i) => {
          // Only apply to unfixed nodes
          if (node.fx !== null && node.fx !== undefined) return;

          // Use multiple overlapping sine waves for chaotic perturbations
          const phaseX1 = i * 0.7 + Math.sin(i * 0.3) * 2;
          const phaseX2 = i * 1.3 + Math.cos(i * 0.5) * 1.5;
          const phaseX3 = i * 0.4 + Math.sin(i * 0.8) * 3;
          const phaseY1 = i * 0.9 + Math.cos(i * 0.2) * 2;
          const phaseY2 = i * 1.1 + Math.sin(i * 0.6) * 1.5;
          const phaseY3 = i * 0.5 + Math.cos(i * 0.9) * 3;

          // Combine many frequencies for irregular, chaotic paths
          const noiseX =
            Math.sin(time * 0.6 + phaseX1) * 0.5 +
            Math.sin(time * 0.35 + phaseX2) * 0.3 +
            Math.sin(time * 0.85 + phaseX3) * 0.25 +
            Math.sin(time * 1.2 + phaseX1 * 2) * 0.15 +
            Math.cos(time * 0.45 + phaseX2 * 1.5) * 0.2;
          const noiseY =
            Math.sin(time * 0.5 + phaseY1) * 0.5 +
            Math.sin(time * 0.7 + phaseY2) * 0.3 +
            Math.sin(time * 0.3 + phaseY3) * 0.25 +
            Math.cos(time * 1.1 + phaseY1 * 2) * 0.15 +
            Math.sin(time * 0.55 + phaseY2 * 1.5) * 0.2;

          // Apply only chaotic perturbations (no orbital motion)
          node.vx = (node.vx || 0) + noiseX * chaosStrength;
          node.vy = (node.vy || 0) + noiseY * chaosStrength;
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
      // Gentle central gravity to keep nodes roughly in place
      .force(
        "gravityX",
        forceX<SimulationNode>(centerPosition.x).strength(0.003)
      )
      .force(
        "gravityY",
        forceY<SimulationNode>(centerPosition.y).strength(0.003)
      )
      // Gentle chaotic drifting
      .force("drift", driftForce())
      // Keep simulation running indefinitely
      .alphaDecay(0)
      .alphaMin(0)
      .alpha(0.3)
      .velocityDecay(0.25);

    // Update positions on each tick with boundary constraints
    simulation.on("tick", () => {
      const padding = 75; // Account for max node radius + hover expansion
      const newPositions = new Map<string, Position>();
      nodesRef.current.forEach((node) => {
        // Clamp positions to keep nodes within bounds
        const minX = padding;
        const maxX = dimensions.width - padding;
        const minY = padding;
        const maxY = dimensions.height - padding;

        node.x = Math.max(minX, Math.min(maxX, node.x));
        node.y = Math.max(minY, Math.min(maxY, node.y));

        newPositions.set(node.id, { x: node.x, y: node.y });
      });
      setNodePositions(newPositions);
    });

    simulationRef.current = simulation;

    return () => {
      simulation.stop();
    };
  }, [coAuthors, positions, centerPosition, dimensions, isClient]);

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
