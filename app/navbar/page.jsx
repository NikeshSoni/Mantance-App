

"use client";

import {
    Bell,
    CreditCard,
    FileText,
    Home,
    User,
    Users,
    Wrench,
    Calendar,
} from "lucide-react";
import { useEffect, useState } from "react";
import LogoutBtn from "../auth/logutBtn/page"
import { getUser } from "../services/auth.service";

const Navbar = () => {
    const [userName, setUserName] = useState("Resident");

    useEffect(() => {
        const user = getUser();
        if (user?.name) {
            setUserName(user.name);
        }
    }, []);

    return (
        <>
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                    {/* Left Section - Welcome */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block">
                            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-tight">
                                Resident Dashboard
                            </h1>
                            <div className="flex items-center gap-2">
                                <span className="text-blue-100">Welcome back,</span>
                                <span className="text-white font-semibold">{userName} 👋</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-400/20 text-green-100 border border-green-400/30">
                                    Online
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Actions & Profile */}
                    <div className="flex items-center gap-6">

                        {/* Notification with Badge */}
                        <div className="relative cursor-pointer group">
                            <div className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 group-hover:scale-105">
                                <Bell className="w-5 h-5 text-white" />
                            </div>
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg ring-2 ring-white/20">
                                3
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block w-px h-10 bg-white/20"></div>
                        <LogoutBtn />
                    </div>
                </div>
            </header>
        </>
    )
}


export default Navbar;