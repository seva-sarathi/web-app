export interface NodeCoords {
  x: number;
  y: number;
}

export interface MapData {
  nodes: Record<string, NodeCoords>;
  edges: Record<string, Record<string, number>>;
}

export interface Job {
  pickup: string;
  dropoff: string;
  item: string;
}

export interface FleetAGV {
  id: string;
  status: string;
  position: NodeCoords;
  currentNode: string | null;
  battery: number;
  job: Job | null;
}