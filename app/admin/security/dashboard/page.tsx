"use client";

import Navbar from "@/app/navbar/page";

export default function SecurityDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Security Dashboard</h1>
        <p className="text-gray-600">Visitor check-in and security gate management portal.</p>
      </main>
    </div>
  );
}
