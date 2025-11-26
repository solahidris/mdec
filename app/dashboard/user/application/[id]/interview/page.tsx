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
import { Orb } from "@/components/ui/orb";
import {
  Mic,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  PhoneOff,
  RotateCcw,
  Volume2,
  Camera,
  Video,
  VideoOff,
  MicOff,
  MessageSquare,
  X,
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
  const [userStreamingContent, setUserStreamingContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  // Video call controls
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);

  // Video refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Setup checks state
  const [setupChecks, setSetupChecks] = useState<SetupCheck[]>([
    {
      id: "camera",
      label: "Camera Access",
      description: "Allow camera access for video interview",
      status: "pending",
      icon: <Camera className="h-5 w-5" />,
    },
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
      stopWebcam();
    };
  }, []);

  // Re-attach stream when video element changes (e.g. switching views)
  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [interviewState]); // Re-run when interview state changes (view switch)

  // Initialize webcam
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      return true;
    } catch (err) {
      console.error("Error accessing webcam:", err);
      return false;
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  // Check individual setup item
  const runSetupCheck = useCallback(async (checkId: string) => {
    setSetupChecks((prev) =>
      prev.map((check) =>
        check.id === checkId ? { ...check, status: "checking" } : check
      )
    );

    // Special handling for camera/mic
    if (checkId === "camera" || checkId === "microphone") {
      const success = await startWebcam();
      if (!success) {
        setSetupChecks((prev) =>
          prev.map((check) =>
            check.id === checkId ? { ...check, status: "error" } : check
          )
        );
        return;
      }
    }

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

  // Simulate streaming text effect for AI
  const streamText = useCallback((text: string, onComplete: () => void) => {
    setIsStreaming(true);
    setStreamingContent("");
    setAgentState("talking");

    const words = text.split(" ");
    let currentIndex = 0;

    const streamInterval = setInterval(() => {
      if (currentIndex < words.length) {
        const currentWord = words[currentIndex];
        if (currentWord) {
          setStreamingContent((prev) =>
            prev ? `${prev} ${currentWord}` : currentWord
          );
        }
        currentIndex++;
      } else {
        clearInterval(streamInterval);
        setAgentState(null);

        // Keep text visible for a moment before proceeding
        simulationTimeoutRef.current = setTimeout(() => {
          setIsStreaming(false);
          onComplete();
        }, 2000);
      }
    }, 150); // Slowed down from 80ms to 150ms

    return () => clearInterval(streamInterval);
  }, []);

  // Simulate streaming text effect for User
  const streamUserText = useCallback(
    (text: string, duration: number, onComplete: () => void) => {
      setUserStreamingContent("");

      const words = text.split(" ");
      const intervalTime = duration / words.length;
      let currentIndex = 0;

      const streamInterval = setInterval(() => {
        if (currentIndex < words.length) {
          const currentWord = words[currentIndex];
          if (currentWord) {
            setUserStreamingContent((prev) =>
              prev ? `${prev} ${currentWord}` : currentWord
            );
          }
          currentIndex++;
        } else {
          clearInterval(streamInterval);
          onComplete();
        }
      }, intervalTime);

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
          }, 3000);
          return;
        }

        // Pause before user responds (Transition delay)
        setTimeout(() => {
          // User responds (listening state)
          setIsListening(true);
          setAgentState("listening");

          // Simulate user speaking duration (varies by response length)
          const speakingDuration = Math.min(
            3000 + MOCK_USER_RESPONSES[questionIndex].length * 30, // Increased base duration and per-char duration
            8000 // Increased max duration
          );

          // Stream user text simulation
          // We run this for speakingDuration
          const stopStream = streamUserText(
            MOCK_USER_RESPONSES[questionIndex],
            speakingDuration,
            () => {
              // This runs when user finishes speaking
            }
          );

          // We wait for speakingDuration + BUFFER to ensure stream finishes and user can read it
          simulationTimeoutRef.current = setTimeout(() => {
            setIsListening(false);
            setAgentState(null);
            setUserStreamingContent("");

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
            }, 2000); // Increased pause before next question
          }, speakingDuration + 1000); // Added 1s buffer so text doesn't cut off
        }, 2500); // Increased transition delay from 1500 to 2500
      });
    },
    [streamText, streamUserText]
  );

  // Start the interview
  const startInterview = useCallback(() => {
    setInterviewState("in-progress");
    setCurrentQuestionIndex(0);
    setMessages([]);

    // Start the conversation flow
    setTimeout(() => {
      simulateConversationTurn(0);
    }, 1000);
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
    stopWebcam();
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
    stopWebcam();
  }, []);

  // Render setup screen
  const renderSetupScreen = () => (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
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

      {/* Video Preview */}
      <Card className="border bg-card shadow-lg flex flex-col">
        <CardHeader>
          <CardTitle>Camera Preview</CardTitle>
          <CardDescription>Check your camera and lighting</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center p-6 rounded-b-lg">
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {!streamRef.current && (
              <div className="absolute inset-0 flex items-center justify-center text-white/50">
                <p>Camera is off</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render interview in progress
  const renderInterviewScreen = () => (
    <div className="h-full flex flex-col lg:flex-row gap-4">
      {/* Main Video Area */}
      <div className="flex-1 flex flex-col gap-4">
        <Card className="flex-1 border bg-black shadow-lg overflow-hidden relative">
          {/* AI Interviewer Visualization */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pb-48">
            <div className="w-64 h-64 flex items-center justify-center mb-8">
              <Orb colors={["#3b82f6", "#8b5cf6"]} />
            </div>
            <div className="absolute bottom-32 text-center space-y-4 max-w-3xl px-8 z-10">
              {isStreaming ? (
                <p className="text-2xl font-medium text-white leading-relaxed drop-shadow-md">
                  {streamingContent}
                </p>
              ) : (
                <div className="space-y-4">
                  <p className="text-xl text-white/60 drop-shadow-md animate-pulse">
                    {agentState === "listening"
                      ? "Listening..."
                      : "Thinking..."}
                  </p>
                  {agentState === "listening" && userStreamingContent && (
                    <p className="text-2xl font-medium text-white leading-relaxed drop-shadow-md">
                      &ldquo;{userStreamingContent}&rdquo;
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* User Self View (PIP) */}
          <div className="absolute bottom-6 right-6 w-64 aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-white/10 z-20 group">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${
                !isCameraOn ? "hidden" : ""
              }`}
            />
            {!isCameraOn && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white/50">
                <VideoOff className="h-8 w-8" />
              </div>
            )}
            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 rounded text-xs text-white font-medium">
              You
            </div>
          </div>

          {/* Controls Overlay */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 z-20">
            <Button
              variant={isMicOn ? "secondary" : "destructive"}
              size="icon"
              className="rounded-full h-12 w-12"
              onClick={() => setIsMicOn(!isMicOn)}
            >
              {isMicOn ? (
                <Mic className="h-5 w-5" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant={isCameraOn ? "secondary" : "destructive"}
              size="icon"
              className="rounded-full h-12 w-12"
              onClick={() => setIsCameraOn(!isCameraOn)}
            >
              {isCameraOn ? (
                <Video className="h-5 w-5" />
              ) : (
                <VideoOff className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="destructive"
              size="icon"
              className="rounded-full h-12 w-12 bg-red-600 hover:bg-red-700 text-white"
              onClick={endInterview}
            >
              <PhoneOff className="h-5 w-5" />
            </Button>

            <div className="w-px h-8 bg-white/20 mx-2" />

            <Button
              variant={showTranscript ? "secondary" : "ghost"}
              size="icon"
              className="rounded-full h-12 w-12 text-white hover:bg-white/20"
              onClick={() => setShowTranscript(!showTranscript)}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Transcript Sidebar (Collapsible) */}
      {showTranscript && (
        <Card className="w-96 border bg-card shadow-lg flex flex-col h-full animate-in slide-in-from-right duration-300">
          <CardHeader className="flex-row items-center justify-between py-4 border-b">
            <CardTitle className="text-base">Transcript</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowTranscript(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <Conversation className="h-full">
              <ConversationContent className="p-4 space-y-4">
                {messages.map((message) => (
                  <Message key={message.id} from={message.role}>
                    <MessageContent variant="flat" className="text-sm">
                      <Response>{message.content}</Response>
                    </MessageContent>
                  </Message>
                ))}
                {isStreaming && streamingContent && (
                  <Message from="assistant">
                    <MessageContent variant="flat" className="text-sm">
                      <Response>{streamingContent}</Response>
                    </MessageContent>
                  </Message>
                )}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>
          </CardContent>
        </Card>
      )}
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
            <h4 className="font-medium text-blue-900 mb-2">
              What&apos;s Next?
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • Your interview will be reviewed within 5-7 business days
              </li>
              <li>
                • You&apos;ll receive an email notification with the results
              </li>
              <li>• You can track your application status in the dashboard</li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={resetInterview}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Interview
            </Button>
            <Button
              className="flex-1"
              onClick={() =>
                router.push(`/dashboard/user/application/${applicationId}`)
              }
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
