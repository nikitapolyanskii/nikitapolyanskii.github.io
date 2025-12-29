import { useMemo } from "react";
import publications from "@/data/publications.json";
import { CoAuthor, Position, GraphDimensions, Publication } from "./types";

const NIKITA_NAME = "Nikita Polyanskii";

// Dynamic sizing based on screen width
function getNodeSizes(width: number) {
  const scaleFactor = Math.max(0.4, Math.min(width / 1200, 1));
  return {
    minRadius: 30 * scaleFactor,
    maxRadius: 60 * scaleFactor,
  };
}

// Normalize author name variations to canonical form
const NAME_ALIASES: Record<string, string> = {
  "Sebastian Mueller": "Sebastian Müller",
  "Sebastian Muller": "Sebastian Müller",
  "Vasily Usatyuk": "Vasiliy Usatyuk",
};

function normalizeAuthorName(name: string): string {
  return NAME_ALIASES[name] || name;
}

interface CoAuthorData {
  coAuthors: CoAuthor[];
  positions: Map<string, Position>;
  centerPosition: Position;
  maxCount: number;
}

export function useCoAuthorData(dimensions: GraphDimensions): CoAuthorData {
  return useMemo(() => {
    // Count collaborations per co-author
    const countMap = new Map<string, number>();

    (publications as Publication[])
      // Exclude patents from co-author counting
      .filter((pub) => !pub.categories.includes("Patents"))
      .forEach((pub) => {
        pub.authors.forEach((author) => {
          if (author !== NIKITA_NAME) {
            const normalizedName = normalizeAuthorName(author);
            countMap.set(normalizedName, (countMap.get(normalizedName) || 0) + 1);
          }
        });
      });

    // Find max count for normalization
    const maxCount = Math.max(...Array.from(countMap.values()));

    // Get dynamic sizes based on screen width
    const { minRadius, maxRadius } = getNodeSizes(dimensions.width);

    // Convert to CoAuthor array with calculated radius
    const coAuthors: CoAuthor[] = Array.from(countMap.entries())
      .map(([name, count]) => {
        // Log scale for visual balance
        const normalized = Math.log(count + 1) / Math.log(maxCount + 1);
        const radius = minRadius + normalized * (maxRadius - minRadius);
        return { name, count, radius };
      })
      .sort((a, b) => b.count - a.count);

    // Calculate positions in rings
    const positions = calculatePositions(coAuthors, dimensions);

    const centerPosition: Position = {
      x: dimensions.width / 2,
      y: dimensions.height / 2,
    };

    return { coAuthors, positions, centerPosition, maxCount };
  }, [dimensions]);
}

function calculatePositions(
  coAuthors: CoAuthor[],
  dimensions: GraphDimensions
): Map<string, Position> {
  const positions = new Map<string, Position>();
  const n = coAuthors.length;

  // Calculate grid dimensions based on aspect ratio
  const aspectRatio = dimensions.width / dimensions.height;
  const cols = Math.ceil(Math.sqrt(n * aspectRatio));
  const rows = Math.ceil(n / cols);

  // Calculate cell size with padding
  const padding = 40;
  const cellWidth = (dimensions.width - padding * 2) / cols;
  const cellHeight = (dimensions.height - padding * 2) / rows;

  // Center the grid vertically if not all rows are full
  const actualRows = Math.ceil(n / cols);
  const totalHeight = actualRows * cellHeight;
  const yOffset = (dimensions.height - totalHeight) / 2;

  coAuthors.forEach((author, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);

    // Round to 2 decimal places to avoid floating point hydration mismatches
    positions.set(author.name, {
      x: Math.round((padding + cellWidth * (col + 0.5)) * 100) / 100,
      y: Math.round((yOffset + cellHeight * (row + 0.5)) * 100) / 100,
    });
  });

  return positions;
}

export function getAuthorRing(count: number): number {
  if (count >= 4) return 0;
  if (count >= 2) return 1;
  return 2;
}
