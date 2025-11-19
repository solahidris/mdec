"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Building2,
  Briefcase,
  Globe2,
  Eye,
  FileCheck,
  Plus,
  AlertCircle,
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

const UserDashboard = () => {
  // For user dashboard, we'll simulate showing only their own applications
  // In a real app, this would be filtered by the logged-in user's ID
  const userApplications = applicationsData.applications.slice(0, 3) as Application[];
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  // Calculate statistics for user's applications
  const stats = {
    total: userApplications.length,
    pending: userApplications.filter(
      (app) => app.status === "submitted" || app.status === "under-review"
    ).length,
    approved: userApplications.filter((app) => app.status === "approved").length,
    actionRequired: userApplications.filter(
      (app) => app.status === "documents-pending"
    ).length,
  };

  // Filter applications by programme
  const filteredApplications =
    selectedFilter === "all"
      ? userApplications
      : userApplications.filter(
          (app) => app.programme.toLowerCase() === selectedFilter
        );

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

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <DashboardTopBar
          title="My Applications"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard/user" },
          ]}
        />
        <div className="flex-1 overflow-y-auto bg-gray-50/50">
          <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Welcome Banner */}
            <div className="p-8 bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl shadow-sm">
              <h1 className="text-2xl font-semibold mb-2">Welcome back!</h1>
              <p className="text-white/95">
                Track your applications and manage your submissions
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Total Applications
                      </p>
                      <h3 className="text-3xl font-semibold text-gray-900">{stats.total}</h3>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Pending Review
                      </p>
                      <h3 className="text-3xl font-semibold text-gray-900">{stats.pending}</h3>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-50">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Approved
                      </p>
                      <h3 className="text-3xl font-semibold text-gray-900">{stats.approved}</h3>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-50">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Action Required
                      </p>
                      <h3 className="text-3xl font-semibold text-gray-900">{stats.actionRequired}</h3>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-orange-50">
                      <AlertCircle className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                <div className="flex gap-3">
                  <Button className="gap-2 h-9">
                    <Plus className="h-4 w-4" />
                    New Application
                  </Button>
                  <Button variant="outline" className="gap-2 h-9 border-gray-200">
                    <FileCheck className="h-4 w-4" />
                    Upload Documents
                  </Button>
                </div>
              </div>
            </div>

            {/* Programme Filter */}
            <div>
              <Tabs defaultValue="all" className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">My Applications</h2>
                  <TabsList className="bg-white border shadow-sm p-1.5 gap-1">
                    <TabsTrigger value="all" onClick={() => setSelectedFilter("all")}>
                      All Programmes
                    </TabsTrigger>
                    <TabsTrigger value="expats" onClick={() => setSelectedFilter("expats")}>
                      Expats
                    </TabsTrigger>
                    <TabsTrigger value="mtep" onClick={() => setSelectedFilter("mtep")}>
                      MTEP
                    </TabsTrigger>
                    <TabsTrigger
                      value="de rantau"
                      onClick={() => setSelectedFilter("de rantau")}
                    >
                      DE Rantau
                    </TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </div>

            {/* Applications List */}
            <div className="space-y-5">
              {filteredApplications.length === 0 ? (
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardContent className="p-12 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2 text-gray-900">No applications found</h3>
                    <p className="text-gray-600 mb-4">
                      You haven't submitted any applications yet. Start your journey with MDEC!
                    </p>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Create New Application
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredApplications.map((application) => (
                  <Card
                    key={application.id}
                    className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 text-gray-900">
                            {application.programme} Application
                          </CardTitle>
                          <p className="text-sm text-gray-500">
                            Application ID: {application.id}
                          </p>
                        </div>
                        <Badge className={getStatusColor(application.status) + " font-medium"}>
                          {getStatusLabel(application.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
                        <div className="flex items-center gap-2.5 text-sm">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Company</p>
                            <p className="font-medium text-gray-900">{application.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Position</p>
                            <p className="font-medium text-gray-900">{application.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm">
                          <Globe2 className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Nationality</p>
                            <p className="font-medium text-gray-900">{application.nationality}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Submitted</p>
                            <p className="font-medium text-gray-900">
                              {new Date(application.submittedDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" className="gap-2 border-gray-200 h-9">
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                        {application.status === "documents-pending" && (
                          <Button variant="default" className="gap-2 h-9">
                            <FileCheck className="h-4 w-4" />
                            Upload Documents
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Help Section */}
            <Card className="bg-blue-50/50 border-blue-100">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2 text-gray-900">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  Need Help?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  If you have any questions about your application or need assistance,
                  please don't hesitate to contact us.
                </p>
                <Button variant="outline" className="border-gray-200">Contact Support</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default UserDashboard;

