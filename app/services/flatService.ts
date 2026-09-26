import { apiRequest } from "../lib/api";

import {
  CreateFlatData,
  FlatResponse,
  FlatsResponse,
} from "../types/flat";

export const getFlats = async (
  buildingId?: string
): Promise<FlatsResponse> => {
  const query = buildingId
    ? `?building=${buildingId}`
    : "";

  return apiRequest<FlatsResponse>(`/flats${query}`);
};

export const getFlatById = async (
  id: string
): Promise<FlatResponse> => {
  return apiRequest<FlatResponse>(`/flats/${id}`);
};

export const createFlat = async (
  data: CreateFlatData
): Promise<FlatResponse> => {
  return apiRequest<FlatResponse>("/flats", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateFlat = async (
  id: string,
  data: Partial<CreateFlatData>
): Promise<FlatResponse> => {
  return apiRequest<FlatResponse>(`/flats/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteFlat = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  return apiRequest(`/flats/${id}`, {
    method: "DELETE",
  });
};