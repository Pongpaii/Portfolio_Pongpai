"use client";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { useRef, useState } from "react";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiHtml5,
  SiTailwindcss,
  SiFigma,
  SiLaravel,
  SiPython,
  SiGithub,
  SiGooglecolab,
  SiStreamlit,
  SiUnity,
  SiVercel,
} from "react-icons/si";
import {
  TbAutomation,
  TbApps,
  TbApi,
  TbDatabase,
  TbCode,
} from "react-icons/tb";

const stacks = [
  {
    group: "Frontend",
    items: [
      { name: "React Native", icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "HTML / CSS", icon: SiHtml5, color: "#E34F26" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ],
  },
  {
    group: "Backend & Data",
    items: [
      { name: "PHP / Laravel", icon: SiLaravel, color: "#FF2D20" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "SQL", icon: TbDatabase, color: "#336791" },
      { name: "Power Automate", icon: TbAutomation, color: "#2563EB" },
      { name: "C#", icon: TbCode, color: "#239120" }, 
      { name: "REST API", icon: TbApi, color: "#007ACC" },
    ],
  },
  {
    group: "Tools",
    items: [
      { name: "Git / GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "Power Apps", icon: TbApps, color: "#742774" },
      { name: "Google Colab", icon: SiGooglecolab, color: "#F9AB00" },
      { name: "Streamlit", icon: SiStreamlit, color: "#FF4B4B" },
      { name: "Unity", icon: SiUnity, color: "#FFFFFF" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
    ],
  },
];

const allItems = stacks.flatMap((s) =>
  s.items.map((item) => ({ ...item, group: s.group })),
);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [view, setView] = useState<"list" | "cloud">("list");

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: "7rem 2.5rem",
        borderBottom: "1px solid var(--border)",
        background: "var(--background)",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "4rem",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: "0.68rem",
              color: "var(--text-3)",
              letterSpacing: "0.2em",
              fontWeight: 600,
            }}
          >
            SKILLS & TECHNOLOGIES
          </motion.p>

          {/* Toggle Switch - ปรับกลับมาใช้สไตล์เหลี่ยมเรียบหรูแบบตอนแรกสุด */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            style={{
              display: "flex",
              border: "1px solid var(--border)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            {(["list", "cloud"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: "6px 16px",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  border: "none",
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
            /* 1. LIST VIEW */
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "2.5rem",
              }}
            >
              {stacks.map((s, si) => (
                <motion.div
                  key={s.group}
                  variants={stagger}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <motion.p
                    variants={fadeUp}
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--text-3)",
                      letterSpacing: "0.15em",
                      marginBottom: "1rem",
                      fontWeight: 600,
                      borderBottom: "1px solid var(--border)",
                      paddingBottom: "0.5rem",
                    }}
                  >
                    {s.group.toUpperCase()}
                  </motion.p>

                  {s.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.name}
                        variants={fadeUp}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          padding: "0.75rem 0.5rem",
                          borderBottom: "1px solid rgba(255,255,255,0.03)",
                          borderRadius: "4px",
                          color: "var(--text-2)",
                          transition: "all 0.2s",
                        }}
                        whileHover={{ x: 6, color: "var(--text)" }}
                        onMouseEnter={(e) => {
                          const iconEl = e.currentTarget.querySelector(
                            ".skill-icon",
                          ) as HTMLElement;
                          if (iconEl) iconEl.style.color = item.color;
                        }}
                        onMouseLeave={(e) => {
                          const iconEl = e.currentTarget.querySelector(
                            ".skill-icon",
                          ) as HTMLElement;
                          if (iconEl) iconEl.style.color = "var(--text-3)";
                        }}
                      >
                        <div
                          className="skill-icon"
                          style={{
                            color: "var(--text-3)",
                            display: "flex",
                            transition: "color 0.2s",
                            alignItems: "center",
                          }}
                        >
                          <Icon size={20} />
                        </div>
                        <span
                          style={{
                            fontSize: "0.92rem",
                            fontWeight: 500,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {item.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* 2. CLOUD VIEW */
            <motion.div
              key="cloud"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem 0",
              }}
            >
              {allItems.map(({ name, icon: Icon, color }, i) => {
                return (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: i * 0.02,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      padding: "10px 18px",
                      border: "1px solid var(--border)",
                      borderRadius: "99px",
                      color: "var(--text-2)",
                      background: "rgba(255,255,255,0.01)",
                      backdropFilter: "blur(4px)",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = color;
                      e.currentTarget.style.color = "var(--text)";
                      e.currentTarget.style.boxShadow = `0 4px 20px ${color}15`;
                      const iconEl = e.currentTarget.querySelector(
                        ".cloud-icon",
                      ) as HTMLElement;
                      if (iconEl) iconEl.style.color = color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.color = "var(--text-2)";
                      e.currentTarget.style.boxShadow = "none";
                      const iconEl = e.currentTarget.querySelector(
                        ".cloud-icon",
                      ) as HTMLElement;
                      if (iconEl) iconEl.style.color = "var(--text-2)";
                    }}
                    title={name}
                  >
                    <div
                      className="cloud-icon"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        transition: "color 0.3s",
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}