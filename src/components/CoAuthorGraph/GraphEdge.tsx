import { motion } from "framer-motion";
import { Position } from "./types";

interface GraphEdgeProps {
  from: Position;
  to: Position;
  isHighlighted: boolean;
}

export default function GraphEdge({ from, to, isHighlighted }: GraphEdgeProps) {
  return (
    <motion.line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      className="stroke-neutral-300 dark:stroke-neutral-700"
      strokeWidth={isHighlighted ? 2 : 1}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: 1,
        opacity: isHighlighted ? 0.8 : 0.3,
      }}
      transition={{
        pathLength: { duration: 0.8, ease: "easeOut" },
        opacity: { duration: 0.3 },
      }}
    />
  );
}
