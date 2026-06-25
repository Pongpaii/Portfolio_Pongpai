"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" as const } },
};

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { setMouse({ x: e.clientX, y: e.clientY }); setVisible(true); };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseleave", leave); };
  }, []);

  return (
    <>
      <motion.div
        animate={{ x: mouse.x - 6, y: mouse.y - 6, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9999,
          width: 12, height: 12, borderRadius: "50%",
          background: "var(--text)", pointerEvents: "none", mixBlendMode: "difference",
        }}
      />

      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "0 2.5rem",
        borderBottom: "1px solid var(--border)", position: "relative",
      }}>
        <motion.div variants={stagger} initial="hidden" animate="show"
          style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }}
        >
          {/* Eyebrow */}
          <motion.p variants={fadeUp} style={{
            fontSize: "0.72rem", color: "var(--text-3)",
            letterSpacing: "0.14em", marginBottom: "2rem",
          }}>
            PORTFOLIO — 2025
          </motion.p>

          {/* Name + role */}
          <motion.div variants={fadeUp} style={{ marginBottom: "1rem" }}>
            <h1 style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 700,
              letterSpacing: "-0.03em", lineHeight: 1.2,
            }}>
              Pongpai Sodsong
            </h1>
            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "var(--text-2)",
              fontWeight: 400, marginTop: "0.4rem", letterSpacing: "-0.01em",
            }}>
              Frontend Developer — Figma to Code
            </p>
          </motion.div>

          {/* Location + status */}
          <motion.div variants={fadeUp} style={{
            display: "flex", alignItems: "center", gap: "1.5rem",
            marginBottom: "2.5rem", flexWrap: "wrap",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "var(--text-3)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              Bangkok · Phatthanakan
            </span>
            <span style={{ fontSize: "0.82rem", color: "var(--text-3)" }}>Available for hire</span>
          </motion.div>

          {/* Bio */}
          <motion.p variants={fadeUp} style={{
            fontSize: "0.95rem", color: "var(--text-2)", lineHeight: 1.8,
            maxWidth: "520px", marginBottom: "3rem",
          }}>
            Multimedia Technology grad, First Class Honors. I bridge the gap between design and development — comfortable prototyping in Figma one day and shipping TypeScript the next.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeUp} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a href="mailto:pongpai1112@gmail.com"
              style={{
                padding: "10px 22px", border: "1px solid var(--text)",
                borderRadius: "2px", fontSize: "0.78rem", fontWeight: 600,
                letterSpacing: "0.06em", background: "var(--text)", color: "#fff",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              SEND EMAIL ↗
            </a>
            <a href="https://www.linkedin.com/in/pongpai-sodsong" target="_blank"
              style={{
                padding: "10px 22px", border: "1px solid var(--border)",
                borderRadius: "2px", fontSize: "0.78rem", fontWeight: 600,
                letterSpacing: "0.06em", color: "var(--text)", background: "transparent",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
            >
              LINKEDIN ↗
            </a>
            <a href="https://github.com/Pongpaii" target="_blank"
              style={{
                padding: "10px 22px", border: "1px solid var(--border)",
                borderRadius: "2px", fontSize: "0.78rem", fontWeight: 600,
                letterSpacing: "0.06em", color: "var(--text)", background: "transparent",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
            >
              GITHUB ↗
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          style={{ position: "absolute", bottom: "2rem", right: "2.5rem",
            fontSize: "0.72rem", color: "var(--text-3)", letterSpacing: "0.1em" }}
        >
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            SCROLL ↓
          </motion.span>
        </motion.div>
      </section>
    </>
  );
}
