"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { KanbanColumn } from "@/components/dashboard/KanbanColumn";
import { Application } from "@/components/dashboard/KanbanCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Rocket,
  Plane,
  TrendingUp,
  AlertCircle,
  FileCheck,
  Send,
  Eye,
} from "lucide-react";

// Import the mock data
import applicationsData from "@/lib/data-sample/dashboard-applications.json";

const PipelinePage = () => {
  const applications = applicationsData.applications as Application[];
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  // Calculate statistics
  const stats = {
    total: applications.length,
    submitted: applications.filter((app) => app.status === "submitted").length,
    underReview: applications.filter((app) => app.status === "under-review")
      .length,
    documentsPending: applications.filter(
      (app) => app.status === "documents-pending"
    ).length,
    approved: applications.filter((app) => app.status === "approved").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  };

  // Filter applications by programme
  const filteredApplications =
    selectedFilter === "all"
      ? applications
      : applications.filter(
          (app) => app.programme.toLowerCase() === selectedFilter
        );

  // Group applications by status
  const groupedApplications = {
    submitted: filteredApplications.filter(
      (app) => app.status === "submitted"
    ),
    underReview: filteredApplications.filter(
      (app) => app.status === "under-review"
    ),
    documentsPending: filteredApplications.filter(
      (app) => app.status === "documents-pending"
    ),
    approved: filteredApplications.filter((app) => app.status === "approved"),
    rejected: filteredApplications.filter((app) => app.status === "rejected"),
  };

  const handleViewDetails = (id: string) => {
    console.log("View details for application:", id);
    // You can implement a modal or navigation to details page here
    alert(`Viewing details for ${id}`);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <DashboardTopBar 
          title="Application Pipeline" 
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard/admin" },
            { label: "Pipeline" }
          ]} 
        />
        <div className="flex-1 overflow-y-auto bg-zinc-100">
          <div className="p-8 max-w-[1800px] mx-auto space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <DashboardStatCard
            title="Submitted"
            value={stats.submitted}
            icon={Send}
            description="New applications"
            color="bg-blue-500"
          />
          <DashboardStatCard
            title="Under Review"
            value={stats.underReview}
            icon={Clock}
            description="In processing"
            color="bg-yellow-500"
          />
          <DashboardStatCard
            title="Documents Pending"
            value={stats.documentsPending}
            icon={AlertCircle}
            description="Requires action"
            color="bg-orange-500"
          />
          <DashboardStatCard
            title="Approved"
            value={stats.approved}
            icon={CheckCircle}
            description="Successfully processed"
            trend={{ value: "8%", isPositive: true }}
            color="bg-green-500"
          />
          <DashboardStatCard
            title="Rejected"
            value={stats.rejected}
            icon={XCircle}
            description="Not approved"
            color="bg-red-500"
          />
        </div>

        {/* Programme Filter */}
        <div>
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Filter by Programme</h2>
              <TabsList className="bg-white border shadow-sm gap-2">
                <TabsTrigger
                  value="all"
                  onClick={() => setSelectedFilter("all")}
                  className="gap-2"
                >
                  All Programmes
                </TabsTrigger>
                <TabsTrigger
                  value="expats"
                  onClick={() => setSelectedFilter("expats")}
                  className="gap-2"
                >
                  <Users className="h-4 w-4" />
                  Expats
                </TabsTrigger>
                <TabsTrigger
                  value="mtep"
                  onClick={() => setSelectedFilter("mtep")}
                  className="gap-2"
                >
                  <Rocket className="h-4 w-4" />
                  MTEP
                </TabsTrigger>
                <TabsTrigger
                  value="de rantau"
                  onClick={() => setSelectedFilter("de rantau")}
                  className="gap-2"
                >
                  <Plane className="h-4 w-4" />
                  DE Rantau
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>

        {/* Kanban Board */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-5 min-w-max">
            <KanbanColumn
              title="Submitted"
              status="submitted"
              applications={groupedApplications.submitted}
              count={groupedApplications.submitted.length}
              icon={<Send className="h-5 w-5" />}
              onViewDetails={handleViewDetails}
            />

            <KanbanColumn
              title="Under Review"
              status="under-review"
              applications={groupedApplications.underReview}
              count={groupedApplications.underReview.length}
              icon={<Eye className="h-5 w-5" />}
              onViewDetails={handleViewDetails}
            />

            <KanbanColumn
              title="Documents Pending"
              status="documents-pending"
              applications={groupedApplications.documentsPending}
              count={groupedApplications.documentsPending.length}
              icon={<AlertCircle className="h-5 w-5" />}
              onViewDetails={handleViewDetails}
            />

            <KanbanColumn
              title="Approved"
              status="approved"
              applications={groupedApplications.approved}
              count={groupedApplications.approved.length}
              icon={<CheckCircle className="h-5 w-5" />}
              onViewDetails={handleViewDetails}
            />

            <KanbanColumn
              title="Rejected"
              status="rejected"
              applications={groupedApplications.rejected}
              count={groupedApplications.rejected.length}
              icon={<XCircle className="h-5 w-5" />}
              onViewDetails={handleViewDetails}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-5">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button disabled variant="outline" className="gap-2">
              <FileCheck className="h-4 w-4" />
              Export Report
            </Button>
            <Button disabled variant="outline" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              View Analytics
            </Button>
            <Button disabled variant="outline" className="gap-2">
              <AlertCircle className="h-4 w-4" />
              Pending Actions ({stats.documentsPending})
            </Button>
          </div>
        </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PipelinePage;

