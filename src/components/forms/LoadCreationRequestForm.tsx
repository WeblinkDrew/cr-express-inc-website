"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoadCreationRequestFormProps {
  formId: string;
  formType: string;
  formName: string;
}

export default function LoadCreationRequestForm({ formId, formName }: LoadCreationRequestFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    customer: "",
    customerReference: "",
    driverFirstName: "",
    driverLastName: "",
    truckNumber: "",
    trailer: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Max file size: 10 MB
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10 MB");
        return;
      }
      setUploadedFile(file);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Convert file to base64 if present
      let fileData = null;
      if (uploadedFile) {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(uploadedFile);
        });

        fileData = {
          ratecon: {
            name: uploadedFile.name,
            type: uploadedFile.type,
            size: uploadedFile.size,
            base64: base64,
          },
        };
      }

      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId,
          formData,
          files: fileData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      router.push(`/form/success?type=load-creation`);
    } catch (err: any) {
      console.error("Form submission error:", err);
      setError(err.message || "An error occurred while submitting the form");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Load Creation Request</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Customer */}
            <div>
              <label htmlFor="customer" className="block text-sm font-medium text-neutral-700 mb-2">
                Customer<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="customer"
                required
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                placeholder="Ex: ABC Trucking Express"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <label className="block text-xs text-neutral-500 mt-1">Ex: ABC Trucking Express</label>
            </div>

            {/* Customer Reference */}
            <div>
              <label htmlFor="customerReference" className="block text-sm font-medium text-neutral-700 mb-2">
                Customer Reference<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="customerReference"
                required
                value={formData.customerReference}
                onChange={(e) => setFormData({ ...formData, customerReference: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Driver */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Driver
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.driverFirstName}
                    onChange={(e) => setFormData({ ...formData, driverFirstName: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block text-xs text-neutral-500 mt-1">First Name</label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.driverLastName}
                    onChange={(e) => setFormData({ ...formData, driverLastName: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block text-xs text-neutral-500 mt-1">Last Name</label>
                </div>
              </div>
            </div>

            {/* Truck Number */}
            <div>
              <label htmlFor="truckNumber" className="block text-sm font-medium text-neutral-700 mb-2">
                Truck Number
              </label>
              <input
                type="text"
                id="truckNumber"
                value={formData.truckNumber}
                onChange={(e) => setFormData({ ...formData, truckNumber: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Trailer */}
            <div>
              <label htmlFor="trailer" className="block text-sm font-medium text-neutral-700 mb-2">
                Trailer
              </label>
              <input
                type="text"
                id="trailer"
                value={formData.trailer}
                onChange={(e) => setFormData({ ...formData, trailer: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Ratecon */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Ratecon<span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Browse files</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop here</p>
                  </div>
                  <p className="text-xs text-gray-500">Max file size: 10 MB</p>
                  {uploadedFile && (
                    <div className="mt-2 text-sm text-green-600">
                      Selected: {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(2)} KB)
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}