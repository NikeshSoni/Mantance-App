"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Loader2,
  ArrowLeft,
} from "lucide-react";

import {
  getAllComplaints,
  takeComplaintAction,
} from "@/app/services/complaint.service";

import {
  Complaint,
  ComplaintStatus,
} from "@/app/types/complaint";

export default function ComplaintDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [complaint, setComplaint] =
    useState<Complaint | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [status, setStatus] =
    useState<ComplaintStatus>("Pending");

  const [actionTaken, setActionTaken] =
    useState("");

  const [adminRemark, setAdminRemark] =
    useState("");

  useEffect(() => {
    const loadComplaint = async () => {
      try {
        const response =
          await getAllComplaints();

        const found = response.complaints.find(
          (item) => item._id === id
        );

        if (!found) {
          router.push("/admin/complaints");
          return;
        }

        setComplaint(found);
        setStatus(found.status);
        setActionTaken(found.actionTaken || "");
        setAdminRemark(found.adminRemark || "");

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadComplaint();
  }, [id, router]);

  const handleUpdate = async () => {
    try {
      setSaving(true);

      await takeComplaintAction(id, {
        status,
        actionTaken,
        adminRemark,
      });

      alert("Complaint updated successfully");

      router.push("/admin/complaints");

    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to update complaint"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!complaint) {
    return null;
  }

  const resident =
    typeof complaint.resident === "object"
      ? complaint.resident
      : null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="mx-auto max-w-4xl">

        <button
          onClick={() =>
            router.push("/admin/complaints")
          }
          className="mb-5 flex items-center gap-2 text-sm text-gray-600 hover:text-black"
        >
          <ArrowLeft size={18} />
          Back to Complaints
        </button>

        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h1 className="text-2xl font-bold">
            Complaint Details
          </h1>

          {/* Resident */}
          <div className="mt-6 border-b pb-5">

            <h2 className="mb-3 text-sm font-semibold text-gray-500">
              Resident
            </h2>

            <p className="font-medium">
              {resident?.name || "Resident"}
            </p>

            <p className="text-sm text-gray-500">
              {resident?.email}
            </p>

            <p className="text-sm text-gray-500">
              {resident?.phone}
            </p>

          </div>

          {/* Complaint */}
          <div className="mt-6 border-b pb-5">

            <h2 className="text-xl font-semibold">
              {complaint.title}
            </h2>

            <div className="mt-2 flex gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                {complaint.category}
              </span>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                {complaint.priority}
              </span>
            </div>

            <p className="mt-4 text-gray-600">
              {complaint.description}
            </p>

          </div>

          {/* Admin Action */}
          <div className="mt-6 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as ComplaintStatus
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Resolved">
                  Resolved
                </option>

                <option value="Rejected">
                  Rejected
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Action Taken
              </label>

              <textarea
                rows={4}
                value={actionTaken}
                onChange={(e) =>
                  setActionTaken(e.target.value)
                }
                placeholder="Describe the action taken..."
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Admin Remark
              </label>

              <textarea
                rows={3}
                value={adminRemark}
                onChange={(e) =>
                  setAdminRemark(e.target.value)
                }
                placeholder="Add a remark..."
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>

            <button
              onClick={handleUpdate}
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 font-medium text-white disabled:opacity-50"
            >
              {saving && (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              )}

              {saving
                ? "Updating..."
                : "Update Complaint"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}