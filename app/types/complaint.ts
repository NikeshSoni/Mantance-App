// complaint.ts

export type ComplaintStatus =
  | "Pending"
  | "In Progress"
  | "Resolved"
  | "Rejected";

export type ComplaintCategory =
  | "Maintenance"
  | "Water"
  | "Electricity"
  | "Security"
  | "Cleaning"
  | "Parking"
  | "Noise"
  | "Other";

export type ComplaintPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Urgent";

export interface Resident {
  _id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Complaint {
  _id: string;
  resident: Resident | string;
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  adminRemark: string;
  actionTaken: string;
  resolvedAt: string | null;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateComplaintData {
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  image?: string;
}

export interface ComplaintActionData {
  status: ComplaintStatus;
  actionTaken?: string;
  adminRemark?: string;
}