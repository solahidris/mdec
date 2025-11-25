"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Eye,
  Filter,
  Download,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Import the mock data
import applicationsData from "@/lib/data-sample/dashboard-applications.json";

type Application = {
  id: string;
  applicantName: string;
  programme: string;
  company: string;
  submittedDate: string;
  status: string;
  priority: string;
  email: string;
  phone: string;
  position: string;
  nationality: string;
};

const ApplicationStatusPage = () => {
  const [applications, setApplications] = useState<Application[]>(
    applicationsData.applications
  );
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [programmeFilter, setProgrammeFilter] = useState("all");
  const [pendingStatus, setPendingStatus] = useState<string>("");
  const [hasStatusChange, setHasStatusChange] = useState(false);

  // Get status icon and color
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "approved":
        return {
          icon: CheckCircle,
          color: "text-gray-700",
          bgColor: "bg-gray-100",
          label: "Approved",
        };
      case "rejected":
        return {
          icon: XCircle,
          color: "text-gray-700",
          bgColor: "bg-gray-100",
          label: "Rejected",
        };
      case "under-review":
        return {
          icon: Clock,
          color: "text-gray-700",
          bgColor: "bg-gray-100",
          label: "Under Review",
        };
      case "documents-pending":
        return {
          icon: AlertCircle,
          color: "text-gray-700",
          bgColor: "bg-gray-100",
          label: "Documents Pending",
        };
      case "submitted":
        return {
          icon: FileText,
          color: "text-gray-700",
          bgColor: "bg-gray-100",
          label: "Submitted",
        };
      default:
        return {
          icon: FileText,
          color: "text-gray-700",
          bgColor: "bg-gray-100",
          label: status,
        };
    }
  };

  // Handle view application
  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application);
    setPendingStatus(application.status);
    setHasStatusChange(false);
    setIsDialogOpen(true);
  };

  // Handle status selection change
  const handleStatusSelect = (newStatus: string) => {
    setPendingStatus(newStatus);
    setHasStatusChange(selectedApplication?.status !== newStatus);
  };

  // Handle save status change
  const handleSaveStatusChange = () => {
    if (!selectedApplication) return;

    setApplications((prev) =>
      prev.map((app) =>
        app.id === selectedApplication.id ? { ...app, status: pendingStatus } : app
      )
    );
    
    // Update the selected application
    setSelectedApplication((prev) =>
      prev ? { ...prev, status: pendingStatus } : null
    );

    setHasStatusChange(false);

    toast.success("Status Updated", {
      description: `Application ${selectedApplication.id} status changed to ${pendingStatus.replace("-", " ")}`,
    });
  };

  // Handle cancel status change
  const handleCancelStatusChange = () => {
    if (selectedApplication) {
      setPendingStatus(selectedApplication.status);
      setHasStatusChange(false);
    }
  };

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesProgramme =
      programmeFilter === "all" ||
      app.programme.toLowerCase() === programmeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesProgramme;
  });

  // Calculate statistics
  const stats = {
    total: applications.length,
    submitted: applications.filter((app) => app.status === "submitted").length,
    underReview: applications.filter((app) => app.status === "under-review").length,
    documentsPending: applications.filter((app) => app.status === "documents-pending").length,
    approved: applications.filter((app) => app.status === "approved").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <DashboardTopBar
          title="Application Status"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard/admin" },
            { label: "Application Status" },
          ]}
        />
        <div className="flex-1 overflow-y-auto bg-zinc-100">
          <div className="p-8 max-w-[1800px] mx-auto space-y-6">
            {/* Filter Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Total - All Applications */}
              <button
                onClick={() => setStatusFilter("all")}
                className={`p-4 rounded-lg shadow-sm transition-all ${
                  statusFilter === "all"
                    ? "bg-red-600"
                    : "bg-white hover:shadow-md hover:border-gray-300 border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    statusFilter === "all" ? "bg-white/20" : "bg-gray-100"
                  }`}>
                    <FileText className={`h-5 w-5 ${
                      statusFilter === "all" ? "text-white" : "text-gray-700"
                    }`} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm ${
                      statusFilter === "all" ? "text-red-100" : "text-gray-500"
                    }`}>Total</p>
                    <p className={`text-2xl font-bold ${
                      statusFilter === "all" ? "text-white" : "text-gray-900"
                    }`}>{stats.total}</p>
                  </div>
                </div>
              </button>

              {/* Submitted */}
              <button
                onClick={() => setStatusFilter("submitted")}
                className={`p-4 rounded-lg shadow-sm transition-all ${
                  statusFilter === "submitted"
                    ? "bg-red-600  "
                    : "bg-white hover:shadow-md hover:border-gray-300 border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    statusFilter === "submitted" ? "bg-white/20" : "bg-gray-100"
                  }`}>
                    <FileText className={`h-5 w-5 ${
                      statusFilter === "submitted" ? "text-white" : "text-gray-700"
                    }`} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm ${
                      statusFilter === "submitted" ? "text-red-100" : "text-gray-500"
                    }`}>Submitted</p>
                    <p className={`text-2xl font-bold ${
                      statusFilter === "submitted" ? "text-white" : "text-gray-900"
                    }`}>{stats.submitted}</p>
                  </div>
                </div>
              </button>

              {/* Under Review */}
              <button
                onClick={() => setStatusFilter("under-review")}
                className={`p-4 rounded-lg shadow-sm transition-all ${
                  statusFilter === "under-review"
                    ? "bg-red-600  "
                    : "bg-white hover:shadow-md hover:border-gray-300 border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    statusFilter === "under-review" ? "bg-white/20" : "bg-gray-100"
                  }`}>
                    <Clock className={`h-5 w-5 ${
                      statusFilter === "under-review" ? "text-white" : "text-gray-700"
                    }`} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm ${
                      statusFilter === "under-review" ? "text-red-100" : "text-gray-500"
                    }`}>Under Review</p>
                    <p className={`text-2xl font-bold ${
                      statusFilter === "under-review" ? "text-white" : "text-gray-900"
                    }`}>{stats.underReview}</p>
                  </div>
                </div>
              </button>

              {/* Docs Pending */}
              <button
                onClick={() => setStatusFilter("documents-pending")}
                className={`p-4 rounded-lg shadow-sm transition-all ${
                  statusFilter === "documents-pending"
                    ? "bg-red-600  "
                    : "bg-white hover:shadow-md hover:border-gray-300 border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    statusFilter === "documents-pending" ? "bg-white/20" : "bg-gray-100"
                  }`}>
                    <AlertCircle className={`h-5 w-5 ${
                      statusFilter === "documents-pending" ? "text-white" : "text-gray-700"
                    }`} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm ${
                      statusFilter === "documents-pending" ? "text-red-100" : "text-gray-500"
                    }`}>Docs Pending</p>
                    <p className={`text-2xl font-bold ${
                      statusFilter === "documents-pending" ? "text-white" : "text-gray-900"
                    }`}>{stats.documentsPending}</p>
                  </div>
                </div>
              </button>

              {/* Approved */}
              <button
                onClick={() => setStatusFilter("approved")}
                className={`p-4 rounded-lg shadow-sm transition-all ${
                  statusFilter === "approved"
                    ? "bg-red-600  "
                    : "bg-white hover:shadow-md hover:border-gray-300 border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    statusFilter === "approved" ? "bg-white/20" : "bg-gray-100"
                  }`}>
                    <CheckCircle className={`h-5 w-5 ${
                      statusFilter === "approved" ? "text-white" : "text-gray-700"
                    }`} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm ${
                      statusFilter === "approved" ? "text-red-100" : "text-gray-500"
                    }`}>Approved</p>
                    <p className={`text-2xl font-bold ${
                      statusFilter === "approved" ? "text-white" : "text-gray-900"
                    }`}>{stats.approved}</p>
                  </div>
                </div>
              </button>

              {/* Rejected */}
              <button
                onClick={() => setStatusFilter("rejected")}
                className={`p-4 rounded-lg shadow-sm transition-all ${
                  statusFilter === "rejected"
                    ? "bg-red-600  "
                    : "bg-white hover:shadow-md hover:border-gray-300 border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    statusFilter === "rejected" ? "bg-white/20" : "bg-gray-100"
                  }`}>
                    <XCircle className={`h-5 w-5 ${
                      statusFilter === "rejected" ? "text-white" : "text-gray-700"
                    }`} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm ${
                      statusFilter === "rejected" ? "text-red-100" : "text-gray-500"
                    }`}>Rejected</p>
                    <p className={`text-2xl font-bold ${
                      statusFilter === "rejected" ? "text-white" : "text-gray-900"
                    }`}>{stats.rejected}</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Filters and Actions */}
            <Card className="p-6 bg-white shadow-sm">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, ID, or company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={programmeFilter} onValueChange={setProgrammeFilter}>
                  <SelectTrigger className="w-full lg:w-[200px]">
                    <SelectValue placeholder="Filter by programme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Programmes</SelectItem>
                    <SelectItem value="expats">Expats</SelectItem>
                    <SelectItem value="mtep">MTEP</SelectItem>
                    <SelectItem value="de rantau">DE Rantau</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </Card>

            {/* Applications Table */}
            <Card className="bg-white shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Application ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Programme
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredApplications.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <FileText className="h-12 w-12 text-gray-300" />
                            <p className="text-gray-500">No applications found</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredApplications.map((app) => {
                        const statusConfig = getStatusConfig(app.status);
                        const StatusIcon = statusConfig.icon;
                        
                        return (
                          <tr key={app.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-gray-400" />
                                <span className="text-sm font-medium text-gray-900">
                                  {app.id}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {app.applicantName}
                                </div>
                                <div className="text-sm text-gray-500">{app.position}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">{app.programme}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-gray-900">{app.company}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-500">{app.submittedDate}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}
                                >
                                  {statusConfig.label}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                onClick={() => handleViewApplication(app)}
                              >
                                <Eye className="h-4 w-4" />
                                View
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* View Application Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Application Details</DialogTitle>
                  <DialogDescription>
                    View and manage application information
                  </DialogDescription>
                </DialogHeader>
                {selectedApplication && (
                  <div className="space-y-6">
                    {/* Application Header */}
                    <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {selectedApplication.id}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Submitted on {selectedApplication.submittedDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const statusConfig = getStatusConfig(selectedApplication.status);
                          const StatusIcon = statusConfig.icon;
                          return (
                            <>
                              <StatusIcon className={`h-5 w-5 ${statusConfig.color}`} />
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bgColor} ${statusConfig.color}`}
                              >
                                {statusConfig.label}
                              </span>
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Applicant Information */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Applicant Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Full Name
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedApplication.applicantName}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Position
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedApplication.position}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Email</label>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedApplication.email}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Phone</label>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedApplication.phone}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Nationality
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedApplication.nationality}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Company
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedApplication.company}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Programme Information */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Programme Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Programme
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedApplication.programme}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Priority
                          </label>
                          <p className="mt-1 text-sm text-gray-900 capitalize">
                            {selectedApplication.priority}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Status Control */}
                    <div className="space-y-4 pt-4 border-t">
                      <h4 className="font-semibold text-gray-900">Admin Controls</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <label className="text-sm font-medium text-gray-700">
                            Change Status:
                          </label>
                          <Select
                            value={pendingStatus}
                            onValueChange={handleStatusSelect}
                          >
                            <SelectTrigger className="w-[250px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem value="submitted">Submitted</SelectItem>
                              <SelectItem value="under-review">Under Review</SelectItem>
                              <SelectItem value="documents-pending">
                                Documents Pending
                              </SelectItem>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {hasStatusChange && (
                          <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm text-red-900 font-medium">
                                Status change pending
                              </p>
                              <p className="text-xs text-red-700">
                                Click Save to confirm the status change
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelStatusChange}
                                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={handleSaveStatusChange}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Close
                      </Button>
                      <Button disabled variant="default">
                        Download Documents
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ApplicationStatusPage;

