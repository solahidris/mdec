"use client";

import { AuthProtectedPage } from "@/components/auth/AuthProtectedPage";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProtectedPage>{children}</AuthProtectedPage>;
}

