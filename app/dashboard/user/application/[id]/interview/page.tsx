"use client";

import { useParams } from "next/navigation";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const InterviewPage = () => {
  const params = useParams();
  const applicationId = params.id as string;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <DashboardTopBar
          title="Interview"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard/user" },
            { label: "Application", href: `/dashboard/user/application/${applicationId}` },
            { label: "Interview", href: "#" },
          ]}
        />
        <div className="flex-1 overflow-y-auto bg-zinc-100">
          <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Interview for {applicationId}</h1>
            <p className="text-gray-600 mt-2">Interview feature coming soon...</p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default InterviewPage;
