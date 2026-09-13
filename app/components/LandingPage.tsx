"use client";

import {
  ArrowRight,
  Bell,
  Building2,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
              <Building2 size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Society<span className="text-emerald-600">Hub</span>
              </h1>
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
                Smart Society Management
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
            >
              Home
            </a>

            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
            >
              How It Works
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
            >
              About
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/auth/login"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-lg p-2 text-slate-700 md:hidden"
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              <a href="#home" className="font-medium">
                Home
              </a>

              <a href="#features" className="font-medium">
                Features
              </a>

              <a href="#how-it-works" className="font-medium">
                How It Works
              </a>

              <a href="#about" className="font-medium">
                About
              </a>

              <hr />

              <Link
                href="/auth/login"
                className="rounded-xl border border-slate-200 px-5 py-3 text-center font-semibold"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-emerald-600 px-5 py-3 text-center font-semibold text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="relative overflow-hidden bg-slate-50"
      >
        {/* Background Decorations */}
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          {/* Hero Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-semibold text-emerald-700">
                Smart Society Management
              </span>
            </div>

            <h2 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Manage Your Society
              <span className="block text-emerald-600">
                Smarter & Simpler.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              One powerful platform to manage residents, maintenance
              payments, complaints, notices, approvals and your entire
              society — all in one place.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/register"
                className="group flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white shadow-xl shadow-emerald-600/20 transition hover:bg-emerald-700"
              >
                Get Started
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#features"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                Explore Features
                <ChevronRight size={18} />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-emerald-600" size={18} />
                Easy to use
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-emerald-600" size={18} />
                Secure
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-emerald-600" size={18} />
                Admin controlled
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-emerald-500/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
              {/* Fake Dashboard Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <LayoutDashboard size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold">Admin Dashboard</p>
                    <p className="text-xs text-slate-400">
                      SocietyHub Management
                    </p>
                  </div>
                </div>

                <div className="h-9 w-9 rounded-full bg-slate-100" />
              </div>

              <div className="p-5">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <DashboardCard
                    icon={<Users size={18} />}
                    title="Total Residents"
                    value="248"
                  />

                  <DashboardCard
                    icon={<CreditCard size={18} />}
                    title="Maintenance"
                    value="₹1.28L"
                  />

                  <DashboardCard
                    icon={<Wrench size={18} />}
                    title="Open Complaints"
                    value="12"
                  />

                  <DashboardCard
                    icon={<Bell size={18} />}
                    title="Pending Requests"
                    value="08"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 py-12 sm:grid-cols-4 lg:px-8">
          <Stat value="500+" label="Residents" />
          <Stat value="50+" label="Societies" />
          <Stat value="10K+" label="Records Managed" />
          <Stat value="99.9%" label="Secure Platform" />
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">
              Powerful Features
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Everything your society needs
            </h2>

            <p className="mt-4 text-slate-600">
              Manage your entire society from one simple and powerful platform.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Users />}
              title="Resident Management"
              description="Manage resident profiles, family members, flats and resident approvals from one place."
            />

            <FeatureCard
              icon={<CreditCard />}
              title="Maintenance & Payments"
              description="Track monthly maintenance, payments, pending dues and payment history."
            />

            <FeatureCard
              icon={<Wrench />}
              title="Complaints & Requests"
              description="Residents can submit complaints and requests while admins can track and resolve them."
            />

            <FeatureCard
              icon={<Bell />}
              title="Notices & Announcements"
              description="Share important society notices, announcements and updates with residents."
            />

            <FeatureCard
              icon={<ShieldCheck />}
              title="Approval System"
              description="Keep new residents in a waiting state until the admin reviews and approves their account."
            />

            <FeatureCard
              icon={<LayoutDashboard />}
              title="Admin Dashboard"
              description="Get a complete overview of residents, payments, requests and society activities."
            />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-emerald-600 px-8 py-16 text-center text-white sm:px-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to manage your society smarter?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-emerald-100">
            Bring residents, administrators, maintenance and society
            operations together in one modern platform.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-emerald-700 shadow-xl transition hover:bg-emerald-50"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <Building2 size={18} />
            </div>

            <div>
              <p className="font-bold">
                Society<span className="text-emerald-600">Hub</span>
              </p>

              <p className="text-xs text-slate-400">
                Smart Society Management
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-slate-500">
            <Link href="/auth/login" className="hover:text-emerald-600">
              Login
            </Link>
            <Link href="/register" className="hover:text-emerald-600">
              Register
            </Link>
          </div>

          <p className="text-sm text-slate-400">
            © 2026 SocietyHub
          </p>
        </div>
      </footer>
    </main>
  );
}

function DashboardCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
        {icon}
      </div>

      <p className="text-xs text-slate-500">{title}</p>

      <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="border-slate-200 px-4 py-4 text-center sm:border-r last:border-0">
      <p className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
        {value}
      </p>

      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-6 text-lg font-bold">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}
