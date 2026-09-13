"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clock3,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from "lucide-react";

import {
  getMemberRequestById,
} from "../../services/memberRequest.service"

interface RequestData {
  _id: string;
  fullName: string;
  email: string;
  status:
    | "pending"
    | "approved"
    | "rejected";
}

export default function RequestStatusPage() {
  const router = useRouter();

  const [request, setRequest] =
    useState<RequestData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const checkStatus = async () => {
    try {
      const requestId =
        localStorage.getItem(
          "memberRequestId"
        );

      if (!requestId) {
        setError(
          "Membership request not found."
        );
        setLoading(false);
        return;
      }

      const response =
        await getMemberRequestById(
          requestId
        );

      const data = response.data;

      setRequest(data);

      /*
       * ADMIN APPROVED
       */
      if (data.status === "approved") {
        localStorage.removeItem("memberRequestId");
        // Keep status as approved to render celebratory screen before redirect
        setRequest(data);
        return;
      }

    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to check request"
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * Initial check
   */
  useEffect(() => {
    checkStatus();
  }, []);

  /*
   * Check every 10 seconds
   */
  useEffect(() => {
    const interval = setInterval(
      () => {
        checkStatus();
      },
      10000
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  /*
   * Loading
   */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <RefreshCw className="mx-auto h-8 w-8 animate-spin text-blue-600" />

          <p className="mt-4 text-gray-600">
            Checking your request...
          </p>
        </div>
      </div>
    );
  }

  /*
   * Error
   */
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow">

          <XCircle className="mx-auto h-14 w-14 text-red-500" />

          <h1 className="mt-4 text-xl font-bold">
            Something went wrong
          </h1>

          <p className="mt-2 text-gray-500">
            {error}
          </p>

          <button
            onClick={checkStatus}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white"
          >
            Try Again
          </button>

        </div>
      </div>
    );
  }

  if (!request) {
    return null;
  }

  /*
  /*
   * APPROVED
   */
  if (request.status === "approved") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-xl border border-gray-100">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
            <CheckCircle2 className="h-12 w-12" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Account Approved! 🎉
          </h1>

          <p className="mt-3 text-gray-600">
            Hi <span className="font-semibold text-gray-900">{request.fullName}</span>, your membership request has been approved by the Admin.
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Your resident account is now active. You can now sign in with your email and password.
          </p>

          <div className="mt-8">
            <button
              onClick={() => router.push("/auth/login")}
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 shadow-lg shadow-emerald-200 transition duration-200 flex items-center justify-center gap-2"
            >
              Sign In to Your Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * REJECTED
   */
  if (request.status === "rejected") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

        <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow">

          <XCircle className="mx-auto h-16 w-16 text-red-500" />

          <h1 className="mt-5 text-2xl font-bold">
            Request Rejected
          </h1>

          <p className="mt-3 text-gray-500">
            Sorry, your membership request
            was rejected by the admin.
          </p>

        </div>

      </div>
    );
  }

  /*
   * PENDING
   */
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">

          <Clock3 className="h-10 w-10 text-yellow-600" />

        </div>

        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          Waiting for Admin Approval
        </h1>

        <p className="mt-3 text-gray-500">
          Hi{" "}
          <span className="font-semibold text-gray-800">
            {request.fullName}
          </span>
          , your membership request has
          been submitted successfully.
        </p>

        <p className="mt-2 text-sm text-gray-400">
          The admin is currently reviewing
          your details.
        </p>

        {/* Status */}

        <div className="mt-8 rounded-xl bg-yellow-50 p-5">

          <div className="flex items-center justify-center gap-3">

            <Clock3 className="h-5 w-5 text-yellow-600" />

            <span className="font-semibold text-yellow-700">
              Request Pending
            </span>

          </div>

          <p className="mt-2 text-sm text-yellow-600">
            This page will automatically
            update once the admin approves
            your request.
          </p>

        </div>

        {/* Loader */}

        <div className="mt-8">

          <div className="h-2 overflow-hidden rounded-full bg-gray-200">

            <div className="h-full w-1/2 animate-pulse rounded-full bg-yellow-500" />

          </div>

          <p className="mt-3 text-xs text-gray-400">
            Checking approval status every
            10 seconds...
          </p>

        </div>

        {/* Manual refresh */}

        <button
          onClick={checkStatus}
          className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4" />
          Check Now
        </button>

      </div>

    </div>
  );
}