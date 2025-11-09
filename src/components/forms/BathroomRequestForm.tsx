"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface BathroomRequestFormProps {
  formId: string;
  formType: string;
  formName: string;
}

export default function BathroomRequestForm({ formId, formName }: BathroomRequestFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    bathroomLocation: "",
    bathroomType: "",
    itemsNeeded: [] as string[],
    otherItem: "",
    additionalNotes: "",
    firstName: "",
    lastName: "",
  });

  const handleItemsNeededChange = (item: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        itemsNeeded: [...formData.itemsNeeded, item],
      });
    } else {
      setFormData({
        ...formData,
        itemsNeeded: formData.itemsNeeded.filter((i) => i !== item),
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

      router.push(`/form/success?type=bathroom-request`);
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
            <h1 className="text-3xl font-bold text-white">BATHROOM REQUEST FORM</h1>
            <p className="mt-2 text-blue-100">
              Bathroom Supplies Needed? Help us keep things stocked. Fill out this quick form if anything is low or out.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Which bathroom needs attention? */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Which bathroom needs attention?<span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="bathroomLocation"
                    value="2400 Warehouse Office"
                    required
                    onChange={(e) => setFormData({ ...formData, bathroomLocation: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">2400 Warehouse Office</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="bathroomLocation"
                    value="2400 Main Breakroom"
                    onChange={(e) => setFormData({ ...formData, bathroomLocation: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">2400 Main Breakroom</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="bathroomLocation"
                    value="2400 Warehouse Dock"
                    onChange={(e) => setFormData({ ...formData, bathroomLocation: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">2400 Warehouse Dock</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="bathroomLocation"
                    value="301 W Oakton"
                    onChange={(e) => setFormData({ ...formData, bathroomLocation: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">301 W Oakton</span>
                </label>
              </div>
            </div>

            {/* Please select Men's or Women's Bathroom */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Please select Men's or Women's Bathroom<span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="bathroomType"
                    value="Men's"
                    required
                    onChange={(e) => setFormData({ ...formData, bathroomType: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Men's</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="bathroomType"
                    value="Women's"
                    onChange={(e) => setFormData({ ...formData, bathroomType: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Women's</span>
                </label>
              </div>
            </div>

            {/* What's Needed? */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                What's Needed?<span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Toilet Paper"
                    onChange={(e) => handleItemsNeededChange("Toilet Paper", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Toilet Paper</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Paper Towels"
                    onChange={(e) => handleItemsNeededChange("Paper Towels", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Paper Towels</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Hand Soap"
                    onChange={(e) => handleItemsNeededChange("Hand Soap", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Hand Soap</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Trash Bin Full"
                    onChange={(e) => handleItemsNeededChange("Trash Bin Full", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Trash Bin Full</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Other"
                    onChange={(e) => handleItemsNeededChange("Other", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Other</span>
                </label>
                {formData.itemsNeeded.includes("Other") && (
                  <input
                    type="text"
                    placeholder="Please specify"
                    value={formData.otherItem}
                    onChange={(e) => setFormData({ ...formData, otherItem: e.target.value })}
                    className="ml-6 mt-2 w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            </div>

            {/* Anything else we should know? */}
            <div>
              <label htmlFor="additionalNotes" className="block text-sm font-medium text-neutral-700 mb-2">
                Anything else we should know?
              </label>
              <textarea
                id="additionalNotes"
                rows={4}
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Additional notes or comments..."
              />
            </div>

            {/* Your Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Your Name
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
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
                {isSubmitting ? "Submitting..." : "Submit Form"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}