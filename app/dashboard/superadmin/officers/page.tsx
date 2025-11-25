"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  TrendingUp,
  Activity,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
} from "lucide-react";
import Link from "next/link";

// Import the mock data
import officersData from "@/lib/data-sample/officers-data.json";

const OfficersPage = () => {
  const { officers } = officersData;

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "text-green-600";
    if (efficiency >= 80) return "text-blue-600";
    if (efficiency >= 70) return "text-amber-600";
    return "text-red-600";
  };

  const getEfficiencyBadge = (efficiency: number) => {
    if (efficiency >= 90) return "Excellent";
    if (efficiency >= 80) return "Good";
    if (efficiency >= 70) return "Average";
    return "Needs Improvement";
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <DashboardTopBar
          title="Officer Management"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Super Admin", href: "/dashboard/superadmin" },
            { label: "Officers" },
          ]}
        />
        <div className="flex-1 overflow-y-auto bg-zinc-100">
          <div className="p-8 max-w-[1800px] mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Officer Management</h1>
              <p className="text-gray-600 mt-2">
                View and manage all admin officers and their performance
              </p>
            </div>

            {/* Officers Grid */}
            <div className="grid grid-cols-1 gap-6">
              {officers.map((officer) => (
                <Card key={officer.id} className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Officer Info */}
                    <div className="lg:col-span-1">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                          {officer.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">
                                {officer.name}
                              </h3>
                              <p className="text-sm text-gray-600">{officer.role}</p>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                officer.status === "active"
                                  ? "border-black text-black"
                                  : "bg-gray-400 text-white border-gray-400"
                              }
                            >
                              {officer.status === "active" ? "Active" : "On Leave"}
                            </Badge>
                          </div>
                          
                          <div className="space-y-1 mt-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="h-4 w-4" />
                              <span>{officer.email}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-4">
                            {officer.programmes.map((prog) => (
                              <Badge key={prog} variant="outline" className="text-xs">
                                {prog}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="lg:col-span-1 border-l border-gray-100 pl-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-4">
                        Performance Metrics
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Efficiency</span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-black">
                              {officer.efficiency}%
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {getEfficiencyBadge(officer.efficiency)}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Total Assigned</span>
                          <span className="text-lg font-semibold text-gray-900">
                            {officer.assignedApplications}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Completed (Week)</span>
                          <span className="text-lg font-semibold text-black">
                            {officer.completedThisWeek}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Pending Tasks</span>
                          <span className="text-lg font-semibold text-black">
                            {officer.pendingTasks}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Weekly Statistics */}
                    <div className="lg:col-span-1 border-l border-gray-100 pl-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-4">
                        This Week&apos;s Activity
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="h-4 w-4 text-black" />
                            <span className="text-xs text-gray-600">Approved</span>
                          </div>
                          <span className="text-xl font-bold text-gray-900">
                            {officer.weeklyStats.approved}
                          </span>
                        </div>
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <XCircle className="h-4 w-4 text-black" />
                            <span className="text-xs text-gray-600">Rejected</span>
                          </div>
                          <span className="text-xl font-bold text-gray-900">
                            {officer.weeklyStats.rejected}
                          </span>
                        </div>
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-black" />
                            <span className="text-xs text-gray-600">Pending</span>
                          </div>
                          <span className="text-xl font-bold text-gray-900">
                            {officer.weeklyStats.pending}
                          </span>
                        </div>
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Activity className="h-4 w-4 text-black" />
                            <span className="text-xs text-gray-600">Review</span>
                          </div>
                          <span className="text-xl font-bold text-gray-900">
                            {officer.weeklyStats.underReview}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Summary Card */}
            <Card className="p-6 bg-gray-50 border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Team Summary
                  </h3>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <span className="text-gray-600">Total Officers: </span>
                      <span className="font-semibold text-gray-900">{officers.length}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Active: </span>
                      <span className="font-semibold text-black">
                        {officers.filter((o) => o.status === "active").length}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">On Leave: </span>
                      <span className="font-semibold text-gray-600">
                        {officers.filter((o) => o.status === "on-leave").length}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Avg Efficiency: </span>
                      <span className="font-semibold text-black">
                        {(
                          officers.reduce((sum, o) => sum + o.efficiency, 0) / officers.length
                        ).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/dashboard/superadmin/assign-tasks">
                    Assign Tasks
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default OfficersPage;

