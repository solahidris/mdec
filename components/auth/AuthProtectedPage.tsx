"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface AuthProtectedPageProps {
  children: React.ReactNode;
}

export function AuthProtectedPage({ children }: AuthProtectedPageProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <>
      {children}
      {!isAuthenticated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-300">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Authentication Required
                </h2>
                <p className="text-gray-600">
                  You need to be logged in to access this application form.
                  Please log in to continue or return to the homepage.
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <Button
                  onClick={() => router.push("/login")}
                  className="w-full cursor-pointer"
                  size="lg"
                >
                  Go to Login
                </Button>
                <Button
                  onClick={() => router.push("/")}
                  variant="outline"
                  className="w-full cursor-pointer"
                  size="lg"
                >
                  Go Back Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

