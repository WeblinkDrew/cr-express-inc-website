"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AxiomCarrierOnboardingFormProps {
  formId: string;
  formType: string;
  formName: string;
}

export default function AxiomCarrierOnboardingForm({ formId, formName }: AxiomCarrierOnboardingFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    companyLegalName: "",
    companyDbaName: "",
    companyType: "",
    companyTypeOther: "",
    yearFounded: "",
    scacCodes: "",
    diversityClassifications: {
      womanOwned: false,
      veteranOwned: false,
      minorityOwned: false,
      other: false,
      otherText: "",
    },
    physicalAddressLine1: "",
    physicalAddressLine2: "",
    physicalCity: "",
    physicalState: "",
    physicalZipCode: "",
    mailingAddressSameAsPhysical: "no",
    useFactoringCompany: "no",
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

      router.push(`/form/success?type=axiom-carrier-onboarding`);
    } catch (err: any) {
      console.error("Form submission error:", err);
      setError(err.message || "An error occurred while submitting the form");
      setIsSubmitting(false);
    }
  };

  const handleDiversityChange = (field: string, value: boolean | string) => {
    setFormData({
      ...formData,
      diversityClassifications: {
        ...formData.diversityClassifications,
        [field]: value,
      },
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Company Information</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Company Legal Name */}
            <div>
              <label htmlFor="companyLegalName" className="block text-sm font-medium text-neutral-700 mb-2">
                Company Legal Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="companyLegalName"
                required
                value={formData.companyLegalName}
                onChange={(e) => setFormData({ ...formData, companyLegalName: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Company DBA Name */}
            <div>
              <label htmlFor="companyDbaName" className="block text-sm font-medium text-neutral-700 mb-2">
                Company DBA Name
              </label>
              <input
                type="text"
                id="companyDbaName"
                value={formData.companyDbaName}
                onChange={(e) => setFormData({ ...formData, companyDbaName: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="If Applicable"
              />
            </div>

            {/* Company Type */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Company Type<span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="companyType"
                    value="Corporation"
                    required
                    onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Corporation</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="companyType"
                    value="Limited Liability Company (LLC)"
                    onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Limited Liability Company (LLC)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="companyType"
                    value="Sole Proprietorship"
                    onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Sole Proprietorship</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="companyType"
                    value="Partnership"
                    onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Partnership</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="companyType"
                    value="Other"
                    onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Other</span>
                </label>
                {formData.companyType === "Other" && (
                  <input
                    type="text"
                    placeholder="Please specify"
                    value={formData.companyTypeOther}
                    onChange={(e) => setFormData({ ...formData, companyTypeOther: e.target.value })}
                    className="ml-6 mt-2 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            </div>

            {/* Year Founded */}
            <div>
              <label htmlFor="yearFounded" className="block text-sm font-medium text-neutral-700 mb-2">
                Year Founded<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="yearFounded"
                required
                value={formData.yearFounded}
                onChange={(e) => setFormData({ ...formData, yearFounded: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="YYYY"
              />
            </div>

            {/* SCAC(s): Separate using commas */}
            <div>
              <label htmlFor="scacCodes" className="block text-sm font-medium text-neutral-700 mb-2">
                SCAC(s): Separate using commas
              </label>
              <input
                type="text"
                id="scacCodes"
                value={formData.scacCodes}
                onChange={(e) => setFormData({ ...formData, scacCodes: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Diversity Classifications */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Diversity Classifications
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.diversityClassifications.womanOwned}
                    onChange={(e) => handleDiversityChange("womanOwned", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Woman-Owned</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.diversityClassifications.veteranOwned}
                    onChange={(e) => handleDiversityChange("veteranOwned", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Veteran-Owned</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.diversityClassifications.minorityOwned}
                    onChange={(e) => handleDiversityChange("minorityOwned", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Minority-Owned</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.diversityClassifications.other}
                    onChange={(e) => handleDiversityChange("other", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Other</span>
                </label>
                {formData.diversityClassifications.other && (
                  <input
                    type="text"
                    placeholder="Please specify"
                    value={formData.diversityClassifications.otherText}
                    onChange={(e) => handleDiversityChange("otherText", e.target.value)}
                    className="ml-6 mt-2 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            </div>

            {/* Company Physical Address */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Company Physical Address<span className="text-red-500">*</span>
              </label>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Address Line 1"
                  required
                  value={formData.physicalAddressLine1}
                  onChange={(e) => setFormData({ ...formData, physicalAddressLine1: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  placeholder="Address Line 2"
                  value={formData.physicalAddressLine2}
                  onChange={(e) => setFormData({ ...formData, physicalAddressLine2: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <div className="grid grid-cols-6 gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={formData.physicalCity}
                    onChange={(e) => setFormData({ ...formData, physicalCity: e.target.value })}
                    className="col-span-3 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    required
                    value={formData.physicalState}
                    onChange={(e) => setFormData({ ...formData, physicalState: e.target.value })}
                    className="col-span-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    required
                    value={formData.physicalZipCode}
                    onChange={(e) => setFormData({ ...formData, physicalZipCode: e.target.value })}
                    className="col-span-2 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Is the company's mailing address the same as its physical address? */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Is the company's mailing address the same as its physical address?<span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mailingAddressSame"
                    value="yes"
                    required
                    checked={formData.mailingAddressSameAsPhysical === "yes"}
                    onChange={(e) => setFormData({ ...formData, mailingAddressSameAsPhysical: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mailingAddressSame"
                    value="no"
                    checked={formData.mailingAddressSameAsPhysical === "no"}
                    onChange={(e) => setFormData({ ...formData, mailingAddressSameAsPhysical: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>
            </div>

            {/* Do you use a factoring company? */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Do you use a factoring company?<span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="factoringCompany"
                    value="yes"
                    required
                    checked={formData.useFactoringCompany === "yes"}
                    onChange={(e) => setFormData({ ...formData, useFactoringCompany: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="factoringCompany"
                    value="no"
                    checked={formData.useFactoringCompany === "no"}
                    onChange={(e) => setFormData({ ...formData, useFactoringCompany: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? "Submitting..." : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}