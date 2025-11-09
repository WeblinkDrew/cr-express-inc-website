"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface WarehouseServicesFormProps {
  formId: string;
  formType: string;
  formName: string;
}

export default function WarehouseServicesForm({ formId, formName }: WarehouseServicesFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    customerName: "",
    loadNumbers: "",
    servicesPerformed: [] as string[],
    otherService: "",
    specialNotes: "",
  });

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        servicesPerformed: [...formData.servicesPerformed, service],
      });
    } else {
      setFormData({
        ...formData,
        servicesPerformed: formData.servicesPerformed.filter((s) => s !== service),
      });
    }
  };

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

      router.push(`/form/success?type=warehouse-services`);
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
            <h1 className="text-3xl font-bold text-white">Warehouse Services Form</h1>
            <p className="mt-2 text-blue-100 text-sm">
              Please input the shipment reference number(s) and check the boxes for all of the
              services performed on the shipment. If you are unsure of any of the information below,
              please call in to the warehouse office to ask.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Please Enter Your First and Last Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Please Enter Your First and Last Name<span className="text-red-500">*</span>
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

            {/* Customer Name */}
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-neutral-700 mb-2">
                Customer Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="customerName"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Load Numbers */}
            <div>
              <label htmlFor="loadNumbers" className="block text-sm font-medium text-neutral-700 mb-2">
                Please enter any relevant load numbers separated by commas, if available
              </label>
              <input
                type="text"
                id="loadNumbers"
                value={formData.loadNumbers}
                onChange={(e) => setFormData({ ...formData, loadNumbers: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 12345, 67890, 11223"
              />
            </div>

            {/* Check Each of the Services Performed */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Check Each of the Services Performed:
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Handling In"
                    onChange={(e) => handleServiceChange("Handling In", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Handling In</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Handling Out"
                    onChange={(e) => handleServiceChange("Handling Out", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Handling Out</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Storage (Standard)"
                    onChange={(e) => handleServiceChange("Storage (Standard)", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Storage (Standard)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="HAWBs Storage"
                    onChange={(e) => handleServiceChange("HAWBs Storage", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">HAWBs Storage</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="H064 Storage"
                    onChange={(e) => handleServiceChange("H064 Storage", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">H064 Storage</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Temp Controlled Storage"
                    onChange={(e) => handleServiceChange("Temp Controlled Storage", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Temp Controlled Storage</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="ULD Breakdown (No Segregation)"
                    onChange={(e) => handleServiceChange("ULD Breakdown (No Segregation)", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">ULD Breakdown (No Segregation)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Skid Supply = Shrink Wrap"
                    onChange={(e) => handleServiceChange("Skid Supply = Shrink Wrap", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Skid Supply = Shrink Wrap</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Shrink Wrap Only"
                    onChange={(e) => handleServiceChange("Shrink Wrap Only", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Shrink Wrap Only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Segregation by References"
                    onChange={(e) => handleServiceChange("Segregation by References", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Segregation by References</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Labeling"
                    onChange={(e) => handleServiceChange("Labeling", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Labeling</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Floor Offload of 20' Container"
                    onChange={(e) => handleServiceChange("Floor Offload of 20' Container", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Floor Offload of 20' Container</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Floor Offload of 40' Container"
                    onChange={(e) => handleServiceChange("Floor Offload of 40' Container", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Floor Offload of 40' Container</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Devan of Palletized 20' Container"
                    onChange={(e) => handleServiceChange("Devan of Palletized 20' Container", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Devan of Palletized 20' Container</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Devan of Palletized 40' Container"
                    onChange={(e) => handleServiceChange("Devan of Palletized 40' Container", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Devan of Palletized 40' Container</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="AMS Entries"
                    onChange={(e) => handleServiceChange("AMS Entries", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">AMS Entries</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Printing Documents"
                    onChange={(e) => handleServiceChange("Printing Documents", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Printing Documents</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Other"
                    onChange={(e) => handleServiceChange("Other", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Other</span>
                </label>
                {formData.servicesPerformed.includes("Other") && (
                  <input
                    type="text"
                    placeholder="Please specify..."
                    value={formData.otherService}
                    onChange={(e) => setFormData({ ...formData, otherService: e.target.value })}
                    className="ml-6 mt-2 w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            </div>

            {/* Special Notes or Exceptions */}
            <div>
              <label htmlFor="specialNotes" className="block text-sm font-medium text-neutral-700 mb-2">
                Special Notes or Exceptions
              </label>
              <textarea
                id="specialNotes"
                rows={4}
                value={formData.specialNotes}
                onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="i.e. 'Storage Waived per...'"
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