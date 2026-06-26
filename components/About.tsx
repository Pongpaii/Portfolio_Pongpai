"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const stats = [
  { v: "3.73", label: "GPA — First Class Honors" },
  { v: "TOEIC 705", label: "English Proficiency" },
  { v: "JLPT N4", label: "Japanese Ability" },
  { v: "4 mo", label: "Internship @ A-HOST" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const internshipExperiences = [
    {
      title: "Petty Cash App",
      role: "Junior Developer",
      points: [
        "Built Power Apps UI from Figma designs into a functional app",
        "Designed Gallery & Popup components for smooth business flow",
        "Iterated based on meeting feedback to match org requirements",
      ],
    },
    {
      title: "Asset Audit System",
      role: "Backend & Integration",
      points: [
        "Wrote SQL Stored Procedures on SSMS for complex data & versioning",
        "Built Power Automate flows connecting to D365 API for asset sync",
        "Optimised data loading via Power Apps Collections",
      ],
    },
    {
      title: "QA & Documentation",
      role: "Tester",
      points: [
        "Full-loop testing simulating real end-to-end user flows",
        "Reported and tracked bugs with senior developers",
        "Revised User Manual documentation as assigned",
      ],
    },
  ];

  const taExperiences = [
    {
      title: "MTE-107 Object-Oriented Programming for Multimedia",
      role: "Teaching Assistant (Java)",
      points: [
        "Guided 1st-year students through basic Java and Object-Oriented Programming concepts",
        "Debugged syntax, logical, and runtime errors during practical lab sessions",
        "Proctored mid-term and final examinations to ensure academic integrity",
      ],
    },
    {
      title: "MTE-105 Fundamental of Multimedia Programming",
      role: "Teaching Assistant (C#)",
      points: [
        "Supported faculty members in managing a classroom of 1st-year students",
        "Assisted students with troubleshooting and resolving basic C# programming errors",
        "Proctored examinations and maintained an optimal testing environment",
      ],
    },
  ];

  return (
    <section id="about" ref={ref} style={{ padding: "7rem 2.5rem", borderBottom: "1px solid var(--border)" }}>
      <motion.div
        variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        <motion.p variants={fadeUp} style={{ fontSize: "0.72rem", color: "var(--text-3)", letterSpacing: "0.14em", marginBottom: "3rem" }}>
          ABOUT
        </motion.p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          
          {/* ================= ฝั่งซ้าย: INTERNSHIP ================= */}
          <motion.div variants={fadeUp}>
            <p style={{ fontSize: "0.72rem", color: "var(--text-3)", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
              A-HOST CO., LTD · DEC 2025 – MAR 2026 · BANGKOK
            </p>

            {internshipExperiences.map((exp, i) => (
              <div key={exp.title} style={{
                paddingBottom: "1.25rem",
                marginBottom: "1.25rem",
                borderBottom: i < internshipExperiences.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.3rem" }}>
                  <p style={{ fontSize: "0.9rem", fontWeight: 700, letterSpacing: "-0.01em" }}>{exp.title}</p>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-3)", letterSpacing: "0.06em" }}>{exp.role.toUpperCase()}</p>
                </div>
                <ul style={{ paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  {exp.points.map((pt) => (
                    <li key={pt} style={{ fontSize: "0.82rem", color: "var(--text-2)", lineHeight: 1.65 }}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}

          </motion.div> 

          {/* ================= ฝั่งขวา: STATS & TA ================= */}
          <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
            style={{ display: "flex", flexDirection: "column", gap: "0" }}
          >
            {/* ส่วนของ คะแนน/เกรด (Stats) */}
            {stats.map((s, i) => (
              <motion.div
                key={s.v}
                variants={fadeUp}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "baseline",
                  padding: "1.1rem 0",
                  borderBottom: "1px solid var(--border)", // ปรับให้ขีดทุกอันเพื่อเตรียมรับกับเซกชัน TA
                }}
              >
                <span style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.01em" }}>{s.v}</span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-3)", letterSpacing: "0.04em" }}>{s.label}</span>
              </motion.div>
            ))}

            {/* ส่วนของ TA Experiences (ย้ายมาฝั่งนี้) */}
            <motion.div variants={fadeUp} style={{ marginTop: "3.5rem" }}>
              <p style={{ fontSize: "0.72rem", color: "var(--text-3)", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
                TNI · TEACHING ASSISTANT · 2024 – 2025
              </p>

              {taExperiences.map((exp, i) => (
                <div key={exp.title} style={{
                  paddingBottom: "1.25rem",
                  marginBottom: "1.25rem",
                  borderBottom: i < taExperiences.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem", marginBottom: "0.4rem" }}>
                    <p style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.3 }}>{exp.title}</p>
                    <p style={{ fontSize: "0.68rem", color: "var(--text-3)", letterSpacing: "0.06em" }}>{exp.role.toUpperCase()}</p>
                  </div>
                  <ul style={{ paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    {exp.points.map((pt) => (
                      <li key={pt} style={{ fontSize: "0.8rem", color: "var(--text-2)", lineHeight: 1.6 }}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}