"use client";

import { motion } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
  sublabel: string;
  index?: number;
}

export const StatCard = ({
  value,
  label,
  sublabel,
  index = 0,
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2, type: "spring" }}
        className="text-5xl font-bold text-primary mb-3"
      >
        {value}
      </motion.div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
      <div className="text-xs text-gray-500 mt-1">{sublabel}</div>
    </motion.div>
  );
};

