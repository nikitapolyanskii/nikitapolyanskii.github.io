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
  centerPosition: Position;
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

    // Custom force for chaotic orbital motion
    const orbitalForce = () => {
      const chaosStrength = 0.07; // Stronger chaos
      const orbitalStrength = 0.04; // Orbital/tangential velocity

      return () => {
        time += 0.055; // Faster time progression for more chaos
        nodesRef.current.forEach((node, i) => {
          // Only apply to unfixed nodes
          if (node.fx !== null && node.fx !== undefined) return;

          // Calculate vector from center to node
          const dx = node.x - centerPosition.x;
          const dy = node.y - centerPosition.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          // Normalized direction from center
          const nx = dx / dist;
          const ny = dy / dist;

          // Tangential direction (perpendicular to radial) for orbital motion
          // Alternate direction based on node index for variety
          const direction = i % 2 === 0 ? 1 : -1;
          const tx = -ny * direction;
          const ty = nx * direction;

          // Orbital velocity (varies with distance and node)
          const orbitalSpeed = orbitalStrength * (1 + Math.sin(i * 1.7) * 0.5);

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

          // Apply orbital velocity + chaotic perturbations
          node.vx = (node.vx || 0) + tx * orbitalSpeed + noiseX * chaosStrength;
          node.vy = (node.vy || 0) + ty * orbitalSpeed + noiseY * chaosStrength;
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
      // Central gravitational pull to keep nodes in orbit (weaker for more spread)
      .force(
        "gravityX",
        forceX<SimulationNode>(centerPosition.x).strength(0.008)
      )
      .force(
        "gravityY",
        forceY<SimulationNode>(centerPosition.y).strength(0.008)
      )
      // Chaotic orbital motion
      .force("orbital", orbitalForce())
      // Keep simulation running indefinitely
      .alphaDecay(0)
      .alphaMin(0)
      .alpha(0.3)
      .velocityDecay(0.25);

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
  }, [coAuthors, positions, centerPosition, isClient]);

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
