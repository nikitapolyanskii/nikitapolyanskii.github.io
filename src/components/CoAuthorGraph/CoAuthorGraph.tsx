"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCoAuthorData } from "./useCoAuthorData";
import { usePhysicsSimulation } from "./usePhysicsSimulation";
import GraphNode from "./GraphNode";
import GraphEdge from "./GraphEdge";
import { GraphDimensions } from "./types";

const ASPECT_RATIO = 0.65;
const MAX_WIDTH = 700;

function useGraphDimensions(): GraphDimensions {
  const [dimensions, setDimensions] = useState<GraphDimensions>({
    width: MAX_WIDTH,
    height: MAX_WIDTH * ASPECT_RATIO,
  });

  useEffect(() => {
    function updateDimensions() {
      const containerWidth = Math.min(window.innerWidth - 48, MAX_WIDTH);
      setDimensions({
        width: containerWidth,
        height: containerWidth * ASPECT_RATIO,
      });
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return dimensions;
}

const CENTER_RADIUS = 24;
const CENTER_HOVER_RADIUS = 36;

export default function CoAuthorGraph() {
  const dimensions = useGraphDimensions();
  const { coAuthors, positions, centerPosition } = useCoAuthorData(dimensions);
  const [hoveredAuthor, setHoveredAuthor] = useState<string | null>(null);
  const [isCenterHovered, setIsCenterHovered] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Physics simulation for drag and collision
  const { nodePositions, startDrag, drag, endDrag } = usePhysicsSimulation({
    coAuthors,
    positions,
  });

  // Convert screen coordinates to SVG coordinates
  const getSVGCoordinates = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };

      const rect = svg.getBoundingClientRect();
      const scaleX = dimensions.width / rect.width;
      const scaleY = dimensions.height / rect.height;

      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    },
    [dimensions]
  );

  const currentCenterRadius = isCenterHovered ? CENTER_HOVER_RADIUS : CENTER_RADIUS;

  // Center node floating animation
  const centerFloatParams = useMemo(
    () => ({
      duration: 10,
      offsetX: 2,
      offsetY: 2,
    }),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="w-full flex justify-center"
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="w-full max-w-[700px] h-auto"
        role="img"
        aria-label="Interactive graph showing co-author collaborations. Each node represents a co-author, with size indicating number of joint publications."
      >
        {/* Edges - rendered first so they appear below nodes */}
        <g>
          {coAuthors.map((author) => {
            const pos = nodePositions.get(author.name);
            if (!pos) return null;
            return (
              <GraphEdge
                key={`edge-${author.name}`}
                from={centerPosition}
                to={pos}
                isHighlighted={hoveredAuthor === author.name}
              />
            );
          })}
        </g>

        {/* Co-author nodes */}
        <g>
          {coAuthors.map((author, index) => {
            const pos = nodePositions.get(author.name);
            if (!pos) return null;
            return (
              <GraphNode
                key={author.name}
                author={author}
                position={pos}
                index={index}
                isHovered={hoveredAuthor === author.name}
                onHover={setHoveredAuthor}
                onDragStart={() => startDrag(author.name)}
                onDrag={(x, y) => drag(author.name, x, y)}
                onDragEnd={() => endDrag(author.name)}
                getSVGCoordinates={getSVGCoordinates}
              />
            );
          })}
        </g>

        {/* Center node (Nikita) - rendered last to be on top */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: [
              centerPosition.x,
              centerPosition.x + centerFloatParams.offsetX,
              centerPosition.x - centerFloatParams.offsetX,
              centerPosition.x,
            ],
            y: [
              centerPosition.y,
              centerPosition.y - centerFloatParams.offsetY,
              centerPosition.y + centerFloatParams.offsetY,
              centerPosition.y,
            ],
          }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 0.5, type: "spring" },
            x: {
              duration: centerFloatParams.duration,
              repeat: Infinity,
              ease: "easeInOut",
            },
            y: {
              duration: centerFloatParams.duration * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            },
          }}
          onHoverStart={() => setIsCenterHovered(true)}
          onHoverEnd={() => setIsCenterHovered(false)}
          style={{ cursor: "pointer" }}
        >
          {/* Pattern for photo fill */}
          <defs>
            <pattern
              id="center-photo-pattern"
              patternUnits="objectBoundingBox"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                href="/photos/NPolianskii_small.jpg"
                width="1"
                height="1"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>
          {/* Outer glow */}
          <motion.circle
            cx={0}
            cy={0}
            r={32}
            className="fill-blue-500/20 dark:fill-teal-400/20"
            animate={{ r: currentCenterRadius + 8 }}
            transition={{ duration: 0.15 }}
          />
          {/* Circle filled with photo pattern */}
          <motion.circle
            cx={0}
            cy={0}
            r={CENTER_RADIUS}
            fill="url(#center-photo-pattern)"
            stroke="white"
            strokeWidth={isCenterHovered ? 2.5 : 2}
            animate={{ r: currentCenterRadius }}
            transition={{ duration: 0.15 }}
          />
        </motion.g>

        {/* Tooltip layer - rendered last to be on top of everything */}
        <AnimatePresence>
          {hoveredAuthor && (() => {
            const author = coAuthors.find(a => a.name === hoveredAuthor);
            const pos = nodePositions.get(hoveredAuthor);
            if (!author || !pos) return null;
            return (
              <motion.g
                key="tooltip"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
              >
                <foreignObject
                  x={pos.x - 80}
                  y={pos.y - author.radius - 50}
                  width={160}
                  height={50}
                  style={{ overflow: "visible", pointerEvents: "none" }}
                >
                  <div className="flex justify-center">
                    <div className="px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-medium text-center whitespace-nowrap shadow-lg">
                      <div className="font-semibold">{author.name}</div>
                    </div>
                  </div>
                </foreignObject>
              </motion.g>
            );
          })()}
        </AnimatePresence>
      </svg>
    </motion.div>
  );
}
