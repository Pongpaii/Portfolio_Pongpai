"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX: width,
        transformOrigin: "0% 50%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 120,
        background: "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))",
      }}
    />
  );
}
