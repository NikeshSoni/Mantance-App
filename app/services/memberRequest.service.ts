import api from "../lib/axios";

export interface FamilyMember {
  name: string;
  relationship: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  occupation: string;
}

export interface MemberRequestData {
  registrationId?: string;
  email?: string;
  buildingName: string;
  flatNumber: string;
  floorNumber: number;
  flatType: string;
  ownershipType: string;
  moveInDate: string;

  fullName: string;
  profilePhoto?: string;
  gender?: string;
  dateOfBirth?: string;
  phone: string;
  alternatePhone?: string;
  aadhaarNumber?: string;
  occupation?: string;
  companyName?: string;

  totalFamilyMembers?: number;
  familyMembers?: FamilyMember[];

  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface MemberRequestResponse {
  _id: string;
  registrationId?: string;
  email?: string;
  buildingName: string;
  flatNumber: string;
  floorNumber: number;
  flatType: string;
  ownershipType: string;
  moveInDate: string;
  fullName: string;
  phone: string;
  alternatePhone?: string;
  profilePhoto?: string;
  gender?: string;
  dateOfBirth?: string;
  aadhaarNumber?: string;
  occupation?: string;
  companyName?: string;
  totalFamilyMembers: number;
  familyMembers: FamilyMember[];
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export const createMemberRequest = async (data: MemberRequestData) => {
  const response = await api.post("/member-requests", data);
  return response.data;
};

export const getMemberRequests = async (status?: string) => {
  const response = await api.get("/member-requests", {
    params: status ? { status } : {},
  });
  return response.data;
};

export const approveMemberRequest = async (requestId: string) => {
  const response = await api.put(`/member-requests/${requestId}/approve`);
  return response.data;
};

export const rejectMemberRequest = async (requestId: string) => {
  const response = await api.put(`/member-requests/${requestId}/reject`);
  return response.data;
};

export const getMemberRequestById = async (requestId: string) => {
  const response = await api.get(`/member-requests/${requestId}`);
  return response.data;
};

export const getMyMemberRequest = async () => {
  const response = await api.get("/member-requests");
  return response.data;
};