"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CargoDamageReportFormProps {
  formId: string;
  formType: string;
  formName: string;
}

export default function CargoDamageReportForm({ formId, formName }: CargoDamageReportFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    damageFound: "",
    masterAirWaybillNumber: "",
    houseAirWaybillNumber: "",
    totalPieceCount: "",
    classificationRating: "",
    notesDetails: "",
    piecesWithDamage: "",
    inspectorFirstName: "",
    inspectorLastName: "",
    inspectorTitle: "",
    signature: "",
    dateTime: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].substring(0, 5),
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
          supportingDocuments: {
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

      router.push(`/form/success?type=cargo-damage`);
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
            <h1 className="text-3xl font-bold text-white">Cargo Irregularity Report - Damage</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-8">
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Warehouse Details Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Warehouse Details</h3>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Damage Was Found...<span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="Upon Acceptance"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, damageFound: "Upon Acceptance" });
                        }
                      }}
                      checked={formData.damageFound === "Upon Acceptance"}
                      className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm">Upon Acceptance</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="At Airport"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, damageFound: "At Airport" });
                        }
                      }}
                      checked={formData.damageFound === "At Airport"}
                      className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm">At Airport</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="When Breaking ULD"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, damageFound: "When Breaking ULD" });
                        }
                      }}
                      checked={formData.damageFound === "When Breaking ULD"}
                      className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm">When Breaking ULD</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Shipment Details Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Shipment Details</h3>

              {/* Master Air Waybill Number */}
              <div className="mb-4">
                <label htmlFor="masterAirWaybillNumber" className="block text-sm font-medium text-neutral-700 mb-2">
                  Master Air Waybill Number
                </label>
                <input
                  type="text"
                  id="masterAirWaybillNumber"
                  value={formData.masterAirWaybillNumber}
                  onChange={(e) => setFormData({ ...formData, masterAirWaybillNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* House Air Waybill Number */}
              <div className="mb-4">
                <label htmlFor="houseAirWaybillNumber" className="block text-sm font-medium text-neutral-700 mb-2">
                  House Air Waybill Number
                </label>
                <input
                  type="text"
                  id="houseAirWaybillNumber"
                  value={formData.houseAirWaybillNumber}
                  onChange={(e) => setFormData({ ...formData, houseAirWaybillNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Total Piece Count */}
              <div>
                <label htmlFor="totalPieceCount" className="block text-sm font-medium text-neutral-700 mb-2">
                  Total Piece Count
                </label>
                <input
                  type="text"
                  id="totalPieceCount"
                  value={formData.totalPieceCount}
                  onChange={(e) => setFormData({ ...formData, totalPieceCount: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Damage Classification Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Damage Classification</h3>

              {/* Classification Rating */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Classification Rating
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="A - Minor (Cosmetic)"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, classificationRating: "A - Minor (Cosmetic)" });
                        }
                      }}
                      checked={formData.classificationRating === "A - Minor (Cosmetic)"}
                      className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm">A - Minor (Cosmetic)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="B - Moderate (No Apparent Inner Damage)"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, classificationRating: "B - Moderate (No Apparent Inner Damage)" });
                        }
                      }}
                      checked={formData.classificationRating === "B - Moderate (No Apparent Inner Damage)"}
                      className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm">B - Moderate (No Apparent Inner Damage)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="C - Critical (Possible Inner Damage)"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, classificationRating: "C - Critical (Possible Inner Damage)" });
                        }
                      }}
                      checked={formData.classificationRating === "C - Critical (Possible Inner Damage)"}
                      className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm">C - Critical (Possible Inner Damage)</span>
                  </label>
                </div>
              </div>

              {/* Notes / Damage Details */}
              <div className="mb-4">
                <label htmlFor="notesDetails" className="block text-sm font-medium text-neutral-700 mb-2">
                  Notes / Damage Details
                </label>
                <textarea
                  id="notesDetails"
                  rows={3}
                  value={formData.notesDetails}
                  onChange={(e) => setFormData({ ...formData, notesDetails: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the damage details..."
                />
              </div>

              {/* Number of Pieces Damaged */}
              <div>
                <label htmlFor="piecesWithDamage" className="block text-sm font-medium text-neutral-700 mb-2">
                  Number of Pieces Damaged
                </label>
                <input
                  type="text"
                  id="piecesWithDamage"
                  value={formData.piecesWithDamage}
                  onChange={(e) => setFormData({ ...formData, piecesWithDamage: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Additional Information</h3>

              {/* Supporting Documents */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Supporting Documents
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
                          accept="image/*,.pdf,.doc,.docx"
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

              {/* Inspector */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Inspector
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={formData.inspectorFirstName}
                      onChange={(e) => setFormData({ ...formData, inspectorFirstName: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="block text-xs text-neutral-500 mt-1">First Name</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={formData.inspectorLastName}
                      onChange={(e) => setFormData({ ...formData, inspectorLastName: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="block text-xs text-neutral-500 mt-1">Last Name</label>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Title
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="Agent"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, inspectorTitle: "Agent" });
                        }
                      }}
                      checked={formData.inspectorTitle === "Agent"}
                      className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm">Agent</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="Lead"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, inspectorTitle: "Lead" });
                        }
                      }}
                      checked={formData.inspectorTitle === "Lead"}
                      className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm">Lead</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="Supervisor"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, inspectorTitle: "Supervisor" });
                        }
                      }}
                      checked={formData.inspectorTitle === "Supervisor"}
                      className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm">Supervisor</span>
                  </label>
                </div>
              </div>

              {/* Signature */}
              <div className="mb-4">
                <label htmlFor="signature" className="block text-sm font-medium text-neutral-700 mb-2">
                  Signature
                </label>
                <textarea
                  id="signature"
                  rows={3}
                  value={formData.signature}
                  onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Use your mouse or finger to draw your signature above"
                />
                <label className="block text-xs text-neutral-500 mt-1">Use your mouse or finger to draw your signature above</label>
              </div>

              {/* Date/Time */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Date/Time
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={formData.dateTime}
                    onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                    className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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