"use client";

import { useRouter } from "next/navigation";
import { logoutUser, getUser, UserProfile } from "../../services/auth.service";
import { User, LogOut, ChevronDown, Settings, UserCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function LogoutBtn() {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const currentUser = getUser();
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

    const handleLogout = () => {
        logoutUser();
        router.replace("/auth/login");
    };

    const displayName = user?.name || "Resident User";
    const displayRole = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Resident";

    return (
        <div className="flex items-center gap-4">
            {/* Logout Button - Modern Design */}
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 font-medium"
            >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
            </button>

            {/* User Profile - Modern Card with Dropdown */}
            <div className="relative">
                <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full pr-4 pl-2 py-2 hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/10 hover:border-white/20 shadow-lg group"
                >
                    {/* Avatar with Gradient Ring */}
                    <div className="relative">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 ring-2 ring-white/20 group-hover:ring-white/40 font-bold">
                            {displayName.charAt(0).toUpperCase()}
                        </div>
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
                    </div>

                    {/* User Info */}
                    <div className="hidden md:block">
                        <h2 className="font-semibold text-white text-sm leading-tight">
                            {displayName}
                        </h2>
                        <p className="text-xs text-blue-200/80 flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                            {displayRole}
                        </p>
                    </div>

                    {/* Dropdown Arrow with rotation animation */}
                    <ChevronDown
                        size={18}
                        className={`text-white/60 group-hover:text-white transition-all duration-300 ${
                            isDropdownOpen ? "rotate-180" : ""
                        }`}
                    />
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 z-50 animate-slideDown">
                        {/* User Info - Mobile View */}
                        <div className="px-4 py-3 border-b border-white/10 md:hidden">
                            <h3 className="text-white font-semibold">{displayName}</h3>
                            <p className="text-blue-200/80 text-sm">{displayRole}</p>
                        </div>

                        <button className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group">
                            <UserCircle size={18} className="group-hover:scale-110 transition-transform" />
                            <span className="text-sm">Profile</span>
                        </button>

                        <button className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group">
                            <Settings size={18} className="group-hover:scale-110 transition-transform" />
                            <span className="text-sm">Settings</span>
                        </button>

                        <div className="border-t border-white/10 my-1"></div>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 group"
                        >
                            <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium">Sign Out</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}