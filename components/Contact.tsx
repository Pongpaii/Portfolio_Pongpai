"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText("pongpai1112@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" ref={ref} style={{ padding: "7rem 2.5rem" }}>
      <motion.div
        variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        <motion.p variants={fadeUp} style={{ fontSize: "0.72rem", color: "var(--text-3)", letterSpacing: "0.14em", marginBottom: "3rem" }}>
          CONTACT
        </motion.p>

        <motion.h2
          variants={fadeUp}
          style={{
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            marginBottom: "3rem",
          }}
        >
          Let's build<br />something.
        </motion.h2>

        <motion.div
          variants={fadeUp}
          style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}
        >
          <motion.button
            onClick={copy}
            style={{
              padding: "12px 28px",
              border: "1px solid var(--text)",
              borderRadius: "2px",
              background: copied ? "var(--text)" : "transparent",
              color: copied ? "#fff" : "var(--text)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              cursor: "pointer",
              transition: "all 0.25s",
            }}
            whileHover={{ background: "var(--text)", color: "#fff" }}
            whileTap={{ scale: 0.98 }}
          >
            {copied ? "COPIED ✓" : "COPY EMAIL"}
          </motion.button>

          <a href="mailto:pongpai1112@gmail.com" style={{ fontSize: "0.8rem", color: "var(--text-2)", letterSpacing: "0.04em" }}>
            pongpai1112@gmail.com
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          style={{ marginTop: "3rem", display: "flex", gap: "2rem", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}
        >
          {[
            { label: "GitHub", href: "https://github.com/Pongpaii" },
            { label: "Portfolio", href: "https://pongpaii.github.io/Portfolio" },
            { label: "Phone", href: "tel:0996156399" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              style={{
                fontSize: "0.78rem",
                color: "var(--text-3)",
                letterSpacing: "0.06em",
                fontWeight: 500,
                borderBottom: "1px solid transparent",
                paddingBottom: "2px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                const t = e.target as HTMLElement;
                t.style.color = "var(--text)";
                t.style.borderBottomColor = "var(--text)";
              }}
              onMouseLeave={(e) => {
                const t = e.target as HTMLElement;
                t.style.color = "var(--text-3)";
                t.style.borderBottomColor = "transparent";
              }}
            >
              {l.label.toUpperCase()} ↗
            </a>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          style={{ marginTop: "4rem", fontSize: "0.72rem", color: "var(--text-3)", letterSpacing: "0.06em" }}
        >
          BUILT WITH NEXT.JS · FRAMER MOTION · DEPLOYED ON VERCEL
        </motion.p>
      </motion.div>
    </section>
  );
}
