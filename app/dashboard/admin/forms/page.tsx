"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Users,
  Rocket,
  Plane,
  CheckCircle2,
  XCircle,
  Upload,
  Calendar,
  List,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Import the JSON data for each programme
import expatsData from "@/lib/data-sample/expats.json";
import mtepData from "@/lib/data-sample/mtep.json";
import deRantauData from "@/lib/data-sample/de-rantau.json";

interface Question {
  id: string;
  order: number;
  question: string;
  question_info: string;
  type: string;
  required: boolean;
  options?: Array<{ label: string; value: string }>;
}

interface SubSection {
  id: string;
  order: number;
  sub_section_name: string;
  sub_section_info: string;
  questions: Question[];
}

interface Section {
  id: string;
  order: number;
  section_name: string;
  sub_sections: SubSection[];
}

const FormsStructureContent = () => {
  const searchParams = useSearchParams();
  const programmeParam = searchParams.get("programme");
  const [selectedProgramme, setSelectedProgramme] = useState<string>(programmeParam || "expats");

  // Update selected programme when URL parameter changes
  useEffect(() => {
    if (programmeParam) {
      setSelectedProgramme(programmeParam);
    }
  }, [programmeParam]);

  // Get the data for the selected programme
  const getProgrammeData = (): Section[] => {
    switch (selectedProgramme) {
      case "expats":
        return expatsData as Section[];
      case "mtep":
        return mtepData as Section[];
      case "derantau":
        return deRantauData as Section[];
      default:
        return expatsData as Section[];
    }
  };

  const programmeData = getProgrammeData();

  // Get programme display name
  const getProgrammeName = (): string => {
    switch (selectedProgramme) {
      case "expats":
        return "Expats Programme";
      case "mtep":
        return "MTEP Programme";
      case "derantau":
        return "DE Rantau Programme";
      default:
        return "Programme";
    }
  };

  // Get statistics for each programme
  const getStats = (data: Section[]) => {
    const totalSections = data.length;
    const totalSubSections = data.reduce(
      (acc, section) => acc + section.sub_sections.length,
      0
    );
    const totalQuestions = data.reduce(
      (acc, section) =>
        acc +
        section.sub_sections.reduce(
          (subAcc, subSection) => subAcc + subSection.questions.length,
          0
        ),
      0
    );
    const requiredQuestions = data.reduce(
      (acc, section) =>
        acc +
        section.sub_sections.reduce(
          (subAcc, subSection) =>
            subAcc +
            subSection.questions.filter((q) => q.required).length,
          0
        ),
      0
    );
    const optionalQuestions = totalQuestions - requiredQuestions;

    return {
      totalSections,
      totalSubSections,
      totalQuestions,
      requiredQuestions,
      optionalQuestions,
    };
  };

  const stats = getStats(programmeData);

  const getFieldTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "upload":
        return <Upload className="h-4 w-4" />;
      case "date picker":
        return <Calendar className="h-4 w-4" />;
      case "select":
        return <List className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getFieldTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      "input field": "bg-blue-100 text-blue-800",
      upload: "bg-purple-100 text-purple-800",
      select: "bg-green-100 text-green-800",
      "date picker": "bg-orange-100 text-orange-800",
    };
    return colors[type.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <DashboardTopBar
          title={getProgrammeName()}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard/admin" },
            { label: getProgrammeName() },
          ]}
        />
        <div className="flex-1 overflow-y-auto bg-zinc-100">
          <div className="p-8 max-w-[1800px] mx-auto space-y-8">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 via-red-500 to-red-700 shadow-lg">
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2 text-white">
                      {getProgrammeName()} - Application Form
                    </h1>
                    <p className="text-white/90 text-lg font-light">
                      View and analyze the structure of application form fields and questions
                    </p>
                  </div>
                  <div className="hidden md:block">
                    {selectedProgramme === "expats" && <Users className="h-16 w-16 text-white stroke-[1.5]" />}
                    {selectedProgramme === "mtep" && <Rocket className="h-16 w-16 text-white stroke-[1.5]" />}
                    {selectedProgramme === "derantau" && <Plane className="h-16 w-16 text-white stroke-[1.5]" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="p-4 bg-white shadow-sm">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-gray-500 font-medium">
                    Sections
                  </span>
                  <span className="text-3xl font-bold text-gray-900">
                    {stats.totalSections}
                  </span>
                </div>
              </Card>
              <Card className="p-4 bg-white shadow-sm">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-gray-500 font-medium">
                    Sub-Sections
                  </span>
                  <span className="text-3xl font-bold text-gray-900">
                    {stats.totalSubSections}
                  </span>
                </div>
              </Card>
              <Card className="p-4 bg-white shadow-sm">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-gray-500 font-medium">
                    Total Fields
                  </span>
                  <span className="text-3xl font-bold text-gray-900">
                    {stats.totalQuestions}
                  </span>
                </div>
              </Card>
              <Card className="p-4 bg-white shadow-sm">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-gray-500 font-medium">
                    Required
                  </span>
                  <span className="text-3xl font-bold text-green-600">
                    {stats.requiredQuestions}
                  </span>
                </div>
              </Card>
              <Card className="p-4 bg-white shadow-sm">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-gray-500 font-medium">
                    Optional
                  </span>
                  <span className="text-3xl font-bold text-gray-600">
                    {stats.optionalQuestions}
                  </span>
                </div>
              </Card>
            </div>

            {/* Programme Tabs */}
            <Tabs value={selectedProgramme} className="w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Switch Programme
                </h2>
                <TabsList className="bg-white border shadow-sm gap-2">
                  <TabsTrigger
                    value="expats"
                    onClick={() => window.location.href = "/dashboard/admin/forms?programme=expats"}
                    className="gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Expats
                  </TabsTrigger>
                  <TabsTrigger
                    value="mtep"
                    onClick={() => window.location.href = "/dashboard/admin/forms?programme=mtep"}
                    className="gap-2"
                  >
                    <Rocket className="h-4 w-4" />
                    MTEP
                  </TabsTrigger>
                  <TabsTrigger
                    value="derantau"
                    onClick={() => window.location.href = "/dashboard/admin/forms?programme=derantau"}
                    className="gap-2"
                  >
                    <Plane className="h-4 w-4" />
                    DE Rantau
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Forms Structure Content */}
              <div className="space-y-6">
                {programmeData.map((section) => (
                  <Card key={section.id} className="overflow-hidden bg-white shadow-sm">
                    {/* Section Header */}
                    <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">
                            {section.order}. {section.section_name}
                          </h3>
                          <p className="text-red-100 text-sm">
                            {section.sub_sections.length} sub-section(s)
                          </p>
                        </div>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">
                          {section.sub_sections.reduce(
                            (acc, sub) => acc + sub.questions.length,
                            0
                          )}{" "}
                          fields
                        </Badge>
                      </div>
                    </div>

                    {/* Sub-sections */}
                    <div className="divide-y divide-gray-200">
                      {section.sub_sections.map((subSection) => (
                        <div key={subSection.id} className="p-6">
                          {/* Sub-section Header */}
                          <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                              {section.order}.{subSection.order}{" "}
                              {subSection.sub_section_name}
                            </h4>
                            {subSection.sub_section_info && (
                              <p className="text-sm text-gray-600 italic">
                                {subSection.sub_section_info}
                              </p>
                            )}
                          </div>

                          {/* Questions Table */}
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="text-left p-3 font-semibold text-gray-700 w-12">
                                    #
                                  </th>
                                  <th className="text-left p-3 font-semibold text-gray-700">
                                    Question / Field Label
                                  </th>
                                  <th className="text-left p-3 font-semibold text-gray-700 w-32">
                                    Type
                                  </th>
                                  <th className="text-center p-3 font-semibold text-gray-700 w-24">
                                    Required
                                  </th>
                                  <th className="text-left p-3 font-semibold text-gray-700 w-48">
                                    Additional Info
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {subSection.questions.map((question) => (
                                  <tr
                                    key={question.id}
                                    className="hover:bg-gray-50 transition-colors"
                                  >
                                    <td className="p-3 text-gray-500">
                                      {question.order}
                                    </td>
                                    <td className="p-3">
                                      <div className="font-medium text-gray-900">
                                        {question.question}
                                      </div>
                                      {question.options && (
                                        <div className="mt-1 text-xs text-gray-500">
                                          Options: {question.options.length} choices
                                        </div>
                                      )}
                                    </td>
                                    <td className="p-3">
                                      <Badge
                                        className={`${getFieldTypeBadge(
                                          question.type
                                        )} flex items-center gap-1 w-fit`}
                                      >
                                        {getFieldTypeIcon(question.type)}
                                        {question.type}
                                      </Badge>
                                    </td>
                                    <td className="p-3 text-center">
                                      {question.required ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-600 inline" />
                                      ) : (
                                        <XCircle className="h-5 w-5 text-gray-400 inline" />
                                      )}
                                    </td>
                                    <td className="p-3 text-xs text-gray-600">
                                      {question.question_info || "-"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

const FormsStructurePage = () => {
  return (
    <Suspense fallback={
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col h-screen overflow-hidden">
          <DashboardTopBar
            title="Loading..."
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Dashboard", href: "/dashboard/admin" },
              { label: "Forms" },
            ]}
          />
          <div className="flex-1 overflow-y-auto bg-zinc-100 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">Loading form structure...</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    }>
      <FormsStructureContent />
    </Suspense>
  );
};

export default FormsStructurePage;

