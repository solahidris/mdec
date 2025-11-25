"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import {
  ArrowLeft,
  Calendar,
  Building2,
  Briefcase,
  Globe2,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Upload,
  MessageSquare,
  User,
  XCircle,
} from "lucide-react";

// Import the mock data
import applicationsData from "@/lib/data-sample/dashboard-applications.json";

interface Application {
  id: string;
  applicantName: string;
  programme: string;
  company: string;
  submittedDate: string;
  status: string;
  priority: "high" | "medium" | "low";
  email: string;
  phone: string;
  position: string;
  nationality: string;
}

const ApplicationDetail = () => {
  const router = useRouter();
  const params = useParams();
  const applicationId = params.id as string;
  
  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    // Find the application by ID
    const found = applicationsData.applications.find(
      (app) => app.id === applicationId
    );
    if (found) {
      setApplication(found as Application);
    }
  }, [applicationId]);

  if (!application) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col h-screen overflow-hidden">
          <DashboardTopBar
            title="Application Detail"
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Dashboard", href: "/dashboard/user" },
              { label: "Application", href: "#" },
            ]}
          />
          <div className="flex-1 overflow-y-auto bg-zinc-100 flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Application Not Found</h3>
              <p className="text-gray-600 mb-4">
                The application you&apos;re looking for doesn&apos;t exist.
              </p>
              <Button onClick={() => router.push("/dashboard/user")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "under-review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "submitted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "documents-pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "interview-needed":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5" />;
      case "under-review":
        return <Clock className="h-5 w-5" />;
      case "submitted":
        return <FileText className="h-5 w-5" />;
      case "documents-pending":
        return <AlertCircle className="h-5 w-5" />;
      case "interview-needed":
        return <MessageSquare className="h-5 w-5" />;
      case "rejected":
        return <XCircle className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <DashboardTopBar
          title="Application Detail"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard/user" },
            { label: application.id, href: "#" },
          ]}
        />
        <div className="flex-1 overflow-y-auto bg-zinc-100">
          <div className="p-8 max-w-7xl mx-auto space-y-6">
            {/* Back Button */}
            <Button
              variant="ghost"
              className="gap-2 -ml-3"
              onClick={() => router.push("/dashboard/user")}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to My Applications
            </Button>

            {/* Application Header */}
            <div className="bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl shadow-sm p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-semibold mb-2">
                    {application.programme} Application
                  </h1>
                  <p className="text-white/90 text-lg mb-1">{application.applicantName}</p>
                  <p className="text-white/70 text-sm">Application ID: {application.id}</p>
                </div>
                <Badge className={getStatusColor(application.status) + " font-medium text-sm px-4 py-2"}>
                  {getStatusIcon(application.status)}
                  <span className="ml-2">{getStatusLabel(application.status)}</span>
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Application Information */}
                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Applicant Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <User className="h-4 w-4" />
                          <span>Full Name</span>
                        </div>
                        <p className="font-medium text-gray-900 text-base">{application.applicantName}</p>
                      </div>
                      
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="h-4 w-4" />
                          <span>Email Address</span>
                        </div>
                        <p className="font-medium text-gray-900 text-base">{application.email}</p>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone className="h-4 w-4" />
                          <span>Phone Number</span>
                        </div>
                        <p className="font-medium text-gray-900 text-base">{application.phone}</p>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Globe2 className="h-4 w-4" />
                          <span>Nationality</span>
                        </div>
                        <p className="font-medium text-gray-900 text-base">{application.nationality}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Employment Details */}
                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      Employment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Building2 className="h-4 w-4" />
                          <span>Company</span>
                        </div>
                        <p className="font-medium text-gray-900 text-base">{application.company}</p>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Briefcase className="h-4 w-4" />
                          <span>Position</span>
                        </div>
                        <p className="font-medium text-gray-900 text-base">{application.position}</p>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FileText className="h-4 w-4" />
                          <span>Programme</span>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">
                          {application.programme}
                        </Badge>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>Submission Date</span>
                        </div>
                        <p className="font-medium text-gray-900 text-base">
                          {new Date(application.submittedDate).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Documents */}
                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {application.status === "documents-pending" ? (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">Documents Required</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Please upload the required documents to proceed with your application.
                            </p>
                            <Button className="gap-2">
                              <Upload className="h-4 w-4" />
                              Upload Documents
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100">
                              <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">Resume/CV</p>
                              <p className="text-xs text-gray-500">Uploaded on {new Date(application.submittedDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100">
                              <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">Passport Copy</p>
                              <p className="text-xs text-gray-500">Uploaded on {new Date(application.submittedDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100">
                              <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">Education Certificates</p>
                              <p className="text-xs text-gray-500">Uploaded on {new Date(application.submittedDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Status Timeline */}
                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Application Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="font-medium text-gray-900 text-sm">Submitted</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {new Date(application.submittedDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      {application.status !== "submitted" && (
                        <div className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                              application.status === "under-review" || 
                              application.status === "documents-pending" ||
                              application.status === "interview-needed" ||
                              application.status === "approved" ||
                              application.status === "rejected"
                                ? "bg-green-100"
                                : "bg-gray-100"
                            }`}>
                              <CheckCircle className={`h-4 w-4 ${
                                application.status === "under-review" || 
                                application.status === "documents-pending" ||
                                application.status === "interview-needed" ||
                                application.status === "approved" ||
                                application.status === "rejected"
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }`} />
                            </div>
                            {(application.status === "interview-needed" || application.status === "approved" || application.status === "rejected") && (
                              <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <p className="font-medium text-gray-900 text-sm">Under Review</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {application.status === "under-review" || 
                               application.status === "documents-pending" ||
                               application.status === "interview-needed" ||
                               application.status === "approved" ||
                               application.status === "rejected"
                                ? "Completed"
                                : "Pending"}
                            </p>
                          </div>
                        </div>
                      )}

                      {application.status === "interview-needed" && (
                        <div className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100">
                              <MessageSquare className="h-4 w-4 text-purple-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">Interview Needed</p>
                            <p className="text-xs text-gray-500 mt-0.5">Action required</p>
                          </div>
                        </div>
                      )}

                      {(application.status === "approved" || application.status === "rejected") && (
                        <div className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                              application.status === "approved" ? "bg-green-100" : "bg-red-100"
                            }`}>
                              {application.status === "approved" ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">
                              {application.status === "approved" ? "Approved" : "Rejected"}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">Final decision</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full gap-2 justify-start border-gray-200">
                      <Download className="h-4 w-4" />
                      Download Application
                    </Button>
                    <Button variant="outline" className="w-full gap-2 justify-start border-gray-200">
                      <MessageSquare className="h-4 w-4" />
                      Contact Support
                    </Button>
                    {application.status === "documents-pending" && (
                      <Button className="w-full gap-2 justify-start">
                        <Upload className="h-4 w-4" />
                        Upload Documents
                      </Button>
                    )}
                    {application.status === "interview-needed" && (
                      <Button className="w-full gap-2 justify-start bg-purple-600 hover:bg-purple-700">
                        <MessageSquare className="h-4 w-4" />
                        Take Interview
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Help */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm mb-1">Need Help?</h4>
                        <p className="text-xs text-gray-600">
                          If you have any questions about your application, feel free to contact our support team.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ApplicationDetail;



