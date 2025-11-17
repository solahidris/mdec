"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ProgrammeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badgeText: string;
  features: string[];
  index?: number;
}

export const ProgrammeCard = ({
  icon: Icon,
  title,
  description,
  badgeText,
  features,
  index = 0,
}: ProgrammeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Card className="group shadow-md hover:shadow-2xl transition-all duration-300 bg-white relative overflow-hidden border border-gray-200/70 h-full">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
          className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"
        />
        <CardHeader className="relative">
          <div className="flex items-start justify-between mb-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg"
            >
              <Icon className="h-7 w-7 text-white" />
            </motion.div>
            <Badge variant="outline" className="text-xs border-primary/30">
              {badgeText}
            </Badge>
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-gray-700">
            {features.map((feature, idx) => (
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
  );
};

