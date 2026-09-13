"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

import { getMyComplaints } from "@/app/services/complaint.service";
import { Complaint } from "@/app/types/complaint";

export default function MyComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const response = await getMyComplaints();

      setComplaints(response.complaints || []);
    } catch (error: any) {
      console.error(error);

      setError(
        error?.response?.data?.message ||
          "Failed to load complaints."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle size={18} />;

      case "Rejected":
        return <XCircle size={18} />;

      case "In Progress":
        return <Clock size={18} />;

      default:
        return <AlertCircle size={18} />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="mx-auto max-w-6xl">

        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            My Complaints
          </h1>

          <p className="text-sm text-gray-500">
            Track your complaints and their current status.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {complaints.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <AlertCircle
              className="mx-auto mb-3 text-gray-400"
              size={40}
            />

            <h2 className="font-semibold">
              No complaints found
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              You haven't raised any complaints yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">

            {complaints.map((complaint) => (
              <div
                key={complaint._id}
                className="rounded-xl border bg-white p-5 shadow-sm"
              >

                <div className="flex items-start justify-between gap-3">

                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {complaint.title}
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(
                        complaint.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                      complaint.status
                    )}`}
                  >
                    {getStatusIcon(complaint.status)}
                    {complaint.status}
                  </span>

                </div>

                <p className="mt-4 text-sm text-gray-600">
                  {complaint.description}
                </p>

                <div className="mt-4 flex gap-2">

                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs">
                    {complaint.category}
                  </span>

                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs">
                    {complaint.priority}
                  </span>

                </div>

                {complaint.actionTaken && (
                  <div className="mt-4 rounded-lg bg-blue-50 p-3">
                    <p className="text-xs font-semibold text-blue-700">
                      Action Taken
                    </p>

                    <p className="mt-1 text-sm text-blue-900">
                      {complaint.actionTaken}
                    </p>
                  </div>
                )}

                {complaint.adminRemark && (
                  <div className="mt-3 rounded-lg bg-gray-50 p-3">
                    <p className="text-xs font-semibold text-gray-600">
                      Admin Remark
                    </p>

                    <p className="mt-1 text-sm text-gray-700">
                      {complaint.adminRemark}
                    </p>
                  </div>
                )}

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}