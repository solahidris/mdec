"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useCallback, useEffect, useRef } from "react";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ui/conversation";
import { Message, MessageContent } from "@/components/ui/message";
import { Response } from "@/components/ui/response";
import { ShimmeringText } from "@/components/ui/shimmering-text";
import { LiveWaveform } from "@/components/ui/live-waveform";
import {
  Mic,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  PhoneOff,
  RotateCcw,
  Volume2,
} from "lucide-react";

// Types
type InterviewState = "setup" | "in-progress" | "completed";
type AgentState = "talking" | "listening" | null;

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface SetupCheck {
  id: string;
  label: string;
  description: string;
  status: "pending" | "checking" | "success" | "error";
  icon: React.ReactNode;
}

// Mock interview questions for demo
const MOCK_INTERVIEW_QUESTIONS = [
  "Hello! Thank you for joining this interview. I'm the AI interviewer for MDEC. Before we begin, could you please introduce yourself and tell me a bit about your background?",
  "Great, thank you for sharing that. Now, can you tell me about your primary motivation for applying to the DE Rantau program? What draws you to working remotely from Malaysia?",
  "Interesting! What specific skills or expertise do you bring that would be valuable for remote work in Malaysia's digital economy?",
  "Can you describe a challenging project you've worked on remotely? How did you handle communication and collaboration with your team?",
  "What are your plans for contributing to the local Malaysian community while participating in the DE Rantau program?",
  "Thank you for your responses. That concludes our interview. We'll review your application and get back to you within 5-7 business days. Do you have any questions for me?",
];

// Mock user responses for demo simulation
const MOCK_USER_RESPONSES = [
  "Hi! I'm a software developer with 5 years of experience in full-stack development. I've been working remotely for the past 3 years with companies across different time zones.",
  "I've always been fascinated by Southeast Asia's growing tech ecosystem. Malaysia's DE Rantau program offers a unique opportunity to experience the culture while continuing my remote career. The infrastructure and digital nomad community here are excellent.",
  "I specialize in React and Node.js development, with experience in cloud architecture using AWS. I also have strong communication skills from working with distributed teams across Europe and North America.",
  "Last year, I led a project to rebuild our company's e-commerce platform while our team was spread across 4 time zones. We used async communication heavily, documented everything, and had daily standups that rotated to accommodate everyone. It was challenging but we delivered on time.",
  "I'm planning to participate in local tech meetups and potentially mentor aspiring developers. I also want to collaborate with Malaysian startups on projects that could benefit the local community.",
  "No questions at this time. Thank you for the opportunity!",
];

const InterviewPage = () => {
  const params = useParams();
  const router = useRouter();
  const applicationId = params.id as string;

  // State
  const [interviewState, setInterviewState] = useState<InterviewState>("setup");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [agentState, setAgentState] = useState<AgentState>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  // Setup checks state
  const [setupChecks, setSetupChecks] = useState<SetupCheck[]>([
    {
      id: "microphone",
      label: "Microphone Access",
      description: "Allow microphone access for voice interview",
      status: "pending",
      icon: <Mic className="h-5 w-5" />,
    },
    {
      id: "audio",
      label: "Audio Output",
      description: "Ensure you can hear the AI interviewer",
      status: "pending",
      icon: <Volume2 className="h-5 w-5" />,
    },
    {
      id: "environment",
      label: "Quiet Environment",
      description: "Find a quiet place with minimal background noise",
      status: "pending",
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
  ]);

  const simulationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (simulationTimeoutRef.current) {
        clearTimeout(simulationTimeoutRef.current);
      }
    };
  }, []);

  // Check individual setup item
  const runSetupCheck = useCallback(async (checkId: string) => {
    setSetupChecks((prev) =>
      prev.map((check) =>
        check.id === checkId ? { ...check, status: "checking" } : check
      )
    );

    // Simulate check delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For demo, all checks succeed
    setSetupChecks((prev) =>
      prev.map((check) =>
        check.id === checkId ? { ...check, status: "success" } : check
      )
    );
  }, []);

  // Run all setup checks
  const runAllChecks = useCallback(async () => {
    for (const check of setupChecks) {
      if (check.status !== "success") {
        await runSetupCheck(check.id);
      }
    }
  }, [setupChecks, runSetupCheck]);

  // Check if all setup checks passed
  const allChecksPassed = setupChecks.every(
    (check) => check.status === "success"
  );

  // Simulate streaming text effect
  const streamText = useCallback(
    (text: string, onComplete: () => void) => {
      setIsStreaming(true);
      setStreamingContent("");
      setAgentState("talking");

      const words = text.split(" ");
      let currentIndex = 0;

      const streamInterval = setInterval(() => {
        if (currentIndex < words.length) {
          setStreamingContent((prev) =>
            prev ? `${prev} ${words[currentIndex]}` : words[currentIndex]
          );
          currentIndex++;
        } else {
          clearInterval(streamInterval);
          setIsStreaming(false);
          setAgentState(null);
          onComplete();
        }
      }, 80);

      return () => clearInterval(streamInterval);
    },
    []
  );

  // Simulate the conversation flow automatically
  const simulateConversationTurn = useCallback(
    (questionIndex: number) => {
      if (questionIndex >= MOCK_INTERVIEW_QUESTIONS.length) {
        setInterviewState("completed");
        return;
      }

      // AI asks question (streaming)
      streamText(MOCK_INTERVIEW_QUESTIONS[questionIndex], () => {
        const assistantMessage: ChatMessage = {
          id: `msg-assistant-${Date.now()}`,
          role: "assistant",
          content: MOCK_INTERVIEW_QUESTIONS[questionIndex],
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setStreamingContent("");

        // Check if this was the last question (thank you message)
        if (questionIndex >= MOCK_INTERVIEW_QUESTIONS.length - 1) {
          // Wait a moment then complete
          setTimeout(() => {
            setInterviewState("completed");
          }, 2000);
          return;
        }

        // Pause before user responds
        setTimeout(() => {
          // User responds (listening state)
          setIsListening(true);
          setAgentState("listening");

          // Simulate user speaking duration (varies by response length)
          const speakingDuration = Math.min(
            2000 + MOCK_USER_RESPONSES[questionIndex].length * 20,
            5000
          );

          simulationTimeoutRef.current = setTimeout(() => {
            setIsListening(false);
            setAgentState(null);

            // Add user message
            const userMessage: ChatMessage = {
              id: `msg-user-${Date.now()}`,
              role: "user",
              content: MOCK_USER_RESPONSES[questionIndex],
            };
            setMessages((prev) => [...prev, userMessage]);

            // Pause before next question
            setTimeout(() => {
              setCurrentQuestionIndex(questionIndex + 1);
              simulateConversationTurn(questionIndex + 1);
            }, 1500);
          }, speakingDuration);
        }, 1000);
      });
    },
    [streamText]
  );

  // Start the interview
  const startInterview = useCallback(() => {
    setInterviewState("in-progress");
    setCurrentQuestionIndex(0);
    setMessages([]);

    // Start the conversation flow
    setTimeout(() => {
      simulateConversationTurn(0);
    }, 500);
  }, [simulateConversationTurn]);

  // End interview early
  const endInterview = useCallback(() => {
    if (simulationTimeoutRef.current) {
      clearTimeout(simulationTimeoutRef.current);
    }
    setIsListening(false);
    setAgentState(null);
    setIsStreaming(false);
    setInterviewState("completed");
  }, []);

  // Reset interview
  const resetInterview = useCallback(() => {
    setInterviewState("setup");
    setMessages([]);
    setCurrentQuestionIndex(0);
    setStreamingContent("");
    setAgentState(null);
    setIsListening(false);
    setIsStreaming(false);
    setSetupChecks((prev) =>
      prev.map((check) => ({ ...check, status: "pending" }))
    );
  }, []);

  // Render setup screen
  const renderSetupScreen = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="border bg-card shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">AI Interview Setup</CardTitle>
          <CardDescription className="text-base">
            Before we begin, let&apos;s make sure everything is ready for your
            interview experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pre-requisites checklist */}
          <div className="space-y-3">
            {setupChecks.map((check) => (
              <div
                key={check.id}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                  check.status === "success"
                    ? "bg-green-50 border-green-200"
                    : check.status === "error"
                    ? "bg-red-50 border-red-200"
                    : check.status === "checking"
                    ? "bg-blue-50 border-blue-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    check.status === "success"
                      ? "bg-green-100 text-green-600"
                      : check.status === "error"
                      ? "bg-red-100 text-red-600"
                      : check.status === "checking"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {check.status === "success" ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : check.status === "error" ? (
                    <AlertCircle className="h-5 w-5" />
                  ) : (
                    check.icon
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{check.label}</p>
                  <p className="text-sm text-gray-500">{check.description}</p>
                </div>
                {check.status === "pending" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => runSetupCheck(check.id)}
                  >
                    Check
                  </Button>
                )}
                {check.status === "checking" && (
                  <ShimmeringText text="Checking..." className="text-sm" />
                )}
              </div>
            ))}
          </div>

          {/* Tips section */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-900 mb-2">
              Interview Tips
            </h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Speak clearly and at a moderate pace</li>
              <li>• Take your time to think before answering</li>
              <li>• The interview typically takes 10-15 minutes</li>
              <li>• You can end the interview at any time</li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={runAllChecks}
              disabled={allChecksPassed}
            >
              Run All Checks
            </Button>
            <Button
              className="flex-1"
              onClick={startInterview}
              disabled={!allChecksPassed}
            >
              Start Interview
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render interview in progress
  const renderInterviewScreen = () => (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <Card className="border bg-card shadow-lg flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <CardHeader className="border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">MDEC AI Interviewer</CardTitle>
              <CardDescription>
                {agentState === "talking" ? (
                  <ShimmeringText text="Speaking..." />
                ) : agentState === "listening" ? (
                  <ShimmeringText text="Listening..." />
                ) : (
                  `Question ${currentQuestionIndex + 1} of ${MOCK_INTERVIEW_QUESTIONS.length}`
                )}
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={endInterview}
              className="gap-2 border-red-300 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
            >
              <PhoneOff className="h-4 w-4" />
              End Interview
            </Button>
          </div>
        </CardHeader>

        {/* Conversation area */}
        <CardContent className="flex-1 overflow-hidden p-0">
          <Conversation className="h-full">
            <ConversationContent className="p-6 space-y-4">
              {messages.length === 0 && !isStreaming ? (
                <div className="flex size-full flex-col items-center justify-center gap-3 p-8 text-center">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">
                      <ShimmeringText text="Starting interview..." />
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Please wait while we connect you with the AI interviewer
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <Message key={message.id} from={message.role}>
                      <MessageContent variant="flat">
                        <Response>{message.content}</Response>
                      </MessageContent>
                    </Message>
                  ))}
                  {isStreaming && streamingContent && (
                    <Message from="assistant">
                      <MessageContent variant="flat">
                        <Response>{streamingContent}</Response>
                      </MessageContent>
                    </Message>
                  )}
                </>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </CardContent>

        {/* Controls */}
        <div className="border-t p-6 flex-shrink-0">
          <div className="max-w-lg mx-auto space-y-4">
            <LiveWaveform
              active={isListening}
              processing={isStreaming}
              height={60}
              barWidth={4}
              barGap={3}
              barRadius={4}
              barColor={isListening ? "#22c55e" : "#3b82f6"}
              fadeEdges
              fadeWidth={32}
              sensitivity={1.2}
              mode="static"
            />
            <p className="text-center text-sm text-muted-foreground">
              {isListening
                ? "You are speaking..."
                : isStreaming
                ? "AI is speaking..."
                : "Waiting..."}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );

  // Render completed screen
  const renderCompletedScreen = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="border bg-card shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Interview Completed!</CardTitle>
          <CardDescription className="text-base">
            Thank you for completing the AI interview. Your responses have been
            recorded and will be reviewed by our team.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h4 className="font-medium text-gray-900">Interview Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Questions Answered</p>
                <p className="font-medium">{MOCK_INTERVIEW_QUESTIONS.length}</p>
              </div>
              <div>
                <p className="text-gray-500">Duration</p>
                <p className="font-medium">~12 minutes</p>
              </div>
              <div>
                <p className="text-gray-500">Application ID</p>
                <p className="font-medium">{applicationId}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="font-medium text-green-600">Submitted</p>
              </div>
            </div>
          </div>

          {/* Next steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">What&apos;s Next?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Your interview will be reviewed within 5-7 business days</li>
              <li>• You&apos;ll receive an email notification with the results</li>
              <li>• You can track your application status in the dashboard</li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={resetInterview}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Interview
            </Button>
            <Button
              className="flex-1"
              onClick={() => router.push(`/dashboard/user/application/${applicationId}`)}
            >
              Back to Application
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <DashboardTopBar
          title="AI Interview"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard/user" },
            {
              label: "Application",
              href: `/dashboard/user/application/${applicationId}`,
            },
            { label: "Interview", href: "#" },
          ]}
        />
        <div className="flex-1 overflow-y-auto bg-muted/50">
          <div className="p-8 h-full">
            {interviewState === "setup" && renderSetupScreen()}
            {interviewState === "in-progress" && renderInterviewScreen()}
            {interviewState === "completed" && renderCompletedScreen()}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default InterviewPage;
