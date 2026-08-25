"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Award, GraduationCap, Languages } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

type Role = {
  org: string;
  title: string;
  period: string;
  place: string;
  current?: boolean;
  tags: string[];
  points: string[];
};

const roles: Role[] = [
  {
    org: "Com7 Public Company Limited",
    title: "IT Support / Teaching Assistant — AWS",
    period: "2026 — Present",
    place: "Bangkok",
    current: true,
    tags: ["AWS", "IT Support", "Teaching Assistant", "Troubleshooting"],
    points: [
      "Support the Education and Enterprise team on AWS-related work and day-to-day technical requests.",
      "Main duty: Teaching Assistant for the BOI STEM+ camp classrooms hosted at Koon Hotel.",
      "Debug issues live during class so instructors and students never lose momentum.",
    ],
  },
  {
    org: "A-HOST Co., Ltd.",
    title: "Software Developer (Internship)",
    period: "Dec 2025 — Mar 2026",
    place: "Bangkok",
    tags: ["Power Apps", "Power Automate", "SQL Server", "D365 API", "QA"],
    points: [
      "Petty Cash App — turned Figma designs into a working Power Apps solution, building gallery and popup flows around real approval steps.",
      "Asset Audit System — wrote SQL stored procedures on SSMS for data versioning and built Power Automate flows against the D365 API.",
      "QA & documentation — ran full-loop tests simulating real user journeys, reported bugs with senior devs, and revised the user manual.",
    ],
  },
  {
    org: "Thai-Nichi Institute of Technology",
    title: "Teaching Assistant — Java & C#",
    period: "2024 — 2025",
    place: "Bangkok",
    tags: ["Java", "C#", "Mentoring", "Lab support"],
    points: [
      "MTE-107 Object-Oriented Programming — guided first-year students through OOP concepts and debugged syntax, logic, and runtime errors in labs.",
      "MTE-105 Fundamentals of Multimedia Programming — supported faculty in class and helped students resolve C# errors.",
      "Proctored mid-term and final exams to keep the testing environment fair and calm.",
    ],
  },
];

const credentials = [
  {
    icon: GraduationCap,
    title: "B.Tech Multimedia Technology",
    detail: "Thai-Nichi Institute of Technology · GPA 3.73",
  },
  { icon: Award, title: "First Class Honors", detail: "Graduated with distinction" },
  { icon: Languages, title: "TOEIC 705 · JLPT N4", detail: "English & Japanese proficiency" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="about" ref={ref} className="section">
      <motion.div
        className="shell two-col two-col-sticky"
        variants={stagger}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {/* Left — heading + credentials */}
        <motion.div variants={fadeUp} className="sticky-side">
          <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>
            Experience
          </p>
          <h2 className="section-title" style={{ marginBottom: "1.25rem" }}>
            From classrooms to
            <br />
            production systems.
          </h2>
          <p className="lede" style={{ marginBottom: "2rem", maxWidth: "42ch" }}>
            I move between supporting people and building software — teaching, debugging, and
            shipping. Both sides make me faster at spotting what actually breaks.
          </p>

          <div style={{ display: "grid", gap: "0.6rem" }}>
            {credentials.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="glass"
                  style={{ display: "flex", gap: "0.85rem", padding: "0.9rem 1rem", alignItems: "flex-start" }}
                >
                  <span style={{ color: "var(--accent)", marginTop: 2 }}>
                    <Icon size={17} />
                  </span>
                  <span>
                    <span style={{ display: "block", fontSize: "0.87rem", fontWeight: 600 }}>
                      {c.title}
                    </span>
                    <span style={{ display: "block", fontSize: "0.78rem", color: "var(--text-3)" }}>
                      {c.detail}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right — timeline */}
        <motion.ol variants={stagger} className="timeline" style={{ listStyle: "none", display: "grid", gap: "2.25rem" }}>
          {roles.map((role) => (
            <motion.li key={role.org} variants={fadeUp} style={{ position: "relative" }}>
              <span className="timeline-node" data-current={role.current ? "true" : "false"} aria-hidden />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "1rem",
                  flexWrap: "wrap",
                  marginBottom: "0.15rem",
                }}
              >
                <h3 className="display" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
                  {role.org}
                </h3>
                <span
                  className="mono"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.08em", color: "var(--text-3)", whiteSpace: "nowrap" }}
                >
                  {role.period}
                </span>
              </div>

              <p
                style={{
                  fontSize: "0.86rem",
                  color: role.current ? "var(--accent)" : "var(--text-2)",
                  fontWeight: 500,
                  marginBottom: "0.9rem",
                }}
              >
                {role.title} · <span style={{ color: "var(--text-3)" }}>{role.place}</span>
              </p>

              <ul className="bullets" style={{ marginBottom: "1rem" }}>
                {role.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {role.tags.map((t) => (
                  <span
                    key={t}
                    className="mono"
                    style={{
                      fontSize: "0.66rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--text-3)",
                      border: "1px solid var(--border)",
                      borderRadius: 999,
                      padding: "0.25rem 0.6rem",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </motion.div>
    </section>
  );
}
