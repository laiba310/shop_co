"use client";
import { motion } from "framer-motion";

export default function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
