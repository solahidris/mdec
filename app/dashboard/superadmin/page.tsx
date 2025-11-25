"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  TrendingUp,
  Activity,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  UserCheck,
  UserX,
  FileText,
  Target,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Import the mock data
import officersData from "@/lib/data-sample/officers-data.json";

const SuperAdminDashboard = () => {
  const { officers, weeklyReport, tasks } = officersData;

  // Calculate statistics
  const activeOfficers = officers.filter((o) => o.status === "active").length;
  const totalTasks = tasks.length;
  const unassignedTasks = tasks.filter((t) => t.status === "unassigned").length;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <DashboardTopBar
          title="Super Admin Dashboard"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Super Admin Dashboard" },
          ]}
        />
        <div className="flex-1 overflow-y-auto bg-zinc-100">
          <div className="p-8 max-w-[1800px] mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-2xl bg-black shadow-lg">
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2 text-white">
                      Welcome, Super Admin!
                    </h1>
                    <p className="text-gray-400 text-lg font-light">
                      System-wide overview and officer management
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <Shield className="h-16 w-16 text-white stroke-[1.5]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Statistics */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                System Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardStatCard
                  title="Total Applications"
                  value={weeklyReport.totalApplications}
                  icon={FileText}
                  description="This week"
                  trend={{ value: "8%", isPositive: true }}
                  color="bg-black"
                />
                <DashboardStatCard
                  title="Active Officers"
                  value={activeOfficers}
                  icon={UserCheck}
                  description={`Out of ${officers.length} total`}
                  color="bg-gray-900"
                />
                <DashboardStatCard
                  title="Avg Efficiency"
                  value={`${weeklyReport.efficiency.toFixed(1)}%`}
                  icon={TrendingUp}
                  description="Across all officers"
                  trend={{ value: "3%", isPositive: true }}
                  color="bg-gray-800"
                />
                <DashboardStatCard
                  title="Pending Tasks"
                  value={unassignedTasks}
                  icon={AlertCircle}
                  description="Require assignment"
                  color="bg-gray-700"
                />
              </div>
            </div>

            {/* Weekly Report Summary */}
            <Card className="p-6 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Weekly Report ({weeklyReport.weekStartDate} - {weeklyReport.weekEndDate})
                </h3>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/dashboard/superadmin/reports">
                    View Detailed Report
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-black" />
                    <span className="text-sm font-medium text-gray-700">Completed</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{weeklyReport.completed}</span>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-black" />
                    <span className="text-sm font-medium text-gray-700">Under Review</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{weeklyReport.underReview}</span>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-black" />
                    <span className="text-sm font-medium text-gray-700">Pending</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{weeklyReport.pending}</span>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-black" />
                    <span className="text-sm font-medium text-gray-700">Avg Processing</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">{weeklyReport.avgProcessingTime}</span>
                </div>
              </div>
            </Card>

            {/* Officers Overview */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Officer Management
                </h2>
                <Button asChild>
                  <Link href="/dashboard/superadmin/officers">
                    View All Officers
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {officers.map((officer) => (
                  <Card key={officer.id} className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {officer.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{officer.name}</h3>
                          <p className="text-sm text-gray-500">{officer.role}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={officer.status === "active" ? "border-black text-black" : "bg-gray-400 text-white border-gray-400"}
                      >
                        {officer.status === "active" ? "Active" : "On Leave"}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Assigned</span>
                        <span className="font-semibold text-gray-900">{officer.assignedApplications}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Completed (Week)</span>
                        <span className="font-semibold text-gray-900">{officer.completedThisWeek}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Pending Tasks</span>
                        <span className="font-semibold text-black">{officer.pendingTasks}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Efficiency</span>
                        <span className="font-semibold text-black">
                          {officer.efficiency}%
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-1">
                        {officer.programmes.map((prog) => (
                          <Badge key={prog} variant="outline" className="text-xs">
                            {prog}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <Card className="p-6 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-5">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2" asChild>
                  <Link href="/dashboard/superadmin/assign-tasks">
                    <Target className="h-4 w-4" />
                    Assign Tasks
                  </Link>
                </Button>
                <Button variant="outline" className="gap-2" asChild>
                  <Link href="/dashboard/superadmin/reports">
                    <BarChart3 className="h-4 w-4" />
                    View Reports
                  </Link>
                </Button>
                <Button variant="outline" className="gap-2" asChild>
                  <Link href="/dashboard/superadmin/officers">
                    <Users className="h-4 w-4" />
                    Manage Officers
                  </Link>
                </Button>
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Review
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SuperAdminDashboard;

