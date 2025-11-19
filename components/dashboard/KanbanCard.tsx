"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Mail, 
  Phone, 
  Briefcase, 
  Building2, 
  Globe2, 
  Eye,
  AlertCircle,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Application {
  id: string;
  applicantName: string;
  programme: string;
  company: string;
  submittedDate: string;
  status: string;
  priority: "high" | "medium" | "low";
  email: string;
  phone: string;
  position: string;
  nationality: string;
}

interface KanbanCardProps {
  application: Application;
  onViewDetails?: (id: string) => void;
}

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
};

const programmeColors = {
  Expats: "bg-blue-50 text-blue-700 border-blue-200",
  MTEP: "bg-purple-50 text-purple-700 border-purple-200",
  "DE Rantau": "bg-orange-50 text-orange-700 border-orange-200",
};

const statusTabColors = {
  submitted: "bg-blue-500",
  "under-review": "bg-yellow-500",
  "documents-pending": "bg-orange-500",
  approved: "bg-green-500",
  rejected: "bg-red-500",
};

const programmeInitials = {
  Expats: "E",
  MTEP: "M",
  "DE Rantau": "D",
};

const programmeCircleColors = {
  Expats: "border-blue-500 text-blue-600",
  MTEP: "border-purple-500 text-purple-600",
  "DE Rantau": "border-orange-500 text-orange-600",
};

export const KanbanCard = ({ application, onViewDetails }: KanbanCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer bg-white border-0 relative overflow-visible">
      {/* Status Bookmark Tab with Programme Initial */}
      <div className="absolute top-0 right-6">
        {/* Bookmark background */}
        <div className={cn(
          "w-5 h-8 shadow-sm",
          statusTabColors[application.status as keyof typeof statusTabColors] || "bg-gray-500"
        )}
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)"
        }}
        />
        {/* Programme letter on top */}
        <div className={cn(
          "absolute top-1.5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white"
        )}>
          {programmeInitials[application.programme as keyof typeof programmeInitials] || "?"}
        </div>
      </div>
      
      <CardHeader className="pb-4 px-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base font-medium truncate text-gray-900">
              {application.applicantName}
            </CardTitle>
            <p className="text-xs text-gray-500 mt-1.5">
              {application.id}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 mt-3">
          <Badge 
            variant="outline" 
            className={cn("text-xs py-1 px-2.5 font-medium", programmeColors[application.programme as keyof typeof programmeColors])}
          >
            {application.programme}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3.5 text-sm px-5 pb-5">
        <div className="flex items-center gap-2.5 text-gray-600">
          <Building2 className="h-4 w-4 shrink-0 text-gray-400" />
          <span className="truncate text-xs">{application.company}</span>
        </div>
        
        <div className="flex items-center gap-2.5 text-gray-600">
          <Briefcase className="h-4 w-4 shrink-0 text-gray-400" />
          <span className="truncate text-xs">{application.position}</span>
        </div>

        <div className="flex items-center gap-2.5 text-gray-600">
          <Globe2 className="h-4 w-4 shrink-0 text-gray-400" />
          <span className="truncate text-xs">{application.nationality}</span>
        </div>

        <div className="flex items-center gap-2.5 text-gray-600">
          <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
          <span className="text-xs">
            {new Date(application.submittedDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>

        <div className="pt-4 flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 py-2 text-xs font-medium hover:bg-primary hover:text-white hover:border-primary transition-colors border-gray-200 cursor-pointer"
            onClick={() => onViewDetails?.(application.id)}
          >
            <Eye className="h-3.5 w-3.5 mr-1.5" />
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 py-2 text-xs font-medium hover:bg-primary hover:text-white hover:border-primary transition-colors border-gray-200 cursor-pointer"
            onClick={() => onViewDetails?.(application.id)}
          >
            <FileText className="h-3.5 w-3.5 mr-1.5" />
            Request Docs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

