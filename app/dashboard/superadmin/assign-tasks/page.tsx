"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Target,
  Clock,
  AlertCircle,
  CheckCircle,
  Users,
  Zap,
  Send,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Import the mock data
import officersData from "@/lib/data-sample/officers-data.json";

const AssignTasksPage = () => {
  const { officers, tasks } = officersData;
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [assignedOfficer, setAssignedOfficer] = useState<string>("");
  const [bulkAssignMode, setBulkAssignMode] = useState(false);

  const activeOfficers = officers.filter((o) => o.status === "active");
  const unassignedTasks = tasks.filter((t) => t.status === "unassigned");

  const handleTaskSelect = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === unassignedTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(unassignedTasks.map((t) => t.id));
    }
  };

  const handleAssign = () => {
    if (selectedTasks.length === 0) {
      toast.error("Please select at least one task");
      return;
    }
    if (!assignedOfficer) {
      toast.error("Please select an officer");
      return;
    }

    const officer = officers.find((o) => o.id === assignedOfficer);
    toast.success(`Successfully assigned ${selectedTasks.length} task(s) to ${officer?.name}!`);
    
    // Reset selections
    setSelectedTasks([]);
    setAssignedOfficer("");
  };

  const handleBulkAutoAssign = () => {
    if (selectedTasks.length === 0) {
      toast.error("Please select tasks to auto-assign");
      return;
    }

    // Auto-assign based on workload and efficiency
    const sortedOfficers = [...activeOfficers].sort((a, b) => {
      // Sort by efficiency (higher is better) and pending tasks (lower is better)
      const scoreA = a.efficiency - a.pendingTasks * 2;
      const scoreB = b.efficiency - b.pendingTasks * 2;
      return scoreB - scoreA;
    });

    toast.success(
      `Automatically assigned ${selectedTasks.length} task(s) based on workload and efficiency!`,
      {
        description: `Tasks distributed among ${sortedOfficers.slice(0, 3).map(o => o.name.split(' ')[2]).join(', ')}`,
      }
    );

    setSelectedTasks([]);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <DashboardTopBar
          title="Task Assignment"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Super Admin", href: "/dashboard/superadmin" },
            { label: "Assign Tasks" },
          ]}
        />
        <div className="flex-1 overflow-y-auto bg-zinc-100">
          <div className="p-8 max-w-[1800px] mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Task Assignment</h1>
                <p className="text-gray-600 mt-2">
                  Assign tasks to officers manually or use bulk auto-assignment
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant={bulkAssignMode ? "default" : "outline"}
                  onClick={() => setBulkAssignMode(!bulkAssignMode)}
                  className="gap-2"
                >
                  <Zap className="h-4 w-4" />
                  {bulkAssignMode ? "Bulk Mode Active" : "Enable Bulk Mode"}
                </Button>
              </div>
            </div>

            {/* Assignment Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tasks List */}
              <div className="lg:col-span-2">
                <Card className="p-6 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Unassigned Tasks ({unassignedTasks.length})
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSelectAll}
                    >
                      {selectedTasks.length === unassignedTasks.length
                        ? "Deselect All"
                        : "Select All"}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {unassignedTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-4 border rounded-lg transition-all ${
                          selectedTasks.includes(task.id)
                            ? "border-black bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={selectedTasks.includes(task.id)}
                            onCheckedChange={() => handleTaskSelect(task.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  {task.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  {task.description}
                                </p>
                              </div>
                              <Badge
                                className={getPriorityColor(task.priority)}
                                variant="outline"
                              >
                                {task.priority}
                              </Badge>
                            </div>

                            <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-3">
                              <div className="flex items-center gap-1">
                                <Target className="h-4 w-4" />
                                <span>{task.programme}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>Due: {task.dueDate}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" />
                                <span>{task.estimatedHours}h estimated</span>
                              </div>
                              {task.applicationCount > 0 && (
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  <span>{task.applicationCount} applications</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Assignment Actions */}
              <div className="space-y-6">
                {/* Manual Assignment */}
                <Card className="p-6 bg-white shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Manual Assignment
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2">Selected Tasks</Label>
                      <div className="text-2xl font-bold text-black">
                        {selectedTasks.length}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="officer-select" className="mb-2">
                        Assign to Officer
                      </Label>
                      <Select value={assignedOfficer} onValueChange={setAssignedOfficer}>
                        <SelectTrigger id="officer-select">
                          <SelectValue placeholder="Select an officer" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {activeOfficers.map((officer) => (
                            <SelectItem key={officer.id} value={officer.id}>
                              <div className="flex items-center justify-between w-full">
                                <span>{officer.name}</span>
                                <span className="ml-4 text-xs text-gray-500">
                                  {officer.pendingTasks} pending
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={handleAssign}
                      className="w-full gap-2"
                      disabled={selectedTasks.length === 0 || !assignedOfficer}
                    >
                      <Send className="h-4 w-4" />
                      Assign Tasks
                    </Button>
                  </div>
                </Card>

                {/* Bulk Auto-Assignment */}
                {bulkAssignMode && (
                  <Card className="p-6 bg-gray-50 border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="h-5 w-5 text-black" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Bulk Auto-Assignment
                      </h3>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                      Automatically distribute selected tasks based on officer workload
                      and efficiency scores.
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Algorithm:</span>
                        <span className="font-medium">Smart Distribution</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Factors:</span>
                        <span className="font-medium">Workload + Efficiency</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleBulkAutoAssign}
                      className="w-full gap-2 bg-black hover:bg-gray-800"
                      disabled={selectedTasks.length === 0}
                    >
                      <Zap className="h-4 w-4" />
                      Auto-Assign {selectedTasks.length} Task(s)
                    </Button>
                  </Card>
                )}

                {/* Active Officers Overview */}
                <Card className="p-6 bg-white shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Active Officers ({activeOfficers.length})
                  </h3>

                  <div className="space-y-3">
                    {activeOfficers.map((officer) => (
                      <div
                        key={officer.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {officer.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {officer.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {officer.pendingTasks} pending
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-black">
                            {officer.efficiency}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AssignTasksPage;

