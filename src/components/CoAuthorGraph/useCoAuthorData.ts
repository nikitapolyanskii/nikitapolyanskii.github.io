import { useMemo } from "react";
import publications from "@/data/publications.json";
import { CoAuthor, Position, GraphDimensions, Publication } from "./types";

const NIKITA_NAME = "Nikita Polyanskii";
const MIN_RADIUS = 21;
const MAX_RADIUS = 82;

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

    // Convert to CoAuthor array with calculated radius
    const coAuthors: CoAuthor[] = Array.from(countMap.entries())
      .map(([name, count]) => {
        // Log scale for visual balance
        const normalized = Math.log(count + 1) / Math.log(maxCount + 1);
        const radius = MIN_RADIUS + normalized * (MAX_RADIUS - MIN_RADIUS);
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
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;

  // Scale rings based on available space - fill the whole area
  // Spread big circles (frequent co-authors) to outer ring instead of concentrating in center
  const maxRadius = Math.min(dimensions.width, dimensions.height) / 2 - 30;
  const rings = [
    { minCount: 4, radius: maxRadius * 0.65 },  // Frequent co-authors in middle-outer
    { minCount: 2, radius: maxRadius * 0.4 },   // Medium co-authors closer to center
    { minCount: 1, radius: maxRadius * 0.88 },  // Single-paper co-authors on outer edge
  ];

  // Assign authors to rings
  const ringAuthors: CoAuthor[][] = [[], [], []];
  coAuthors.forEach((author) => {
    if (author.count >= 4) {
      ringAuthors[0].push(author);
    } else if (author.count >= 2) {
      ringAuthors[1].push(author);
    } else {
      ringAuthors[2].push(author);
    }
  });

  // Position authors in each ring
  ringAuthors.forEach((authors, ringIndex) => {
    const ringRadius = rings[ringIndex].radius;
    const angleStep = (2 * Math.PI) / Math.max(authors.length, 1);
    // Start from top (-PI/2) with slight offset for visual interest
    const startAngle = -Math.PI / 2 + (ringIndex * Math.PI) / 12;

    authors.forEach((author, i) => {
      const angle = startAngle + i * angleStep;
      // Round to 2 decimal places to avoid floating point hydration mismatches
      positions.set(author.name, {
        x: Math.round((centerX + ringRadius * Math.cos(angle)) * 100) / 100,
        y: Math.round((centerY + ringRadius * Math.sin(angle)) * 100) / 100,
      });
    });
  });

  return positions;
}

export function getAuthorRing(count: number): number {
  if (count >= 4) return 0;
  if (count >= 2) return 1;
  return 2;
}
