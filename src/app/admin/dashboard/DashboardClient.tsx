"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  MoreHorizontal,
  Trash,
  Eye,
  TrendingUp,
  FileText,
  Users,
  Calendar,
  Copy,
  Check,
  ExternalLink,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { format } from "date-fns";

interface Form {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  submissionCount: number;
}

interface DashboardClientProps {
  user: any;
  initialForms: Form[];
}

type SortField = "name" | "status" | "submissions" | "created";
type SortOrder = "asc" | "desc";

export default function DashboardClient({ user, initialForms }: DashboardClientProps) {
  const router = useRouter();
  const [forms, setForms] = useState<Form[]>(initialForms);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("created");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Calculate stats
  const totalSubmissions = forms.reduce((acc, form) => acc + form.submissionCount, 0);
  const activeForms = forms.filter(form => form.isActive).length;
  const recentSubmissions = totalSubmissions; // In a real app, this would be filtered by date

  // Sorting function
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Sort forms
  const sortedForms = [...forms].sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;

    switch (sortField) {
      case "name":
        return order * a.name.localeCompare(b.name);
      case "status":
        return order * (Number(a.isActive) - Number(b.isActive));
      case "submissions":
        return order * (a.submissionCount - b.submissionCount);
      case "created":
        return order * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      default:
        return 0;
    }
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  const handleCreateForm = async () => {
    setIsCreating(true);
    try {
      const response = await fetch("/api/admin/create-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, description: formDescription }),
      });

      if (response.ok) {
        const data = await response.json();
        setForms([data.form, ...forms]);
        setShowCreateDialog(false);
        setFormName("");
        setFormDescription("");
      }
    } catch (error) {
      console.error("Failed to create form:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteForm = async () => {
    if (!selectedForm) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/delete-form/${selectedForm.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setForms(forms.filter(f => f.id !== selectedForm.id));
        setShowDeleteDialog(false);
        setSelectedForm(null);
      }
    } catch (error) {
      console.error("Failed to delete form:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const copyFormLink = (slug: string) => {
    const url = `${window.location.origin}/form/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(slug);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <AdminLayout user={user}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your forms and view submissions
            </p>
          </div>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Form
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Submissions
              </CardTitle>
              <FileText className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalSubmissions.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Active Forms
              </CardTitle>
              <Users className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {activeForms}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {forms.length} total forms created
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Recent Activity
              </CardTitle>
              <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {recentSubmissions}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Last 7 days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Forms Table */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Forms</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              Manage your forms and view submission data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-200 dark:border-gray-800">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 dark:border-gray-800">
                    <TableHead>
                      <button
                        onClick={() => handleSort("name")}
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                      >
                        Form Name
                        <SortIcon field="name" />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        onClick={() => handleSort("status")}
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                      >
                        Status
                        <SortIcon field="status" />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        onClick={() => handleSort("submissions")}
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                      >
                        Submissions
                        <SortIcon field="submissions" />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        onClick={() => handleSort("created")}
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                      >
                        Created
                        <SortIcon field="created" />
                      </button>
                    </TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-300">Form Link</TableHead>
                    <TableHead className="text-right text-gray-700 dark:text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedForms.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No forms created yet. Click "Create Form" to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedForms.map((form) => (
                      <TableRow key={form.id} className="border-gray-200 dark:border-gray-800">
                        <TableCell className="font-medium">
                          <button
                            onClick={() => router.push(`/admin/forms/${form.id}/submissions`)}
                            className="text-left hover:underline text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {form.name}
                          </button>
                          {form.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {form.description}
                            </p>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={form.isActive ? "default" : "secondary"}
                            className={
                              form.isActive
                                ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                            }
                          >
                            {form.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-white">
                          {form.submissionCount}
                        </TableCell>
                        <TableCell className="text-gray-500 dark:text-gray-400">
                          {format(new Date(form.createdAt), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyFormLink(form.slug)}
                              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            >
                              {copiedLink === form.slug ? (
                                <>
                                  <Check className="h-4 w-4 mr-1" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="h-4 w-4 mr-1" />
                                  Copy Link
                                </>
                              )}
                            </Button>
                            <a
                              href={`/form/${form.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => router.push(`/admin/forms/${form.id}/submissions`)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Submissions
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedForm(form);
                                  setShowDeleteDialog(true);
                                }}
                                className="text-red-600 dark:text-red-400"
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete Form
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Form Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
              Create a new form to collect carrier onboarding information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Form Name</Label>
              <Input
                id="name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g., Carrier Onboarding"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="e.g., Form for new carrier partners"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateForm}
              disabled={!formName || isCreating}
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              {isCreating ? "Creating..." : "Create Form"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Form</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedForm?.name}"? This will also delete all
              submissions for this form. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteForm}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Form"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}