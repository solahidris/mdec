import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MTEP - Malaysia Tech Entrepreneur Programme",
};

export default function MTEPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
