"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DriverFeedbackFormProps {
  formId: string;
  formType: string;
  formName: string;
}

export default function DriverFeedbackForm({ formId, formName }: DriverFeedbackFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    driverName: "",
    urgency: "",
    preferredContact: "",
    feedbackTopics: [] as string[],
    otherTopic: "",
  });

  const handleTopicsChange = (topic: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        feedbackTopics: [...formData.feedbackTopics, topic],
      });
    } else {
      setFormData({
        ...formData,
        feedbackTopics: formData.feedbackTopics.filter((t) => t !== topic),
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

      router.push(`/form/success?type=driver-feedback`);
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
          {/* Header - Note: The title appears to be cut off in the image */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Driver Feedback & Reporting</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* What is your name? */}
            <div>
              <label htmlFor="driverName" className="block text-sm font-medium text-neutral-700 mb-2">
                What is your name?<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="driverName"
                required
                value={formData.driverName}
                onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Urgency<span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="urgency"
                    value="Low"
                    required
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Low</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="urgency"
                    value="Medium"
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Medium</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="urgency"
                    value="High"
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">High</span>
                </label>
              </div>
            </div>

            {/* Preferred Method of Contact */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Preferred Method of Contact<span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="In-Person Meeting"
                    required
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">In-Person Meeting</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="Phone Call"
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Phone Call</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="Email"
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Email</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="No Follow-Up"
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">No Follow-Up</span>
                </label>
              </div>
            </div>

            {/* What do you want to do? */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                What do you want to do?<span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Provide Feedback / Suggestions"
                    onChange={(e) => handleTopicsChange("Provide Feedback / Suggestions", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Provide Feedback / Suggestions</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Request Assistance / Help"
                    onChange={(e) => handleTopicsChange("Request Assistance / Help", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Request Assistance / Help</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Ask A Question"
                    onChange={(e) => handleTopicsChange("Ask A Question", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Ask A Question</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Performance Feedback Request"
                    onChange={(e) => handleTopicsChange("Performance Feedback Request", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Performance Feedback Request</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Reporting Personnel Concerns"
                    onChange={(e) => handleTopicsChange("Reporting Personnel Concerns", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Reporting Personnel Concerns</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Reporting Other Concerns"
                    onChange={(e) => handleTopicsChange("Reporting Other Concerns", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Reporting Other Concerns</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Other"
                    onChange={(e) => handleTopicsChange("Other", e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm">Other</span>
                </label>
                {formData.feedbackTopics.includes("Other") && (
                  <textarea
                    placeholder="Please specify..."
                    value={formData.otherTopic}
                    onChange={(e) => setFormData({ ...formData, otherTopic: e.target.value })}
                    rows={3}
                    className="ml-6 mt-2 w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}