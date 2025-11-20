"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KanbanCard, Application } from "./KanbanCard";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  title: string;
  status: string;
  applications: Application[];
  count: number;
  color?: string;
  icon?: React.ReactNode;
  onViewDetails?: (id: string) => void;
}

const statusColors = {
  submitted: "bg-blue-100 text-blue-700 shadow",
  "under-review": "bg-yellow-100 text-yellow-700 shadow",
  "documents-pending": "bg-orange-100 text-orange-700 shadow",
  approved: "bg-green-100 text-green-700 shadow",
  rejected: "bg-red-100 text-red-700 shadow",
};

export const KanbanColumn = ({
  title,
  status,
  applications,
  count,
  icon,
  onViewDetails,
}: KanbanColumnProps) => {
  return (
    <div className="flex flex-col h-full min-w-[340px] max-w-[380px]">
      <div className="mb-5 bg-white rounded-xl shadow-sm p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && <div className="text-gray-700">{icon}</div>}
            <h3 className="font-medium text-base text-gray-900">{title}</h3>
          </div>
          <Badge 
            className={cn(
              "text-xs font-medium px-3 py-0",
              statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-700"
            )}
          >
            {count}
          </Badge>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-1 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {applications.length === 0 ? (
          <Card className="border-dashed border-gray-300 bg-gray-50/50">
            <CardContent className="pt-8 pb-8">
              <p className="text-center text-sm text-gray-500">
                No applications in this stage
              </p>
            </CardContent>
          </Card>
        ) : (
          applications.map((application) => (
            <KanbanCard
              key={application.id}
              application={application}
              onViewDetails={onViewDetails}
            />
          ))
        )}
      </div>
    </div>
  );
};

