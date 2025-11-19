"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Shield, User, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardSelector = () => {
  const router = useRouter();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <DashboardTopBar
          title="Dashboard"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Dashboard" },
          ]}
        />
        <div className="flex-1 overflow-y-auto bg-gray-50/50">
          <div className="p-8 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-semibold mb-3 text-gray-900">Welcome to MDEC Dashboard</h1>
              <p className="text-gray-600">
                Select your dashboard view to continue
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Dashboard Card */}
              <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group">
                <CardHeader className="text-center pb-4 pt-6">
                  <div className="mx-auto mb-5 flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
                    <User className="h-10 w-10 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-gray-900">User Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="text-center px-6 pb-6">
                  <p className="text-gray-600 mb-6">
                    View and manage your applications, upload documents, and track your
                    submission status.
                  </p>
                  <ul className="text-sm text-gray-600 mb-6 space-y-2.5 text-left">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      View your applications
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Upload documents
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Track application status
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Submit new applications
                    </li>
                  </ul>
                  <Button
                    className="w-full gap-2 group-hover:bg-primary/90 h-10"
                    onClick={() => router.push("/dashboard/user")}
                  >
                    Go to User Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Admin Dashboard Card */}
              <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group">
                <CardHeader className="text-center pb-4 pt-6">
                  <div className="mx-auto mb-5 flex items-center justify-center w-20 h-20 rounded-2xl bg-purple-50 group-hover:bg-purple-100 transition-colors">
                    <Shield className="h-10 w-10 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-gray-900">Admin Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="text-center px-6 pb-6">
                  <p className="text-gray-600 mb-6">
                    Manage all applications, review submissions, and oversee the entire
                    application pipeline.
                  </p>
                  <ul className="text-sm text-gray-600 mb-6 space-y-2.5 text-left">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      View all applications
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Kanban board view
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Review and approve applications
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Analytics and reporting
                    </li>
                  </ul>
                  <Button
                    className="w-full gap-2 group-hover:bg-primary/90 h-10"
                    onClick={() => router.push("/dashboard/admin")}
                  >
                    Go to Admin Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Info Card */}
            <Card className="mt-8 bg-blue-50/50 border-blue-100">
              <CardContent className="p-5 text-center">
                <p className="text-sm text-gray-600">
                  Need help deciding? Contact your administrator or refer to the user guide
                  for more information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardSelector;
