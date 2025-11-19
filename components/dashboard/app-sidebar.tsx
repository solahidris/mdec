"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Rocket,
  Plane,
  BarChart3,
  Settings,
  Bell,
  Search,
  HelpCircle,
  LogOut,
  ChevronUp,
  User2,
  Home,
  Workflow,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// Menu items
const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard/admin",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Pipeline",
    url: "/dashboard/admin/pipeline",
    icon: Workflow,
    active: true,
  },
  {
    title: "Analytics",
    url: "#",
    icon: BarChart3,
    active: false,
  },
];

const programmeItems = [
  {
    title: "Expats Programme",
    url: "/dashboard/admin/forms?programme=expats",
    icon: Users,
    active: true,
  },
  {
    title: "MTEP Programme",
    url: "/dashboard/admin/forms?programme=mtep",
    icon: Rocket,
    active: true,
  },
  {
    title: "DE Rantau Programme",
    url: "/dashboard/admin/forms?programme=derantau",
    icon: Plane,
    active: true,
  },
];

const settingsItems = [
  {
    title: "Notifications",
    url: "#",
    icon: Bell,
    badge: 3,
    active: false,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    active: false,
  },
  {
    title: "Help & Support",
    url: "#",
    icon: HelpCircle,
    active: false,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const isUserDashboard = pathname?.startsWith("/dashboard/user");
  const isAdminDashboard = pathname?.startsWith("/dashboard/admin");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-10 items-center justify-center rounded-lg">
                  <img
                    src="/logo/logo-favi.png"
                    alt="MDEC"
                    className="size-10 rounded-lg shadow"
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">MDEC Admin</span>
                  <span className="text-xs text-muted-foreground">
                    Dashboard
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => {
                // Pipeline should only be active on admin dashboard
                const isPipelineItem = item.title === "Pipeline";
                const isActive = isPipelineItem ? (item.active && isAdminDashboard) : item.active;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    {isActive ? (
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton disabled className="opacity-50 cursor-not-allowed">
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Programmes */}
        <SidebarGroup>
          <SidebarGroupLabel>Programmes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {programmeItems.map((item) => {
                // Programme items should only be active on admin dashboard
                const isActive = item.active && isAdminDashboard;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    {isActive ? (
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton disabled className="opacity-30 cursor-not-allowed">
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings & Support */}
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.active ? (
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton disabled className="opacity-30 cursor-not-allowed">
                      <item.icon />
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground text-xs text-white opacity-30">
                          {item.badge}
                        </span>
                      )}
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Links */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={isUserDashboard ? "/dashboard/admin" : "/dashboard/user"}>
                    <LayoutDashboard />
                    <span>{isUserDashboard ? "Admin Dashboard" : "User Dashboard"}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Home />
                    <span>Homepage</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="bg-white data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <User2 className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Admin User</span>
                    <span className="truncate text-xs">admin@mdec.my</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-white"
                side="top"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <User2 className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

