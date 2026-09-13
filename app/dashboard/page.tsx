"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ResidentDashboard from "../resident/dashboard/page";
import { getUser, isAuthenticated, UserProfile } from "../services/auth.service";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }

    const currentUser = getUser();
    if (!currentUser) {
      router.push("/auth/login");
      return;
    }

    if (currentUser.role === "admin") {
      router.push("/admin/dashboard");
      return;
    }

    setUser(currentUser);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return <ResidentDashboard />;
}