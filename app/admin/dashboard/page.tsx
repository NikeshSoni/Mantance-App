"use client";

import {
  Bell,
  Building2,
  CreditCard,
  Users,
  Wrench,
  IndianRupee,
  Settings,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
  Clock3,
  TrendingUp,
  Menu,
  X,
  ChevronRight,
  Eye,
  Loader2,
  FileWarning,
} from "lucide-react";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../navbar/Navbar";

import { getAllComplaints } from "@/app/services/complaint.service";
import { Complaint } from "@/app/types/complaint";

const AdminDashboard = () => {
  const router = useRouter();
  // const [mobileMenu, setMobileMenu] = useState(false);


  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [pendingComplaint, setPendingComplaint] = useState<Complaint[]>([]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      // All complaints based on filter
      const response = await getAllComplaints({
        status: statusFilter || undefined,
      });

      // Only pending complaints
      const response1 = await getAllComplaints({
        status: "Pending",
      });

      setComplaints(response.complaints || []);

      setPendingComplaint(response1.complaints || ["0"]);
    } catch (error) {
      console.error("Failed to fetch complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [statusFilter]);

  console.log("Pending complaints:", pendingComplaint);


  useEffect(() => {
    fetchComplaints();
  }, [statusFilter]);

  // Reset pagination when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, search]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.role !== "admin") {
      router.push("/auth/login");
    }
  }, [router]);

  const stats = [
    {
      title: "Total Residents",
      value: "245",
      change: "+12.5%",
      description: "vs last month",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      valueColor: "text-gray-900",
      link: "/admin/residents",
    },
    {
      title: "Total Flats",
      value: "120",
      change: "+4.2%",
      description: "vs last month",
      icon: Building2,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      valueColor: "text-gray-900",
      link: "/admin/flats",
    },
    {
      title: "Pending Complaints",
      value: "18",
      change: "-8.4%",
      description: "vs last month",
      icon: Wrench,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      valueColor: "text-red-600",
      link: "/admin/complaints",
    },
    {
      title: "Maintenance Collection",
      value: "₹3,25,000",
      change: "+14.8%",
      description: "vs last month",
      icon: IndianRupee,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      valueColor: "text-green-600",
      link: "/admin/maintenance",
    },
  ];



  const payments = [
    {
      name: "Rahul Sharma",
      flat: "A-203",
      amount: "₹2,500",
      status: "Paid",
    },
    {
      name: "Amit Kumar",
      flat: "B-102",
      amount: "₹2,500",
      status: "Paid",
    },
    {
      name: "Neha Patel",
      flat: "C-401",
      amount: "₹2,500",
      status: "Pending",
    },
    {
      name: "Priya Singh",
      flat: "A-105",
      amount: "₹2,500",
      status: "Paid",
    },
  ];

  const quickActions = [
    {
      title: "Residents",
      description: "Manage residents",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      hover: "hover:border-blue-300 hover:bg-blue-50",
      action: () => router.push("/admin/resident"),
    },
    {
      title: "Flats",
      description: "Manage properties",
      icon: Building2,
      color: "text-purple-600",
      bg: "bg-purple-50",
      hover: "hover:border-purple-300 hover:bg-purple-50",
      action: () => { },
    },
    {
      title: "Bills",
      description: "Manage payments",
      icon: CreditCard,
      color: "text-green-600",
      bg: "bg-green-50",
      hover: "hover:border-green-300 hover:bg-green-50",
      action: () => { },
    },
    {
      title: "Requests",
      description: "Member requests",
      icon: Users,
      color: "text-orange-600",
      bg: "bg-orange-50",
      hover: "hover:border-orange-300 hover:bg-orange-50",
      action: () => router.push("/admin/memberrequests"),
    },
    {
      title: "Complaints",
      description: "View complaints",
      icon: Wrench,
      color: "text-red-600",
      bg: "bg-red-50",
      hover: "hover:border-red-300 hover:bg-red-50",
      action: () => { },
    },
    {
      title: "Settings",
      description: "System settings",
      icon: Settings,
      color: "text-gray-600",
      bg: "bg-gray-100",
      hover: "hover:border-gray-400 hover:bg-gray-100",
      action: () => { },
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      {/* ================= HEADER ================= */}

      <Navbar />
      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* ================= WELCOME ================= */}
        <section className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white shadow-xl shadow-blue-500/10 sm:p-8">
            {/* Decorative circles */}
            <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 right-32 h-40 w-40 rounded-full bg-white/5" />

            <div className="relative">
              <p className="mb-1 text-sm font-medium text-blue-100">
                Welcome back 👋
              </p>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Good Afternoon, Administrator
              </h2>

              <p className="mt-2 max-w-xl text-sm text-blue-100 sm:text-base">
                Here's what's happening with your society today.
              </p>
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Overview</h2>
              <p className="text-sm text-gray-500">
                Society performance at a glance
              </p>
            </div>

            <button className="hidden items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 sm:flex">
              View Reports
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group animate-in fade-in slide-in-from-bottom-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <Link
                    href={item.link}
                    className="block"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {item.title}
                        </p>
                        <h3
                          className={`mt-2 text-2xl font-bold sm:text-3xl ${item.valueColor}`}
                        >
                        {pendingComplaint.length}
                        </h3>
                      </div>

                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg} transition duration-300 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        <Icon
                          size={23}
                          className={item.iconColor}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 font-semibold text-green-600">
                        <TrendingUp size={12} />
                        {item.change}
                      </span>

                      <span className="text-gray-400">
                        {item.description}
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div> */}


          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div
              className="group animate-in fade-in slide-in-from-bottom-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link
                href="/admin/complaints?status=Pending"
                className="block"
              >
                {/* Top Section */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Pending Complaints
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                      {pendingComplaint.length}
                    </h3>
                  </div>

                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 transition duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Clock3
                      size={23}
                      className="text-amber-600"
                    />
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Take an action!
                  </span>

                  <span className="text-xs font-semibold text-gray-900 transition-transform duration-300 group-hover:translate-x-1">
                    View →
                  </span>
                </div>
              </Link>
            </div>
            <div
              className="group animate-in fade-in slide-in-from-bottom-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link
                href="/admin/complaints?status=Pending"
                className="block"
              >
                {/* Top Section */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Pending Complaints
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                      {pendingComplaint.length}
                    </h3>
                  </div>

                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 transition duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Clock3
                      size={23}
                      className="text-amber-600"
                    />
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Take an action!
                  </span>

                  <span className="text-xs font-semibold text-gray-900 transition-transform duration-300 group-hover:translate-x-1">
                    View →
                  </span>
                </div>
              </Link>
            </div>

            <div
              className="group animate-in fade-in slide-in-from-bottom-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link
                href="/admin/complaints?status=Pending"
                className="block"
              >
                {/* Top Section */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Pending Complaints
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                      {pendingComplaint.length}
                    </h3>
                  </div>

                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 transition duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Clock3
                      size={23}
                      className="text-amber-600"
                    />
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Take an action!
                  </span>

                  <span className="text-xs font-semibold text-gray-900 transition-transform duration-300 group-hover:translate-x-1">
                    View →
                  </span>
                </div>
              </Link>
            </div>

            <div
              className="group animate-in fade-in slide-in-from-bottom-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link
                href="/admin/complaints?status=Pending"
                className="block"
              >
                {/* Top Section */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Pending Complaints
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                      {pendingComplaint.length}
                    </h3>
                  </div>

                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 transition duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Clock3
                      size={23}
                      className="text-amber-600"
                    />
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Take an action!
                  </span>

                  <span className="text-xs font-semibold text-gray-900 transition-transform duration-300 group-hover:translate-x-1">
                    View →
                  </span>
                </div>
              </Link>
            </div>
          </div>
          {/* </div> */}

          {/* {pendingComplaint.map((item) => {
            return (
              <div key={item._id}>
                {item.title}
              </div>
            );
          })} */}
        </section>

        {/* ================= CONTENT ================= */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* ================= COMPLAINTS ================= */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                  <Wrench className="text-red-600" size={20} />
                </div>

                <div>
                  <h2 className="font-bold">Recent Complaints</h2>
                  <p className="text-xs text-gray-500">
                    Latest maintenance issues
                  </p>
                </div>
              </div>

              <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
                View all
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              {/* Table Header */}
              <div className="border-b border-gray-100 px-5 py-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Complaints
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage and monitor resident complaints.
                  </p>
                </div>
              </div>

              {/* Loading */}
              {loading ? (
                <div className="flex h-64 items-center justify-center">
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
              ) : complaints.length === 0 ? (
                /* Empty State */
                <div className="flex h-64 flex-col items-center justify-center">
                  <FileWarning
                    size={32}
                    className="mb-3 text-gray-300"
                  />

                  <p className="font-medium text-gray-900">
                    No complaints found
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    There are no complaints to display.
                  </p>
                </div>
              ) : (
                /* Table */
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[950px] text-left">
                    <thead className="border-b border-gray-100 bg-gray-50">
                      <tr>
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Resident
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Complaint
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Category
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Priority
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Status
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Created
                        </th>

                        <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {complaints.map((item, idx) => {
                        const resident =
                          typeof item.resident === "object"
                            ? item.resident
                            : null;

                        return (
                          <tr
                            key={item._id}
                            className="group transition-colors hover:bg-gray-50"
                          >
                            {/* Resident */}
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                {/* Avatar */}
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                                  {resident?.name
                                    ?.charAt(0)
                                    ?.toUpperCase() || "R"}
                                </div>

                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold text-gray-900">
                                    {resident?.name || "Unknown Resident"}
                                  </p>

                                  <p className="truncate text-xs text-gray-500">
                                    {resident?.email || "No email"}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Complaint */}
                            <td className="px-5 py-4">
                              <div className="max-w-xs">
                                <p className="truncate text-sm font-semibold text-gray-900">
                                  {item.title}
                                </p>

                                <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                                  {item.description}
                                </p>
                              </div>
                            </td>

                            {/* Category */}
                            <td className="px-5 py-4">
                              <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                {item.category}
                              </span>
                            </td>

                            {/* Priority */}
                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.priority === "Urgent"
                                  ? "bg-red-50 text-red-700"
                                  : item.priority === "High"
                                    ? "bg-orange-50 text-orange-700"
                                    : item.priority === "Medium"
                                      ? "bg-yellow-50 text-yellow-700"
                                      : "bg-green-50 text-green-700"
                                  }`}
                              >
                                {item.priority}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.status === "Pending"
                                  ? "bg-yellow-50 text-yellow-700"
                                  : item.status === "In Progress"
                                    ? "bg-blue-50 text-blue-700"
                                    : item.status === "Resolved"
                                      ? "bg-green-50 text-green-700"
                                      : item.status === "Rejected"
                                        ? "bg-red-50 text-red-700"
                                        : "bg-gray-100 text-gray-700"
                                  }`}
                              >
                                {item.status}
                              </span>
                            </td>

                            {/* Created */}
                            <td className="px-5 py-4">
                              <p className="text-sm font-medium text-gray-700">
                                {new Date(
                                  item.createdAt
                                ).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                {new Date(
                                  item.createdAt
                                ).toLocaleTimeString("en-IN", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </td>

                            {/* Action */}
                            <td className="px-5 py-4 text-right">
                              <Link
                                href={`/admin/complaints/${item._id}`}
                                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                              >
                                <Eye size={14} />
                                View
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Footer */}
              {!loading && complaints.length > 0 && (
                <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4">
                  <p className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-semibold text-gray-700">
                      {complaints.length}
                    </span>{" "}
                    complaints
                  </p>

                  <Link
                    href="/admin/complaints"
                    className="text-sm font-semibold text-gray-900 hover:underline"
                  >
                    View all →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* ================= PAYMENTS ================= */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                  <CreditCard className="text-green-600" size={20} />
                </div>

                <div>
                  <h2 className="font-bold">Recent Payments</h2>
                  <p className="text-xs text-gray-500">
                    Latest maintenance payments
                  </p>
                </div>
              </div>

              <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
                View all
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                    <th className="pb-3 font-medium">Resident</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 text-right font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((payment) => (
                    <tr
                      key={payment.name}
                      className="border-b border-gray-50 last:border-0"
                    >
                      <td className="py-3">
                        <div>
                          <p className="text-sm font-semibold">
                            {payment.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            Flat {payment.flat}
                          </p>
                        </div>
                      </td>

                      <td className="text-sm font-semibold">
                        {payment.amount}
                      </td>

                      <td className="text-right">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${payment.status === "Paid"
                            ? "bg-green-50 text-green-600"
                            : "bg-yellow-50 text-yellow-600"
                            }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Payments */}
            <div className="space-y-3 sm:hidden">
              {payments.map((payment) => (
                <div
                  key={payment.name}
                  className="flex items-center justify-between rounded-xl bg-gray-50 p-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{payment.name}</p>
                    <p className="text-xs text-gray-500">
                      Flat {payment.flat}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold">{payment.amount}</p>

                    <span
                      className={`text-xs font-semibold ${payment.status === "Paid"
                        ? "text-green-600"
                        : "text-yellow-600"
                        }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= QUICK ACTIONS ================= */}
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Quick Actions</h2>
            <p className="text-sm text-gray-500">
              Quickly access important sections
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.title}
                  onClick={action.action}
                  className={`group animate-in fade-in zoom-in rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${action.hover}`}
                  style={{
                    animationDelay: `${index * 80}ms`,
                  }}
                >
                  <div
                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${action.bg} transition duration-300 group-hover:scale-110`}
                  >
                    <Icon size={21} className={action.color} />
                  </div>

                  <p className="text-sm font-bold">{action.title}</p>

                  <p className="mt-1 hidden text-xs text-gray-400 sm:block">
                    {action.description}
                  </p>

                  <div className="mt-3 flex items-center text-xs font-medium text-gray-400 transition group-hover:text-blue-600">
                    Open
                    <ArrowUpRight
                      size={13}
                      className="ml-1 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="mt-10 border-t border-gray-200 pt-5 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Society Maintenance Management System
        </footer>
      </main>
    </div >
  );
};

export default AdminDashboard;
