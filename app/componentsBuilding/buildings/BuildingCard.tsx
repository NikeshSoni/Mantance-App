"use client";

import Link from "next/link";

import {
  Building2,
  ChevronRight,
  Layers3,
  MapPin,
} from "lucide-react";

import { Building } from "../../types/building";

interface BuildingCardProps {
  building: Building;
}

export default function BuildingCard({
  building,
}: BuildingCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Building2 size={24} />
        </div>

        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
          Active
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-semibold text-gray-900">
          {building.buildingName}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={15} />

          <span>{building.address}</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="flex items-center gap-2 text-gray-500">
            <Layers3 size={16} />

            <span className="text-xs">
              Floors
            </span>
          </div>

          <p className="mt-1 text-lg font-semibold">
            {building.totalFloors}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-xs text-gray-500">
            Wings
          </p>

          <p className="mt-1 text-lg font-semibold">
            {building.wings.length}
          </p>
        </div>
      </div>

      <Link
        href={`/admin/buildings/${building._id}`}
        className="mt-5 flex items-center justify-between rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        <span>Manage Building</span>

        <ChevronRight size={18} />
      </Link>
    </div>
  );
}