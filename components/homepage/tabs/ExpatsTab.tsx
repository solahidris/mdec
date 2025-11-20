"use client";

import { TabsContent } from "@/components/ui/tabs";
import { FileCheck, HeartHandshake, Shield, Briefcase, Target, Users } from "lucide-react";
import { ProgrammeHeader } from "../ProgrammeHeader";
import { FeatureCard } from "../FeatureCard";
import { EligibilitySection } from "../EligibilitySection";
import { motion } from "framer-motion";

export const ExpatsTab = () => {
  return (
    <TabsContent
      value="expats"
      className="space-y-12 animate-in fade-in-50 duration-500"
    >
      {/* Programme Header */}
      <ProgrammeHeader
        icon={Users}
        badgeText="For Foreign Talent"
        title="Expats Service Centre"
        description="One-stop centre providing comprehensive support for foreign knowledge workers seeking employment in Malaysia's digital economy. Streamlined application processes, relocation assistance, and compliance advisory services."
        href="/expats"
      />

      {/* Services Overview */}
      <div>
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-8 text-center"
        >
          What We Offer
        </motion.h4>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={FileCheck}
            title="Fast-Track Processing"
            description="Employment pass applications made simple"
            features={[
              "Expedited visa processing for tech professionals",
              "Dedicated support team throughout application",
              "Real-time application status tracking",
            ]}
            index={0}
          />
          <FeatureCard
            icon={HeartHandshake}
            title="Relocation Support"
            description="Comprehensive settling-in assistance"
            features={[
              "Housing and accommodation guidance in Cyberjaya",
              "Banking and financial services setup",
              "Cultural orientation and integration programs",
            ]}
            index={1}
          />
          <FeatureCard
            icon={Shield}
            title="Compliance Advisory"
            description="Expert regulatory guidance"
            features={[
              "Employment pass renewal assistance",
              "Malaysian regulatory compliance support",
              "Legal advisory and documentation help",
            ]}
            index={2}
          />
        </div>
      </div>

      {/* Eligibility & Requirements */}
      <EligibilitySection
        leftIcon={Briefcase}
        leftTitle="Who Can Apply"
        leftItems={[
          "Foreign knowledge workers in technology sectors",
          "IT professionals and digital specialists",
          "Tech company employees relocating to Malaysia",
          "Specialists in emerging technologies",
        ]}
        rightIcon={Target}
        rightTitle="Key Benefits"
        rightItems={[
          "Priority processing through MDEC",
          "Access to MSC Malaysia Status companies",
          "Competitive salary opportunities",
          "Family relocation support available",
        ]}
      />
    </TabsContent>
  );
};

