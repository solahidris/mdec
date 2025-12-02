"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Shield,
  FileText,
  User,
  Building2,
  Clock,
  XCircle,
  Eye,
  RefreshCw,
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  Briefcase,
  Calendar,
} from "lucide-react";
import Link from "next/link";

// Import the mock data
import applicationsData from "@/lib/data-sample/dashboard-applications.json";

interface Application {
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

interface ScoringData {
  id: string;
  riskScore: number; // 0-100 (0 = highest risk, 100 = lowest risk)
  completenessScore: number; // 0-100 (0 = incomplete, 100 = complete)
  complianceScore: number; // 0-100 (0 = non-compliant, 100 = compliant)
  overallScore: number; // average of the three
  flags: {
    type: "error" | "warning" | "info";
    category: "documentation" | "compliance" | "information" | "eligibility";
    message: string;
  }[];
  lastAnalyzed: string;
}

// Mock AI scoring data for each application
const generateMockScoring = (app: Application): ScoringData => {
  const mockScores: Record<string, ScoringData> = {
    "app-2024-001": {
      id: app.id,
      riskScore: 92,
      completenessScore: 95,
      complianceScore: 98,
      overallScore: 95,
      flags: [
        {
          type: "info",
          category: "documentation",
          message: "All required documents submitted and verified",
        },
      ],
      lastAnalyzed: "2024-11-20T10:30:00Z",
    },
    "app-2024-002": {
      id: app.id,
      riskScore: 75,
      completenessScore: 80,
      complianceScore: 85,
      overallScore: 80,
      flags: [
        {
          type: "warning",
          category: "documentation",
          message: "Interview required for further assessment",
        },
        {
          type: "warning",
          category: "information",
          message: "Freelance status requires additional verification",
        },
      ],
      lastAnalyzed: "2024-11-20T11:15:00Z",
    },
    "app-2024-003": {
      id: app.id,
      riskScore: 60,
      completenessScore: 65,
      complianceScore: 70,
      overallScore: 65,
      flags: [
        {
          type: "error",
          category: "documentation",
          message:
            "Missing required document: Business registration certificate",
        },
        {
          type: "error",
          category: "documentation",
          message: "Passport copy quality insufficient",
        },
        {
          type: "warning",
          category: "compliance",
          message: "Company address verification pending",
        },
      ],
      lastAnalyzed: "2024-11-20T09:45:00Z",
    },
    "APP-2024-004": {
      id: app.id,
      riskScore: 88,
      completenessScore: 90,
      complianceScore: 92,
      overallScore: 90,
      flags: [
        {
          type: "info",
          category: "documentation",
          message: "All documents verified successfully",
        },
      ],
      lastAnalyzed: "2024-11-20T08:20:00Z",
    },
    "APP-2024-005": {
      id: app.id,
      riskScore: 72,
      completenessScore: 75,
      complianceScore: 78,
      overallScore: 75,
      flags: [
        {
          type: "warning",
          category: "eligibility",
          message: "Startup funding documentation requires verification",
        },
        {
          type: "warning",
          category: "information",
          message: "Business plan details need clarification",
        },
      ],
      lastAnalyzed: "2024-11-20T12:00:00Z",
    },
  };

  // Return mock data if available, otherwise generate default
  return (
    mockScores[app.id] || {
      id: app.id,
      riskScore: Math.floor(Math.random() * 30) + 70,
      completenessScore: Math.floor(Math.random() * 30) + 70,
      complianceScore: Math.floor(Math.random() * 30) + 70,
      overallScore: Math.floor(Math.random() * 30) + 70,
      flags: [
        {
          type: "info",
          category: "documentation",
          message: "Application under AI analysis",
        },
      ],
      lastAnalyzed: new Date().toISOString(),
    }
  );
};

const AIScoringPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const applications = applicationsData.applications as Application[];
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    string | null
  >(null);

  // Check URL for application ID
  useEffect(() => {
    const appId = searchParams.get("id");
    if (appId) {
      setSelectedApplicationId(appId);
    }
  }, [searchParams]);

  // Generate scoring data for all applications
  const applicationsWithScoring = applications.map((app) => ({
    ...app,
    scoring: generateMockScoring(app),
  }));

  // Calculate statistics
  const stats = {
    total: applicationsWithScoring.length,
    highRisk: applicationsWithScoring.filter(
      (app) => app.scoring.overallScore < 70
    ).length,
    mediumRisk: applicationsWithScoring.filter(
      (app) => app.scoring.overallScore >= 70 && app.scoring.overallScore < 85
    ).length,
    lowRisk: applicationsWithScoring.filter(
      (app) => app.scoring.overallScore >= 85
    ).length,
    avgScore:
      applicationsWithScoring.reduce(
        (sum, app) => sum + app.scoring.overallScore,
        0
      ) / applicationsWithScoring.length,
    totalFlags: applicationsWithScoring.reduce(
      (sum, app) => sum + app.scoring.flags.length,
      0
    ),
    errorFlags: applicationsWithScoring.reduce(
      (sum, app) =>
        sum + app.scoring.flags.filter((f) => f.type === "error").length,
      0
    ),
    warningFlags: applicationsWithScoring.reduce(
      (sum, app) =>
        sum + app.scoring.flags.filter((f) => f.type === "warning").length,
      0
    ),
  };

  // Filter applications
  const filteredApplications = applicationsWithScoring.filter((app) => {
    const programmeMatch =
      selectedFilter === "all" ||
      app.programme.toLowerCase() === selectedFilter;

    let riskMatch = true;
    if (riskFilter === "high") {
      riskMatch = app.scoring.overallScore < 70;
    } else if (riskFilter === "medium") {
      riskMatch =
        app.scoring.overallScore >= 70 && app.scoring.overallScore < 85;
    } else if (riskFilter === "low") {
      riskMatch = app.scoring.overallScore >= 85;
    }

    return programmeMatch && riskMatch;
  });

  // Sort by risk score (lowest first)
  const sortedApplications = [...filteredApplications].sort(
    (a, b) => a.scoring.overallScore - b.scoring.overallScore
  );

  const getRiskLevel = (score: number) => {
    if (score >= 85)
      return { label: "Low Risk", color: "text-green-600", bg: "bg-green-50" };
    if (score >= 70)
      return {
        label: "Medium Risk",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
      };
    return { label: "High Risk", color: "text-red-600", bg: "bg-red-50" };
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const handleViewApplication = (appId: string) => {
    setSelectedApplicationId(appId);
    router.push(`/dashboard/admin/ai-scoring?id=${appId}`, { scroll: false });
  };

  const handleBackToList = () => {
    setSelectedApplicationId(null);
    router.push("/dashboard/admin/ai-scoring", { scroll: false });
  };

  // Get selected application details
  const selectedApplication = selectedApplicationId
    ? applicationsWithScoring.find((app) => app.id === selectedApplicationId)
    : null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <DashboardTopBar
          title="AI Applicant Scoring System"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard/admin" },
            { label: "AI Scoring", href: "/dashboard/admin/ai-scoring" },
          ]}
        />
        <div className="flex-1 overflow-y-auto bg-zinc-100">
          <div className="p-8 max-w-[1800px] mx-auto space-y-8">
            {selectedApplication ? (
              // Application Detail View
              <div className="space-y-6">
                {/* Back Button */}
                <Button
                  variant="outline"
                  onClick={handleBackToList}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to List
                </Button>

                {/* Application Header */}
                <Card className="bg-white shadow-sm border-0">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start gap-6">
                        {/* Score Circle */}
                        <div className="shrink-0">
                          <div
                            className={`relative w-24 h-24 rounded-full border-4 ${
                              selectedApplication.scoring.overallScore >= 85
                                ? "border-green-500"
                                : selectedApplication.scoring.overallScore >= 70
                                ? "border-yellow-500"
                                : "border-red-500"
                            } flex items-center justify-center bg-white`}
                          >
                            <div className="text-center">
                              <p
                                className={`text-3xl font-bold ${getScoreColor(
                                  selectedApplication.scoring.overallScore
                                )}`}
                              >
                                {selectedApplication.scoring.overallScore}
                              </p>
                              <p className="text-xs text-gray-500">Score</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <h1 className="text-3xl font-bold text-gray-900">
                              {selectedApplication.applicantName}
                            </h1>
                            <Badge variant="outline">
                              {selectedApplication.id}
                            </Badge>
                            <Badge
                              className={`${
                                getRiskLevel(
                                  selectedApplication.scoring.overallScore
                                ).bg
                              } ${
                                getRiskLevel(
                                  selectedApplication.scoring.overallScore
                                ).color
                              } border-0`}
                            >
                              {
                                getRiskLevel(
                                  selectedApplication.scoring.overallScore
                                ).label
                              }
                            </Badge>
                          </div>
                          <p className="text-lg text-gray-600 mb-4">
                            {selectedApplication.programme} Programme
                            Application
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>
                              Last analyzed:{" "}
                              {new Date(
                                selectedApplication.scoring.lastAnalyzed
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Applicant Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Personal Information
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <User className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Full Name</p>
                              <p className="font-medium text-gray-900">
                                {selectedApplication.applicantName}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <Mail className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Email</p>
                              <p className="font-medium text-gray-900">
                                {selectedApplication.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <Phone className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Phone</p>
                              <p className="font-medium text-gray-900">
                                {selectedApplication.phone}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <Globe className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Nationality
                              </p>
                              <p className="font-medium text-gray-900">
                                {selectedApplication.nationality}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Professional Information
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <Building2 className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Company</p>
                              <p className="font-medium text-gray-900">
                                {selectedApplication.company}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <Briefcase className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Position</p>
                              <p className="font-medium text-gray-900">
                                {selectedApplication.position}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <FileText className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Programme</p>
                              <p className="font-medium text-gray-900">
                                {selectedApplication.programme}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <Calendar className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Submitted Date
                              </p>
                              <p className="font-medium text-gray-900">
                                {new Date(
                                  selectedApplication.submittedDate
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Scoring Analysis */}
                <Card className="bg-white shadow-sm border-0">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Shield className="h-5 w-5 text-purple-600" />
                      AI Scoring Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Score Breakdown */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Score Breakdown
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                          <p className="text-sm text-gray-600 mb-2">
                            Risk Assessment
                          </p>
                          <p
                            className={`text-3xl font-bold ${getScoreColor(
                              selectedApplication.scoring.riskScore
                            )}`}
                          >
                            {selectedApplication.scoring.riskScore}
                            <span className="text-lg text-gray-500">/100</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            Evaluates potential compliance risks
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                          <p className="text-sm text-gray-600 mb-2">
                            Completeness
                          </p>
                          <p
                            className={`text-3xl font-bold ${getScoreColor(
                              selectedApplication.scoring.completenessScore
                            )}`}
                          >
                            {selectedApplication.scoring.completenessScore}
                            <span className="text-lg text-gray-500">/100</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            Checks documentation completeness
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                          <p className="text-sm text-gray-600 mb-2">
                            Compliance
                          </p>
                          <p
                            className={`text-3xl font-bold ${getScoreColor(
                              selectedApplication.scoring.complianceScore
                            )}`}
                          >
                            {selectedApplication.scoring.complianceScore}
                            <span className="text-lg text-gray-500">/100</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            Verifies regulatory compliance
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Flags */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Issues & Flags (
                        {selectedApplication.scoring.flags.length})
                      </h4>
                      {selectedApplication.scoring.flags.length === 0 ? (
                        <div className="text-center py-8">
                          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                          <p className="text-base font-medium text-gray-900">
                            No issues found
                          </p>
                          <p className="text-sm text-gray-600">
                            All checks passed successfully
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {selectedApplication.scoring.flags.map(
                            (flag, idx) => (
                              <div
                                key={idx}
                                className={`flex items-start gap-3 p-4 rounded-lg border-2 ${
                                  flag.type === "error"
                                    ? "bg-red-50 border-red-200"
                                    : flag.type === "warning"
                                    ? "bg-yellow-50 border-yellow-200"
                                    : "bg-blue-50 border-blue-200"
                                }`}
                              >
                                <div className="shrink-0 mt-0.5">
                                  {flag.type === "error" && (
                                    <XCircle className="h-5 w-5 text-red-600" />
                                  )}
                                  {flag.type === "warning" && (
                                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                  )}
                                  {flag.type === "info" && (
                                    <CheckCircle className="h-5 w-5 text-blue-600" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="text-sm font-semibold text-gray-900">
                                      {flag.category.charAt(0).toUpperCase() +
                                        flag.category.slice(1)}
                                    </p>
                                    <Badge
                                      variant="outline"
                                      className={`text-xs ${
                                        flag.type === "error"
                                          ? "border-red-300 text-red-700"
                                          : flag.type === "warning"
                                          ? "border-yellow-300 text-yellow-700"
                                          : "border-blue-300 text-blue-700"
                                      }`}
                                    >
                                      {flag.type.toUpperCase()}
                                    </Badge>
                                  </div>
                                  <p className="text-base text-gray-700">
                                    {flag.message}
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Application Status */}
                <Card className="bg-white shadow-sm border-0">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Application Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Current Status
                        </p>
                        <p className="text-lg font-semibold text-gray-900 capitalize">
                          {selectedApplication.status.replace("-", " ")}
                        </p>
                      </div>
                      <Badge
                        className={`text-base px-4 py-2 ${
                          selectedApplication.status === "approved"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : selectedApplication.status === "rejected"
                            ? "bg-red-100 text-red-800 border-red-200"
                            : selectedApplication.status === "under-review"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-blue-100 text-blue-800 border-blue-200"
                        }`}
                      >
                        {selectedApplication.status
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              // List View
              <>
                {/* Header Section */}
                <div className="bg-purple-600 text-white rounded-xl shadow-sm p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl font-semibold mb-2">
                        AI-Powered Application Analysis
                      </h1>
                      <p className="text-white/90 text-base">
                        Automated risk assessment and compliance scoring for
                        efficient application triage
                      </p>
                    </div>
                    <Button variant="secondary" size="sm" className="gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Refresh Analysis
                    </Button>
                  </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-white border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">
                            Average Score
                          </p>
                          <h3 className="text-3xl font-semibold text-gray-900">
                            {stats.avgScore.toFixed(0)}
                            <span className="text-lg text-gray-500">/100</span>
                          </h3>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-50">
                          <TrendingUp className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">
                            High Risk
                          </p>
                          <h3 className="text-3xl font-semibold text-red-600">
                            {stats.highRisk}
                          </h3>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-50">
                          <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">
                            Medium Risk
                          </p>
                          <h3 className="text-3xl font-semibold text-yellow-600">
                            {stats.mediumRisk}
                          </h3>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-50">
                          <AlertCircle className="h-6 w-6 text-yellow-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">
                            Low Risk
                          </p>
                          <h3 className="text-3xl font-semibold text-green-600">
                            {stats.lowRisk}
                          </h3>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-50">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Flags Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-white border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-50 rounded-lg">
                          <XCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Error Flags</p>
                          <p className="text-2xl font-semibold text-gray-900">
                            {stats.errorFlags}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <AlertTriangle className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Warning Flags</p>
                          <p className="text-2xl font-semibold text-gray-900">
                            {stats.warningFlags}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <Shield className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Total Applications
                          </p>
                          <p className="text-2xl font-semibold text-gray-900">
                            {stats.total}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
                  <div>
                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="bg-white border shadow-sm px-1.5 gap-1">
                        <TabsTrigger
                          value="all"
                          onClick={() => setSelectedFilter("all")}
                        >
                          All Programmes
                        </TabsTrigger>
                        <TabsTrigger
                          value="expats"
                          onClick={() => setSelectedFilter("expats")}
                        >
                          Expats
                        </TabsTrigger>
                        <TabsTrigger
                          value="mtep"
                          onClick={() => setSelectedFilter("mtep")}
                        >
                          MTEP
                        </TabsTrigger>
                        <TabsTrigger
                          value="de rantau"
                          onClick={() => setSelectedFilter("de rantau")}
                        >
                          DE Rantau
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div>
                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="bg-white border shadow-sm px-1.5 gap-1">
                        <TabsTrigger
                          value="all"
                          onClick={() => setRiskFilter("all")}
                        >
                          All Risk Levels
                        </TabsTrigger>
                        <TabsTrigger
                          value="high"
                          onClick={() => setRiskFilter("high")}
                        >
                          High Risk
                        </TabsTrigger>
                        <TabsTrigger
                          value="medium"
                          onClick={() => setRiskFilter("medium")}
                        >
                          Medium Risk
                        </TabsTrigger>
                        <TabsTrigger
                          value="low"
                          onClick={() => setRiskFilter("low")}
                        >
                          Low Risk
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>

                {/* Applications List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Applications ({sortedApplications.length})
                    </h2>
                  </div>

                  {sortedApplications.length === 0 ? (
                    <Card className="bg-white shadow-sm border-0">
                      <CardContent className="p-12 text-center">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2 text-gray-900">
                          No applications found
                        </h3>
                        <p className="text-gray-600">
                          Try adjusting your filters to see more results
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-3">
                      {sortedApplications.map((application) => {
                        const riskLevel = getRiskLevel(
                          application.scoring.overallScore
                        );
                        return (
                          <Card
                            key={application.id}
                            className="bg-white shadow-sm border-0 hover:shadow-md transition-all duration-200"
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start gap-6">
                                {/* Score Circle */}
                                <div className="shrink-0">
                                  <div
                                    className={`relative w-20 h-20 rounded-full border-4 ${
                                      application.scoring.overallScore >= 85
                                        ? "border-green-500"
                                        : application.scoring.overallScore >= 70
                                        ? "border-yellow-500"
                                        : "border-red-500"
                                    } flex items-center justify-center bg-white`}
                                  >
                                    <div className="text-center">
                                      <p
                                        className={`text-2xl font-bold ${getScoreColor(
                                          application.scoring.overallScore
                                        )}`}
                                      >
                                        {application.scoring.overallScore}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        Score
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Application Details */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between mb-3">
                                    <div>
                                      <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                          {application.applicantName}
                                        </h3>
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {application.id}
                                        </Badge>
                                        <Badge
                                          className={`${riskLevel.bg} ${riskLevel.color} border-0`}
                                        >
                                          {riskLevel.label}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1.5">
                                          <Building2 className="h-4 w-4" />
                                          <span>{application.company}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                          <User className="h-4 w-4" />
                                          <span>{application.position}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                          <FileText className="h-4 w-4" />
                                          <span>{application.programme}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Score Breakdown */}
                                  <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="bg-gray-50 rounded-lg p-3">
                                      <p className="text-xs text-gray-600 mb-1">
                                        Risk Assessment
                                      </p>
                                      <p
                                        className={`text-lg font-semibold ${getScoreColor(
                                          application.scoring.riskScore
                                        )}`}
                                      >
                                        {application.scoring.riskScore}/100
                                      </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3">
                                      <p className="text-xs text-gray-600 mb-1">
                                        Completeness
                                      </p>
                                      <p
                                        className={`text-lg font-semibold ${getScoreColor(
                                          application.scoring.completenessScore
                                        )}`}
                                      >
                                        {application.scoring.completenessScore}
                                        /100
                                      </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3">
                                      <p className="text-xs text-gray-600 mb-1">
                                        Compliance
                                      </p>
                                      <p
                                        className={`text-lg font-semibold ${getScoreColor(
                                          application.scoring.complianceScore
                                        )}`}
                                      >
                                        {application.scoring.complianceScore}
                                        /100
                                      </p>
                                    </div>
                                  </div>

                                  {/* Flags */}
                                  {application.scoring.flags.length > 0 && (
                                    <div className="space-y-2 mb-4">
                                      {application.scoring.flags.map(
                                        (flag, idx) => (
                                          <div
                                            key={idx}
                                            className={`flex items-start gap-2 p-3 rounded-lg border ${
                                              flag.type === "error"
                                                ? "bg-red-50 border-red-200"
                                                : flag.type === "warning"
                                                ? "bg-yellow-50 border-yellow-200"
                                                : "bg-blue-50 border-blue-200"
                                            }`}
                                          >
                                            {flag.type === "error" && (
                                              <XCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                                            )}
                                            {flag.type === "warning" && (
                                              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" />
                                            )}
                                            {flag.type === "info" && (
                                              <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                              <p className="text-xs font-medium text-gray-900 mb-0.5">
                                                {flag.category
                                                  .charAt(0)
                                                  .toUpperCase() +
                                                  flag.category.slice(1)}
                                              </p>
                                              <p className="text-sm text-gray-700">
                                                {flag.message}
                                              </p>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}

                                  {/* Action Buttons */}
                                  <div className="flex items-center gap-3">
                                    <Button
                                      size="sm"
                                      className="gap-2"
                                      onClick={() =>
                                        handleViewApplication(application.id)
                                      }
                                    >
                                      <Eye className="h-4 w-4" />
                                      View Application
                                    </Button>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <Clock className="h-3 w-3" />
                                      <span>
                                        Analyzed{" "}
                                        {new Date(
                                          application.scoring.lastAnalyzed
                                        ).toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="text-base font-medium text-blue-900 mb-2">
                          About AI Scoring System
                        </h3>
                        <p className="text-sm text-blue-800 mb-2">
                          The AI Applicant Scoring System analyzes submitted
                          documentation and application data against
                          configurable rules and defined criteria to generate
                          preliminary risk and completeness scores.
                        </p>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>
                            • Flags potential issues for officer attention
                            (missing documents, inconsistencies, anomalies)
                          </li>
                          <li>
                            • Identifies lower-risk, fully documented
                            applications for smoother processing
                          </li>
                          <li>
                            • Supports prioritization and triage while
                            maintaining full human decision-making authority
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AIScoringPage;
