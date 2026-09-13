"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createMemberRequest,
  FamilyMember,
  MemberRequestData,
} from "../services/memberRequest.service";

export default function RequestMembershipPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    buildingName: "",
    flatNumber: "",
    floorNumber: "",

    flatType: "",
    ownershipType: "",
    moveInDate: "",

    fullName: "",
    profilePhoto: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    alternatePhone: "",
    // email: "",

    // // IMPORTANT
    // password: "",
    // confirmPassword: "",

    aadhaarNumber: "",
    occupation: "", 
    companyName: "",

    totalFamilyMembers: 0,

    familyMembers: [] as FamilyMember[],

    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "floorNumber" ||
          name === "totalFamilyMembers"
          ? Number(value)
          : value,
    }));
  };

  const addFamilyMember = () => {
    setForm((prev) => ({
      ...prev,
      familyMembers: [
        ...prev.familyMembers,
        {
          name: "",
          relationship: "",
          gender: "",
          dateOfBirth: "",
          phone: "",
          occupation: "",
        },
      ],
    }));
  };

  const removeFamilyMember = (index: number) => {
    setForm((prev) => ({
      ...prev,
      familyMembers: prev.familyMembers.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleFamilyChange = (
    index: number,
    field: keyof FamilyMember,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      familyMembers: prev.familyMembers.map((member, i) =>
        i === index
          ? {
            ...member,
            [field]: value,
          }
          : member
      ),
    }));
  };

  const handleEmergencyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [name]: value,
      },
    }));
  };


  // const handleSubmit = async (
  //   e: React.FormEvent<HTMLFormElement>
  // ) => {
  //   e.preventDefault();

  //   setLoading(true);
  //   setError("");

  //   try {
  //     if (form.password !== form.confirmPassword) {
  //       setError("Passwords do not match.");
  //       setLoading(false);
  //       return;
  //     }

  //     const requestData: MemberRequestData = {
  //       ...form,

  //       floorNumber: Number(form.floorNumber),

  //       totalFamilyMembers:
  //         form.familyMembers.length,
  //     };

  //     console.log("Submitting request:", requestData);

  //     const response = await createMemberRequest(
  //       requestData
  //     );

  //     console.log("Request submitted:", response);

  //     // Save request ID for status page
  //     localStorage.setItem(
  //       "memberRequestId",
  //       response.data._id
  //     );

  //     router.push("/resident/request-status");

  //   } catch (error) {
  //     console.error(error);

  //     setError(
  //       error instanceof Error
  //         ? error.message
  //         : "Something went wrong"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pendingName = localStorage.getItem("pendingName") || "";
      if (pendingName) {
        setForm((prev) => ({
          ...prev,
          fullName: prev.fullName || pendingName,
        }));
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const regId = localStorage.getItem("registrationId") || undefined;
      const pendingEmail = localStorage.getItem("pendingEmail") || undefined;

      const requestData: MemberRequestData = {
        ...form,
        registrationId: regId,
        email: pendingEmail,
        floorNumber: Number(form.floorNumber),
        totalFamilyMembers: form.familyMembers.length,
      };

      console.log("Submitting Resident Request:", requestData);

      const response = await createMemberRequest(requestData);

      console.log("Request Created:", response);

      // Save request ID for status page
      if (response.data?._id) {
        localStorage.setItem("memberRequestId", response.data._id);
      }

      // Go to waiting page
      router.push("/resident/request-status");
    } catch (error) {
      console.error("Submit request error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
            ✓
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Request Submitted
          </h1>

          <p className="mt-3 text-gray-600">
            Your membership request has been submitted
            successfully.
          </p>

          <p className="mt-2 text-sm text-yellow-600">
            Waiting for admin approval.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Request Society Membership
          </h1>

          <p className="mt-2 text-gray-600">
            Submit your details for admin approval.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Building Details */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
              🏢 Building & Flat Details
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Building Name / Wing"
                name="buildingName"
                value={form.buildingName}
                onChange={handleChange}
                required
              />

              <Input
                label="Flat Number"
                name="flatNumber"
                value={form.flatNumber}
                onChange={handleChange}
                required
              />

              <Input
                label="Floor Number"
                name="floorNumber"
                type="number"
                value={form.floorNumber}
                onChange={handleChange}
                required
              />

              <Select
                label="Flat Type"
                name="flatType"
                value={form.flatType}
                onChange={handleChange}
                options={[
                  "1BHK",
                  "2BHK",
                  "3BHK",
                  "4BHK",
                  "Other",
                ]}
              />

              <Select
                label="Ownership Type"
                name="ownershipType"
                value={form.ownershipType}
                onChange={handleChange}
                options={[
                  "owner",
                  "tenant",
                ]}
              />

              <Input
                label="Move-in Date"
                name="moveInDate"
                type="date"
                value={form.moveInDate}
                onChange={handleChange}
                required
              />
            </div>
          </section>

          {/* Primary Member */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
              👤 Primary Member Details
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />

              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <Input
                label="Alternate Phone Number"
                name="alternatePhone"
                type="tel"
                value={form.alternatePhone}
                onChange={handleChange}
              />

           

              <Select
                label="Gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                options={[
                  "male",
                  "female",
                  "other",
                ]}
              />

              <Input
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={handleChange}
              />

              <Input
                label="Aadhaar / ID Number"
                name="aadhaarNumber"
                value={form.aadhaarNumber}
                onChange={handleChange}
              />

              <Input
                label="Occupation"
                name="occupation"
                value={form.occupation}
                onChange={handleChange}
              />

              <Input
                label="Company / Business Name"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* Family */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  👨‍👩‍👧‍👦 Family Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add all family members living in the flat.
                </p>
              </div>

              <button
                type="button"
                onClick={addFamilyMember}
                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                + Add Member
              </button>
            </div>

            <div className="space-y-6">
              {form.familyMembers.map((member, index) => (
                <div
                  key={index}
                  className="rounded-xl border p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold">
                      Family Member {index + 1}
                    </h3>

                    <button
                      type="button"
                      onClick={() =>
                        removeFamilyMember(index)
                      }
                      className="text-sm text-red-500"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="Name"
                      value={member.name}
                      onChange={(e) =>
                        handleFamilyChange(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                    />

                    <Input
                      label="Relationship"
                      value={member.relationship}
                      onChange={(e) =>
                        handleFamilyChange(
                          index,
                          "relationship",
                          e.target.value
                        )
                      }
                    />

                    <Select
                      label="Gender"
                      value={member.gender}
                      onChange={(e) =>
                        handleFamilyChange(
                          index,
                          "gender",
                          e.target.value
                        )
                      }
                      options={[
                        "male",
                        "female",
                        "other",
                      ]}
                    />

                    <Input
                      label="Date of Birth"
                      type="date"
                      value={member.dateOfBirth}
                      onChange={(e) =>
                        handleFamilyChange(
                          index,
                          "dateOfBirth",
                          e.target.value
                        )
                      }
                    />

                    <Input
                      label="Phone"
                      type="tel"
                      value={member.phone}
                      onChange={(e) =>
                        handleFamilyChange(
                          index,
                          "phone",
                          e.target.value
                        )
                      }
                    />

                    <Input
                      label="Occupation"
                      value={member.occupation}
                      onChange={(e) =>
                        handleFamilyChange(
                          index,
                          "occupation",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              ))}

              {form.familyMembers.length === 0 && (
                <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
                  No family members added yet.
                </div>
              )}
            </div>
          </section>

          {/* Emergency Contact */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
              🚨 Emergency Contact
            </h2>

            <div className="grid gap-5 md:grid-cols-3">
              <Input
                label="Name"
                name="name"
                value={form.emergencyContact.name}
                onChange={handleEmergencyChange}
              />

              <Input
                label="Relationship"
                name="relationship"
                value={form.emergencyContact.relationship}
                onChange={handleEmergencyChange}
              />

              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={form.emergencyContact.phone}
                onChange={handleEmergencyChange}
              />
            </div>
          </section>

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Submitting..."
                : "Submit Membership Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Reusable Input */

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({
  label,
  ...props
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

/* Reusable Select */

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

function Select({
  label,
  options,
  ...props
}: SelectProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <select
        {...props}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}