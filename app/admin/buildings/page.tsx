"use client";

import { useEffect, useState } from "react";

import {
  Building2,
  Plus,
  RefreshCw,
} from "lucide-react";

import BuildingCard from "../../componentsBuilding/buildings/BuildingCard";

import CreateBuildingModal from "../../componentsBuilding/buildings/CreateBuildingModal";

import {
  getBuildings,
} from "../../services/buildingService";

import { Building } from "../../types/building";

export default function BuildingsPage() {
  const [buildings, setBuildings] = useState<Building[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const loadBuildings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getBuildings();

      setBuildings(response.buildings);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load buildings"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBuildings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Building2 size={22} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Buildings
                </h1>

                <p className="text-sm text-gray-500">
                  Manage society buildings and flats.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={loadBuildings}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
            >
              <RefreshCw size={17} />
              Refresh
            </button>

            <button
              onClick={() =>
                setShowCreateModal(true)
              }
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Building
            </button>
          </div>
        </div>

        {/* Stats */}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-gray-500">
              Total Buildings
            </p>

            <p className="mt-2 text-3xl font-bold">
              {buildings.length}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-gray-500">
              Total Floors
            </p>

            <p className="mt-2 text-3xl font-bold">
              {buildings.reduce(
                (total, building) =>
                  total + building.totalFloors,
                0
              )}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-gray-500">
              Total Wings
            </p>

            <p className="mt-2 text-3xl font-bold">
              {buildings.reduce(
                (total, building) =>
                  total + building.wings.length,
                0
              )}
            </p>
          </div>
        </div>

        {/* Error */}

        {error && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Loading */}

        {loading ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>
        ) : buildings.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed bg-white p-12 text-center">
            <Building2
              size={40}
              className="mx-auto text-gray-400"
            />

            <h3 className="mt-4 font-semibold">
              No buildings found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Create your first building to start
              adding flats.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {buildings.map((building) => (
              <BuildingCard
                key={building._id}
                building={building}
              />
            ))}
          </div>
        )}
      </div>

      <CreateBuildingModal
        open={showCreateModal}
        onClose={() =>
          setShowCreateModal(false)
        }
        onSuccess={loadBuildings}
      />
    </div>
  );
}