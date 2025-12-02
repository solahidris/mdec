"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Rocket,
  Plane,
  TrendingUp,
  Activity,
  ArrowRight,
  Calendar,
  AlertCircle,
  Brain,
} from "lucide-react";
import Link from "next/link";

// Import the mock data
import applicationsData from "@/lib/data-sample/dashboard-applications.json";

const Dashboard = () => {
  const applications = applicationsData.applications;

  // Calculate statistics
  const stats = {
    total: applications.length,
    submitted: applications.filter((app: any) => app.status === "submitted")
      .length,
    underReview: applications.filter(
      (app: any) => app.status === "under-review"
    ).length,
    documentsPending: applications.filter(
      (app: any) => app.status === "documents-pending"
    ).length,
    approved: applications.filter((app: any) => app.status === "approved")
      .length,
    rejected: applications.filter((app: any) => app.status === "rejected")
      .length,
  };

  // Calculate programme-specific stats
  const programmeStats = {
    expats: applications.filter(
      (app: any) => app.programme.toLowerCase() === "expats"
    ).length,
    mtep: applications.filter(
      (app: any) => app.programme.toLowerCase() === "mtep"
    ).length,
    deRantau: applications.filter(
      (app: any) => app.programme.toLowerCase() === "de rantau"
    ).length,
  };

  // Get recent applications
  const recentApplications = applications.slice(0, 5);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <DashboardTopBar
          title="Dashboard Overview"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
        />
        <div className="flex-1 overflow-y-auto bg-zinc-100">
          <div className="p-8 max-w-[1800px] mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 via-red-500 to-red-700 shadow-lg">
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2 text-white">
                      Welcome back, Admin Officer A!
                    </h1>
                    <p className="text-white/90 text-lg font-light">
                      Here&apos;s what&apos;s happening with your programmes
                      today
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <Calendar className="h-16 w-16 text-white stroke-[1.5]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Statistics */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Overview Statistics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardStatCard
                  title="Total Applications"
                  value={stats.total}
                  icon={FileText}
                  description="All programmes"
                  trend={{ value: "12%", isPositive: true }}
                  color="bg-red-600"
                />
                <DashboardStatCard
                  title="Under Review"
                  value={stats.underReview}
                  icon={Clock}
                  description="In processing"
                  color="bg-gray-500"
                />
                <DashboardStatCard
                  title="Approved"
                  value={stats.approved}
                  icon={CheckCircle}
                  description="Successfully processed"
                  trend={{ value: "8%", isPositive: true }}
                  color="bg-gray-600"
                />
                <DashboardStatCard
                  title="Action Required"
                  value={stats.documentsPending}
                  icon={AlertCircle}
                  description="Documents pending"
                  color="bg-gray-700"
                />
              </div>
            </div>

            {/* Programme Overview */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Programmes Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Expats Programme */}
                <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <Users className="h-6 w-6 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Expats
                        </h3>
                        <p className="text-sm text-gray-500">Programme</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gray-900">
                        {programmeStats.expats}
                      </span>
                      <span className="text-sm text-gray-500">
                        applications
                      </span>
                    </div>
                    <div className="pt-4">
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        asChild
                      >
                        <Link href="/dashboard/admin/forms?programme=expats">
                          View Details
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* MTEP Programme */}
                <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <Rocket className="h-6 w-6 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          MTEP
                        </h3>
                        <p className="text-sm text-gray-500">Programme</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gray-900">
                        {programmeStats.mtep}
                      </span>
                      <span className="text-sm text-gray-500">
                        applications
                      </span>
                    </div>
                    <div className="pt-4">
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        asChild
                      >
                        <Link href="/dashboard/admin/forms?programme=mtep">
                          View Details
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* DE Rantau Programme */}
                <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <Plane className="h-6 w-6 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          DE Rantau
                        </h3>
                        <p className="text-sm text-gray-500">Programme</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gray-900">
                        {programmeStats.deRantau}
                      </span>
                      <span className="text-sm text-gray-500">
                        applications
                      </span>
                    </div>
                    <div className="pt-4">
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        asChild
                      >
                        <Link href="/dashboard/admin/forms?programme=derantau">
                          View Details
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Application Status Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Status Breakdown */}
              <Card className="p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Status Distribution
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-600 rounded-lg">
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">
                        Submitted
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-gray-700">
                      {stats.submitted}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-600 rounded-lg">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">
                        Under Review
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-gray-700">
                      {stats.underReview}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-600 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">
                        Documents Pending
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-gray-700">
                      {stats.documentsPending}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-600 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">
                        Approved
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-gray-700">
                      {stats.approved}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-600 rounded-lg">
                        <XCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">
                        Rejected
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-gray-700">
                      {stats.rejected}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Recent Applications
                </h3>
                <div className="space-y-4">
                  {recentApplications.map((app: any) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {app.applicantName}
                        </p>
                        <p className="text-sm text-gray-500">{app.programme}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`capitalize inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            app.status === "approved"
                              ? "bg-gray-100 text-gray-800"
                              : app.status === "rejected"
                              ? "bg-gray-100 text-gray-800"
                              : app.status === "under-review"
                              ? "bg-gray-100 text-gray-800"
                              : app.status === "documents-pending"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {app.status.replace("-", " ")}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {app.submittedDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4">
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <Link href="/dashboard/admin/pipeline">
                      View All Applications
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-6 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-5">
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2" asChild>
                  <Link href="/dashboard/admin/pipeline">
                    <Activity className="h-4 w-4" />
                    View Pipeline
                  </Link>
                </Button>
                <Button
                  className="gap-2 bg-purple-600 hover:bg-purple-700"
                  asChild
                >
                  <Link href="/dashboard/admin/ai-scoring">
                    <Brain className="h-4 w-4" />
                    AI Scoring System
                  </Link>
                </Button>
                <Button disabled variant="outline" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  View Analytics
                </Button>
                <Button disabled variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Export Report
                </Button>
                <Button disabled variant="outline" className="gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Pending Actions ({stats.documentsPending})
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
