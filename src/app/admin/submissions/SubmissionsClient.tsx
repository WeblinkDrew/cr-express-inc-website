"use client";

import { useState, useEffect } from "react";

interface Submission {
  id: string;
  companyLegalName: string;
  division: string;
  branchAddressLine1: string;
  branchCity: string;
  branchState: string;
  branchZipCode: string;
  mc: string | null;
  dot: string | null;
  scacCode: string | null;
  primaryContactFirstName: string;
  primaryContactLastName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  secondaryContactFirstName: string;
  secondaryContactLastName: string;
  secondaryContactEmail: string;
  secondaryContactPhone: string;
  escalationContactFirstName: string;
  escalationContactLastName: string;
  escalationContactEmail: string;
  escalationContactPhone: string;
  accountsPayableFirstName: string;
  accountsPayableLastName: string;
  accountsPayableEmail: string;
  accountsPayablePhone: string;
  billingAddressLine1: string;
  billingCity: string;
  billingState: string;
  billingZipCode: string;
  invoicingInstructions: string | null;
  paymentMethod: string;
  shipmentTypes: string;
  equipmentTypes: string;
  shipmentBuild: string;
  additionalRequirements: string;
  monthlyShipments: string;
  exceptionCommunication: string;
  reviewFrequency: string;
  submittedAt: string;
  sentToZapier: boolean;
}

export default function SubmissionsClient() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const [search, setSearch] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = submissions.filter((sub) =>
        sub.companyLegalName.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredSubmissions(filtered);
    } else {
      setFilteredSubmissions(submissions);
    }
  }, [search, submissions]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/submissions");
      const data = await response.json();
      setSubmissions(data.submissions);
      setFilteredSubmissions(data.submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async (submissionId: string, companyName: string) => {
    try {
      const response = await fetch(`/api/admin/submissions/${submissionId}/pdf`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Onboarding_${companyName.replace(/[^a-zA-Z0-9]/g, "_")}_${submissionId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Form Submissions</h1>
          <p className="mt-2 text-neutral-600">View and download client onboarding submissions</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by company name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md rounded-md border border-neutral-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Submissions Table */}
        {loading ? (
          <div className="rounded-lg bg-white p-8 text-center shadow">
            <p className="text-neutral-600">Loading submissions...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow">
            <p className="text-neutral-600">
              {search ? "No submissions found matching your search" : "No submissions yet"}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Company Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Division
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Primary Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Zapier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                {filteredSubmissions.map((submission) => (
                  <tr
                    key={submission.id}
                    className="cursor-pointer hover:bg-neutral-50"
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-neutral-900">
                      {submission.companyLegalName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">
                      {submission.division}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">
                      {submission.primaryContactFirstName} {submission.primaryContactLastName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {submission.sentToZapier ? (
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          Sent
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadPDF(submission.id, submission.companyLegalName);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {selectedSubmission && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={() => setSelectedSubmission(null)}
          >
            <div
              className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-8 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-neutral-900">Submission Details</h2>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Download Button */}
              <div className="mb-6">
                <button
                  onClick={() =>
                    handleDownloadPDF(selectedSubmission.id, selectedSubmission.companyLegalName)
                  }
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Download PDF
                </button>
              </div>

              {/* Submission Info */}
              <div className="space-y-6">
                {/* Basic Client Information */}
                <section>
                  <h3 className="mb-4 text-lg font-semibold text-neutral-900">
                    Basic Client Information
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Company Legal Name</label>
                      <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.companyLegalName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Division</label>
                      <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.division}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-neutral-700">Branch Location</label>
                      <p className="mt-1 text-sm text-neutral-900">
                        {selectedSubmission.branchAddressLine1}, {selectedSubmission.branchCity},{" "}
                        {selectedSubmission.branchState} {selectedSubmission.branchZipCode}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">MC</label>
                      <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.mc || "N/A"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">DOT</label>
                      <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.dot || "N/A"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">SCAC Code</label>
                      <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.scacCode || "N/A"}</p>
                    </div>
                  </div>
                </section>

                {/* Contact Information */}
                <section>
                  <h3 className="mb-4 text-lg font-semibold text-neutral-900">Contact Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Primary Contact</label>
                      <p className="mt-1 text-sm text-neutral-900">
                        {selectedSubmission.primaryContactFirstName} {selectedSubmission.primaryContactLastName}
                      </p>
                      <p className="text-sm text-neutral-600">{selectedSubmission.primaryContactEmail}</p>
                      <p className="text-sm text-neutral-600">{selectedSubmission.primaryContactPhone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Secondary Contact</label>
                      <p className="mt-1 text-sm text-neutral-900">
                        {selectedSubmission.secondaryContactFirstName} {selectedSubmission.secondaryContactLastName}
                      </p>
                      <p className="text-sm text-neutral-600">{selectedSubmission.secondaryContactEmail}</p>
                      <p className="text-sm text-neutral-600">{selectedSubmission.secondaryContactPhone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Escalation Contact</label>
                      <p className="mt-1 text-sm text-neutral-900">
                        {selectedSubmission.escalationContactFirstName} {selectedSubmission.escalationContactLastName}
                      </p>
                      <p className="text-sm text-neutral-600">{selectedSubmission.escalationContactEmail}</p>
                      <p className="text-sm text-neutral-600">{selectedSubmission.escalationContactPhone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Accounts Payable Contact</label>
                      <p className="mt-1 text-sm text-neutral-900">
                        {selectedSubmission.accountsPayableFirstName} {selectedSubmission.accountsPayableLastName}
                      </p>
                      <p className="text-sm text-neutral-600">{selectedSubmission.accountsPayableEmail}</p>
                      <p className="text-sm text-neutral-600">{selectedSubmission.accountsPayablePhone}</p>
                    </div>
                  </div>
                </section>

                {/* Financial Information */}
                <section>
                  <h3 className="mb-4 text-lg font-semibold text-neutral-900">Financial Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-neutral-700">Billing Address</label>
                      <p className="mt-1 text-sm text-neutral-900">
                        {selectedSubmission.billingAddressLine1}, {selectedSubmission.billingCity},{" "}
                        {selectedSubmission.billingState} {selectedSubmission.billingZipCode}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-neutral-700">Invoicing Instructions</label>
                      <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.invoicingInstructions || "N/A"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Payment Method</label>
                      <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.paymentMethod}</p>
                    </div>
                  </div>
                </section>

                {/* Operations Information */}
                <section>
                  <h3 className="mb-4 text-lg font-semibold text-neutral-900">Operations Information</h3>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Shipment Types</label>
                      <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.shipmentTypes}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Equipment Types</label>
                      <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.equipmentTypes}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Shipment Build</label>
                      <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.shipmentBuild}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Additional Requirements</label>
                      <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.additionalRequirements}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Monthly Shipments</label>
                      <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.monthlyShipments}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Exception Communication</label>
                      <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.exceptionCommunication}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Review Frequency</label>
                      <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.reviewFrequency}</p>
                    </div>
                  </div>
                </section>

                {/* Submission Metadata */}
                <section>
                  <h3 className="mb-4 text-lg font-semibold text-neutral-900">Submission Details</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Submission ID</label>
                      <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.id}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Submitted At</label>
                      <p className="mt-1 text-sm text-neutral-900">
                        {new Date(selectedSubmission.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Zapier Status</label>
                      <p className="mt-1 text-sm text-neutral-900">
                        {selectedSubmission.sentToZapier ? "Sent to Zapier" : "Pending"}
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Close Button */}
              <div className="mt-8">
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="rounded-md bg-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
