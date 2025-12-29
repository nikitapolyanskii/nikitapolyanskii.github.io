import type { SimulationNodeDatum } from "d3-force";

export interface CoAuthor {
  name: string;
  count: number;
  radius: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface GraphDimensions {
  width: number;
  height: number;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  venueShort: string;
  year: number;
  categories: string[];
  tags?: string[];
}

export interface SimulationNode extends SimulationNodeDatum {
  id: string;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  radius: number;
  fx?: number | null;
  fy?: number | null;
}
