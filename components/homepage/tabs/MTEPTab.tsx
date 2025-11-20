"use client";

import { TabsContent } from "@/components/ui/tabs";
import {
  Rocket,
  Sparkles,
  TrendingUp,
  Target,
  UserCheck,
  Building2,
  Globe,
} from "lucide-react";
import { ProgrammeHeader } from "../ProgrammeHeader";
import { ProgrammeCard } from "../ProgrammeCard";
import { BenefitItem } from "../BenefitItem";
import { motion } from "framer-motion";

export const MTEPTab = () => {
  return (
    <TabsContent
      value="mtep"
      className="space-y-12 animate-in fade-in-50 duration-500"
    >
      {/* Programme Header */}
      <ProgrammeHeader
        icon={Rocket}
        badgeText="For Tech Entrepreneurs"
        title="Malaysia Tech Entrepreneur Programme"
        description="Empowering tech entrepreneurs to establish, scale, and succeed in Malaysia. Four specialized pass types designed for founders, investors, and senior management in the digital technology sector."
        href="/mtep"
      />

      {/* Pass Types */}
      <div>
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-8 text-center"
        >
          Four Specialized Pass Categories
        </motion.h4>
        <div className="grid md:grid-cols-2 gap-6">
          <ProgrammeCard
            icon={Sparkles}
            title="New Tech Entrepreneur Pass"
            description="Launch your tech startup in Malaysia"
            badgeText="Emerging Founders"
            features={[
              "Ideal for first-time tech founders",
              "Access to startup ecosystem and funding",
              "Mentorship from industry leaders",
              "Co-working space privileges",
            ]}
            index={0}
          />
          <ProgrammeCard
            icon={TrendingUp}
            title="Experienced Tech Entrepreneur Pass"
            description="Scale your business in Southeast Asia"
            badgeText="Seasoned Entrepreneurs"
            features={[
              "For entrepreneurs with proven track record",
              "Priority government engagement channels",
              "Strategic partnership opportunities",
              "Regional expansion support",
            ]}
            index={1}
          />
          <ProgrammeCard
            icon={Target}
            title="Tech Investor Pass"
            description="Invest in Malaysia's tech ecosystem"
            badgeText="Angel Investors"
            features={[
              "For VCs and angel investors",
              "Portfolio company support programs",
              "Access to deal flow and networks",
              "Investor community events",
            ]}
            index={2}
          />
          <ProgrammeCard
            icon={UserCheck}
            title="Senior Management Pass"
            description="Lead tech companies in Malaysia"
            badgeText="C-Suite Leaders"
            features={[
              "For C-suite and senior executives",
              "Management roles in tech companies",
              "Flexible work arrangements",
              "Executive networking opportunities",
            ]}
            index={3}
          />
        </div>
      </div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-50 rounded-2xl shadow-md p-8 md:p-12"
      >
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl font-bold mb-6"
        >
          Why Choose MTEP
        </motion.h4>
        <div className="grid md:grid-cols-3 gap-6">
          <BenefitItem
            icon={Building2}
            title="Strategic Location"
            description="Gateway to ASEAN market with world-class infrastructure"
            index={0}
          />
          <BenefitItem
            icon={Globe}
            title="MSC Malaysia Status"
            description="Tax incentives and financial benefits for qualifying companies"
            index={1}
          />
          <BenefitItem
            icon={Sparkles}
            title="Vibrant Ecosystem"
            description="Access to talent, funding, and innovation hubs"
            index={2}
          />
        </div>
      </motion.div>
    </TabsContent>
  );
};

