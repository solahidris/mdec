"use client";

import { Button } from "@/components/ui/button";
import { Globe, LogIn, LogOut, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Logout successful!", {
      description: "You have been logged out successfully.",
    });
    router.push("/");
  };

  return (
    <header
      className="border-b bg-white/80 backdrop-blur-lg md:sticky md:top-0 z-50 shadow-sm"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/images/mdec-logo.png"
              alt="MDEC Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/contact">
              <Button
                variant="outline"
                className="hidden md:flex items-center gap-2 cursor-pointer"
              >
                <Globe className="h-4 w-4" />
                Contact Us
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  href={user?.username === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                >
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button className="flex items-center gap-2 cursor-pointer">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
