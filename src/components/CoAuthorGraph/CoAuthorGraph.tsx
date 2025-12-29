"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCoAuthorData } from "./useCoAuthorData";
import { usePhysicsSimulation } from "./usePhysicsSimulation";
import GraphNode from "./GraphNode";
import { GraphDimensions } from "./types";

const ASPECT_RATIO_DESKTOP = 0.75; // landscape
const ASPECT_RATIO_MOBILE = 1.33; // portrait (4:3)
const MOBILE_BREAKPOINT = 768;
const MAX_WIDTH = 2100;

function useGraphDimensions(): GraphDimensions {
  const [dimensions, setDimensions] = useState<GraphDimensions>({
    width: MAX_WIDTH,
    height: MAX_WIDTH * ASPECT_RATIO_DESKTOP,
  });

  useEffect(() => {
    function updateDimensions() {
      const containerWidth = Math.min(window.innerWidth - 48, MAX_WIDTH);
      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      const aspectRatio = isMobile ? ASPECT_RATIO_MOBILE : ASPECT_RATIO_DESKTOP;
      setDimensions({
        width: containerWidth,
        height: containerWidth * aspectRatio,
      });
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return dimensions;
}

export default function CoAuthorGraph() {
  const dimensions = useGraphDimensions();
  const { coAuthors, positions, centerPosition } = useCoAuthorData(dimensions);
  const [hoveredAuthor, setHoveredAuthor] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Physics simulation for drag and collision
  const { nodePositions, startDrag, drag, endDrag } = usePhysicsSimulation({
    coAuthors,
    positions,
    centerPosition,
    dimensions,
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
        className="w-full max-w-[2100px] h-auto touch-none"
        role="img"
        aria-label="Interactive graph showing co-author collaborations. Each node represents a co-author, with size indicating number of joint publications."
      >
        {/* Co-author nodes - render hovered node last so it appears on top */}
        <g>
          {[...coAuthors]
            .sort((a, b) => {
              // Hovered node should be rendered last (on top)
              if (a.name === hoveredAuthor) return 1;
              if (b.name === hoveredAuthor) return -1;
              return 0;
            })
            .map((author, index) => {
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
                  x={pos.x - 120}
                  y={pos.y - author.radius - 75}
                  width={240}
                  height={75}
                  style={{ overflow: "visible", pointerEvents: "none" }}
                >
                  <div className="flex justify-center">
                    <div className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium text-center whitespace-nowrap shadow-lg">
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
