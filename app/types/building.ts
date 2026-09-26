export interface Building {
  _id: string;
  buildingName: string;
  address: string;
  totalFloors: number;
  wings: string[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBuildingData {
  buildingName: string;
  address: string;
  totalFloors: number;
  wings: string[];
}

export interface BuildingResponse {
  success: boolean;
  message?: string;
  building: Building;
}

export interface BuildingsResponse {
  success: boolean;
  count: number;
  buildings: Building[];
}