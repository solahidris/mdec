"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Download,
  Calendar,
  BarChart3,
  Users,
  Target,
} from "lucide-react";

// Import the mock data
import officersData from "@/lib/data-sample/officers-data.json";

const ReportsPage = () => {
  const { officers, weeklyReport } = officersData;

  const activeOfficers = officers.filter((o) => o.status === "active");

  // Calculate additional metrics
  const totalCompleted = officers.reduce((sum, o) => sum + o.completedThisWeek, 0);
  const totalPending = officers.reduce((sum, o) => sum + o.pendingTasks, 0);
  const avgEfficiency = officers.reduce((sum, o) => sum + o.efficiency, 0) / officers.length;

  // Top performers
  const topPerformers = [...officers]
    .sort((a, b) => b.completedThisWeek - a.completedThisWeek)
    .slice(0, 3);

  // Programme breakdown
  const programmeBreakdown = {
    Expats: {
      officers: officers.filter((o) => o.programmes.includes("Expats")).length,
      approved: officers
        .filter((o) => o.programmes.includes("Expats"))
        .reduce((sum, o) => sum + o.weeklyStats.approved, 0),
      pending: officers
        .filter((o) => o.programmes.includes("Expats"))
        .reduce((sum, o) => sum + o.weeklyStats.pending, 0),
    },
    MTEP: {
      officers: officers.filter((o) => o.programmes.includes("MTEP")).length,
      approved: officers
        .filter((o) => o.programmes.includes("MTEP"))
        .reduce((sum, o) => sum + o.weeklyStats.approved, 0),
      pending: officers
        .filter((o) => o.programmes.includes("MTEP"))
        .reduce((sum, o) => sum + o.weeklyStats.pending, 0),
    },
    "DE Rantau": {
      officers: officers.filter((o) => o.programmes.includes("DE Rantau")).length,
      approved: officers
        .filter((o) => o.programmes.includes("DE Rantau"))
        .reduce((sum, o) => sum + o.weeklyStats.approved, 0),
      pending: officers
        .filter((o) => o.programmes.includes("DE Rantau"))
        .reduce((sum, o) => sum + o.weeklyStats.pending, 0),
    },
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <DashboardTopBar
          title="Weekly Reports & Analysis"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Super Admin", href: "/dashboard/superadmin" },
            { label: "Reports" },
          ]}
        />
        <div className="flex-1 overflow-y-auto bg-zinc-100">
          <div className="p-8 max-w-[1800px] mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Weekly Reports & Analysis</h1>
                <p className="text-gray-600 mt-2">
                  Performance insights for {weeklyReport.weekStartDate} - {weeklyReport.weekEndDate}
                </p>
              </div>
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <FileText className="h-8 w-8 text-black" />
                  <Badge className="bg-gray-100 text-gray-800">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8%
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {weeklyReport.totalApplications}
                </div>
                <div className="text-sm text-gray-600">Total Applications</div>
              </Card>

              <Card className="p-6 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="h-8 w-8 text-black" />
                  <Badge className="bg-gray-100 text-gray-800">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12%
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {weeklyReport.completed}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </Card>

              <Card className="p-6 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="h-8 w-8 text-black" />
                  <Badge className="bg-gray-100 text-gray-800">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -3%
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {weeklyReport.avgProcessingTime}
                </div>
                <div className="text-sm text-gray-600">Avg Processing Time</div>
              </Card>

              <Card className="p-6 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <Target className="h-8 w-8 text-black" />
                  <Badge className="bg-gray-100 text-gray-800">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5%
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {weeklyReport.efficiency.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">System Efficiency</div>
              </Card>
            </div>

            {/* Status Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Application Status Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-black" />
                      <span className="font-medium text-gray-900">Approved</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-gray-900">
                        {weeklyReport.approved}
                      </span>
                      <p className="text-xs text-gray-500">
                        {((weeklyReport.approved / weeklyReport.totalApplications) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <XCircle className="h-5 w-5 text-black" />
                      <span className="font-medium text-gray-900">Rejected</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-gray-900">
                        {weeklyReport.rejected}
                      </span>
                      <p className="text-xs text-gray-500">
                        {((weeklyReport.rejected / weeklyReport.totalApplications) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Activity className="h-5 w-5 text-black" />
                      <span className="font-medium text-gray-900">Under Review</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-gray-900">
                        {weeklyReport.underReview}
                      </span>
                      <p className="text-xs text-gray-500">
                        {((weeklyReport.underReview / weeklyReport.totalApplications) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-black" />
                      <span className="font-medium text-gray-900">Pending</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-gray-900">
                        {weeklyReport.pending}
                      </span>
                      <p className="text-xs text-gray-500">
                        {((weeklyReport.pending / weeklyReport.totalApplications) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Top Performers This Week
                </h3>
                <div className="space-y-4">
                  {topPerformers.map((officer, index) => (
                    <div
                      key={officer.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {officer.avatar}
                          </div>
                          {index === 0 && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center text-xs">
                              🏆
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{officer.name}</p>
                          <p className="text-sm text-gray-600">{officer.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-black">
                          {officer.completedThisWeek}
                        </p>
                        <p className="text-xs text-gray-500">completed</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Programme Breakdown */}
            <Card className="p-6 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Programme Performance Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(programmeBreakdown).map(([programme, data]) => (
                  <div
                    key={programme}
                    className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg"
                  >
                    <h4 className="font-semibold text-gray-900 mb-4">{programme}</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Officers Assigned</span>
                        <span className="font-semibold text-gray-900">{data.officers}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Approved</span>
                        <span className="font-semibold text-black">{data.approved}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Pending</span>
                        <span className="font-semibold text-black">{data.pending}</span>
                      </div>
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Success Rate</span>
                          <span className="font-semibold text-black">
                            {((data.approved / (data.approved + data.pending)) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Officer Summary */}
            <Card className="p-6 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Officer Performance Summary
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Officer</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Assigned</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Completed</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Pending</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {officers.map((officer) => (
                      <tr key={officer.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {officer.avatar}
                            </div>
                            <span className="font-medium text-gray-900">{officer.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={officer.status === "active" ? "border-black text-black" : "bg-gray-400 text-white border-gray-400"}
                          >
                            {officer.status === "active" ? "Active" : "On Leave"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-gray-900">
                          {officer.assignedApplications}
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-black">
                          {officer.completedThisWeek}
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-black">
                          {officer.pendingTasks}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="font-semibold text-black">
                            {officer.efficiency}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ReportsPage;

