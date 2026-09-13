"use client";

import { useState } from "react";
import {
  Building2,
  Bell,
  Menu,
  X,
  ChevronDown,
  Settings,
  User,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import LogoutBtn from "@/app/auth/logutBtn/page";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-2xl">

      {/* Top gradient line */}
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600" />

      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            LOGO
        ====================================================== */}
        <div className="group flex cursor-pointer items-center gap-3">

          {/* Logo */}
          <div className="relative">

            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-lg transition duration-300 group-hover:bg-blue-500/30" />

            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-600/25 transition duration-300 group-hover:scale-105 group-hover:rotate-2">
              <Building2
                size={22}
                strokeWidth={2.2}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Online indicator */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-green-500">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          </div>

          {/* Brand text */}
          <div className="leading-tight">
            <h1 className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-lg font-extrabold tracking-tight text-transparent sm:text-xl">
              Society Admin
            </h1>

            <div className="mt-0.5 hidden items-center gap-1.5 sm:flex">
              <ShieldCheck
                size={12}
                className="text-blue-600"
              />

              <p className="text-[11px] font-medium tracking-wide text-slate-400">
                MAINTENANCE MANAGEMENT
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            DESKTOP ACTIONS
        ====================================================== */}
        <div className="hidden items-center gap-3 md:flex">

          {/* Notification */}
          <button
            className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-transparent bg-slate-50 transition-all duration-300 hover:border-blue-100 hover:bg-blue-50 hover:shadow-md hover:shadow-blue-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Notifications"
          >
            <Bell
              size={20}
              className="text-slate-600 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-600"
            />

            {/* Notification dot */}
            <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
            </span>
          </button>

          {/* Divider */}
          <div className="mx-2 h-9 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent" />

          {/* =================================================
              PROFILE
          ================================================== */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="group flex items-center gap-3 rounded-2xl border border-transparent px-2.5 py-1.5 transition-all duration-300 hover:border-slate-200 hover:bg-slate-50 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-expanded={profileOpen}
            >

              {/* Avatar */}
              <div className="relative">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 font-bold text-white shadow-md shadow-indigo-500/20 transition duration-300 group-hover:scale-105">
                  A
                </div>

                {/* Online */}
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
              </div>

              {/* User info */}
              <div className="hidden text-left lg:block">
                <p className="text-sm font-bold text-slate-800">
                  Administrator
                </p>

                <p className="text-[11px] font-medium text-slate-400">
                  Society Admin
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`hidden text-slate-400 transition-transform duration-300 lg:block ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-14 w-60 animate-in fade-in zoom-in-95 slide-in-from-top-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/10 duration-200">

                {/* Profile header */}
                {/* <div className="mb-1 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-3">
                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white">
                      A
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Administrator
                      </p>

                      <p className="text-xs text-slate-500">
                        System Admin
                      </p>
                    </div>
                  </div>
                </div> */}

                {/* Dropdown options */}
                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-blue-600">
                  <User size={17} />
                  My Profile
                </button>

                {/* <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-blue-600">
                  <Settings size={17} />
                  Settings
                </button> */}

                <div className="my-1 h-px bg-slate-100" />

                {/* <div className="px-1">
                  <LogoutBtn />
                </div> */}
              </div>
            )}
          </div>

          {/* Logout */}
          {/* {!profileOpen && <LogoutBtn />} */}
        </div>

        {/* =====================================================
            MOBILE MENU BUTTON
        ====================================================== */}
        <button
          onClick={() => setMobileMenu((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 active:scale-95 md:hidden"
          aria-label={mobileMenu ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenu}
        >
          {mobileMenu ? (
            <X
              size={23}
              className="animate-in rotate-90 duration-200"
            />
          ) : (
            <Menu
              size={23}
              className="animate-in fade-in duration-200"
            />
          )}
        </button>
      </div>

      {/* =======================================================
          MOBILE MENU
      ======================================================== */}
      {mobileMenu && (
        <div className="animate-in slide-in-from-top-3 fade-in border-t border-slate-100 bg-white/95 px-4 pb-5 pt-4 shadow-xl backdrop-blur-xl duration-300 md:hidden">

          {/* Mobile Profile Card */}
          <div className="relative mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-4 text-white shadow-lg shadow-indigo-500/20">

            {/* Decorative circles */}
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 right-16 h-24 w-24 rounded-full bg-white/5" />

            <div className="relative flex items-center gap-3">

              <div className="relative">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 font-bold text-white ring-1 ring-white/30 backdrop-blur-md">
                  A
                </div>

                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-indigo-600 bg-green-400" />
              </div>

              <div>
                <p className="font-bold">
                  Administrator
                </p>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <ShieldCheck size={12} />
                  <p className="text-xs text-blue-100">
                    Society Admin
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Notifications */}
          <button
            className="group mb-2 flex w-full items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 transition-all hover:border-blue-100 hover:bg-blue-50"
          >
            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                <Bell
                  size={18}
                  className="text-blue-600 transition group-hover:scale-110"
                />
              </div>

              <div className="text-left">
                <p className="text-sm font-semibold text-slate-700">
                  Notifications
                </p>

                <p className="text-xs text-slate-400">
                  You have new notifications
                </p>
              </div>
            </div>

            {/* Notification count */}
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
              3
            </span>
          </button>

          {/* Mobile Settings */}
          <button className="mb-2 flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-100 hover:bg-blue-50 hover:text-blue-600">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-200">
              <Settings size={18} />
            </div>

            Settings
          </button>

          {/* Mobile Logout */}
          <div className="mt-3 border-t border-slate-100 pt-3">
            <LogoutBtn />
          </div>
        </div>
      )}
    </header>
  );
}
