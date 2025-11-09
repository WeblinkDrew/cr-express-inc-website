"use client";

import { useState, useEffect } from "react";
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
  Search,
  Download,
  Eye,
  MoreHorizontal,
  CheckCircle,
  Clock,
  Filter,
  FileText,
} from "lucide-react";
import { format } from "date-fns";

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

interface SubmissionsClientProps {
  user?: any;
}

export default function SubmissionsClient({ user }: SubmissionsClientProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "sent" | "pending">("all");

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    let filtered = [...submissions];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (submission) =>
          submission.companyLegalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.primaryContactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.primaryContactFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.primaryContactLastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus === "sent") {
      filtered = filtered.filter((s) => s.sentToZapier);
    } else if (filterStatus === "pending") {
      filtered = filtered.filter((s) => !s.sentToZapier);
    }

    setFilteredSubmissions(filtered);
  }, [submissions, searchTerm, filterStatus]);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/admin/submissions");
      if (!response.ok) throw new Error("Failed to fetch submissions");
      const data = await response.json();
      setSubmissions(data.submissions || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };


  const downloadPDF = async (submissionId: string) => {
    try {
      const response = await fetch(`/api/admin/submissions/${submissionId}/pdf`);
      if (!response.ok) throw new Error("Failed to generate PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `submission-${submissionId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const viewSubmissionDetails = (submission: Submission) => {
    // Could open a modal or navigate to a detail page
    console.log("View submission:", submission);
  };

  // Calculate stats
  const totalSubmissions = submissions.length;
  const sentSubmissions = submissions.filter(s => s.sentToZapier).length;
  const pendingSubmissions = submissions.filter(s => !s.sentToZapier).length;

  return (
    <AdminLayout user={user}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Submissions
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              View and manage all form submissions
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="border-gray-200 dark:border-gray-700"
            >
              Refresh
            </Button>
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
                All time submissions
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Sent to Zapier
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {sentSubmissions}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Successfully processed
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
                <CardTitle className="text-gray-900 dark:text-white">All Submissions</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  View and manage carrier onboarding submissions
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
            {loading ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Loading submissions...
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200 dark:border-gray-800">
                      <TableHead className="text-gray-700 dark:text-gray-300">Company</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Primary Contact</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Location</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Submitted</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
                      <TableHead className="text-right text-gray-700 dark:text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                          {searchTerm || filterStatus !== "all"
                            ? "No submissions found matching your filters."
                            : "No submissions yet."}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredSubmissions.map((submission) => (
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
                                <DropdownMenuItem onClick={() => downloadPDF(submission.id)}>
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
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}