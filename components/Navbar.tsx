"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 2.5rem",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        transition: "border-color 0.4s",
      }}
    >
      <span style={{ fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.04em" }}>
        PONGPAI
      </span>
      <nav style={{ display: "flex", gap: "2.5rem" }}>
        {["About", "Skills", "Projects", "Contact"].map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            style={{ fontSize: "0.78rem", color: "var(--text-2)", letterSpacing: "0.06em", fontWeight: 500 }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-2)")}
          >
            {l.toUpperCase()}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
