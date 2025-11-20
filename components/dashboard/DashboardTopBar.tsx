"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Search, Download, Filter } from "lucide-react";

interface DashboardTopBarProps {
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export const DashboardTopBar = ({ 
  breadcrumbs = [{ label: "Dashboard" }] 
}: DashboardTopBarProps) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b bg-zinc-50 px-6">
      <div className="flex items-center gap-3 flex-1">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-1 h-5" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink href={crumb.href}>
                      {crumb.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search applications..."
            className="pl-10 w-72 h-9 border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-200"
          />
        </div>
        <Button variant="outline" size="icon" className="hidden lg:flex h-9 w-9 border-gray-200">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="hidden lg:flex h-9 w-9 border-gray-200">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

