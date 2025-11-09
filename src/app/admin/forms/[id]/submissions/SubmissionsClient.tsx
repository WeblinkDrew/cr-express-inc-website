"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Submission {
  id: string;
  submittedAt: Date;
  companyLegalName: string;
  division: string;
  primaryContactFirstName: string;
  primaryContactLastName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  branchCity: string;
  branchState: string;
  sentToZapier: boolean;
  zapierError: string | null;
  [key: string]: any;
}

interface Form {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  Submission: Submission[];
}

interface SubmissionsClientProps {
  form: Form;
}

export default function SubmissionsClient({ form }: SubmissionsClientProps) {
  const router = useRouter();
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [exporting, setExporting] = useState(false);

  const downloadPDF = async (submissionId: string, companyName: string) => {
    try {
      const response = await fetch(`/api/admin/submissions/${submissionId}/pdf`);

      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Onboarding_${companyName.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF");
    }
  };

  const exportToCSV = () => {
    setExporting(true);

    try {
      // Define CSV headers
      const headers = [
        "Submission ID",
        "Submitted At",
        "Company Name",
        "Division",
        "Primary Contact",
        "Email",
        "Phone",
        "Location",
        "MC",
        "DOT",
        "SCAC",
        "Payment Method",
        "Monthly Shipments",
        "Sent to Zapier",
        "Zapier Error",
      ];

      // Create CSV rows
      const rows = form.Submission.map((sub) => [
        sub.id,
        new Date(sub.submittedAt).toLocaleString(),
        sub.companyLegalName,
        sub.division,
        `${sub.primaryContactFirstName} ${sub.primaryContactLastName}`,
        sub.primaryContactEmail,
        sub.primaryContactPhone,
        `${sub.branchCity}, ${sub.branchState}`,
        sub.mc || "N/A",
        sub.dot || "N/A",
        sub.scacCode || "N/A",
        sub.paymentMethod,
        sub.monthlyShipments,
        sub.sentToZapier ? "Yes" : "No",
        sub.zapierError || "N/A",
      ]);

      // Combine headers and rows
      const csv = [
        headers.join(","),
        ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
      ].join("\n");

      // Create download
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${form.name.replace(/\s+/g, "_")}_submissions_${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("Failed to export CSV");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="rounded-md bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200"
              >
                ← Back
              </button>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">{form.name}</h1>
                <p className="text-sm text-neutral-600">Form Submissions</p>
              </div>
            </div>
            <button
              onClick={exportToCSV}
              disabled={exporting || form.Submission.length === 0}
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
            >
              {exporting ? "Exporting..." : "Export to CSV"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <p className="text-sm font-medium text-neutral-600">Total Submissions</p>
            <p className="mt-2 text-3xl font-bold text-neutral-900">{form.Submission.length}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <p className="text-sm font-medium text-neutral-600">Sent to Zapier</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {form.Submission.filter((s) => s.sentToZapier).length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <p className="text-sm font-medium text-neutral-600">Failed Zapier</p>
            <p className="mt-2 text-3xl font-bold text-red-600">
              {form.Submission.filter((s) => s.zapierError).length}
            </p>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="rounded-lg bg-white shadow">
          <div className="border-b border-neutral-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-neutral-900">All Submissions</h2>
          </div>

          {form.Submission.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-neutral-500">No submissions yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Primary Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                  {form.Submission.map((submission) => (
                    <tr key={submission.id} className="hover:bg-neutral-50">
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                        <br />
                        <span className="text-xs text-neutral-500">
                          {new Date(submission.submittedAt).toLocaleTimeString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="font-medium text-neutral-900">{submission.companyLegalName}</div>
                        <div className="text-neutral-500">{submission.division}</div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="text-neutral-900">
                          {submission.primaryContactFirstName} {submission.primaryContactLastName}
                        </div>
                        <div className="text-neutral-500">{submission.primaryContactEmail}</div>
                        <div className="text-neutral-500">{submission.primaryContactPhone}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">
                        {submission.branchCity}, {submission.branchState}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        {submission.sentToZapier ? (
                          <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                            Sent
                          </span>
                        ) : submission.zapierError ? (
                          <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                            Failed
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedSubmission(submission)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View Details
                          </button>
                          <span className="text-neutral-300">|</span>
                          <button
                            onClick={() => downloadPDF(submission.id, submission.companyLegalName)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Download PDF
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-900">Submission Details</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => downloadPDF(selectedSubmission.id, selectedSubmission.companyLegalName)}
                  className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="rounded-md bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="mb-3 text-lg font-semibold text-neutral-900">Basic Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Company Legal Name</p>
                    <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.companyLegalName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Division</p>
                    <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.division}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Branch Address</p>
                    <p className="mt-1 text-sm text-neutral-900">
                      {selectedSubmission.branchAddressLine1}<br />
                      {selectedSubmission.branchCity}, {selectedSubmission.branchState} {selectedSubmission.branchZipCode}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">MC / DOT / SCAC</p>
                    <p className="mt-1 text-sm text-neutral-900">
                      MC: {selectedSubmission.mc || "N/A"}<br />
                      DOT: {selectedSubmission.dot || "N/A"}<br />
                      SCAC: {selectedSubmission.scacCode || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="mb-3 text-lg font-semibold text-neutral-900">Contact Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Primary Contact</p>
                    <p className="mt-1 text-sm text-neutral-900">
                      {selectedSubmission.primaryContactFirstName} {selectedSubmission.primaryContactLastName}<br />
                      {selectedSubmission.primaryContactEmail}<br />
                      {selectedSubmission.primaryContactPhone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Secondary Contact</p>
                    <p className="mt-1 text-sm text-neutral-900">
                      {selectedSubmission.secondaryContactFirstName} {selectedSubmission.secondaryContactLastName}<br />
                      {selectedSubmission.secondaryContactEmail}<br />
                      {selectedSubmission.secondaryContactPhone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Escalation Contact</p>
                    <p className="mt-1 text-sm text-neutral-900">
                      {selectedSubmission.escalationContactFirstName} {selectedSubmission.escalationContactLastName}<br />
                      {selectedSubmission.escalationContactEmail}<br />
                      {selectedSubmission.escalationContactPhone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Accounts Payable</p>
                    <p className="mt-1 text-sm text-neutral-900">
                      {selectedSubmission.accountsPayableFirstName} {selectedSubmission.accountsPayableLastName}<br />
                      {selectedSubmission.accountsPayableEmail}<br />
                      {selectedSubmission.accountsPayablePhone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div>
                <h3 className="mb-3 text-lg font-semibold text-neutral-900">Financial Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Billing Address</p>
                    <p className="mt-1 text-sm text-neutral-900">
                      {selectedSubmission.billingAddressLine1}<br />
                      {selectedSubmission.billingCity}, {selectedSubmission.billingState} {selectedSubmission.billingZipCode}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Payment Method</p>
                    <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.paymentMethod}</p>
                  </div>
                  {selectedSubmission.invoicingInstructions && (
                    <div className="sm:col-span-2">
                      <p className="text-sm font-medium text-neutral-500">Invoicing Instructions</p>
                      <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.invoicingInstructions}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-neutral-500">W9 Upload</p>
                    <p className="mt-1 text-sm text-neutral-900">
                      {selectedSubmission.w9Upload ? "✓ Uploaded" : "Not uploaded"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Operations Information */}
              <div>
                <h3 className="mb-3 text-lg font-semibold text-neutral-900">Operations Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Shipment Types</p>
                    <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.shipmentTypes}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Equipment Types</p>
                    <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.equipmentTypes}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Shipment Build</p>
                    <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.shipmentBuild}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Additional Requirements</p>
                    <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.additionalRequirements}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Monthly Shipments</p>
                    <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.monthlyShipments}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Exception Communication</p>
                    <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.exceptionCommunication}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Review Frequency</p>
                    <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.reviewFrequency}</p>
                  </div>
                </div>
              </div>

              {/* Submission Metadata */}
              <div>
                <h3 className="mb-3 text-lg font-semibold text-neutral-900">Submission Metadata</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Submitted At</p>
                    <p className="mt-1 text-sm text-neutral-900">
                      {new Date(selectedSubmission.submittedAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">IP Address</p>
                    <p className="mt-1 text-sm text-neutral-900">{selectedSubmission.ipAddress || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Zapier Status</p>
                    <p className="mt-1 text-sm text-neutral-900">
                      {selectedSubmission.sentToZapier ? (
                        <>✓ Sent at {selectedSubmission.zapierSentAt ? new Date(selectedSubmission.zapierSentAt).toLocaleString() : "N/A"}</>
                      ) : selectedSubmission.zapierError ? (
                        <>✗ Failed: {selectedSubmission.zapierError}</>
                      ) : (
                        "Pending"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
