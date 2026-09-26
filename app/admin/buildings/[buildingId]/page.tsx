"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  ArrowLeft,
  Building2,
  Home,
  Plus,
} from "lucide-react";

import {
  getBuildingById,
} from "../../../services/buildingService";

import {
  getFlats,
} from "../../../services/flatService";

import { Building } from "../../../types/building";
import { Flat } from "../../../types/flat";

import FlatCard from "../../../componentsBuilding/buildings/FlatCard";

import CreateFlatModal from "../../../componentsBuilding/buildings/CreateFlatModal";

interface PageProps {
  params: {
    buildingId: string;
  };
}

export default function BuildingDetailsPage({
  params,
}: PageProps) {
  const [building, setBuilding] =
    useState<Building | null>(null);

  const [flats, setFlats] =
    useState<Flat[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [showFlatModal, setShowFlatModal] =
    useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [buildingResponse, flatResponse] =
        await Promise.all([
          getBuildingById(params.buildingId),
          getFlats(params.buildingId),
        ]);

      setBuilding(
        buildingResponse.building
      );

      setFlats(flatResponse.flats);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load building"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [params.buildingId]);

  const occupiedCount = flats.filter(
    (flat) =>
      flat.occupancyStatus === "occupied"
  ).length;

  const vacantCount = flats.filter(
    (flat) =>
      flat.occupancyStatus === "vacant"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="h-40 animate-pulse rounded-2xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!building) {
    return (
      <div className="p-8">
        <p className="text-red-500">
          {error || "Building not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Back */}

        <Link
          href="/admin/buildings"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft size={17} />
          Back to Buildings
        </Link>

        {/* Building Header */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <Building2 size={28} />
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  {building.buildingName}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  {building.address}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                setShowFlatModal(true)
              }
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Flat
            </button>
          </div>

          {/* Stats */}

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Floors
              </p>

              <p className="mt-1 text-2xl font-bold">
                {building.totalFloors}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Wings
              </p>

              <p className="mt-1 text-2xl font-bold">
                {building.wings.length}
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-sm text-green-600">
                Occupied
              </p>

              <p className="mt-1 text-2xl font-bold text-green-700">
                {occupiedCount}
              </p>
            </div>

            <div className="rounded-xl bg-gray-100 p-4">
              <p className="text-sm text-gray-500">
                Vacant
              </p>

              <p className="mt-1 text-2xl font-bold">
                {vacantCount}
              </p>
            </div>
          </div>

          {/* Wings */}

          <div className="mt-5 flex flex-wrap gap-2">
            {building.wings.map((wing) => (
              <span
                key={wing}
                className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600"
              >
                Wing {wing}
              </span>
            ))}
          </div>
        </div>

        {/* Error */}

        {error && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Flats */}

        <div className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Flats
              </h2>

              <p className="text-sm text-gray-500">
                {flats.length} flats in this building
              </p>
            </div>
          </div>

          {flats.length === 0 ? (
            <div className="rounded-2xl border border-dashed bg-white p-12 text-center">
              <Home
                size={40}
                className="mx-auto text-gray-400"
              />

              <h3 className="mt-4 font-semibold">
                No flats yet
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Add the first flat to this building.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {flats.map((flat) => (
                <FlatCard
                  key={flat._id}
                  flat={flat}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <CreateFlatModal
        open={showFlatModal}
        buildingId={building._id}
        wings={building.wings}
        onClose={() =>
          setShowFlatModal(false)
        }
        onSuccess={loadData}
      />
    </div>
  );
}