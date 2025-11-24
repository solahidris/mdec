"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import {
  Send,
  Building2,
  CheckCircle,
  XCircle,
  ArrowRight,
  FileText,
  UserCheck,
  FileCheck,
  ClipboardCheck,
  CreditCard,
  Shield,
  FileSignature,
  BadgeCheck,
  PlayCircle,
} from "lucide-react";

const FlowChartPage = () => {
  // Phase A: Company Registration and Assessment (Expats only)
  const phaseA = [
    {
      id: "A1",
      title: "Company Registration",
      description: "Register company (Not applicable for MTEP and DE Rantau)",
      icon: Building2,
      color: "bg-gray-800",
      note: "Expats Programme Only",
    },
    {
      id: "A2",
      title: "Company Assessment",
      description: "Assessor and verifier review company details",
      icon: ClipboardCheck,
      color: "bg-gray-700",
    },
    {
      id: "A3",
      title: "Approval (via meeting)",
      description: "Approval committee reviews and decides",
      icon: UserCheck,
      color: "bg-red-600",
    },
    {
      id: "A4",
      title: "APL Verification",
      description: "Verify Approved Professional List status",
      icon: BadgeCheck,
      color: "bg-gray-700",
    },
    {
      id: "A5",
      title: "Company Acceptance",
      description: "Sign Expats Service Agreement",
      icon: FileSignature,
      color: "bg-gray-800",
    },
  ];

  // Phase B: Application and Assessment
  const phaseB = [
    {
      id: "B1",
      title: "Submit Application",
      description: "Applicant submits application with required documents",
      icon: Send,
      color: "bg-gray-800",
    },
    {
      id: "B2",
      title: "Make Payment",
      description: "Pay MDEC Fees",
      icon: CreditCard,
      color: "bg-gray-700",
    },
    {
      id: "B3",
      title: "Assessment",
      description: "Assessor and verifier review application",
      icon: ClipboardCheck,
      color: "bg-gray-700",
    },
    {
      id: "B4",
      title: "Approval (via meeting)",
      description: "Approval committee makes decision",
      icon: UserCheck,
      color: "bg-red-600",
    },
  ];

  // Phase C: Programme-Specific Processing
  const phaseC = {
    deRantau: [
      {
        id: "C1",
        title: "JIM Approval",
        description: "Immigration Department approval with salary verification, payment status, amount, and duration",
        icon: BadgeCheck,
        color: "bg-red-600",
      },
      {
        id: "C2",
        title: "Stamp Personal Bond (JIM Form)",
        description: "Personal bond stamping process",
        icon: FileCheck,
        color: "bg-gray-700",
      },
    ],
    mdeckSponsor: {
      id: "C3",
      title: "MDEC Sponsor Personal Bond",
      description: "MDEC sponsors the personal bond",
      icon: Shield,
      color: "bg-red-600",
    },
    regularPath: {
      id: "C4",
      title: "Sign Agreement (Personal Bond)",
      description: "CEO signs the personal bond agreement",
      icon: FileSignature,
      color: "bg-gray-800",
    },
  };

  // Phase D: Final Processing
  const phaseD = [
    {
      id: "D1",
      title: "Issue Approval Letter",
      description: "Official approval letter issued",
      icon: FileText,
      color: "bg-gray-800",
    },
    {
      id: "D2",
      title: "Company Submission (Endorsement)",
      description: "Company submits endorsement",
      icon: Building2,
      color: "bg-gray-700",
    },
    {
      id: "D3",
      title: "Process Endorsement",
      description: "Assessor processes the endorsement",
      icon: ClipboardCheck,
      color: "bg-gray-700",
    },
    {
      id: "D4",
      title: "Make Payment",
      description: "Pay JIM Fees, MDEC Fees, and Personal Bond (if MDEC sponsor)",
      icon: CreditCard,
      color: "bg-gray-700",
    },
    {
      id: "D5",
      title: "ePass Issuance",
      description: "Electronic pass is issued",
      icon: BadgeCheck,
      color: "bg-gray-800",
    },
    {
      id: "D6",
      title: "ePass Verification",
      description: "Verify and complete the ePass",
      icon: CheckCircle,
      color: "bg-gray-800",
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <DashboardTopBar
          title="Expatriate Pass Process Flow"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard/admin" },
            { label: "Flow Chart" },
          ]}
        />
        <div className="flex-1 overflow-y-auto bg-zinc-100">
          <div className="p-8 max-w-[1800px] mx-auto space-y-8">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg">
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2 text-white">
                      Expatriate Pass Process Flow
                    </h1>
                    <p className="text-gray-300 text-lg font-light">
                      Complete workflow from company registration to ePass issuance
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <PlayCircle className="h-16 w-16 text-gray-400 stroke-[1.5]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <Card className="p-6 bg-gray-50 border-gray-200">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Notes</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• The submission application shall differ according to the product type</li>
                    <li>• This process is for new and renewal applications</li>
                    <li>• Company Registration phase is only applicable for <strong>Expats Programme</strong></li>
                    <li>• DE Rantau applications require additional JIM approval and personal bond</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Reference Flowchart Image */}
            <Card className="p-6 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reference Flowchart</h3>
              <div className="overflow-x-auto">
                <img 
                  src="/images/flowchart-expected.png" 
                  alt="Expatriate Pass Process Flow Reference" 
                  className="w-full h-auto border border-gray-200 rounded-lg"
                />
              </div>
            </Card>

            {/* All Phases Combined View */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
                  All Phases
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Complete Process Flow (All Programmes)
                </h2>
                <span className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                  Continuous View
                </span>
              </div>

              <div className="overflow-x-auto pb-4">
                <div className="flex items-center gap-4 min-w-max">
                  {/* Phase A - Company Registration */}
                  {phaseA.map((stage, index) => (
                    <div key={stage.id} className="flex items-center gap-4">
                      <Card className="p-5 bg-white shadow-sm hover:shadow-md transition-all w-80 h-44 flex-shrink-0">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start gap-3">
                            <div className={`p-3 rounded-xl ${stage.color} flex-shrink-0`}>
                              <stage.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <span className="text-xs font-semibold text-gray-400 block mb-1">
                                {stage.id}
                              </span>
                              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                                {stage.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{stage.description}</p>
                          {stage.note && (
                            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded inline-block w-fit">
                              {stage.note}
                            </span>
                          )}
                        </div>
                      </Card>
                      <ArrowRight className="h-8 w-8 text-gray-400 flex-shrink-0" />
                    </div>
                  ))}

                  {/* Phase B - Application Submission */}
                  {phaseB.map((stage, index) => (
                    <div key={stage.id} className="flex items-center gap-4">
                      <Card className="p-5 bg-white shadow-sm hover:shadow-md transition-all w-80 h-44 flex-shrink-0">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start gap-3">
                            <div className={`p-3 rounded-xl ${stage.color} flex-shrink-0`}>
                              <stage.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <span className="text-xs font-semibold text-gray-400 block mb-1">
                                {stage.id}
                              </span>
                              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                                {stage.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{stage.description}</p>
                        </div>
                      </Card>
                      <ArrowRight className="h-8 w-8 text-gray-400 flex-shrink-0" />
                    </div>
                  ))}

                  {/* Phase C - Programme Specific (Regular Path) */}
                  <div className="flex items-center gap-4">
                    <Card className="p-5 bg-white shadow-sm hover:shadow-md transition-all w-80 h-44 flex-shrink-0 border-2 border-gray-300">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                          <div className={`p-3 rounded-xl ${phaseC.regularPath.color} flex-shrink-0`}>
                            <phaseC.regularPath.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs font-semibold text-gray-400 block mb-1">
                              {phaseC.regularPath.id}
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                              {phaseC.regularPath.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{phaseC.regularPath.description}</p>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded inline-block w-fit">
                          Regular / MDEC Sponsor
                        </span>
                      </div>
                    </Card>
                    <ArrowRight className="h-8 w-8 text-gray-400 flex-shrink-0" />
                  </div>

                  {/* Phase D - Final Processing */}
                  {phaseD.map((stage, index) => (
                    <div key={stage.id} className="flex items-center gap-4">
                      <Card className="p-5 bg-white shadow-sm hover:shadow-md transition-all w-80 h-44 flex-shrink-0">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start gap-3">
                            <div className={`p-3 rounded-xl ${stage.color} flex-shrink-0`}>
                              <stage.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <span className="text-xs font-semibold text-gray-400 block mb-1">
                                {stage.id}
                              </span>
                              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                                {stage.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{stage.description}</p>
                        </div>
                      </Card>
                      {index < phaseD.length - 1 && (
                        <ArrowRight className="h-8 w-8 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                  ))}

                  {/* Success State */}
                  <ArrowRight className="h-8 w-8 text-gray-400 flex-shrink-0" />
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-6 rounded-xl shadow-lg flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-8 w-8" />
                      <div>
                        <p className="text-lg font-bold">Process Complete</p>
                        <p className="text-sm text-gray-300">ePass issued successfully</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase A: Company Registration (Expats Only) */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold">
                  Phase A
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Company Registration & Assessment
                </h2>
                <span className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium">
                  Expats Programme Only
                </span>
              </div>

              <div className="overflow-x-auto pb-4">
                <div className="flex items-center gap-4 min-w-max">
                  {phaseA.map((stage, index) => (
                    <div key={stage.id} className="flex items-center gap-4">
                      <Card className="p-5 bg-white shadow-sm hover:shadow-md transition-all w-80 h-44 flex-shrink-0">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start gap-3">
                            <div className={`p-3 rounded-xl ${stage.color} flex-shrink-0`}>
                              <stage.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <span className="text-xs font-semibold text-gray-400 block mb-1">
                                {stage.id}
                              </span>
                              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                                {stage.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{stage.description}</p>
                          {stage.note && (
                            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded inline-block w-fit">
                              {stage.note}
                            </span>
                          )}
                        </div>
                      </Card>
                      {index < phaseA.length - 1 && (
                        <ArrowRight className="h-8 w-8 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phase B: Application Submission and Assessment */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold">
                  Phase B
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Application Submission & Assessment
                </h2>
                <span className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium">
                  All Programmes
                </span>
              </div>

              <div className="overflow-x-auto pb-4">
                <div className="flex items-center gap-4 min-w-max">
                  {phaseB.map((stage, index) => (
                    <div key={stage.id} className="flex items-center gap-4">
                      <Card className="p-5 bg-white shadow-sm hover:shadow-md transition-all w-80 h-44 flex-shrink-0">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start gap-3">
                            <div className={`p-3 rounded-xl ${stage.color} flex-shrink-0`}>
                              <stage.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <span className="text-xs font-semibold text-gray-400 block mb-1">
                                {stage.id}
                              </span>
                              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                                {stage.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{stage.description}</p>
                        </div>
                      </Card>
                      {index < phaseB.length - 1 && (
                        <ArrowRight className="h-8 w-8 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phase C: Programme-Specific Processing */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold">
                  Phase C
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Programme-Specific Processing
                </h2>
              </div>

              {/* Decision Point */}
              <div className="text-center py-4">
                <div className="inline-block">
                  <div className="bg-red-50 border-2 border-red-300 px-6 py-3 rounded-lg">
                    <p className="text-sm font-semibold text-red-700">Decision Point</p>
                    <p className="text-lg font-bold text-red-900">Is this DE Rantau?</p>
                  </div>
                </div>
              </div>

              {/* DE Rantau Path */}
              <div className="space-y-4">
                <div className="bg-gray-100 border-2 border-gray-400 rounded-lg p-3">
                  <p className="text-center font-bold text-gray-900">YES - DE Rantau Path</p>
                </div>
                <div className="overflow-x-auto pb-4">
                  <div className="flex items-start gap-4 min-w-max">
                    {/* DE Rantau Steps */}
                    {phaseC.deRantau.map((stage, index) => (
                      <div key={stage.id} className="flex items-center gap-4">
                        <Card className="p-5 bg-white shadow-sm hover:shadow-md transition-all w-80 h-44 flex-shrink-0 border-2 border-gray-300">
                          <div className="flex flex-col gap-3">
                            <div className="flex items-start gap-3">
                              <div className={`p-3 rounded-xl ${stage.color} flex-shrink-0`}>
                                <stage.icon className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <span className="text-xs font-semibold text-gray-400 block mb-1">
                                  {stage.id}
                                </span>
                                <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                                  {stage.title}
                                </h3>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{stage.description}</p>
                          </div>
                        </Card>
                        {index < phaseC.deRantau.length - 1 && (
                          <ArrowRight className="h-8 w-8 text-gray-400 flex-shrink-0" />
                        )}
                      </div>
                    ))}

                    {/* Another Decision */}
                    <div className="flex items-center gap-4">
                    <ArrowRight className="h-8 w-8 text-gray-400 flex-shrink-0" />
                      <div className="bg-red-50 border-2 border-red-300 px-4 rounded-lg text-sm w-48 h-44 flex-shrink-0 flex items-center justify-center">
                        <p className="font-semibold text-red-700 text-center">MDEC Sponsor<br/>Personal Bond?</p>
                      </div>
                      <ArrowRight className="h-8 w-8 text-red-400 flex-shrink-0" />
                      <Card className="p-5 bg-white shadow-sm border-2 border-red-200 w-80 h-44 flex-shrink-0">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start gap-3">
                            <div className={`p-3 rounded-xl ${phaseC.mdeckSponsor.color} flex-shrink-0`}>
                              <phaseC.mdeckSponsor.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <span className="text-xs font-semibold text-gray-400 block mb-1">
                                {phaseC.mdeckSponsor.id}
                              </span>
                              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                                {phaseC.mdeckSponsor.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{phaseC.mdeckSponsor.description}</p>
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded inline-block w-fit">
                            NO - MDEC Sponsors
                          </span>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>

              {/* Regular Path */}
              <div className="space-y-4">
                <div className="bg-gray-100 border-2 border-gray-400 rounded-lg p-3">
                  <p className="text-center font-bold text-gray-900">NO - Regular Path (Expats/MTEP)</p>
                </div>
                <div className="overflow-x-auto pb-4">
                  <div className="flex items-center gap-4 min-w-max">
                    <Card className="p-5 bg-white shadow-sm hover:shadow-md transition-all w-80 h-44 flex-shrink-0 border-2 border-gray-300">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                          <div className={`p-3 rounded-xl ${phaseC.regularPath.color} flex-shrink-0`}>
                            <phaseC.regularPath.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs font-semibold text-gray-400 block mb-1">
                              {phaseC.regularPath.id}
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                              {phaseC.regularPath.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{phaseC.regularPath.description}</p>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded inline-block w-fit">
                          CEO Signature Required
                        </span>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase D: Final Processing and ePass Issuance */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold">
                  Phase D
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Final Processing & ePass Issuance
                </h2>
                <span className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium">
                  All Programmes
                </span>
              </div>

              <div className="overflow-x-auto pb-4">
                <div className="flex items-center gap-4 min-w-max">
                  {phaseD.map((stage, index) => (
                    <div key={stage.id} className="flex items-center gap-4">
                      <Card className="p-5 bg-white shadow-sm hover:shadow-md transition-all w-80 h-44 flex-shrink-0">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start gap-3">
                            <div className={`p-3 rounded-xl ${stage.color} flex-shrink-0`}>
                              <stage.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <span className="text-xs font-semibold text-gray-400 block mb-1">
                                {stage.id}
                              </span>
                              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                                {stage.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{stage.description}</p>
                        </div>
                      </Card>
                      {index < phaseD.length - 1 && (
                        <ArrowRight className="h-8 w-8 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                  ))}

                  {/* Success State */}
                  <ArrowRight className="h-8 w-8 text-gray-400 flex-shrink-0" />
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-6 rounded-xl shadow-lg flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-8 w-8" />
                      <div>
                        <p className="text-lg font-bold">Process Complete</p>
                        <p className="text-sm text-gray-300">ePass issued successfully</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Programme Comparison */}
            <Card className="p-6 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Programme Differences
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Stage</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Expats</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">MTEP</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">DE Rantau</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900">Company Registration</td>
                      <td className="px-4 py-3"><CheckCircle className="h-5 w-5 text-gray-800" /></td>
                      <td className="px-4 py-3"><XCircle className="h-5 w-5 text-gray-300" /></td>
                      <td className="px-4 py-3"><XCircle className="h-5 w-5 text-gray-300" /></td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="px-4 py-3 font-medium text-gray-900">JIM Approval</td>
                      <td className="px-4 py-3"><XCircle className="h-5 w-5 text-gray-300" /></td>
                      <td className="px-4 py-3"><XCircle className="h-5 w-5 text-gray-300" /></td>
                      <td className="px-4 py-3"><CheckCircle className="h-5 w-5 text-red-600" /></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900">Personal Bond</td>
                      <td className="px-4 py-3"><CheckCircle className="h-5 w-5 text-gray-800" /></td>
                      <td className="px-4 py-3"><CheckCircle className="h-5 w-5 text-gray-800" /></td>
                      <td className="px-4 py-3"><CheckCircle className="h-5 w-5 text-gray-800" /></td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="px-4 py-3 font-medium text-gray-900">MDEC Sponsorship Option</td>
                      <td className="px-4 py-3"><XCircle className="h-5 w-5 text-gray-300" /></td>
                      <td className="px-4 py-3"><XCircle className="h-5 w-5 text-gray-300" /></td>
                      <td className="px-4 py-3"><CheckCircle className="h-5 w-5 text-red-600" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default FlowChartPage;

