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
    companyCellPhoneIMEI: "",
    hasWorkDeskPhone: "",
    workDeskPhoneDeviceID: "",
    hasLaptop: "",
    laptopMakeAndDeviceName: "",
    hasMonitor: "",
    monitorMakeAndSerialNumber: "",
    hasSecondMonitor: "",
    hasCompanyCreditCard: "",
    companyCreditCardLast4: "",
    hasSecondCompanyCreditCard: "",
    hasScanner: "",
    scannerSerialNumber: "",
    hasDesktop: "",
    desktopMakeAndDeviceName: "",
    hasTablet: "",
    tabletIMEI: "",
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
                <option value="">No</option>
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
                <option value="">No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* CONDITIONAL: What is the IMEI? */}
            {formData.hasCompanyCellPhone === "Yes" && (
              <div>
                <label htmlFor="companyCellPhoneIMEI" className="block text-sm font-medium text-neutral-700 mb-2">
                  What is the IMEI?<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyCellPhoneIMEI"
                  required
                  placeholder="Example: 35 277225 089212 0"
                  value={formData.companyCellPhoneIMEI}
                  onChange={(e) => setFormData({ ...formData, companyCellPhoneIMEI: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  You can find the IMEI by going to Settings &gt; General &gt; About on iPhone.
                </p>
              </div>
            )}

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
                <option value="">No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* CONDITIONAL: What is the Device ID? */}
            {formData.hasWorkDeskPhone === "Yes" && (
              <div>
                <label htmlFor="workDeskPhoneDeviceID" className="block text-sm font-medium text-neutral-700 mb-2">
                  What is the Device ID?<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="workDeskPhoneDeviceID"
                  required
                  value={formData.workDeskPhoneDeviceID}
                  onChange={(e) => setFormData({ ...formData, workDeskPhoneDeviceID: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  Located on the back of the desk phone. Should start with "MAC".
                </p>
              </div>
            )}

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
                <option value="">No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* CONDITIONAL: What is the make and device name? */}
            {formData.hasLaptop === "Yes" && (
              <div>
                <label htmlFor="laptopMakeAndDeviceName" className="block text-sm font-medium text-neutral-700 mb-2">
                  What is the make and device name?<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="laptopMakeAndDeviceName"
                  required
                  placeholder="Example: Lenovo Ideapad 5, CRLG-J1GC8"
                  value={formData.laptopMakeAndDeviceName}
                  onChange={(e) => setFormData({ ...formData, laptopMakeAndDeviceName: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  This information can be found in the settings under the "System" menu item, and at the top of the page.
                </p>
              </div>
            )}

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
                <option value="">No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* CONDITIONAL: What is the make and serial number of your monitor? */}
            {formData.hasMonitor === "Yes" && (
              <>
                <div>
                  <label htmlFor="monitorMakeAndSerialNumber" className="block text-sm font-medium text-neutral-700 mb-2">
                    What is the make and serial number of your monitor?<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="monitorMakeAndSerialNumber"
                    required
                    placeholder="Example: Dell, P2217"
                    value={formData.monitorMakeAndSerialNumber}
                    onChange={(e) => setFormData({ ...formData, monitorMakeAndSerialNumber: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    You can find the make and serial number on the settings under the Bluetooth & Devices menu item, and by selecting Devices.
                  </p>
                </div>

                {/* CONDITIONAL: Do you have a second monitor? */}
                <div>
                  <label htmlFor="hasSecondMonitor" className="block text-sm font-medium text-neutral-700 mb-2">
                    Do you have a second monitor?<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="hasSecondMonitor"
                    required
                    value={formData.hasSecondMonitor}
                    onChange={(e) => setFormData({ ...formData, hasSecondMonitor: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value=""></option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </>
            )}

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
                <option value="">No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* CONDITIONAL: Please enter the last 4 digits of the card */}
            {formData.hasCompanyCreditCard === "Yes" && (
              <>
                <div>
                  <label htmlFor="companyCreditCardLast4" className="block text-sm font-medium text-neutral-700 mb-2">
                    Please enter the last 4 digits of the card<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyCreditCardLast4"
                    required
                    maxLength={4}
                    value={formData.companyCreditCardLast4}
                    onChange={(e) => setFormData({ ...formData, companyCreditCardLast4: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* CONDITIONAL: Do you have a second company credit card? */}
                <div>
                  <label htmlFor="hasSecondCompanyCreditCard" className="block text-sm font-medium text-neutral-700 mb-2">
                    Do you have a second company credit card?<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="hasSecondCompanyCreditCard"
                    required
                    value={formData.hasSecondCompanyCreditCard}
                    onChange={(e) => setFormData({ ...formData, hasSecondCompanyCreditCard: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value=""></option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </>
            )}

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
                <option value="">No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* CONDITIONAL: Please enter the scanner's serial number */}
            {formData.hasScanner === "Yes" && (
              <div>
                <label htmlFor="scannerSerialNumber" className="block text-sm font-medium text-neutral-700 mb-2">
                  Please enter the scanner's serial number.<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="scannerSerialNumber"
                  required
                  value={formData.scannerSerialNumber}
                  onChange={(e) => setFormData({ ...formData, scannerSerialNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  The serial number is usually located on the back, bottom, or under the battery cover of the scanner. It may be labeled as "S/N".
                </p>
              </div>
            )}

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
                <option value="">No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* CONDITIONAL: What is the make and device name? (Desktop) */}
            {formData.hasDesktop === "Yes" && (
              <div>
                <label htmlFor="desktopMakeAndDeviceName" className="block text-sm font-medium text-neutral-700 mb-2">
                  What is the make and device name?<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="desktopMakeAndDeviceName"
                  required
                  placeholder="Example: Lenovo Ideapad 5, CRLG-J1GC8"
                  value={formData.desktopMakeAndDeviceName}
                  onChange={(e) => setFormData({ ...formData, desktopMakeAndDeviceName: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  This information can be found in the settings under the "System" menu item, and at the top of the page.
                </p>
              </div>
            )}

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
                <option value="">No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* CONDITIONAL: What is the tablet's IMEI? */}
            {formData.hasTablet === "Yes" && (
              <div>
                <label htmlFor="tabletIMEI" className="block text-sm font-medium text-neutral-700 mb-2">
                  What is the tablet's IMEI?<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="tabletIMEI"
                  required
                  placeholder="Example: DMPXR00QHLF9"
                  value={formData.tabletIMEI}
                  onChange={(e) => setFormData({ ...formData, tabletIMEI: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  You can find the serial number by going to Settings &gt; General &gt; About or printed on the back of the iPad near the bottom.
                </p>
              </div>
            )}

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
