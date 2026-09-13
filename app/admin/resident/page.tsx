"use client";

import { useEffect, useState } from "react";

interface Resident {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  apartmentNumber?: string;
  role?: string;
}

export default function ResidentsPage() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/resident");

        console.log(res, "res");
        

        if (!res.ok) {
          throw new Error("Failed to fetch residents");
        }

        const data = await res.json();

        console.log("Residents API:", data);

        setResidents(data);
      } catch (error) {
        console.error("Error fetching residents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Residents</h1>
        <p>Loading residents...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Residents ({residents.length})
      </h1>

      {residents.length === 0 ? (
        <div className="text-gray-500">
          No residents found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {residents.map((resident) => (
            <div
              key={resident._id}
              className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                  {resident.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    {resident.name}
                  </h2>

                  <span className="text-sm text-gray-500 capitalize">
                    {resident.role || "Resident"}
                  </span>
                </div>
              </div>

              {/* Resident Details */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium">
                    {resident.email || "Not available"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-medium">
                    {resident.phone || "Not available"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Apartment
                  </p>
                  <p className="font-medium">
                    {resident.apartmentNumber || "Not assigned"}
                  </p>
                </div>
              </div>

              {/* Button */}
              <button
                className="mt-5 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                onClick={() => {
                  console.log("Selected resident:", resident);
                }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}