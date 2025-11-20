import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expats Programme",
};

export default function ExpatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
