"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, type Variants } from "framer-motion";
import {
  SiFigma,
  SiGithub,
  SiGooglecolab,
  SiHtml5,
  SiLaravel,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiStreamlit,
  SiTailwindcss,
  SiTypescript,
  SiUnity,
  SiVercel,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { TbApi, TbApps, TbAutomation, TbBrandCSharp, TbDatabase, TbHeadset } from "react-icons/tb";

type Skill = { name: string; icon: React.ComponentType<{ size?: number }>; color: string };

const stacks: { group: string; blurb: string; items: Skill[] }[] = [
  {
    group: "Frontend",
    blurb: "Interfaces I can design and then actually build",
    items: [
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "React / React Native", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "currentColor" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "HTML / CSS", icon: SiHtml5, color: "#E34F26" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ],
  },
  {
    group: "Backend & Data",
    blurb: "Where the business logic lives",
    items: [
      { name: "PHP / Laravel", icon: SiLaravel, color: "#FF2D20" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "SQL / SSMS", icon: TbDatabase, color: "#4A90D9" },
      { name: "C#", icon: TbBrandCSharp, color: "#8B5CF6" },
      { name: "REST API", icon: TbApi, color: "#22C55E" },
      { name: "Power Automate", icon: TbAutomation, color: "#3B82F6" },
    ],
  },
  {
    group: "Cloud & Support",
    blurb: "Current focus at Com7",
    items: [
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "Classroom / Lab support", icon: TbHeadset, color: "#F472B6" },
      { name: "Power Apps", icon: TbApps, color: "#A855F7" },
      { name: "Git / GitHub", icon: SiGithub, color: "currentColor" },
      { name: "Vercel", icon: SiVercel, color: "currentColor" },
      { name: "Unity", icon: SiUnity, color: "#94A3B8" },
    ],
  },
  {
    group: "Data & Experiments",
    blurb: "Prototyping and AI side quests",
    items: [
      { name: "Google Colab", icon: SiGooglecolab, color: "#F9AB00" },
      { name: "Streamlit", icon: SiStreamlit, color: "#FF4B4B" },
    ],
  },
];

const allItems = stacks.flatMap((s) => s.items);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };

function SkillRow({ item }: { item: Skill }) {
  const [hover, setHover] = useState(false);
  const Icon = item.icon;

  return (
    <motion.li
      variants={fadeUp}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
        padding: "0.55rem 0.2rem",
        color: hover ? "var(--text)" : "var(--text-2)",
        transform: hover ? "translateX(5px)" : "none",
        transition: "color .25s, transform .35s var(--ease)",
      }}
    >
      <span
        style={{
          display: "flex",
          color: hover ? item.color : "var(--text-3)",
          transition: "color .25s",
        }}
      >
        <Icon size={18} />
      </span>
      <span style={{ fontSize: "0.88rem", fontWeight: 500 }}>{item.name}</span>
    </motion.li>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [view, setView] = useState<"list" | "cloud">("list");

  return (
    <section id="skills" ref={ref} className="section">
      <div className="shell">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1.5rem",
            flexWrap: "wrap",
            marginBottom: "3rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow" style={{ marginBottom: "1.1rem" }}>
              Toolkit
            </p>
            <h2 className="section-title">Skills & technologies</h2>
          </motion.div>

          <motion.div
            className="segmented"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            role="group"
            aria-label="Skills display mode"
          >
            {(["list", "cloud"] as const).map((v) => (
              <button
                key={v}
                type="button"
                data-active={view === v}
                aria-pressed={view === v}
                onClick={() => setView(v)}
              >
                {v}
              </button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {view === "list" ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid-auto"
            >
              {stacks.map((s) => (
                <motion.div
                  key={s.group}
                  className="glass"
                  variants={stagger}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  style={{ padding: "1.4rem 1.5rem" }}
                >
                  <p
                    className="mono"
                    style={{
                      fontSize: "0.68rem",
                      letterSpacing: "0.13em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {s.group}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-3)", marginBottom: "1rem" }}>
                    {s.blurb}
                  </p>
                  <ul style={{ listStyle: "none", display: "grid" }}>
                    {s.items.map((item) => (
                      <SkillRow key={item.name} item={item} />
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="cloud"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.6rem",
                justifyContent: "center",
                padding: "1.5rem 0",
              }}
            >
              {allItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.span
                    key={item.name}
                    className="chip"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.02, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontSize: "0.82rem", padding: "0.55rem 1rem" }}
                  >
                    <Icon size={16} />
                    {item.name}
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
