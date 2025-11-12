"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignatureCanvasComponent from "./SignatureCanvas";

interface ULDInspectionFormProps {
  formId: string;
  formType: string;
  formName: string;
}

export default function ULDInspectionForm({ formId, formName }: ULDInspectionFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [beforePlasticFile, setBeforePlasticFile] = useState<File | null>(null);
  const [afterPlasticFile, setAfterPlasticFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    dateTime: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].substring(0, 5),
    customer: "",
    mawb: "",
    uldNumber: "",
    visibleDamage: "",
    damageType: [] as string[],
    damageContinued: "",
    comments: "",
    signature: "",
  });

  const handleBeforePlasticFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Max file size: 10 MB
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10 MB");
        return;
      }
      setBeforePlasticFile(file);
      setError(null);
    }
  };

  const handleAfterPlasticFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Max file size: 10 MB
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10 MB");
        return;
      }
      setAfterPlasticFile(file);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Convert files to base64 if present
      let filesData: any = {};

      if (beforePlasticFile) {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(beforePlasticFile);
        });

        filesData.beforePlasticRemoval = {
          name: beforePlasticFile.name,
          type: beforePlasticFile.type,
          size: beforePlasticFile.size,
          base64: base64,
        };
      }

      if (afterPlasticFile) {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(afterPlasticFile);
        });

        filesData.afterPlasticRemoval = {
          name: afterPlasticFile.name,
          type: afterPlasticFile.type,
          size: afterPlasticFile.size,
          base64: base64,
        };
      }

      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId,
          formData,
          files: Object.keys(filesData).length > 0 ? filesData : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      router.push(`/form/success?type=uld-inspection`);
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
            <h1 className="text-3xl font-bold text-white">ULD Inspection Form</h1>
            <p className="mt-2 text-blue-100 text-sm">
              CR Express takes the security and integrity of our customers' cargo very seriously. Below you
              may find the results of our inspection of the device used in transporting your cargo.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-8">
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* General Details Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">General Details</h3>

              {/* Date/Time */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Date/Time<span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    required
                    value={formData.dateTime}
                    onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                    className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Customer */}
              <div className="mb-4">
                <label htmlFor="customer" className="block text-sm font-medium text-neutral-700 mb-2">
                  Customer<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="customer"
                  required
                  value={formData.customer}
                  onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* MAWB */}
              <div>
                <label htmlFor="mawb" className="block text-sm font-medium text-neutral-700 mb-2">
                  MAWB<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="mawb"
                  required
                  value={formData.mawb}
                  onChange={(e) => setFormData({ ...formData, mawb: e.target.value })}
                  placeholder="### ########"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <label className="block text-xs text-neutral-500 mt-1">Please use the proper format</label>
              </div>
            </div>

            {/* ULD Details Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">ULD Details</h3>

              {/* ULD Number */}
              <div className="mb-4">
                <label htmlFor="uldNumber" className="block text-sm font-medium text-neutral-700 mb-2">
                  ULD Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="uldNumber"
                  required
                  value={formData.uldNumber}
                  onChange={(e) => setFormData({ ...formData, uldNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* ULD Pictures Prior to Plastic/Net Removal */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  ULD Pictures Prior to Plastic/Net Removal<span className="text-red-500">*</span>
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
                        htmlFor="before-plastic-upload"
                        className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Browse files</span>
                        <input
                          id="before-plastic-upload"
                          name="before-plastic-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleBeforePlasticFileChange}
                          accept="image/*,.pdf"
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop here</p>
                    </div>
                    <p className="text-xs text-gray-500">Max file size: 10 MB</p>
                    {beforePlasticFile && (
                      <div className="mt-2 text-sm text-green-600">
                        Selected: {beforePlasticFile.name} ({(beforePlasticFile.size / 1024).toFixed(2)} KB)
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ULD Pictures After Plastic/Net Removal */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  ULD Pictures After Plastic/Net Removal<span className="text-red-500">*</span>
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
                        htmlFor="after-plastic-upload"
                        className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Browse files</span>
                        <input
                          id="after-plastic-upload"
                          name="after-plastic-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleAfterPlasticFileChange}
                          accept="image/*,.pdf"
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop here</p>
                    </div>
                    <p className="text-xs text-gray-500">Max file size: 10 MB</p>
                    {afterPlasticFile && (
                      <div className="mt-2 text-sm text-green-600">
                        Selected: {afterPlasticFile.name} ({(afterPlasticFile.size / 1024).toFixed(2)} KB)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Damage Classification Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Damage Classification</h3>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Is there any visible damage?<span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="visibleDamage"
                      value="Yes"
                      checked={formData.visibleDamage === "Yes"}
                      onChange={(e) => setFormData({ ...formData, visibleDamage: e.target.checked ? "Yes" : "" })}
                      className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="visibleDamage"
                      value="No"
                      checked={formData.visibleDamage === "No"}
                      onChange={(e) => setFormData({ ...formData, visibleDamage: e.target.checked ? "No" : "" })}
                      className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
              </div>

              {/* Conditional: Show damage details when "Yes" is selected */}
              {formData.visibleDamage === "Yes" && (
                <>
                  {/* Describe the Damage */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Describe the Damage<span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          value="Minor"
                          checked={formData.damageType.includes("Minor")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, damageType: [...formData.damageType, "Minor"] });
                            } else {
                              setFormData({ ...formData, damageType: formData.damageType.filter(t => t !== "Minor") });
                            }
                          }}
                          className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="text-sm">Minor</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          value="Moderate"
                          checked={formData.damageType.includes("Moderate")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, damageType: [...formData.damageType, "Moderate"] });
                            } else {
                              setFormData({ ...formData, damageType: formData.damageType.filter(t => t !== "Moderate") });
                            }
                          }}
                          className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="text-sm">Moderate</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          value="Cosmetic"
                          checked={formData.damageType.includes("Cosmetic")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, damageType: [...formData.damageType, "Cosmetic"] });
                            } else {
                              setFormData({ ...formData, damageType: formData.damageType.filter(t => t !== "Cosmetic") });
                            }
                          }}
                          className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="text-sm">Cosmetic</span>
                      </label>
                    </div>
                  </div>

                  {/* Describe the Damage (Continued) */}
                  <div className="mt-4">
                    <label htmlFor="damageContinued" className="block text-sm font-medium text-neutral-700 mb-2">
                      Describe the Damage (Continued)<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="damageContinued"
                      rows={4}
                      required
                      value={formData.damageContinued}
                      onChange={(e) => setFormData({ ...formData, damageContinued: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Provide a detailed description of the damage..."
                    />
                  </div>
                </>
              )}
            </div>

            {/* Additional Information Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Additional Information</h3>

              {/* Comments */}
              <div className="mb-4">
                <label htmlFor="comments" className="block text-sm font-medium text-neutral-700 mb-2">
                  Comments
                </label>
                <textarea
                  id="comments"
                  rows={4}
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any additional comments..."
                />
              </div>

              {/* Signature */}
              <SignatureCanvasComponent
                value={formData.signature}
                onChange={(signature) => setFormData({ ...formData, signature })}
                label="Signature"
                required
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