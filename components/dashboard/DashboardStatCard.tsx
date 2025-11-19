"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: string;
}

export const DashboardStatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  color = "bg-primary",
}: StatCardProps) => {
  return (
    <Card className="bg-white py-2 border-0 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="px-6 py-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-2">
              {title}
            </p>
            <h3 className="text-3xl font-semibold tracking-tight text-gray-900">{value}</h3>
            {description && (
              <p className="text-xs text-gray-500 mt-2">
                {description}
              </p>
            )}
            {trend && (
              <div className="flex items-center gap-1.5 mt-3">
                <span
                  className={cn(
                    "text-xs font-semibold",
                    trend.isPositive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {trend.isPositive ? "↑" : "↓"} {trend.value}
                </span>
                <span className="text-xs text-gray-500">
                  vs last month
                </span>
              </div>
            )}
          </div>
          <div
            className={cn(
              "flex items-start justify-center w-12 h-12 rounded-lg",
              color,
              "bg-opacity-10"
            )}
          >
            <Icon className={cn("h-6 w-6", color.replace("bg-", "text-"))} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

