import { Container } from "@/components/ui/container";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { Plane } from "lucide-react";

export default function DERantauPage() {
  return (
    <Container>
      <Header />
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-7xl min-h-screen">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center">
            <Plane className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            DE Rantau
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Hi! This page exists but is empty for now. Check back soon for the full DE Rantau application experience.
          </p>
        </div>
      </main>
      <Footer />
    </Container>
  );
}

