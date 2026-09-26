"use client";

import { FormEvent, useState } from "react";

import { X } from "lucide-react";

import { createFlat } from "../../services/flatService";

interface CreateFlatModalProps {
  open: boolean;
  buildingId: string;
  wings: string[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateFlatModal({
  open,
  buildingId,
  wings,
  onClose,
  onSuccess,
}: CreateFlatModalProps) {
  const [flatNumber, setFlatNumber] = useState("");
  const [wing, setWing] = useState(wings[0] || "");
  const [floor, setFloor] = useState("");

  const [occupancyStatus, setOccupancyStatus] =
    useState<"occupied" | "vacant">("vacant");

  const [residentType, setResidentType] =
    useState<"owner" | "tenant" | "none">("none");

  const [monthlyMaintenance, setMonthlyMaintenance] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!flatNumber || !wing || !floor) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await createFlat({
        building: buildingId,
        flatNumber,
        wing,
        floor: Number(floor),
        occupancyStatus,
        residentType,
        monthlyMaintenance:
          Number(monthlyMaintenance) || 0,
      });

      setFlatNumber("");
      setFloor("");
      setOccupancyStatus("vacant");
      setResidentType("none");
      setMonthlyMaintenance("");

      onSuccess();
      onClose();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create flat"
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
            <h2 className="text-xl font-semibold">
              Add Flat
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add a flat to this building.
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
              Flat Number
            </label>

            <input
              type="text"
              value={flatNumber}
              onChange={(e) =>
                setFlatNumber(e.target.value)
              }
              placeholder="101"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Wing
              </label>

              <select
                value={wing}
                onChange={(e) =>
                  setWing(e.target.value)
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
              >
                {wings.map((item) => (
                  <option key={item} value={item}>
                    Wing {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Floor
              </label>

              <input
                type="number"
                min="0"
                value={floor}
                onChange={(e) =>
                  setFloor(e.target.value)
                }
                placeholder="1"
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Occupancy
            </label>

            <select
              value={occupancyStatus}
              onChange={(e) =>
                setOccupancyStatus(
                  e.target.value as
                    | "occupied"
                    | "vacant"
                )
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="vacant">
                Vacant
              </option>

              <option value="occupied">
                Occupied
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Resident Type
            </label>

            <select
              value={residentType}
              onChange={(e) =>
                setResidentType(
                  e.target.value as
                    | "owner"
                    | "tenant"
                    | "none"
                )
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="none">
                None
              </option>

              <option value="owner">
                Owner
              </option>

              <option value="tenant">
                Tenant
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Monthly Maintenance
            </label>

            <input
              type="number"
              min="0"
              value={monthlyMaintenance}
              onChange={(e) =>
                setMonthlyMaintenance(
                  e.target.value
                )
              }
              placeholder="2500"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Flat"}
          </button>
        </form>
      </div>
    </div>
  );
}