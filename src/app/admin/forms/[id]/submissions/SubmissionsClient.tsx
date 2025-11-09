"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Search,
  Download,
  Eye,
  MoreHorizontal,
  CheckCircle,
  Clock,
  Filter,
  FileText,
  ArrowLeft,
  Copy,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Building,
  Truck,
  CreditCard,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { format } from "date-fns";

interface SubmissionsClientProps {
  form: any; // Using any for now - will be properly typed in Phase 5
  user?: any;
}

type SortField = "company" | "contact" | "location" | "submitted" | "status";
type SortOrder = "asc" | "desc";

export default function SubmissionsClient({ form, user }: SubmissionsClientProps) {
  const router = useRouter();
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "sent" | "pending">("all");
  const [copiedFormLink, setCopiedFormLink] = useState(false);
  const [sortField, setSortField] = useState<SortField>("submitted");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

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

  // Filter and sort submissions
  const filteredSubmissions = form.Submission.filter((submission: any) => {
    const matchesSearch =
      submission.companyLegalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.primaryContactEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.primaryContactFirstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.primaryContactLastName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "sent" && submission.sentToZapier) ||
      (filterStatus === "pending" && !submission.sentToZapier);

    return matchesSearch && matchesStatus;
  }).sort((a: any, b: any) => {
    const order = sortOrder === "asc" ? 1 : -1;

    switch (sortField) {
      case "company":
        return order * (a.companyLegalName || '').localeCompare(b.companyLegalName || '');
      case "contact":
        return order * `${a.primaryContactFirstName || ''} ${a.primaryContactLastName || ''}`.localeCompare(
          `${b.primaryContactFirstName || ''} ${b.primaryContactLastName || ''}`
        );
      case "location":
        return order * `${a.branchCity || ''}, ${a.branchState || ''}`.localeCompare(
          `${b.branchCity || ''}, ${b.branchState || ''}`
        );
      case "submitted":
        return order * (new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime());
      case "status":
        return order * (Number(a.sentToZapier) - Number(b.sentToZapier));
      default:
        return 0;
    }
  });

  // Stats
  const totalSubmissions = form.Submission.length;
  const sentSubmissions = form.Submission.filter((s: any) => s.sentToZapier).length;
  const pendingSubmissions = form.Submission.filter((s: any) => !s.sentToZapier).length;

  const downloadPDF = async (submissionId: string, companyName: string) => {
    try {
      const response = await fetch(`/api/admin/submissions/${submissionId}/pdf`);
      if (!response.ok) throw new Error("Failed to download PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${companyName.replace(/[^a-z0-9]/gi, "_")}_submission.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const viewSubmissionDetails = (submission: any) => {
    setSelectedSubmission(submission);
    setShowDetailsModal(true);
  };

  const copyFormLink = () => {
    const url = `${window.location.origin}/form/${form.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedFormLink(true);
    setTimeout(() => setCopiedFormLink(false), 2000);
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  return (
    <AdminLayout user={user}>
      <div className="space-y-8">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/admin/dashboard")}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Form Info Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {form.name}
            </h1>
            {form.description && (
              <p className="text-gray-500 dark:text-gray-400 mt-1">{form.description}</p>
            )}
            <div className="flex items-center gap-3 mt-3">
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
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Created {format(new Date(form.createdAt), "MMM d, yyyy")}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={copyFormLink}
              className="border-gray-200 dark:border-gray-700"
            >
              {copiedFormLink ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Form Link
                </>
              )}
            </Button>
            <a
              href={`/form/${form.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-gray-200 dark:border-gray-700">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Form
              </Button>
            </a>
          </div>
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
                {totalSubmissions}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                For this form
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Processed
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {sentSubmissions}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Sent to Zapier
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {pendingSubmissions}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Awaiting processing
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Submissions Table */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-gray-900 dark:text-white">Submissions</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  All submissions for this form
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search submissions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-full sm:w-[250px]"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-gray-200 dark:border-gray-700">
                      <Filter className="mr-2 h-4 w-4" />
                      {filterStatus === "all" && "All Status"}
                      {filterStatus === "sent" && "Sent"}
                      {filterStatus === "pending" && "Pending"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                      All Status
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("sent")}>
                      Sent to Zapier
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                      Pending
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 dark:border-gray-800">
                    <TableHead>
                      <button
                        onClick={() => handleSort("company")}
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                      >
                        Company
                        <SortIcon field="company" />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        onClick={() => handleSort("contact")}
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                      >
                        Primary Contact
                        <SortIcon field="contact" />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        onClick={() => handleSort("location")}
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                      >
                        Location
                        <SortIcon field="location" />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        onClick={() => handleSort("submitted")}
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                      >
                        Submitted
                        <SortIcon field="submitted" />
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
                    <TableHead className="text-right text-gray-700 dark:text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                        {searchTerm || filterStatus !== "all"
                          ? "No submissions found matching your filters."
                          : "No submissions yet for this form."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubmissions.map((submission: any) => (
                      <TableRow key={submission.id} className="border-gray-200 dark:border-gray-800">
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {submission.companyLegalName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {submission.division}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-gray-900 dark:text-white">
                              {submission.primaryContactFirstName} {submission.primaryContactLastName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {submission.primaryContactEmail}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-900 dark:text-white">
                            {submission.branchCity}, {submission.branchState}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-500 dark:text-gray-400">
                          {format(new Date(submission.submittedAt), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={submission.sentToZapier ? "default" : "secondary"}
                            className={
                              submission.sentToZapier
                                ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                            }
                          >
                            {submission.sentToZapier ? (
                              <>
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Sent
                              </>
                            ) : (
                              <>
                                <Clock className="mr-1 h-3 w-3" />
                                Pending
                              </>
                            )}
                          </Badge>
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
                              <DropdownMenuItem onClick={() => viewSubmissionDetails(submission)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => downloadPDF(submission.id, submission.companyLegalName)}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
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

      {/* Submission Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Submission Details</span>
              {selectedSubmission && (
                <Badge
                  variant={selectedSubmission.sentToZapier ? "default" : "secondary"}
                  className={
                    selectedSubmission.sentToZapier
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                  }
                >
                  {selectedSubmission.sentToZapier ? "Sent to Zapier" : "Pending"}
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription>
              Submitted on {selectedSubmission && format(new Date(selectedSubmission.submittedAt), "MMMM d, yyyy 'at' h:mm a")}
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <Tabs defaultValue="company" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="company">Company</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
              </TabsList>

              <TabsContent value="company" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                    <Building className="mr-2 h-5 w-5" />
                    Company Information
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Legal Name</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.companyLegalName}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Division</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.division}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">MC Number</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.mc || "N/A"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">DOT Number</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.dot || "N/A"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">SCAC Code</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.scacCode || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                    <MapPin className="mr-2 h-5 w-5" />
                    Branch Address
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-900 dark:text-white">
                      {selectedSubmission.branchAddressLine1}
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {selectedSubmission.branchCity}, {selectedSubmission.branchState} {selectedSubmission.branchZipCode}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contacts" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Primary Contact</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Name</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.primaryContactFirstName} {selectedSubmission.primaryContactLastName}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400 flex items-center">
                        <Mail className="mr-1 h-3 w-3" /> Email
                      </Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.primaryContactEmail}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400 flex items-center">
                        <Phone className="mr-1 h-3 w-3" /> Phone
                      </Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {formatPhoneNumber(selectedSubmission.primaryContactPhone)}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Secondary Contact</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Name</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.secondaryContactFirstName} {selectedSubmission.secondaryContactLastName}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Email</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.secondaryContactEmail}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Phone</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {formatPhoneNumber(selectedSubmission.secondaryContactPhone)}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Escalation Contact</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Name</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.escalationContactFirstName} {selectedSubmission.escalationContactLastName}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Email</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.escalationContactEmail}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Phone</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {formatPhoneNumber(selectedSubmission.escalationContactPhone)}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Accounts Payable</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Name</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.accountsPayableFirstName} {selectedSubmission.accountsPayableLastName}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Email</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.accountsPayableEmail}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Phone</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {formatPhoneNumber(selectedSubmission.accountsPayablePhone)}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="financial" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Billing Information
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <Label className="text-gray-600 dark:text-gray-400">Billing Address</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.billingAddressLine1}
                      </p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.billingCity}, {selectedSubmission.billingState} {selectedSubmission.billingZipCode}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Payment Method</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.paymentMethod}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-gray-600 dark:text-gray-400">Invoicing Instructions</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.invoicingInstructions || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="operations" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                    <Truck className="mr-2 h-5 w-5" />
                    Operations Details
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Shipment Types</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.shipmentTypes}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Equipment Types</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.equipmentTypes}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Shipment Build</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.shipmentBuild}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Additional Requirements</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.additionalRequirements}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Monthly Shipments</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.monthlyShipments}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Review Frequency</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.reviewFrequency}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-gray-600 dark:text-gray-400">Exception Communication</Label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedSubmission.exceptionCommunication}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowDetailsModal(false)}
            >
              Close
            </Button>
            {selectedSubmission && (
              <Button
                onClick={() => downloadPDF(selectedSubmission.id, selectedSubmission.companyLegalName)}
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}