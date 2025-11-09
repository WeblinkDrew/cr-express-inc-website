"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DashboardClientProps {
  user: any;
  initialForms: any[];
}

export default function DashboardClient({ user, initialForms }: DashboardClientProps) {
  const router = useRouter();
  const [forms, setForms] = useState<any[]>(initialForms);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [formToDelete, setFormToDelete] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleSignOut = async () => {
    window.location.href = "/handler/signout";
  };

  const copyToClipboard = async (slug: string) => {
    const url = `${window.location.origin}/form/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const createForm = async () => {
    if (!formName.trim()) {
      alert("Please enter a form name");
      return;
    }

    setCreating(true);
    try {
      const response = await fetch("/api/admin/create-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, description: formDescription }),
      });

      if (!response.ok) throw new Error("Failed to create form");

      const data = await response.json();
      setForms([{ ...data.form, submissionCount: 0 }, ...forms]);
      setShowCreateModal(false);
      setFormName("");
      setFormDescription("");
    } catch (error) {
      console.error("Error creating form:", error);
      alert("Failed to create form");
    } finally {
      setCreating(false);
    }
  };

  const deleteForm = async () => {
    if (!formToDelete) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/delete-form/${formToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete form");

      const data = await response.json();
      setForms(forms.filter((f) => f.id !== formToDelete.id));
      setFormToDelete(null);

      if (data.deletedSubmissions > 0) {
        alert(
          `Form deleted successfully along with ${data.deletedSubmissions} submission${
            data.deletedSubmissions !== 1 ? "s" : ""
          }`
        );
      }
    } catch (error) {
      console.error("Error deleting form:", error);
      alert("Failed to delete form");
    } finally {
      setDeleting(false);
    }
  };

  const totalSubmissions = forms.reduce((sum, form) => sum + (form.submissionCount || 0), 0);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-neutral-900 via-blue-900 to-neutral-800 bg-clip-text text-transparent">
                CR Express Admin
              </h1>
              <p className="mt-1 text-sm font-medium text-neutral-600">Form Management Portal</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-neutral-100 px-3 py-2">
                <svg className="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm font-medium text-neutral-700">{user.primaryEmail}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="rounded-lg bg-gradient-to-r from-neutral-900 to-neutral-800 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-neutral-900/20 transition-all hover:shadow-xl hover:shadow-neutral-900/30 hover:-translate-y-0.5"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg shadow-neutral-200/50 ring-1 ring-neutral-900/5 transition-all hover:shadow-xl hover:shadow-neutral-200/60 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Total Forms</p>
                <p className="mt-2 text-4xl font-bold text-neutral-900">{forms.length}</p>
              </div>
              <div className="rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 p-3">
                <svg className="h-8 w-8 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-neutral-400 to-neutral-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
          <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg shadow-green-200/50 ring-1 ring-neutral-900/5 transition-all hover:shadow-xl hover:shadow-green-200/60 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Active Forms</p>
                <p className="mt-2 text-4xl font-bold text-green-600">
                  {forms.filter((f) => f.isActive).length}
                </p>
              </div>
              <div className="rounded-full bg-gradient-to-br from-green-100 to-green-200 p-3">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
          <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg shadow-blue-200/50 ring-1 ring-neutral-900/5 transition-all hover:shadow-xl hover:shadow-blue-200/60 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Total Submissions</p>
                <p className="mt-2 text-4xl font-bold text-blue-600">{totalSubmissions}</p>
              </div>
              <div className="rounded-full bg-gradient-to-br from-blue-100 to-blue-200 p-3">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-lg shadow-neutral-200/50 ring-1 ring-neutral-900/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">Forms</h2>
              <p className="mt-1 text-sm font-medium text-neutral-600">
                Create and manage your onboarding forms
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Form
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 transition-opacity group-hover:opacity-100"></div>
            </button>
          </div>
        </div>

        {/* Forms List */}
        <div className="rounded-xl bg-white shadow-lg shadow-neutral-200/50 ring-1 ring-neutral-900/5">
          <div className="border-b border-neutral-100 bg-gradient-to-r from-neutral-50 to-white px-6 py-5">
            <h2 className="text-xl font-bold text-neutral-900">All Forms</h2>
          </div>
          <div className="p-6">
            {forms.length === 0 ? (
              <div className="py-12 text-center">
                <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-4 text-sm font-medium text-neutral-500">
                  No forms yet. Create one to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {forms.map((form) => (
                  <div
                    key={form.id}
                    className="group relative flex items-center justify-between rounded-xl border border-neutral-200 bg-gradient-to-r from-white to-neutral-50/50 p-5 shadow-sm transition-all hover:border-neutral-300 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-neutral-900">{form.name}</h3>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
                            form.isActive
                              ? "bg-green-50 text-green-700 ring-green-600/20"
                              : "bg-neutral-100 text-neutral-700 ring-neutral-600/20"
                          }`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${form.isActive ? "bg-green-600" : "bg-neutral-600"}`}></span>
                          {form.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      {form.description && (
                        <p className="mt-1.5 text-sm text-neutral-600">{form.description}</p>
                      )}
                      <div className="mt-3 flex items-center gap-4 text-xs text-neutral-500">
                        <button
                          onClick={() => copyToClipboard(form.slug)}
                          className="inline-flex items-center gap-1.5 rounded-md bg-neutral-100 px-2.5 py-1 font-mono transition-all hover:bg-neutral-200 hover:text-neutral-900 cursor-pointer"
                          title="Click to copy full URL"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          /form/{form.slug}
                        </button>
                        <span className="inline-flex items-center gap-1">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(form.createdAt).toLocaleDateString()}
                        </span>
                        <span className="inline-flex items-center gap-1 font-medium text-blue-600">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          {form.submissionCount} submission{form.submissionCount !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => router.push(`/admin/forms/${form.id}/submissions`)}
                        className="rounded-lg bg-gradient-to-r from-green-600 to-green-700 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-green-600/20 transition-all hover:shadow-lg hover:shadow-green-600/30 hover:-translate-y-0.5"
                      >
                        View Submissions
                      </button>
                      <button
                        onClick={() => copyToClipboard(form.slug)}
                        className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm transition-all hover:border-neutral-400 hover:shadow-md hover:-translate-y-0.5"
                      >
                        {copiedSlug === form.slug ? (
                          <span className="flex items-center gap-1.5 text-green-600">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                          </span>
                        ) : (
                          "Copy Link"
                        )}
                      </button>
                      <button
                        onClick={() => setFormToDelete(form)}
                        className="rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-red-600/20 transition-all hover:shadow-lg hover:shadow-red-600/30 hover:-translate-y-0.5"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Create Form Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-neutral-900/10 transform transition-all">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 p-2">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">Create New Form</h2>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-neutral-700">
                  Form Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g., Carrier Onboarding"
                  className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-2.5 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700">
                  Description (Optional)
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Brief description of this form..."
                  rows={3}
                  className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-2.5 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={createForm}
                  disabled={creating}
                  className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {creating ? "Creating..." : "Create Form"}
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setFormName("");
                    setFormDescription("");
                  }}
                  className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 font-semibold text-neutral-700 shadow-sm transition-all hover:border-neutral-400 hover:shadow-md hover:-translate-y-0.5"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {formToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-neutral-900/10 transform transition-all">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-red-100 to-red-200 p-2">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-red-600">Delete Form?</h2>
            </div>
            <div className="mb-6 space-y-3">
              <p className="text-neutral-900">
                Are you sure you want to delete <strong className="font-bold text-neutral-900">{formToDelete.name}</strong>?
              </p>
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-800 font-medium">
                  This will permanently delete the form and all{" "}
                  <strong className="font-bold">{formToDelete.submissionCount} submission
                  {formToDelete.submissionCount !== 1 ? "s" : ""}</strong>. This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={deleteForm}
                disabled={deleting}
                className="flex-1 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-4 py-2.5 font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {deleting ? "Deleting..." : "Delete Form"}
              </button>
              <button
                onClick={() => setFormToDelete(null)}
                disabled={deleting}
                className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 font-semibold text-neutral-700 shadow-sm transition-all hover:border-neutral-400 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
