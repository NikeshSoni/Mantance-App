export type OccupancyStatus = "occupied" | "vacant";

export type ResidentType = "owner" | "tenant" | "none";

export interface Resident {
  _id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Flat {
  _id: string;

  building:
    | string
    | {
        _id: string;
        buildingName: string;
        address?: string;
      };

  flatNumber: string;
  wing: string;
  floor: number;

  owner?: Resident | null;
  resident?: Resident | null;

  occupancyStatus: OccupancyStatus;

  residentType: ResidentType;

  monthlyMaintenance: number;

  isActive: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFlatData {
  building: string;
  flatNumber: string;
  wing: string;
  floor: number;
  occupancyStatus: OccupancyStatus;
  residentType: ResidentType;
  monthlyMaintenance: number;
}

export interface FlatsResponse {
  success: boolean;
  count?: number;
  flats: Flat[];
}

export interface FlatResponse {
  success: boolean;
  message?: string;
  flat: Flat;
}