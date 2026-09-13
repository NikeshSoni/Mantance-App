import axiosInstance from "./axiosInstance";

export const getMemberRequests = async (status) => {
  const res = await axiosInstance.get("/member-requests", {
    params: status ? { status } : {},
  });
  return res.data;
};