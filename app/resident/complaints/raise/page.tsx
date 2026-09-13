"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Send,
  Loader2,
} from "lucide-react";

import {
  createComplaint,
} from "@/app/services/complaint.service";

import {
  ComplaintCategory,
  ComplaintPriority,
} from "@/app/types/complaint";

export default function RaiseComplaintPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Other" as ComplaintCategory,
    priority: "Medium" as ComplaintPriority,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!form.title.trim()) {
      setError("Please enter complaint title.");
      return;
    }

    if (!form.description.trim()) {
      setError("Please enter complaint description.");
      return;
    }

    try {
      setLoading(true);

      await createComplaint(form);

      router.push("/resident/complaints");

    } catch (error: any) {
      console.error(error);

      setError(
        error?.response?.data?.message ||
          "Failed to raise complaint."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Raise a Complaint
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Report an issue to your society administration.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">

          {error && (
            <div className="mb-5 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Complaint Title
              </label>

              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                placeholder="e.g. Water leakage in bathroom"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category:
                      e.target.value as ComplaintCategory,
                  })
                }
                className="w-full rounded-lg border px-4 py-3 outline-none"
              >
                <option value="Maintenance">
                  Maintenance
                </option>
                <option value="Water">Water</option>
                <option value="Electricity">
                  Electricity
                </option>
                <option value="Security">Security</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Parking">Parking</option>
                <option value="Noise">Noise</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Priority
              </label>

              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({
                    ...form,
                    priority:
                      e.target.value as ComplaintPriority,
                  })
                }
                className="w-full rounded-lg border px-4 py-3 outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <textarea
                rows={6}
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                placeholder="Describe your complaint..."
                className="w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Raise Complaint
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}