
"use client";

import {
  Check,
  FileText,
  LayoutDashboard,
  ShieldCheck,
  UserPlus,
} from "lucide-react";

type Step = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Register",
    description: "Create account",
    icon: UserPlus,
  },
  {
    id: 2,
    title: "Information",
    description: "Fill details",
    icon: FileText,
  },
  {
    id: 3,
    title: "Admin Approval",
    description: "Waiting for approval",
    icon: ShieldCheck,
  },
  {
    id: 4,
    title: "Dashboard",
    description: "Access dashboard",
    icon: LayoutDashboard,
  },
];

interface RegistrationProgressProps {
  currentStep: number;
}

export default function RegistrationProgress({
  currentStep,
}: RegistrationProgressProps) {
  return (
        <div className="relative z-20 mx-auto mb-10 w-full max-w-4xl px-4 sm:px-6">
        <div className="rounded-2xl border border-white/40 bg-white/60 px-4 py-5 shadow-lg backdrop-blur-xl sm:px-8 sm:py-6">

            {/* Progress */}
            <div className="relative flex items-start justify-between">

            {steps.map((step, index) => {
                const Icon = step.icon;

                const completed = currentStep > step.id;
                const active = currentStep === step.id;

                return (
                <div
                    key={step.id}
                    className="relative flex flex-1 flex-col items-center"
                >

                    {/* Connector */}
                    {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-[22px] h-[3px] w-full overflow-hidden bg-slate-200/80">
                        <div
                        className={`h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-700 ${
                            completed ? "w-full" : "w-0"
                        }`}
                        />
                    </div>
                    )}

                    {/* Step Circle */}
                    <div
                    className={`
                        relative z-10 flex h-11 w-11 items-center justify-center
                        rounded-full border-2 transition-all duration-500
                        sm:h-12 sm:w-12
                        ${
                        completed
                            ? `
                            border-indigo-600
                            bg-gradient-to-br
                            from-indigo-600
                            to-purple-600
                            text-white
                            shadow-lg
                            shadow-indigo-200
                            `
                            : active
                            ? `
                            border-indigo-500
                            bg-white
                            text-indigo-600
                            shadow-lg
                            shadow-indigo-200
                            ring-4
                            ring-indigo-100
                            `
                            : `
                            border-slate-300
                            bg-white/80
                            text-slate-400
                            `
                        }
                    `}
                    >
                    {completed ? (
                        <Check
                        size={20}
                        strokeWidth={3}
                        />
                    ) : (
                        <Icon size={19} />
                    )}

                    {/* Active Pulse */}
                    {active && (
                        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-indigo-400/20" />
                    )}
                    </div>

                    {/* Step Information */}
                    <div className="mt-3 text-center">

                    <p
                        className={`
                        text-xs font-bold transition-colors sm:text-sm
                        ${
                            active || completed
                            ? "text-indigo-700"
                            : "text-slate-400"
                        }
                        `}
                    >
                        {step.title}
                    </p>

                    <p
                        className={`
                        mt-1 hidden text-[11px] sm:block
                        ${
                            active
                            ? "text-indigo-500"
                            : "text-slate-400"
                        }
                        `}
                    >
                        {step.description}
                    </p>

                    </div>
                </div>
                );
            })}
            </div>

            {/* Current Status */}
            <div className="mt-5 flex justify-center">
            <div
                className={`
                inline-flex items-center gap-2 rounded-full px-4 py-2
                text-xs font-semibold transition-all duration-300
                ${
                    currentStep === 3
                    ? "border border-amber-200 bg-amber-50 text-amber-700"
                    : "border border-indigo-100 bg-indigo-50 text-indigo-600"
                }
                `}
            >
                {currentStep === 3 ? (
                <>
                    <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                    Waiting for Admin Approval
                </>
                ) : (
                <>
                    <span className="h-2 w-2 rounded-full bg-indigo-500" />
                    Step {currentStep} of {steps.length}
                </>
                )}
            </div>
            </div>
        </div>
        </div>
  );
}

