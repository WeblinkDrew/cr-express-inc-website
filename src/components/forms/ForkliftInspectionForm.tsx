"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignatureCanvasComponent from "./SignatureCanvas";

interface ForkliftInspectionFormProps {
  formId: string;
  formType: string;
  formName: string;
}

interface InspectionItems {
  noLeaks: string;
  safetyStraps: string;
  fuelLevels: string;
  frontRearTires: string;
  engineOilLevel: string;
  hydraulicOilLevel: string;
  allBelts: string;
  airFilterUnit: string;
  forkLockingPins: string;
  liftCylinderChains: string;
  hornOperations: string;
  driversOverheadGuard: string;
  seatBeltOperation: string;
  listenUnusualNoise: string;
  allGaugesOperation: string;
  headTaillightOperations: string;
  footBrakePedalOperation: string;
  inchingBrakePedalOperation: string;
  liftingControlLeverOperation: string;
  tiltControlLeverOperation: string;
  sideShifterLevelOperation: string;
  attachmentControlLevel: string;
  backupAlarmOperation: string;
  strobeLightOperation: string;
  directionalLeverOperation: string;
  powerSteeringOperation: string;
}

export default function ForkliftInspectionForm({ formId, formName }: ForkliftInspectionFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    dateTime: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].substring(0, 5),
    operatorFirstName: "",
    operatorLastName: "",
    signature: "",
    shiftNumber: "",
    truckNumber: "",
    serialNumber: "",
    hourMeterReading: "",
    inspectionItems: {
      noLeaks: "",
      safetyStraps: "",
      fuelLevels: "",
      frontRearTires: "",
      engineOilLevel: "",
      hydraulicOilLevel: "",
      allBelts: "",
      airFilterUnit: "",
      forkLockingPins: "",
      liftCylinderChains: "",
      hornOperations: "",
      driversOverheadGuard: "",
      seatBeltOperation: "",
      listenUnusualNoise: "",
      allGaugesOperation: "",
      headTaillightOperations: "",
      footBrakePedalOperation: "",
      inchingBrakePedalOperation: "",
      liftingControlLeverOperation: "",
      tiltControlLeverOperation: "",
      sideShifterLevelOperation: "",
      attachmentControlLevel: "",
      backupAlarmOperation: "",
      strobeLightOperation: "",
      directionalLeverOperation: "",
      powerSteeringOperation: "",
    } as InspectionItems,
    additionalComments: "",
    doubleCheckFirstName: "",
    doubleCheckLastName: "",
    doubleCheckSignature: "",
  });

  const handleInspectionChange = (field: keyof InspectionItems, value: string) => {
    setFormData({
      ...formData,
      inspectionItems: {
        ...formData.inspectionItems,
        [field]: value,
      },
    });
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

      router.push(`/form/success?type=forklift-inspection`);
    } catch (err: any) {
      console.error("Form submission error:", err);
      setError(err.message || "An error occurred while submitting the form");
      setIsSubmitting(false);
    }
  };

  const inspectionItems = [
    { key: "noLeaks", label: "No Leaks" },
    { key: "safetyStraps", label: "Safety Straps" },
    { key: "fuelLevels", label: "Fuel Levels" },
    { key: "frontRearTires", label: "Front & Rear Tires" },
    { key: "engineOilLevel", label: "Engine Oil Level" },
    { key: "hydraulicOilLevel", label: "Hydraulic Oil Level" },
    { key: "allBelts", label: "All Belts" },
    { key: "airFilterUnit", label: "Air Filter Unit" },
    { key: "forkLockingPins", label: "Fork Locking Pins" },
    { key: "liftCylinderChains", label: "Lift Cylinder Chains" },
    { key: "hornOperations", label: "Horn Operations" },
    { key: "driversOverheadGuard", label: "Driver's Overhead Guard" },
    { key: "seatBeltOperation", label: "Seat Belt Operation" },
    { key: "listenUnusualNoise", label: "Listen for Unusual Noise" },
    { key: "allGaugesOperation", label: "Operation of all Gauges" },
    { key: "headTaillightOperations", label: "Head & Taillight Operations" },
    { key: "footBrakePedalOperation", label: "Foot Brake Pedal Operation" },
    { key: "inchingBrakePedalOperation", label: "Inching Brake Pedal Operation" },
    { key: "liftingControlLeverOperation", label: "Lifting Control Lever Operation" },
    { key: "tiltControlLeverOperation", label: "Tilt Control Lever Operation" },
    { key: "sideShifterLevelOperation", label: "Side Shifter Level Operation" },
    { key: "attachmentControlLevel", label: "Attachment Control Level" },
    { key: "backupAlarmOperation", label: "Backup Alarm Operation" },
    { key: "strobeLightOperation", label: "Strobe Light Operation" },
    { key: "directionalLeverOperation", label: "Directional Lever Operation" },
    { key: "powerSteeringOperation", label: "Power Steering Operation" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Forklift Inspection Checklist</h1>
            <p className="mt-2 text-blue-100 text-sm">
              This checklist must be completed prior to operating a forklift to ensure the safety of the staff
              on the warehouse floor.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

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

            {/* Operator's Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Operator's Name<span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={formData.operatorFirstName}
                    onChange={(e) => setFormData({ ...formData, operatorFirstName: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block text-xs text-neutral-500 mt-1">First Name</label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    value={formData.operatorLastName}
                    onChange={(e) => setFormData({ ...formData, operatorLastName: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block text-xs text-neutral-500 mt-1">Last Name</label>
                </div>
              </div>
            </div>

            {/* Signature */}
            <SignatureCanvasComponent
              value={formData.signature}
              onChange={(signature) => setFormData({ ...formData, signature })}
              label="Signature"
            />

            {/* Shift Number */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Shift Number
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shiftNumber"
                    value="1st Shift"
                    onChange={(e) => setFormData({ ...formData, shiftNumber: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">1st Shift</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shiftNumber"
                    value="2nd Shift"
                    onChange={(e) => setFormData({ ...formData, shiftNumber: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">2nd Shift</span>
                </label>
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
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Serial Number */}
            <div>
              <label htmlFor="serialNumber" className="block text-sm font-medium text-neutral-700 mb-2">
                Serial Number
              </label>
              <input
                type="text"
                id="serialNumber"
                value={formData.serialNumber}
                onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Hour Meter Reading */}
            <div>
              <label htmlFor="hourMeterReading" className="block text-sm font-medium text-neutral-700 mb-2">
                Hour Meter Reading
              </label>
              <input
                type="text"
                id="hourMeterReading"
                value={formData.hourMeterReading}
                onChange={(e) => setFormData({ ...formData, hourMeterReading: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Inspection Items */}
            <div className="border rounded-lg p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                Inspection: Leaks, Safety Straps, and Fuel
              </h3>
              <div className="space-y-4">
                {inspectionItems.map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-neutral-700">{item.label}<span className="text-red-500">*</span></label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={item.key}
                          value="Pass"
                          required
                          onChange={(e) => handleInspectionChange(item.key as keyof InspectionItems, e.target.value)}
                          className="mr-1 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">Pass</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={item.key}
                          value="Fail"
                          onChange={(e) => handleInspectionChange(item.key as keyof InspectionItems, e.target.value)}
                          className="mr-1 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">Fail</span>
                      </label>
                      {item.key === "fuelLevels" && (
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={item.key}
                            value="N/A"
                            onChange={(e) => handleInspectionChange(item.key as keyof InspectionItems, e.target.value)}
                            className="mr-1 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm">N/A</span>
                        </label>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Comments */}
            <div>
              <label htmlFor="additionalComments" className="block text-sm font-medium text-neutral-700 mb-2">
                Additional Comments
              </label>
              <textarea
                id="additionalComments"
                rows={4}
                value={formData.additionalComments}
                onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any additional notes or comments..."
              />
            </div>

            {/* Name of Double Check */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Name of Double Check
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.doubleCheckFirstName}
                    onChange={(e) => setFormData({ ...formData, doubleCheckFirstName: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block text-xs text-neutral-500 mt-1">First Name</label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.doubleCheckLastName}
                    onChange={(e) => setFormData({ ...formData, doubleCheckLastName: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block text-xs text-neutral-500 mt-1">Last Name</label>
                </div>
              </div>
            </div>

            {/* Double Check Signature */}
            <SignatureCanvasComponent
              value={formData.doubleCheckSignature}
              onChange={(doubleCheckSignature) => setFormData({ ...formData, doubleCheckSignature })}
              label="Double Check Signature"
            />

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