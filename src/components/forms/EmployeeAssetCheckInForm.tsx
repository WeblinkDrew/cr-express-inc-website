"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EmployeeAssetCheckInFormProps {
  formId: string;
  formType: string;
  formName: string;
}

export default function EmployeeAssetCheckInForm({ formId, formName }: EmployeeAssetCheckInFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    hasHeadset: "",
    hasCompanyCellPhone: "",
    hasWorkDeskPhone: "",
    hasLaptop: "",
    hasMonitor: "",
    hasCompanyCreditCard: "",
    hasScanner: "",
    hasDesktop: "",
    hasTablet: "",
    additionalNotes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId,
          formData,
          files: null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      router.push(`/form/success?type=employee-asset-checkin`);
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
            <h1 className="text-2xl font-bold text-white mb-3">Help Us Keep Track of Company Equipment</h1>
            <p className="text-blue-100 text-sm">
              We're updating our records to make sure all company-issued devices like laptops, monitors,
              phones, and accessories are properly accounted for.
            </p>
            <p className="text-blue-100 text-sm mt-2">
              Please take a moment to fill out this quick form — it helps us stay organized, support you better,
              and protect the gear you rely on every day.
            </p>
            <p className="text-blue-100 text-sm mt-2">
              It only takes a minute, and your input is important!
            </p>
            <p className="text-blue-100 text-sm mt-2 font-semibold">
              Thanks for being a part of the team!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Name<span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block text-xs text-neutral-500 mt-1">First Name</label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block text-xs text-neutral-500 mt-1">Last Name</label>
                </div>
              </div>
            </div>

            {/* Do you use a headset? */}
            <div>
              <label htmlFor="hasHeadset" className="block text-sm font-medium text-neutral-700 mb-2">
                Do you use a headset?<span className="text-red-500">*</span>
              </label>
              <select
                id="hasHeadset"
                required
                value={formData.hasHeadset}
                onChange={(e) => setFormData({ ...formData, hasHeadset: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Please Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Do you have a company cell phone? */}
            <div>
              <label htmlFor="hasCompanyCellPhone" className="block text-sm font-medium text-neutral-700 mb-2">
                Do you have a company cell phone?<span className="text-red-500">*</span>
              </label>
              <select
                id="hasCompanyCellPhone"
                required
                value={formData.hasCompanyCellPhone}
                onChange={(e) => setFormData({ ...formData, hasCompanyCellPhone: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Please Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Do you have a work desk phone? */}
            <div>
              <label htmlFor="hasWorkDeskPhone" className="block text-sm font-medium text-neutral-700 mb-2">
                Do you have a work desk phone?<span className="text-red-500">*</span>
              </label>
              <select
                id="hasWorkDeskPhone"
                required
                value={formData.hasWorkDeskPhone}
                onChange={(e) => setFormData({ ...formData, hasWorkDeskPhone: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Please Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Do you have a laptop? */}
            <div>
              <label htmlFor="hasLaptop" className="block text-sm font-medium text-neutral-700 mb-2">
                Do you have a laptop?<span className="text-red-500">*</span>
              </label>
              <select
                id="hasLaptop"
                required
                value={formData.hasLaptop}
                onChange={(e) => setFormData({ ...formData, hasLaptop: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Please Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Do you have a monitor? */}
            <div>
              <label htmlFor="hasMonitor" className="block text-sm font-medium text-neutral-700 mb-2">
                Do you have a monitor?<span className="text-red-500">*</span>
              </label>
              <select
                id="hasMonitor"
                required
                value={formData.hasMonitor}
                onChange={(e) => setFormData({ ...formData, hasMonitor: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Please Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Do you have a company credit card? */}
            <div>
              <label htmlFor="hasCompanyCreditCard" className="block text-sm font-medium text-neutral-700 mb-2">
                Do you have a company credit card?<span className="text-red-500">*</span>
              </label>
              <select
                id="hasCompanyCreditCard"
                required
                value={formData.hasCompanyCreditCard}
                onChange={(e) => setFormData({ ...formData, hasCompanyCreditCard: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Please Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Do you have a scanner? */}
            <div>
              <label htmlFor="hasScanner" className="block text-sm font-medium text-neutral-700 mb-2">
                Do you have a scanner?<span className="text-red-500">*</span>
              </label>
              <select
                id="hasScanner"
                required
                value={formData.hasScanner}
                onChange={(e) => setFormData({ ...formData, hasScanner: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Please Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Do you have a desktop? */}
            <div>
              <label htmlFor="hasDesktop" className="block text-sm font-medium text-neutral-700 mb-2">
                Do you have a desktop?<span className="text-red-500">*</span>
              </label>
              <select
                id="hasDesktop"
                required
                value={formData.hasDesktop}
                onChange={(e) => setFormData({ ...formData, hasDesktop: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Please Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Do you have a tablet? */}
            <div>
              <label htmlFor="hasTablet" className="block text-sm font-medium text-neutral-700 mb-2">
                Do you have a tablet?<span className="text-red-500">*</span>
              </label>
              <select
                id="hasTablet"
                required
                value={formData.hasTablet}
                onChange={(e) => setFormData({ ...formData, hasTablet: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Please Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Additional Notes */}
            <div>
              <label htmlFor="additionalNotes" className="block text-sm font-medium text-neutral-700 mb-2">
                Additional Notes
              </label>
              <textarea
                id="additionalNotes"
                rows={4}
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any additional information..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? "Submitting..." : "Submit Form"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}