import api from "../lib/axios";
import {
  Complaint,
  CreateComplaintData,
  ComplaintActionData,
} from "../types/complaint.type.ts";

export const createComplaint = async (
  data: CreateComplaintData
) => {
  const response = await api.post("/complaints", data);

  return response.data;
};

export const getMyComplaints = async (): Promise<{
  success: boolean;
  complaints: Complaint[];
}> => {
  const response = await api.get("/complaints/my");

  return response.data;
};

export const getAllComplaints = async (params?: {
  status?: string;
  category?: string;
  priority?: string;
}): Promise<{
  success: boolean;
  complaints: Complaint[];
}> => {
  const response = await api.get("/complaints", {
    params,
  });

  return response.data;
};

export const takeComplaintAction = async (
  id: string,
  data: ComplaintActionData
) => {
  const response = await api.patch(
    `/complaints/${id}/action`,
    data
  );

  return response.data;
};