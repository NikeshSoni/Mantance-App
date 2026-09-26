import { apiRequest } from "../lib/api";

import {
  BuildingResponse,
  BuildingsResponse,
  CreateBuildingData,
} from "../types/building";

export const getBuildings = async (): Promise<BuildingsResponse> => {
  return apiRequest<BuildingsResponse>("/buildings");
};

export const getBuildingById = async (
  id: string
): Promise<BuildingResponse> => {
  return apiRequest<BuildingResponse>(`/buildings/${id}`);
};

export const createBuilding = async (
  data: CreateBuildingData
): Promise<BuildingResponse> => {
  return apiRequest<BuildingResponse>("/buildings", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateBuilding = async (
  id: string,
  data: Partial<CreateBuildingData>
): Promise<BuildingResponse> => {
  return apiRequest<BuildingResponse>(`/buildings/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteBuilding = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  return apiRequest(`/buildings/${id}`, {
    method: "DELETE",
  });
};