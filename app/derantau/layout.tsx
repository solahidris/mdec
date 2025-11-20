import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DE Rantau",
};

export default function DERantauLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
