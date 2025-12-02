"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Users,
  Rocket,
  Plane,
  BarChart3,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  ChevronUp,
  User2,
  Home,
  Workflow,
  GitBranch,
  Shield,
  Brain,
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
    roles: ["admin", "superadmin"],
  },
  {
    title: "Application Status",
    url: "/dashboard/admin/applications",
    icon: BarChart3,
    active: true,
    roles: ["admin", "superadmin"],
  },
  {
    title: "Pipeline",
    url: "/dashboard/admin/pipeline",
    icon: Workflow,
    active: true,
    roles: ["admin", "superadmin"],
  },
  {
    title: "Flow Chart",
    url: "/dashboard/admin/flowchart",
    icon: GitBranch,
    active: true,
    roles: ["admin", "superadmin"],
  },
  {
    title: "AI Scoring",
    url: "/dashboard/admin/ai-scoring",
    icon: Brain,
    active: true,
    roles: ["admin", "superadmin"],
  },
];

const superAdminMenuItems = [
  {
    title: "Super Admin Dashboard",
    url: "/dashboard/superadmin",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Officer Management",
    url: "/dashboard/superadmin/officers",
    icon: Users,
    active: true,
  },
  {
    title: "Weekly Reports",
    url: "/dashboard/superadmin/reports",
    icon: BarChart3,
    active: true,
  },
  {
    title: "Assign Tasks",
    url: "/dashboard/superadmin/assign-tasks",
    icon: Workflow,
    active: true,
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
  const router = useRouter();
  const { logout, user } = useAuth();
  const isUserDashboard = pathname?.startsWith("/dashboard/user");
  const isAdminDashboard = pathname?.startsWith("/dashboard/admin");
  const isSuperAdminDashboard = pathname?.startsWith("/dashboard/superadmin");

  const handleLogout = () => {
    logout();
    toast.success("Logout successful!", {
      description: "You have been logged out successfully.",
    });
    router.push("/login");
  };

  return (
    <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-10 items-center justify-center rounded-lg">
                  <Image
                    src="/logo/logo-favi.png"
                    alt="MDEC"
                    width={40}
                    height={40}
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
        {/* Super Admin Menu */}
        {isSuperAdminDashboard && (
          <SidebarGroup>
            <SidebarGroupLabel>Super Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {superAdminMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.active ? (
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
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => {
                // Application Status, Pipeline and Flow Chart should only be active on admin dashboard
                const isAdminOnlyItem = item.title === "Application Status" || item.title === "Pipeline" || item.title === "Flow Chart";
                const isActive = isAdminOnlyItem ? (item.active && isAdminDashboard) : item.active;
                
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
              {isSuperAdminDashboard ? (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/admin">
                      <LayoutDashboard />
                      <span>Admin Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                <>
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
                      <Link href="/dashboard/superadmin">
                        <Shield />
                        <span>Super Admin</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
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
                    <span className="truncate font-semibold">
                      {user?.username === "superadmin" 
                        ? "Super Admin" 
                        : user?.username === "admin" 
                        ? "Admin User" 
                        : "User"}
                    </span>
                    <span className="truncate text-xs">
                      {user?.username === "superadmin" 
                        ? "superadmin@mdec.my" 
                        : user?.username === "admin" 
                        ? "admin@mdec.my" 
                        : "user@mdec.my"}
                    </span>
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
                <DropdownMenuItem
                  className="text-muted-foreground cursor-not-allowed opacity-50"
                  onSelect={(e) => e.preventDefault()}
                >
                  <User2 className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-muted-foreground cursor-not-allowed opacity-50"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={handleLogout}
                >
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

