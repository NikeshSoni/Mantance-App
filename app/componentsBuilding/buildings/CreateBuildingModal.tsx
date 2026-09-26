"use client";

import { FormEvent, useState } from "react";

import { X } from "lucide-react";

import {
  createBuilding,
} from "../../services/buildingService";

interface CreateBuildingModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateBuildingModal({
  open,
  onClose,
  onSuccess,
}: CreateBuildingModalProps) {
  const [buildingName, setBuildingName] = useState("");
  const [address, setAddress] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [wings, setWings] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) {
    return null;
  }

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!buildingName || !address || !totalFloors) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const wingArray = wings
        .split(",")
        .map((wing) => wing.trim().toUpperCase())
        .filter(Boolean);

      await createBuilding({
        buildingName,
        address,
        totalFloors: Number(totalFloors),
        wings: wingArray,
      });

      setBuildingName("");
      setAddress("");
      setTotalFloors("");
      setWings("");

      onSuccess();
      onClose();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create building"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Create Building
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add a new building to your society.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-5"
        >
          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Building Name
            </label>

            <input
              type="text"
              value={buildingName}
              onChange={(e) =>
                setBuildingName(e.target.value)
              }
              placeholder="Building A"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Address
            </label>

            <textarea
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              placeholder="Mumbai, Maharashtra"
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Total Floors
            </label>

            <input
              type="number"
              min="1"
              value={totalFloors}
              onChange={(e) =>
                setTotalFloors(e.target.value)
              }
              placeholder="10"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Wings
            </label>

            <input
              type="text"
              value={wings}
              onChange={(e) =>
                setWings(e.target.value)
              }
              placeholder="A, B, C"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />

            <p className="mt-1 text-xs text-gray-400">
              Separate multiple wings with commas.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Building"}
          </button>
        </form>
      </div>
    </div>
  );
}