"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface BenefitItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export const BenefitItem = ({
  icon: Icon,
  title,
  description,
  index = 0,
}: BenefitItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="flex gap-4"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"
      >
        <Icon className="h-6 w-6 text-primary" />
      </motion.div>
      <div>
        <h5 className="font-semibold mb-2">{title}</h5>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

