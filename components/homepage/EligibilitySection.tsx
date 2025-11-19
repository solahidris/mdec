"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface EligibilitySectionProps {
  leftIcon: LucideIcon;
  leftTitle: string;
  leftItems: string[];
  rightIcon: LucideIcon;
  rightTitle: string;
  rightItems: string[];
}

export const EligibilitySection = ({
  leftIcon: LeftIcon,
  leftTitle,
  leftItems,
  rightIcon: RightIcon,
  rightTitle,
  rightItems,
}: EligibilitySectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl p-8 md:p-12 shadow-md"
    >
      <motion.h4
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl font-bold mb-6"
      >
        Eligibility Requirements
      </motion.h4>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h5 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <LeftIcon className="h-5 w-5 text-primary" />
            {leftTitle}
          </h5>
          <ul className="space-y-2 text-gray-700">
            {leftItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              >
                • {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h5 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <RightIcon className="h-5 w-5 text-primary" />
            {rightTitle}
          </h5>
          <ul className="space-y-2 text-gray-700">
            {rightItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              >
                • {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

