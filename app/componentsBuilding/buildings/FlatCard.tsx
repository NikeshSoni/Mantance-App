"use client";

import {
  Home,
  User,
} from "lucide-react";

import { Flat } from "../../types/flat";

interface FlatCardProps {
  flat: Flat;
}

export default function FlatCard({
  flat,
}: FlatCardProps) {
  const occupied =
    flat.occupancyStatus === "occupied";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Home size={21} />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            occupied
              ? "bg-green-50 text-green-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {occupied
            ? "Occupied"
            : "Vacant"}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-bold">
          {flat.flatNumber}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Wing {flat.wing} • Floor {flat.floor}
        </p>
      </div>

      <div className="mt-4 border-t pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Resident
          </span>

          <span className="text-sm font-medium capitalize">
            {flat.residentType}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Maintenance
          </span>

          <span className="font-semibold">
            ₹{flat.monthlyMaintenance}
          </span>
        </div>
      </div>

      {flat.resident && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-gray-50 p-3">
          <User size={17} />

          <div>
            <p className="text-sm font-medium">
              {flat.resident.name}
            </p>

            <p className="text-xs text-gray-500">
              {flat.resident.email}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}