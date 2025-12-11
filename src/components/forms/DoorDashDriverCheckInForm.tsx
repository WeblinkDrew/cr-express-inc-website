"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DoorDashDriverCheckInFormProps {
  formId: string;
  formType: string;
  formName: string;
}

export default function DoorDashDriverCheckInForm({ formId }: DoorDashDriverCheckInFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    carrierName: "",
    truckType: "",
    phoneNumber: "",
    truckNumber: "",
    trailerNumber: "",
  });

  const [bolFile, setBolFile] = useState<File | null>(null);

  // Phone number formatting function
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length === 0) return '';
    if (phoneNumber.length <= 3) return `(${phoneNumber}`;
    if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setFormData({ ...formData, phoneNumber: formatted });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type (images and PDFs)
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload an image (JPEG, PNG, GIF, WebP) or PDF file");
        e.target.value = "";
        return;
      }

      // Validate file size (10MB max)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setError(`File is too large. Maximum size is 10MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
        e.target.value = "";
        return;
      }

      setError(null);
      setBolFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate BOL upload
    if (!bolFile) {
      setError("Please upload your BOL (Bill of Lading)");
      setIsSubmitting(false);
      return;
    }

    try {
      // Convert file to base64
      let bolBase64 = null;
      if (bolFile) {
        const reader = new FileReader();
        bolBase64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const base64 = reader.result as string;
            resolve(base64.split(",")[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(bolFile);
        });
      }

      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId,
          formData: {
            ...formData,
            submittedAt: new Date().toISOString(),
          },
          files: bolBase64 ? {
            bol: {
              data: bolBase64,
              filename: bolFile.name,
              contentType: bolFile.type,
              size: bolFile.size,
            }
          } : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      // Redirect to custom success page for driver check-in
      router.push(`/form/doordash-driver-checkin/success`);
    } catch (err: any) {
      console.error("Form submission error:", err);
      setError(err.message || "An error occurred while submitting the form");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">Driver Check-In</h1>
          </div>

          {/* Important Notice */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mx-6 mt-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-amber-800 font-medium">Important Notice</p>
                <p className="mt-1 text-sm text-amber-700">
                  Thank you for following our proper check-in protocol. If you are currently parked in the street or in the front of the building, please kindly move your truck to the <strong>west side of the building around back</strong> where there is trailer parking for you prior to checking in.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
            <p className="text-sm text-neutral-600 mb-4">
              Please fill out the information below to the best of your ability:
            </p>

            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Carrier Name */}
            <div>
              <label htmlFor="carrierName" className="block text-sm font-medium text-neutral-700 mb-1">
                Carrier Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="carrierName"
                required
                value={formData.carrierName}
                onChange={(e) => setFormData({ ...formData, carrierName: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Truck Type */}
            <div>
              <label htmlFor="truckType" className="block text-sm font-medium text-neutral-700 mb-1">
                Truck Type<span className="text-red-500">*</span>
              </label>
              <select
                id="truckType"
                required
                value={formData.truckType}
                onChange={(e) => setFormData({ ...formData, truckType: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
              >
                <option value="">Select truck type...</option>
                <option value="Car">Car</option>
                <option value="Cargo Van">Cargo Van</option>
                <option value="Box Truck">Box Truck</option>
                <option value="Semi Truck">Semi Truck</option>
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-neutral-700 mb-1">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="(555) 555-5555"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Truck Number */}
            <div>
              <label htmlFor="truckNumber" className="block text-sm font-medium text-neutral-700 mb-1">
                Truck Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="truckNumber"
                required
                value={formData.truckNumber}
                onChange={(e) => setFormData({ ...formData, truckNumber: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Trailer Number */}
            <div>
              <label htmlFor="trailerNumber" className="block text-sm font-medium text-neutral-700 mb-1">
                Trailer Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="trailerNumber"
                required
                value={formData.trailerNumber}
                onChange={(e) => setFormData({ ...formData, trailerNumber: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* BOL Upload */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Please upload your BOL here<span className="text-red-500">*</span>
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                error && !bolFile ? "border-red-500 bg-red-50" : "border-neutral-300 hover:border-red-400"
              } transition-colors`}>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="bol-upload"
                />
                <label htmlFor="bol-upload" className="cursor-pointer">
                  <div className="text-neutral-600">
                    <svg className="mx-auto h-10 w-10 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mt-2 text-sm">Tap to upload or take a photo</p>
                    <p className="text-xs text-neutral-500 mt-1">JPEG, PNG, PDF - Max 10MB</p>
                  </div>
                </label>
                {bolFile && (
                  <div className="mt-3 text-sm text-green-600">
                    <p className="font-medium">File selected: {bolFile.name}</p>
                    <p className="text-xs text-neutral-600">Size: {(bolFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? "Submitting..." : "Check In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
