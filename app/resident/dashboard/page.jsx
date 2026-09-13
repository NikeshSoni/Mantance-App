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
import { useRouter } from "next/navigation";
import Navbar from "../../navbar/page";
import { getUser } from "../../services/auth.service";
import Link from "next/link";

export default function ResidentDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = getUser();
        if (!currentUser) {
            router.push("/auth/login");
        } else {
            setUser(currentUser);
        }
    }, [router]);

    const flatDisplay = user?.flatNumber
        ? `${user.buildingName ? user.buildingName + " - " : ""}${user.flatNumber}`
        : "Flat Assigned";

    const cards = [
        {
            title: "My Flat",
            value: flatDisplay,
            icon: Home,
            color: "bg-blue-500",
        },
        {
            title: "Pending Bill",
            value: "₹2,500",
            icon: CreditCard,
            color: "bg-red-500",
        },
        {
            title: "Complaints",
            value: "2 Active",
            icon: Wrench,
            color: "bg-yellow-500",
        },
        {
            title: "Visitors",
            value: "3 Today",
            icon: Users,
            color: "bg-green-500",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            {/* Content */}
            <main className="max-w-7xl mx-auto p-6">

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
                        >
                            <div>

                                <p className="text-gray-500">
                                    {card.title}
                                </p>

                                <h2 className="text-2xl font-bold mt-2">
                                    {card.value}
                                </h2>

                            </div>

                            <div
                                className={`${card.color} w-14 h-14 rounded-xl flex items-center justify-center text-white`}
                            >
                                <card.icon size={28} />
                            </div>

                        </div>
                    ))}

                </div>

                {/* Bottom Grid */}
                <div className="grid lg:grid-cols-2 gap-6 mt-8">

                    {/* Notices */}
                    <div className="bg-white rounded-xl shadow p-6">

                        <div className="flex items-center gap-2 mb-4">

                            <Bell className="text-blue-600" />

                            <h2 className="font-semibold text-lg">
                                Society Notices
                            </h2>

                        </div>

                        <ul className="space-y-4">

                            <li className="border-b pb-2">
                                Water supply maintenance on Sunday.
                            </li>

                            <li className="border-b pb-2">
                                Independence Day celebration on 15 August.
                            </li>

                            <li>
                                Parking stickers available at office.
                            </li>

                        </ul>

                    </div>

                    {/* Recent Payments */}
                    <div className="bg-white rounded-xl shadow p-6">

                        <div className="flex items-center gap-2 mb-4">

                            <CreditCard className="text-green-600" />

                            <h2 className="font-semibold text-lg">
                                Recent Payments
                            </h2>

                        </div>

                        <table className="w-full">

                            <thead>

                                <tr className="text-left text-gray-500">

                                    <th>Date</th>

                                    <th>Amount</th>

                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                <tr className="border-t">

                                    <td className="py-3">
                                        01 Aug
                                    </td>

                                    <td>
                                        ₹2500
                                    </td>

                                    <td className="text-green-600 font-medium">
                                        Paid
                                    </td>

                                </tr>

                                <tr className="border-t">

                                    <td className="py-3">
                                        01 Jul
                                    </td>

                                    <td>
                                        ₹2500
                                    </td>

                                    <td className="text-green-600 font-medium">
                                        Paid
                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow mt-8 p-6">

                    <h2 className="font-semibold text-xl mb-5">
                        Quick Actions
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                        <button className="border rounded-xl p-5 hover:bg-blue-50 transition">

                            <CreditCard className="mx-auto mb-2" />

                            Pay Maintenance

                        </button>

                        <Link className="border rounded-xl p-5 text-center hover:bg-blue-50 transition" href="/resident/complaints/raise" >
                            <Wrench className="mx-auto mb-2" />
                            {/* <button className="text-center mb-2"> */}

                                Raise Complaint
                            {/* </button> */}
                        </Link>

                        <button className="border rounded-xl p-5 hover:bg-blue-50 transition">

                            <Users className="mx-auto mb-2" />

                            Invite Visitor

                        </button>

                        <button className="border rounded-xl p-5 hover:bg-blue-50 transition">

                            <Calendar className="mx-auto mb-2" />

                            Book Amenities

                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
}