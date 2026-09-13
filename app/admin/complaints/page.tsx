"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Eye,
  FileWarning,
  Loader2,
  Search,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { getAllComplaints } from "@/app/services/complaint.service";
import { Complaint } from "@/app/types/complaint";

const ITEMS_PER_PAGE = 8;

export default function AdminComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const response = await getAllComplaints({
        status: statusFilter || undefined,
      });

      setComplaints(response.complaints || []);
    } catch (error) {
      console.error("Failed to fetch complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [statusFilter]);

  // Reset pagination when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, search]);

  // -----------------------------
  // Statistics
  // -----------------------------
  const stats = useMemo(() => {
    return {
      total: complaints.length,

      pending: complaints.filter(
        (item) => item.status === "Pending"
      ).length,

      inProgress: complaints.filter(
        (item) => item.status === "In Progress"
      ).length,

      resolved: complaints.filter(
        (item) => item.status === "Resolved"
      ).length,

      rejected: complaints.filter(
        (item) => item.status === "Rejected"
      ).length,
    };
  }, [complaints]);

  // -----------------------------
  // Search
  // -----------------------------
  const filteredComplaints = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return complaints;

    return complaints.filter((complaint) => {
      const residentName =
        typeof complaint.resident === "object"
          ? complaint.resident.name
          : "";

      const residentEmail =
        typeof complaint.resident === "object"
          ? complaint.resident.email
          : "";

      return (
        complaint.title?.toLowerCase().includes(value) ||
        complaint.description?.toLowerCase().includes(value) ||
        complaint.category?.toLowerCase().includes(value) ||
        residentName?.toLowerCase().includes(value) ||
        residentEmail?.toLowerCase().includes(value)
      );
    });
  }, [complaints, search]);

  // -----------------------------
  // Pagination
  // -----------------------------
  const totalPages = Math.ceil(
    filteredComplaints.length / ITEMS_PER_PAGE
  );

  const paginatedComplaints = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredComplaints.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredComplaints, currentPage]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";

      case "In Progress":
        return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";

      case "Resolved":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";

      case "Rejected":
        return "bg-red-50 text-red-700 ring-1 ring-red-200";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-50 text-red-700";

      case "medium":
        return "bg-orange-50 text-orange-700";

      case "low":
        return "bg-green-50 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* =====================================
            HEADER
        ===================================== */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Complaints
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage and monitor resident complaints.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm text-gray-600 shadow-sm">
            <FileWarning size={17} />
            <span>
              {filteredComplaints.length} complaints
            </span>
          </div>

        </div>

        {/* =====================================
            STAT CARDS
        ===================================== */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

          {/* Total */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Complaints
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {stats.total}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
                <FileWarning
                  size={22}
                  className="text-gray-700"
                />
              </div>

            </div>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pending
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {stats.pending}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
                <Clock3
                  size={22}
                  className="text-amber-600"
                />
              </div>

            </div>
          </div>

          {/* In Progress */}
          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  In Progress
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {stats.inProgress}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <AlertCircle
                  size={22}
                  className="text-blue-600"
                />
              </div>

            </div>
          </div>

          {/* Resolved */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Resolved
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {stats.resolved}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <CheckCircle2
                  size={22}
                  className="text-emerald-600"
                />
              </div>

            </div>
          </div>

          {/* Rejected */}
          <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Rejected
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {stats.rejected}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                <XCircle
                  size={22}
                  className="text-red-600"
                />
              </div>

            </div>
          </div>

        </div>

        {/* =====================================
            TABLE CONTAINER
        ===================================== */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Toolbar */}
          <div className="border-b border-gray-100 p-4 sm:p-5">

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

              {/* Search */}
              <div className="relative w-full lg:max-w-md">

                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search complaints, residents..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                />

              </div>

              {/* Filter */}
              <div className="flex items-center gap-3">

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-gray-400 sm:w-auto"
                >
                  <option value="">
                    All Status
                  </option>

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

            </div>
          </div>

          {/* =====================================
              TABLE
          ===================================== */}
          {loading ? (
            <div className="flex h-80 items-center justify-center">

              <div className="flex flex-col items-center gap-3">

                <Loader2
                  size={28}
                  className="animate-spin text-gray-500"
                />

                <p className="text-sm text-gray-500">
                  Loading complaints...
                </p>

              </div>

            </div>
          ) : paginatedComplaints.length === 0 ? (

            <div className="flex h-80 flex-col items-center justify-center">

              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <FileWarning
                  size={25}
                  className="text-gray-400"
                />
              </div>

              <h3 className="font-semibold text-gray-900">
                No complaints found
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or filter.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px] text-left">

                <thead className="border-b bg-gray-50/80">

                  <tr>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Resident
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Complaint
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Category
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Priority
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-100">

                  {paginatedComplaints.map((complaint) => {

                    const residentName =
                      typeof complaint.resident ===
                      "object"
                        ? complaint.resident.name
                        : "Resident";

                    const residentEmail =
                      typeof complaint.resident ===
                      "object"
                        ? complaint.resident.email
                        : "";

                    return (
                      <tr
                        key={complaint._id}
                        className="group transition hover:bg-gray-50/70"
                      >

                        {/* Resident */}
                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                              {residentName
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </div>

                            <div className="min-w-0">

                              <p className="truncate text-sm font-semibold text-gray-900">
                                {residentName}
                              </p>

                              <p className="truncate text-xs text-gray-500">
                                {residentEmail}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* Complaint */}
                        <td className="px-6 py-4">

                          <div className="max-w-sm">

                            <p className="truncate text-sm font-semibold text-gray-900">
                              {complaint.title}
                            </p>

                            <p className="mt-1 truncate text-xs text-gray-500">
                              {complaint.description}
                            </p>

                          </div>

                        </td>

                        {/* Category */}
                        <td className="px-6 py-4">

                          <span className="text-sm text-gray-600">
                            {complaint.category}
                          </span>

                        </td>

                        {/* Priority */}
                        <td className="px-6 py-4">

                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getPriorityStyle(
                              complaint.priority
                            )}`}
                          >
                            {complaint.priority}
                          </span>

                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">

                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                              complaint.status
                            )}`}
                          >
                            {complaint.status}
                          </span>

                        </td>

                        {/* Action */}
                        <td className="px-6 py-4 text-right">

                          <a
                            href={`/admin/complaints/${complaint._id}`}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-900 hover:text-white"
                          >
                            <Eye size={15} />
                            View
                          </a>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>
          )}

          {/* =====================================
              PAGINATION
          ===================================== */}
          {!loading && filteredComplaints.length > 0 && (

            <div className="flex flex-col gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

              {/* Showing */}
              <p className="text-sm text-gray-500">

                Showing{" "}
                <span className="font-semibold text-gray-700">
                  {(currentPage - 1) *
                    ITEMS_PER_PAGE +
                    1}
                </span>{" "}

                to{" "}
                <span className="font-semibold text-gray-700">
                  {Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    filteredComplaints.length
                  )}
                </span>{" "}

                of{" "}
                <span className="font-semibold text-gray-700">
                  {filteredComplaints.length}
                </span>{" "}
                complaints

              </p>

              {/* Pagination */}
              <div className="flex items-center gap-2">

                <button
                  onClick={() =>
                    handlePageChange(
                      currentPage - 1
                    )
                  }
                  disabled={currentPage === 1}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={17} />
                </button>

                {/* Page Numbers */}
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                )
                  .slice(
                    Math.max(0, currentPage - 3),
                    Math.min(
                      totalPages,
                      currentPage + 2
                    )
                  )
                  .map((page) => (

                    <button
                      key={page}
                      onClick={() =>
                        handlePageChange(page)
                      }
                      className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition ${
                        currentPage === page
                          ? "bg-gray-900 text-white"
                          : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>

                  ))}

                <button
                  onClick={() =>
                    handlePageChange(
                      currentPage + 1
                    )
                  }
                  disabled={
                    currentPage === totalPages
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight size={17} />
                </button>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}