"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginPage() {
  const [isAdminMode, setIsAdminMode] = useState(true);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleToggleMode = () => {
    setIsAdminMode(!isAdminMode);
    if (!isAdminMode) {
      // Switching to admin mode
      setUsername("admin");
      setPassword("admin");
    } else {
      // Switching to user mode
      setUsername("user");
      setPassword("user");
    }
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    const success = login(username, password);
    if (success) {
      // Show success toast
      toast.success("Login successful!", {
        description: "Welcome back! Redirecting to your dashboard...",
      });

      // Route based on username
      if (username === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    } else {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white">
        <div className="flex flex-col items-center space-y-4">
          <Link href="/">
            <Image
              src="/images/mdec-logo.png"
              alt="MDEC Logo"
              width={150}
              height={50}
              className="h-12 w-auto cursor-pointer"
            />
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-sm text-gray-600 mt-2">
              Sign in to access your dashboard
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full cursor-pointer">
            Sign In
          </Button>

          <button
            type="button"
            onClick={handleToggleMode}
            className="w-full text-sm text-blue-600 hover:underline cursor-pointer"
          >
            {isAdminMode ? "Switch to User Login" : "Switch to Admin Login"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
