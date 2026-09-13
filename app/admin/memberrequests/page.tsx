"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getMemberRequests,
  approveMemberRequest,
  rejectMemberRequest,
} from "../../services/memberRequest.service";

interface FamilyMember {
  _id?: string;
  name: string;
  relationship: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  occupation: string;
}

interface MemberRequest {
  _id: string;

  buildingName: string;
  flatNumber: string;
  floorNumber: number;
  flatType: string;
  ownershipType: string;
  moveInDate: string;

  fullName: string;
  profilePhoto: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  alternatePhone: string;
  email: string;
  aadhaarNumber: string;
  occupation: string;
  companyName: string;

  totalFamilyMembers: number;
  familyMembers: FamilyMember[];

  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };

  status: "pending" | "approved" | "rejected";

  createdAt: string;
}

export default function MemberRequestsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<MemberRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedRequest, setSelectedRequest] =
    useState<MemberRequest | null>(null);

  const [processingId, setProcessingId] =
    useState<string | null>(null);

  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const response = await getMemberRequests();

      setRequests(response.data || []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load requests"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this member?"
    );

    if (!confirmed) return;

    try {
      setProcessingId(id);

      await approveMemberRequest(id);

      // Remove from pending list
      setRequests((prev) =>
        prev.filter((request) => request._id !== id)
      );

      setSelectedRequest(null);

      alert("Member approved successfully");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to approve member"
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this request?"
    );

    if (!confirmed) return;

    try {
      setProcessingId(id);

      await rejectMemberRequest(id);

      setRequests((prev) =>
        prev.filter((request) => request._id !== id)
      );

      setSelectedRequest(null);

      alert("Request rejected");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to reject request"
      );
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading member requests...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="p-2 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-100 transition"
              title="Back to Dashboard"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Member Requests
              </h1>

              <p className="mt-1 text-gray-500">
                Review and manage resident membership requests.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-white px-5 py-3 shadow-sm">
            <p className="text-sm text-gray-500">
              Pending Requests
            </p>

            <p className="text-2xl font-bold">
              {requests.length}
            </p>
          </div>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {/* Empty */}

        {requests.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <div className="mb-4 text-5xl">
              ✓
            </div>

            <h2 className="text-xl font-semibold">
              No Pending Requests
            </h2>

            <p className="mt-2 text-gray-500">
              All member requests have been processed.
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {requests.map((request) => (
              <div
                key={request._id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                  {/* Member */}

                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                      {request.fullName
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold">
                        {request.fullName}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {request.buildingName} • Flat{" "}
                        {request.flatNumber}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        📞 {request.phone}
                      </p>
                    </div>

                  </div>

                  {/* Details */}

                  <div className="grid grid-cols-2 gap-5 text-sm md:grid-cols-4">

                    <div>
                      <p className="text-gray-400">
                        Floor
                      </p>

                      <p className="font-medium">
                        {request.floorNumber}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">
                        Flat Type
                      </p>

                      <p className="font-medium">
                        {request.flatType}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">
                        Ownership
                      </p>

                      <p className="font-medium capitalize">
                        {request.ownershipType}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">
                        Family
                      </p>

                      <p className="font-medium">
                        {request.totalFamilyMembers}
                      </p>
                    </div>

                  </div>

                  {/* Status */}

                  <div>
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                      Pending
                    </span>
                  </div>

                  {/* Actions */}

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        setSelectedRequest(request)
                      }
                      className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        handleApprove(request._id)
                      }
                      disabled={
                        processingId === request._id
                      }
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                    >
                      {processingId === request._id
                        ? "..."
                        : "Accept"}
                    </button>

                    <button
                      onClick={() =>
                        handleReject(request._id)
                      }
                      disabled={
                        processingId === request._id
                      }
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                    >
                      Reject
                    </button>

                  </div>
                </div>
              </div>
            ))}

          </div>
        )}

      </div>

      {/* Details Modal */}

      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white">

            {/* Modal Header */}

            <div className="sticky top-0 flex items-center justify-between border-b bg-white p-6">

              <div>
                <h2 className="text-2xl font-bold">
                  Member Details
                </h2>

                <p className="text-sm text-gray-500">
                  Review complete member information
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedRequest(null)
                }
                className="text-2xl text-gray-500 hover:text-black"
              >
                ×
              </button>

            </div>

            <div className="space-y-8 p-6">

              {/* Primary Details */}

              <section>
                <h3 className="mb-4 text-lg font-semibold">
                  👤 Primary Member
                </h3>

                <div className="grid gap-4 rounded-xl bg-gray-50 p-5 md:grid-cols-2">

                  <Detail
                    label="Full Name"
                    value={selectedRequest.fullName}
                  />

                  <Detail
                    label="Phone"
                    value={selectedRequest.phone}
                  />

                  <Detail
                    label="Email"
                    value={selectedRequest.email}
                  />

                  <Detail
                    label="Gender"
                    value={selectedRequest.gender}
                  />

                  <Detail
                    label="Date of Birth"
                    value={selectedRequest.dateOfBirth}
                  />

                  <Detail
                    label="Occupation"
                    value={selectedRequest.occupation}
                  />

                  <Detail
                    label="Company"
                    value={selectedRequest.companyName}
                  />

                  <Detail
                    label="Aadhaar / ID"
                    value={
                      selectedRequest.aadhaarNumber ||
                      "Not provided"
                    }
                  />

                </div>
              </section>

              {/* Flat Details */}

              <section>
                <h3 className="mb-4 text-lg font-semibold">
                  🏢 Flat Details
                </h3>

                <div className="grid gap-4 rounded-xl bg-gray-50 p-5 md:grid-cols-3">

                  <Detail
                    label="Building"
                    value={
                      selectedRequest.buildingName
                    }
                  />

                  <Detail
                    label="Flat"
                    value={
                      selectedRequest.flatNumber
                    }
                  />

                  <Detail
                    label="Floor"
                    value={String(
                      selectedRequest.floorNumber
                    )}
                  />

                  <Detail
                    label="Flat Type"
                    value={selectedRequest.flatType}
                  />

                  <Detail
                    label="Ownership"
                    value={
                      selectedRequest.ownershipType
                    }
                  />

                  <Detail
                    label="Move-in Date"
                    value={
                      selectedRequest.moveInDate
                    }
                  />

                </div>
              </section>

              {/* Family */}

              <section>

                <h3 className="mb-4 text-lg font-semibold">
                  👨‍👩‍👧‍👦 Family Members
                </h3>

                <div className="space-y-3">

                  {selectedRequest.familyMembers.map(
                    (member, index) => (
                      <div
                        key={member._id || index}
                        className="rounded-xl border p-4"
                      >
                        <div className="grid gap-4 md:grid-cols-3">

                          <Detail
                            label="Name"
                            value={member.name}
                          />

                          <Detail
                            label="Relationship"
                            value={
                              member.relationship
                            }
                          />

                          <Detail
                            label="Gender"
                            value={member.gender}
                          />

                          <Detail
                            label="Date of Birth"
                            value={
                              member.dateOfBirth
                            }
                          />

                          <Detail
                            label="Phone"
                            value={member.phone}
                          />

                          <Detail
                            label="Occupation"
                            value={
                              member.occupation
                            }
                          />

                        </div>
                      </div>
                    )
                  )}

                </div>

              </section>

              {/* Emergency */}

              <section>

                <h3 className="mb-4 text-lg font-semibold">
                  🚨 Emergency Contact
                </h3>

                <div className="grid gap-4 rounded-xl bg-gray-50 p-5 md:grid-cols-3">

                  <Detail
                    label="Name"
                    value={
                      selectedRequest
                        .emergencyContact.name
                    }
                  />

                  <Detail
                    label="Relationship"
                    value={
                      selectedRequest
                        .emergencyContact
                        .relationship
                    }
                  />

                  <Detail
                    label="Phone"
                    value={
                      selectedRequest
                        .emergencyContact.phone
                    }
                  />

                </div>

              </section>

            </div>

            {/* Modal Actions */}

            <div className="sticky bottom-0 flex justify-end gap-3 border-t bg-white p-6">

              <button
                onClick={() =>
                  handleReject(selectedRequest._id)
                }
                className="rounded-lg bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700"
              >
                Reject
              </button>

              <button
                onClick={() =>
                  handleApprove(selectedRequest._id)
                }
                className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
              >
                Accept Member
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-400">
        {label}
      </p>

      <p className="mt-1 font-medium text-gray-800">
        {value || "-"}
      </p>
    </div>
  );
}