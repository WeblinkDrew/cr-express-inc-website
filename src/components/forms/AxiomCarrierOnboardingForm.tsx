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
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    // Page 1: Company Information
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
    mailingAddressSameAsPhysical: "yes",
    mailingAddressLine1: "",
    mailingAddressLine2: "",
    mailingCity: "",
    mailingState: "",
    mailingZipCode: "",
    useFactoringCompany: "no",
    noaDocument: "",
    factoringCompanyName: "",
    factoringCompanyAddressLine1: "",
    factoringCompanyAddressLine2: "",
    factoringCompanyCity: "",
    factoringCompanyState: "",
    factoringCompanyZipCode: "",
    factoringCompanyPhone: "",
    factoringCompanyEmail: "",
    interestedInQuickPay: "no",
    quickPayOption: "",

    // Page 2: Contact Information
    ownerOfficerFirstName: "",
    ownerOfficerLastName: "",
    ownerOfficerEmail: "",
    ownerOfficerPhone: "",
    accountingFirstName: "",
    accountingLastName: "",
    accountingEmail: "",
    accountingPhone: "",
    operationsFirstName: "",
    operationsLastName: "",
    operationsEmail: "",
    operationsPhone: "",
    safetyClaimsFirstName: "",
    safetyClaimsLastName: "",
    safetyClaimsEmail: "",
    safetyClaimsPhone: "",

    // Page 3: Documents
    hazmatDocument: "",
    coiDocument: "",
    w9Document: "",
    operatingAuthorityDocument: "",
    carrierBrokerAgreementDocument: "",
    bankingDetailsDocument: "",
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
          files: {
            hazmat: formData.hazmatDocument || null,
            coi: formData.coiDocument || null,
            w9: formData.w9Document || null,
            operatingAuthority: formData.operatingAuthorityDocument || null,
            carrierBrokerAgreement: formData.carrierBrokerAgreementDocument || null,
            bankingDetails: formData.bankingDetailsDocument || null,
            noa: formData.noaDocument || null,
          },
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

  const handleFileUpload = (field: string, file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData({ ...formData, [field]: base64String });
    };
    reader.readAsDataURL(file);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">
              {currentPage === 1 && "Company Information"}
              {currentPage === 2 && "Contact Information"}
              {currentPage === 3 && "Documents"}
            </h1>
            <p className="text-blue-100 mt-1">Page {currentPage} of 3</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* PAGE 1: COMPANY INFORMATION */}
            {currentPage === 1 && (
              <>
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

                {/* SCAC(s) */}
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

                {/* Is mailing address same as physical address? */}
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

                {/* Company Mailing Address - CONDITIONAL */}
                {formData.mailingAddressSameAsPhysical === "no" && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Company Mailing Address<span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Address Line 1"
                        required
                        value={formData.mailingAddressLine1}
                        onChange={(e) => setFormData({ ...formData, mailingAddressLine1: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Address Line 2"
                        value={formData.mailingAddressLine2}
                        onChange={(e) => setFormData({ ...formData, mailingAddressLine2: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="grid grid-cols-6 gap-3">
                        <input
                          type="text"
                          placeholder="City"
                          required
                          value={formData.mailingCity}
                          onChange={(e) => setFormData({ ...formData, mailingCity: e.target.value })}
                          className="col-span-3 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                          required
                          value={formData.mailingState}
                          onChange={(e) => setFormData({ ...formData, mailingState: e.target.value })}
                          className="col-span-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">State</option>
                          <option value="AL">AL</option>
                          <option value="AK">AK</option>
                          <option value="AZ">AZ</option>
                          <option value="AR">AR</option>
                          <option value="CA">CA</option>
                          <option value="CO">CO</option>
                          <option value="CT">CT</option>
                          <option value="DE">DE</option>
                          <option value="FL">FL</option>
                          <option value="GA">GA</option>
                          <option value="HI">HI</option>
                          <option value="ID">ID</option>
                          <option value="IL">IL</option>
                          <option value="IN">IN</option>
                          <option value="IA">IA</option>
                          <option value="KS">KS</option>
                          <option value="KY">KY</option>
                          <option value="LA">LA</option>
                          <option value="ME">ME</option>
                          <option value="MD">MD</option>
                          <option value="MA">MA</option>
                          <option value="MI">MI</option>
                          <option value="MN">MN</option>
                          <option value="MS">MS</option>
                          <option value="MO">MO</option>
                          <option value="MT">MT</option>
                          <option value="NE">NE</option>
                          <option value="NV">NV</option>
                          <option value="NH">NH</option>
                          <option value="NJ">NJ</option>
                          <option value="NM">NM</option>
                          <option value="NY">NY</option>
                          <option value="NC">NC</option>
                          <option value="ND">ND</option>
                          <option value="OH">OH</option>
                          <option value="OK">OK</option>
                          <option value="OR">OR</option>
                          <option value="PA">PA</option>
                          <option value="RI">RI</option>
                          <option value="SC">SC</option>
                          <option value="SD">SD</option>
                          <option value="TN">TN</option>
                          <option value="TX">TX</option>
                          <option value="UT">UT</option>
                          <option value="VT">VT</option>
                          <option value="VA">VA</option>
                          <option value="WA">WA</option>
                          <option value="WV">WV</option>
                          <option value="WI">WI</option>
                          <option value="WY">WY</option>
                        </select>
                        <input
                          type="text"
                          placeholder="ZIP Code"
                          required
                          value={formData.mailingZipCode}
                          onChange={(e) => setFormData({ ...formData, mailingZipCode: e.target.value })}
                          className="col-span-2 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

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

                {/* Factoring Company Details - CONDITIONAL */}
                {formData.useFactoringCompany === "yes" && (
                  <>
                    {/* NOA Document Upload */}
                    <div>
                      <label htmlFor="noaDocument" className="block text-sm font-medium text-neutral-700 mb-2">
                        NOA Document Upload<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        id="noaDocument"
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload("noaDocument", e.target.files?.[0] || null)}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-xs text-neutral-500 mt-1">Max file size: 10 MB</p>
                    </div>

                    {/* Factoring Company Name */}
                    <div>
                      <label htmlFor="factoringCompanyName" className="block text-sm font-medium text-neutral-700 mb-2">
                        Factoring Company Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="factoringCompanyName"
                        required
                        value={formData.factoringCompanyName}
                        onChange={(e) => setFormData({ ...formData, factoringCompanyName: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Factoring Company Address */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Factoring Company Address<span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Address Line 1"
                          required
                          value={formData.factoringCompanyAddressLine1}
                          onChange={(e) => setFormData({ ...formData, factoringCompanyAddressLine1: e.target.value })}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Address Line 2"
                          value={formData.factoringCompanyAddressLine2}
                          onChange={(e) => setFormData({ ...formData, factoringCompanyAddressLine2: e.target.value })}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="grid grid-cols-6 gap-3">
                          <input
                            type="text"
                            placeholder="City"
                            required
                            value={formData.factoringCompanyCity}
                            onChange={(e) => setFormData({ ...formData, factoringCompanyCity: e.target.value })}
                            className="col-span-3 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                          <select
                            required
                            value={formData.factoringCompanyState}
                            onChange={(e) => setFormData({ ...formData, factoringCompanyState: e.target.value })}
                            className="col-span-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">State</option>
                            <option value="AL">AL</option>
                            <option value="AK">AK</option>
                            <option value="AZ">AZ</option>
                            <option value="AR">AR</option>
                            <option value="CA">CA</option>
                            <option value="CO">CO</option>
                            <option value="CT">CT</option>
                            <option value="DE">DE</option>
                            <option value="FL">FL</option>
                            <option value="GA">GA</option>
                            <option value="HI">HI</option>
                            <option value="ID">ID</option>
                            <option value="IL">IL</option>
                            <option value="IN">IN</option>
                            <option value="IA">IA</option>
                            <option value="KS">KS</option>
                            <option value="KY">KY</option>
                            <option value="LA">LA</option>
                            <option value="ME">ME</option>
                            <option value="MD">MD</option>
                            <option value="MA">MA</option>
                            <option value="MI">MI</option>
                            <option value="MN">MN</option>
                            <option value="MS">MS</option>
                            <option value="MO">MO</option>
                            <option value="MT">MT</option>
                            <option value="NE">NE</option>
                            <option value="NV">NV</option>
                            <option value="NH">NH</option>
                            <option value="NJ">NJ</option>
                            <option value="NM">NM</option>
                            <option value="NY">NY</option>
                            <option value="NC">NC</option>
                            <option value="ND">ND</option>
                            <option value="OH">OH</option>
                            <option value="OK">OK</option>
                            <option value="OR">OR</option>
                            <option value="PA">PA</option>
                            <option value="RI">RI</option>
                            <option value="SC">SC</option>
                            <option value="SD">SD</option>
                            <option value="TN">TN</option>
                            <option value="TX">TX</option>
                            <option value="UT">UT</option>
                            <option value="VT">VT</option>
                            <option value="VA">VA</option>
                            <option value="WA">WA</option>
                            <option value="WV">WV</option>
                            <option value="WI">WI</option>
                            <option value="WY">WY</option>
                          </select>
                          <input
                            type="text"
                            placeholder="ZIP Code"
                            required
                            value={formData.factoringCompanyZipCode}
                            onChange={(e) => setFormData({ ...formData, factoringCompanyZipCode: e.target.value })}
                            className="col-span-2 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Factoring Company Phone Number */}
                    <div>
                      <label htmlFor="factoringCompanyPhone" className="block text-sm font-medium text-neutral-700 mb-2">
                        Factoring Company Phone Number
                      </label>
                      <input
                        type="tel"
                        id="factoringCompanyPhone"
                        value={formData.factoringCompanyPhone}
                        onChange={(e) => setFormData({ ...formData, factoringCompanyPhone: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Factoring Company Email */}
                    <div>
                      <label htmlFor="factoringCompanyEmail" className="block text-sm font-medium text-neutral-700 mb-2">
                        Factoring Company Email
                      </label>
                      <input
                        type="email"
                        id="factoringCompanyEmail"
                        value={formData.factoringCompanyEmail}
                        onChange={(e) => setFormData({ ...formData, factoringCompanyEmail: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                {/* Are you interested in our quick-pay program? */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Are you interested in our quick-pay program?<span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="quickPay"
                        value="yes"
                        required
                        checked={formData.interestedInQuickPay === "yes"}
                        onChange={(e) => setFormData({ ...formData, interestedInQuickPay: e.target.value })}
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="quickPay"
                        value="no"
                        checked={formData.interestedInQuickPay === "no"}
                        onChange={(e) => setFormData({ ...formData, interestedInQuickPay: e.target.value })}
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">No</span>
                    </label>
                  </div>
                </div>

                {/* Quick-Pay Options - CONDITIONAL */}
                {formData.interestedInQuickPay === "yes" && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Quick-Pay Options<span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="quickPayOption"
                          value="Next Day (1 Business Day) - 3% Fee"
                          required
                          checked={formData.quickPayOption === "Next Day (1 Business Day) - 3% Fee"}
                          onChange={(e) => setFormData({ ...formData, quickPayOption: e.target.value })}
                          className="mr-2 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">Next Day (1 Business Day) - 3% Fee</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="quickPayOption"
                          value="7 Day - 2% Fee"
                          checked={formData.quickPayOption === "7 Day - 2% Fee"}
                          onChange={(e) => setFormData({ ...formData, quickPayOption: e.target.value })}
                          className="mr-2 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">7 Day - 2% Fee</span>
                      </label>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">
                      All quick-pay options are paid via ACH, if you need a different solution please contact: cr@axiomws.com
                    </p>
                  </div>
                )}
              </>
            )}

            {/* PAGE 2: CONTACT INFORMATION */}
            {currentPage === 2 && (
              <>
                {/* Owner / Officer */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Owner / Officer
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={formData.ownerOfficerFirstName}
                      onChange={(e) => setFormData({ ...formData, ownerOfficerFirstName: e.target.value })}
                      className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={formData.ownerOfficerLastName}
                      onChange={(e) => setFormData({ ...formData, ownerOfficerLastName: e.target.value })}
                      className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="ownerOfficerEmail" className="block text-sm font-medium text-neutral-700 mb-2">
                    Owner / Officer - Email
                  </label>
                  <input
                    type="email"
                    id="ownerOfficerEmail"
                    value={formData.ownerOfficerEmail}
                    onChange={(e) => setFormData({ ...formData, ownerOfficerEmail: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="ownerOfficerPhone" className="block text-sm font-medium text-neutral-700 mb-2">
                    Owner / Officer - Phone
                  </label>
                  <input
                    type="tel"
                    id="ownerOfficerPhone"
                    value={formData.ownerOfficerPhone}
                    onChange={(e) => setFormData({ ...formData, ownerOfficerPhone: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Accounting */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Accounting<span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="First Name"
                      required
                      value={formData.accountingFirstName}
                      onChange={(e) => setFormData({ ...formData, accountingFirstName: e.target.value })}
                      className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      required
                      value={formData.accountingLastName}
                      onChange={(e) => setFormData({ ...formData, accountingLastName: e.target.value })}
                      className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="accountingEmail" className="block text-sm font-medium text-neutral-700 mb-2">
                    Accounting - Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="accountingEmail"
                    required
                    value={formData.accountingEmail}
                    onChange={(e) => setFormData({ ...formData, accountingEmail: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="accountingPhone" className="block text-sm font-medium text-neutral-700 mb-2">
                    Accounting - Phone<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="accountingPhone"
                    required
                    value={formData.accountingPhone}
                    onChange={(e) => setFormData({ ...formData, accountingPhone: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Operations */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Operations<span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="First Name"
                      required
                      value={formData.operationsFirstName}
                      onChange={(e) => setFormData({ ...formData, operationsFirstName: e.target.value })}
                      className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      required
                      value={formData.operationsLastName}
                      onChange={(e) => setFormData({ ...formData, operationsLastName: e.target.value })}
                      className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="operationsEmail" className="block text-sm font-medium text-neutral-700 mb-2">
                    Operations - Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="operationsEmail"
                    required
                    value={formData.operationsEmail}
                    onChange={(e) => setFormData({ ...formData, operationsEmail: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="operationsPhone" className="block text-sm font-medium text-neutral-700 mb-2">
                    Operations - Phone<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="operationsPhone"
                    required
                    value={formData.operationsPhone}
                    onChange={(e) => setFormData({ ...formData, operationsPhone: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Safety / Claims */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Safety / Claims<span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="First Name"
                      required
                      value={formData.safetyClaimsFirstName}
                      onChange={(e) => setFormData({ ...formData, safetyClaimsFirstName: e.target.value })}
                      className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      required
                      value={formData.safetyClaimsLastName}
                      onChange={(e) => setFormData({ ...formData, safetyClaimsLastName: e.target.value })}
                      className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="safetyClaimsEmail" className="block text-sm font-medium text-neutral-700 mb-2">
                    Safety / Claims - Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="safetyClaimsEmail"
                    required
                    value={formData.safetyClaimsEmail}
                    onChange={(e) => setFormData({ ...formData, safetyClaimsEmail: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="safetyClaimsPhone" className="block text-sm font-medium text-neutral-700 mb-2">
                    Safety / Claims - Phone<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="safetyClaimsPhone"
                    required
                    value={formData.safetyClaimsPhone}
                    onChange={(e) => setFormData({ ...formData, safetyClaimsPhone: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {/* PAGE 3: DOCUMENTS */}
            {currentPage === 3 && (
              <>
                {/* Hazmat - If Applicable */}
                <div>
                  <label htmlFor="hazmatDocument" className="block text-sm font-medium text-neutral-700 mb-2">
                    Hazmat - If Applicable
                  </label>
                  <input
                    type="file"
                    id="hazmatDocument"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload("hazmatDocument", e.target.files?.[0] || null)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Max file size: 10 MB</p>
                </div>

                {/* COI */}
                <div>
                  <label htmlFor="coiDocument" className="block text-sm font-medium text-neutral-700 mb-2">
                    COI<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="coiDocument"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload("coiDocument", e.target.files?.[0] || null)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Max file size: 10 MB</p>
                </div>

                {/* W9 */}
                <div>
                  <label htmlFor="w9Document" className="block text-sm font-medium text-neutral-700 mb-2">
                    W9<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="w9Document"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload("w9Document", e.target.files?.[0] || null)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Max file size: 10 MB</p>
                </div>

                {/* Operating Authority */}
                <div>
                  <label htmlFor="operatingAuthorityDocument" className="block text-sm font-medium text-neutral-700 mb-2">
                    Operating Authority<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="operatingAuthorityDocument"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload("operatingAuthorityDocument", e.target.files?.[0] || null)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Max file size: 10 MB</p>
                </div>

                {/* Carrier - Broker Agreement */}
                <div>
                  <label htmlFor="carrierBrokerAgreementDocument" className="block text-sm font-medium text-neutral-700 mb-2">
                    Carrier - Broker Agreement<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="carrierBrokerAgreementDocument"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload("carrierBrokerAgreementDocument", e.target.files?.[0] || null)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Max file size: 10 MB</p>
                </div>

                {/* Banking Details */}
                <div>
                  <label htmlFor="bankingDetailsDocument" className="block text-sm font-medium text-neutral-700 mb-2">
                    Banking Details
                  </label>
                  <input
                    type="file"
                    id="bankingDetailsDocument"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload("bankingDetailsDocument", e.target.files?.[0] || null)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Max file size: 10 MB. Required if carrier selected quick-pay</p>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="pt-4 flex gap-3">
              {currentPage > 1 && (
                <button
                  type="button"
                  onClick={previousPage}
                  className="flex-1 bg-neutral-200 text-neutral-700 py-3 px-6 rounded-lg font-semibold hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 transition-all"
                >
                  Previous
                </button>
              )}

              {currentPage < 3 ? (
                <button
                  type="button"
                  onClick={nextPage}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
