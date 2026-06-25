"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const stacks = [
  { group: "Frontend", items: ["React Native", "TypeScript", "Next.js", "HTML / CSS", "Tailwind CSS", "Figma"] },
  { group: "Backend & Data", items: ["PHP / Laravel", "Python", "SQL", "Power Automate", "C#", "REST API"] },
  { group: "Tools", items: ["Git / GitHub", "Power Apps", "Google Colab", "Streamlit", "Unity", "Vercel"] },
];

const allItems = stacks.flatMap((s) => s.items.map((item) => ({ item, group: s.group })));

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [view, setView] = useState<"list" | "cloud">("list");

  return (
    <section id="skills" ref={ref} style={{ padding: "7rem 2.5rem", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ fontSize: "0.72rem", color: "var(--text-3)", letterSpacing: "0.14em" }}
          >
            SKILLS
          </motion.p>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            style={{
              display: "flex", border: "1px solid var(--border)",
              borderRadius: "2px", overflow: "hidden",
            }}
          >
            {(["list", "cloud"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: "6px 16px", fontSize: "0.72rem", fontWeight: 600,
                  letterSpacing: "0.08em", cursor: "pointer", border: "none",
                  background: view === v ? "var(--text)" : "transparent",
                  color: view === v ? "#fff" : "var(--text-3)",
                  transition: "all 0.2s",
                }}
              >
                {v.toUpperCase()}
              </button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {view === "list" ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0" }}
            >
              {stacks.map((s, si) => (
                <motion.div
                  key={s.group}
                  variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
                  style={{
                    padding: `0 ${si < stacks.length - 1 ? "2rem" : "0"} 0 ${si > 0 ? "2rem" : "0"}`,
                    borderRight: si < stacks.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <motion.p variants={fadeUp} style={{
                    fontSize: "0.72rem", color: "var(--text-3)",
                    letterSpacing: "0.1em", marginBottom: "1.5rem",
                  }}>
                    {s.group.toUpperCase()}
                  </motion.p>
                  {s.items.map((item) => (
                    <motion.p key={item} variants={fadeUp}
                      style={{
                        fontSize: "0.95rem", fontWeight: 500,
                        padding: "0.6rem 0", borderBottom: "1px solid var(--border)",
                        letterSpacing: "-0.01em",
                      }}
                      whileHover={{ x: 6, color: "var(--text-2)" }}
                      transition={{ duration: 0.2 }}
                    >
                      {item}
                    </motion.p>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="cloud"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center" }}
            >
              {allItems.map(({ item }, i) => {
                const sizes = ["0.78rem", "0.9rem", "1.05rem", "1.2rem"];
                const size = sizes[i % sizes.length];
                return (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03, duration: 0.4 }}
                    whileHover={{ scale: 1.08 }}
                    style={{
                      fontSize: size, fontWeight: 500,
                      padding: "6px 14px", border: "1px solid var(--border)",
                      borderRadius: "99px", color: "var(--text)",
                      cursor: "default", letterSpacing: "-0.01em",
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--text)";
                      (e.currentTarget as HTMLElement).style.background = "var(--text)";
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--text)";
                    }}
                  >
                    {item}
                  </motion.span>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
