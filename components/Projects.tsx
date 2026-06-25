"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    title: "Hybrid App",
    year: "2025",
    stack: "React Native · TypeScript",
    desc: "Cross-platform mobile app — led frontend from Figma prototypes through to REST API integration.",
    image: "/images/rate.png",
    github: "https://github.com/Emperor13/ReactNativeFinalProject",
    live: null,
  },
  {
    title: "TCG BanBan",
    year: "2025",
    stack: "Laravel · PHP · Bootstrap",
    desc: "Full-stack web app for Pokémon collectors. Live price comparison + admin panel with full CRUD.",
    image: "/images/mb1.png",  
    github: "https://github.com/Pongpaii/Banban-TCG",
    live: null,
  },
  {
    title: "Wound Analysis AI",
    year: "2024",
    stack: "Python · Streamlit · ML",
    desc: "Hackathon project — trained a wound model on Kaggle data and shipped the full app within the event timeframe.",
    image: "/images/bitebye.jpg",
    github: "https://github.com/Pongpaii",
    live: null,
  },
];

function ProjectCard({ p, i, inView }: any) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? "var(--text)" : "var(--border)"}`,
        borderRadius: "2px",
        overflow: "hidden",
        transition: "border-color 0.25s",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image area */}
      <div style={{
        height: "180px",
        background: hovered ? "#f0f0f0" : "#f7f7f7",
        transition: "background 0.3s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid var(--border)",
      }}>
        {p.image ? (
          <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ fontSize: "0.72rem", color: "var(--text-3)", letterSpacing: "0.1em" }}>
            {p.title.toUpperCase()}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "1.25rem 1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.02em" }}>{p.title}</h3>
          <span style={{ fontSize: "0.72rem", color: "var(--text-3)" }}>{p.year}</span>
        </div>
        <p style={{ fontSize: "0.72rem", color: "var(--text-3)", letterSpacing: "0.04em" }}>{p.stack}</p>
        <p style={{ fontSize: "0.85rem", color: "var(--text-2)", lineHeight: 1.7, flex: 1 }}>{p.desc}</p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
          {p.github && (
            <a href={p.github} target="_blank" style={{
              flex: 1, padding: "8px 0", textAlign: "center",
              border: "1px solid var(--border)", borderRadius: "2px",
              fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em",
              color: "var(--text)", transition: "all 0.2s",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--text)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
              }}
            >
              CODE ↗
            </a>
          )}
          {p.live ? (
            <a href={p.live} target="_blank" style={{
              flex: 1, padding: "8px 0", textAlign: "center",
              background: "var(--text)", borderRadius: "2px",
              fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em",
              color: "#fff", transition: "opacity 0.2s",
            }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              LIVE ↗
            </a>
          ) : (
            <span style={{
              flex: 1, padding: "8px 0", textAlign: "center",
              border: "1px solid var(--border)", borderRadius: "2px",
              fontSize: "0.72rem", letterSpacing: "0.08em",
              color: "var(--text-3)",
            }}>
              NO LIVE
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} style={{ padding: "7rem 2.5rem", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ fontSize: "0.72rem", color: "var(--text-3)", letterSpacing: "0.14em", marginBottom: "3rem" }}
        >
          PROJECTS
        </motion.p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
