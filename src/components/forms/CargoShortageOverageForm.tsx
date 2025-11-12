"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignatureCanvasComponent from "./SignatureCanvas";

interface CargoShortageOverageFormProps {
  formId: string;
  formType: string;
  formName: string;
}

interface ShipmentEntry {
  houseAirWaybillNumber: string;
  totalPieceCount: string;
  piecesReceived: string;
  piecesOverShort: string;
}

export default function CargoShortageOverageForm({ formId, formName }: CargoShortageOverageFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    shortageOverageFound: "",
    masterAirWaybillNumber: "",
    shipmentEntries: [
      { houseAirWaybillNumber: "", totalPieceCount: "", piecesReceived: "", piecesOverShort: "" },
      { houseAirWaybillNumber: "", totalPieceCount: "", piecesReceived: "", piecesOverShort: "" },
      { houseAirWaybillNumber: "", totalPieceCount: "", piecesReceived: "", piecesOverShort: "" },
      { houseAirWaybillNumber: "", totalPieceCount: "", piecesReceived: "", piecesOverShort: "" },
    ] as ShipmentEntry[],
    additionalComments: ["", "", "", ""],
    inspectorFirstName: "",
    inspectorLastName: "",
    title: "",
    signature: "",
    dateTime: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].substring(0, 5),
  });

  const handleShipmentChange = (index: number, field: keyof ShipmentEntry, value: string) => {
    const newEntries = [...formData.shipmentEntries];
    newEntries[index] = {
      ...newEntries[index],
      [field]: value,
    };
    setFormData({ ...formData, shipmentEntries: newEntries });
  };

  const handleCommentChange = (index: number, value: string) => {
    const newComments = [...formData.additionalComments];
    newComments[index] = value;
    setFormData({ ...formData, additionalComments: newComments });
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

      router.push(`/form/success?type=cargo-shortage-overage`);
    } catch (err: any) {
      console.error("Form submission error:", err);
      setError(err.message || "An error occurred while submitting the form");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Cargo Irregularity Report - Shortage/Overage</h1>
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
                  Shortage/Overage Was Found...
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="Upon Acceptance"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, shortageOverageFound: "Upon Acceptance" });
                        }
                      }}
                      checked={formData.shortageOverageFound === "Upon Acceptance"}
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
                          setFormData({ ...formData, shortageOverageFound: "At Airport" });
                        }
                      }}
                      checked={formData.shortageOverageFound === "At Airport"}
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
                          setFormData({ ...formData, shortageOverageFound: "When Breaking ULD" });
                        }
                      }}
                      checked={formData.shortageOverageFound === "When Breaking ULD"}
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

              {/* Master Air Waybill/Reference Number */}
              <div className="mb-6">
                <label htmlFor="masterAirWaybillNumber" className="block text-sm font-medium text-neutral-700 mb-2">
                  Master Air Waybill/Reference Number
                </label>
                <input
                  type="text"
                  id="masterAirWaybillNumber"
                  value={formData.masterAirWaybillNumber}
                  onChange={(e) => setFormData({ ...formData, masterAirWaybillNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Shipment Entries */}
              {[1, 2, 3, 4].map((num, index) => (
                <div key={num} className="mb-6">
                  <h4 className="text-sm font-semibold text-neutral-700 mb-3">#{num}</h4>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            House Air Waybill Number
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Total Piece Count
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Number of Pieces Received
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Number of Pieces Over/Short
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-3 py-2 text-sm text-gray-500">Shortage</td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={formData.shipmentEntries[index].totalPieceCount}
                              onChange={(e) => handleShipmentChange(index, "totalPieceCount", e.target.value)}
                              className="w-full px-2 py-1 border border-neutral-300 rounded focus:ring-1 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={formData.shipmentEntries[index].piecesReceived}
                              onChange={(e) => handleShipmentChange(index, "piecesReceived", e.target.value)}
                              className="w-full px-2 py-1 border border-neutral-300 rounded focus:ring-1 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={formData.shipmentEntries[index].piecesOverShort}
                              onChange={(e) => handleShipmentChange(index, "piecesOverShort", e.target.value)}
                              className="w-full px-2 py-1 border border-neutral-300 rounded focus:ring-1 focus:ring-blue-500"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 text-sm text-gray-500">Overage</td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-neutral-300 rounded focus:ring-1 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-neutral-300 rounded focus:ring-1 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-neutral-300 rounded focus:ring-1 focus:ring-blue-500"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Additional Comments for this entry */}
                  <div className="mt-3">
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      #{num} Additional Comments
                    </label>
                    <input
                      type="text"
                      value={formData.additionalComments[index]}
                      onChange={(e) => handleCommentChange(index, e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Additional comments..."
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Inspected By Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Inspected By:</h3>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Name
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
                <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Signature */}
              <SignatureCanvasComponent
                value={formData.signature}
                onChange={(signature) => setFormData({ ...formData, signature })}
                label="Signature"
              />

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