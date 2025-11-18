"use client";

import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plane, Globe, Building2, Coffee, Wifi, Sparkles, Check } from "lucide-react";
import { ProgrammeHeader } from "../ProgrammeHeader";
import { StatCard } from "../StatCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const DERantauTab = () => {
  const cards = [
    {
      icon: Globe,
      title: "DE Rantau Nomad Pass",
      description: "12-month renewable digital nomad visa",
      features: [
        "Valid for 12 months, renewable annually",
        "For remote workers and freelancers",
        "Competitive tax benefits and incentives",
        "Multiple entry privileges for travel",
      ],
    },
    {
      icon: Building2,
      title: "DE Rantau Hubs",
      description: "Premium co-working spaces nationwide",
      features: [
        "50+ hubs across major Malaysian cities",
        "High-speed fiber internet connectivity",
        "Meeting rooms and event spaces",
        "Strategic locations in Kuala Lumpur, Penang, and more",
      ],
    },
    {
      icon: Coffee,
      title: "Vibrant Community",
      description: "Connect with global professionals",
      features: [
        "Regular networking and social events",
        "Skills workshops and training sessions",
        "Cross-border collaboration opportunities",
        "Exclusive member benefits and discounts",
      ],
    },
  ];

  return (
    <TabsContent
      value="derantau"
      className="space-y-12 animate-in fade-in-50 duration-500"
    >
      {/* Programme Header */}
      <ProgrammeHeader
        icon={Plane}
        badgeText="For Digital Nomads"
        title="DE Rantau"
        description="Work remotely from Malaysia while experiencing the vibrant culture and lifestyle of Southeast Asia. The DE Rantau programme offers digital nomads a unique opportunity to live, work, and connect in Malaysia's thriving tech ecosystem."
        href="/derantau"
      />

      {/* Programme Features */}
      <div>
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-8 text-center"
        >
          What DE Rantau Offers
        </motion.h4>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="group shadow-md hover:shadow-2xl transition-all duration-300 bg-white relative overflow-hidden h-full">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                  className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gray-100"
                />
                <CardHeader className="relative">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg"
                  >
                    <card.icon className="h-7 w-7 text-white" />
                  </motion.div>
                  <CardTitle className="text-xl">{card.title}</CardTitle>
                  <CardDescription className="text-base">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-700">
                    {card.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.15 + idx * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Malaysia Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-primary rounded-2xl p-8 md:p-12 text-white"
      >
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          Why Malaysia for Digital Nomads
        </motion.h4>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: Wifi,
              title: "World-Class Infrastructure",
              description: "Fast internet, modern facilities, and excellent connectivity across major cities",
            },
            {
              icon: Coffee,
              title: "Affordable Cost of Living",
              description: "Enjoy a high quality of life at a fraction of the cost compared to other major cities",
            },
            {
              icon: Globe,
              title: "Strategic Location",
              description: "Gateway to ASEAN with convenient timezone for global collaboration",
            },
            {
              icon: Sparkles,
              title: "Rich Culture & Lifestyle",
              description: "Experience diverse cultures, amazing food, and beautiful tropical weather year-round",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="flex gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <item.icon className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h5 className="font-bold text-lg mb-2">{item.title}</h5>
                <p className="text-sm text-white/90">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-md"
      >
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl font-bold mb-8 text-center"
        >
          DE Rantau Impact
        </motion.h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard
            value="1000+"
            label="Digital Nomads"
            sublabel="Living in Malaysia"
            index={0}
          />
          <StatCard
            value="50+"
            label="DE Rantau Hubs"
            sublabel="Nationwide"
            index={1}
          />
          <StatCard
            value="100+"
            label="Monthly Events"
            sublabel="Community Activities"
            index={2}
          />
          <StatCard
            value="60+"
            label="Countries"
            sublabel="Represented"
            index={3}
          />
        </div>
      </motion.div>
    </TabsContent>
  );
};
