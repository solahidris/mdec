"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/ui/container";
import { Users, Rocket, Plane } from "lucide-react";
import { Header } from "@/components/homepage/Header";
import { Hero } from "@/components/homepage/Hero";
import { SectionHeader } from "@/components/homepage/SectionHeader";
import { ExpatsTab } from "@/components/homepage/tabs/ExpatsTab";
import { MTEPTab } from "@/components/homepage/tabs/MTEPTab";
import { DERantauTab } from "@/components/homepage/tabs/DERantauTab";
import { Footer } from "@/components/homepage/Footer";

const Home = () => {
  return (
    <Container>
      <Header />
      <Hero />

      {/* Main Application Programmes Section */}
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
        <SectionHeader
          badge="Application Programmes"
          title="Choose Your Path to Success"
          description="Three specialized programmes designed to attract and support talent, entrepreneurs, and digital professionals in Malaysia"
        />

        <Tabs defaultValue="expats" className="w-full">
          {/* Tab Navigation */}
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 mb-16 h-16 p-1.5 bg-gray-200 rounded-2xl">
            <TabsTrigger
              value="expats"
              className="cursor-pointer text-base font-semibold flex items-center justify-center gap-2 rounded-xl transition-all"
            >
              <Users className="h-5 w-5" />
              <span className="hidden sm:inline">Expats</span>
            </TabsTrigger>
            <TabsTrigger
              value="mtep"
              className="cursor-pointer text-base font-semibold flex items-center justify-center gap-2 rounded-xl transition-all"
            >
              <Rocket className="h-5 w-5" />
              <span className="hidden sm:inline">MTEP</span>
            </TabsTrigger>
            <TabsTrigger
              value="derantau"
              className="cursor-pointer text-base font-semibold flex items-center justify-center gap-2 rounded-xl transition-all"
            >
              <Plane className="h-5 w-5" />
              <span className="hidden sm:inline">DE Rantau</span>
            </TabsTrigger>
          </TabsList>

          <ExpatsTab />
          <MTEPTab />
          <DERantauTab />
        </Tabs>
      </main>

      <Footer />
    </Container>
  );
};

export default Home;
