"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AxiomInvoicingFormProps {
  formId: string;
  formType: string;
  formName: string;
}

export default function AxiomInvoicingForm({ formId, formName }: AxiomInvoicingFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    loadNumber: "",
    loadAmount: "",
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

      // Redirect to success page
      router.push(`/form/success?type=axiom-invoicing`);
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
            <h1 className="text-3xl font-bold text-white">{formName}</h1>
            <p className="mt-2 text-blue-100">Submit your load invoicing information</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Load Number */}
            <div>
              <label htmlFor="loadNumber" className="block text-sm font-medium text-neutral-700 mb-2">
                Load Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="loadNumber"
                required
                value={formData.loadNumber}
                onChange={(e) => setFormData({ ...formData, loadNumber: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter load number"
              />
            </div>

            {/* Load Amount */}
            <div>
              <label htmlFor="loadAmount" className="block text-sm font-medium text-neutral-700 mb-2">
                Load $ <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                <input
                  type="number"
                  id="loadAmount"
                  required
                  step="0.01"
                  min="0"
                  value={formData.loadAmount}
                  onChange={(e) => setFormData({ ...formData, loadAmount: e.target.value })}
                  className="w-full pl-8 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0.00"
                />
              </div>
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

        {/* Footer note */}
        <p className="mt-6 text-center text-sm text-neutral-500">
          All fields marked with <span className="text-red-500">*</span> are required
        </p>
      </div>
    </div>
  );
}
