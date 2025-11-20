"use client";

import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
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
          <div>
            <Link href="/contact">
              <Button
                variant="outline"
                className="hidden md:flex items-center gap-2 cursor-pointer"
              >
                <Globe className="h-4 w-4" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
