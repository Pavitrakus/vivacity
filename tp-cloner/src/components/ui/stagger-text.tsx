"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = (stagger: number, delay: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const item = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.7, ease: EASE },
  },
};

export function StaggerText({
  children,
  delay = 0,
  divideBy = "word",
  className,
}: {
  children: string;
  delay?: number;
  divideBy?: "word" | "letter";
  className?: string;
}) {
  const parts = divideBy === "letter" ? children.split("") : children.split(" ");
  const stagger = divideBy === "letter" ? 0.028 : 0.06;

  return (
    <motion.span
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={className}
      style={{ display: "inline-block" }}
    >
      {parts.map((part, i) => (
        <span
          key={`${part}-${i}`}
          className="relative inline-block overflow-hidden"
          style={{ verticalAlign: "top" }}
        >
          <motion.span variants={item} className="inline-block will-change-transform">
            {divideBy === "letter" ? (part === " " ? "\u00A0" : part) : `${part}\u00A0`}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
