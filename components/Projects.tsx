"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { projectsBySection, sections, type Project } from "@/lib/projects";

function ProjectCard({
  p,
  index,
  inView,
}: {
  p: Project;
  index: number;
  inView: boolean;
}) {
  const href = `/work/${p.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className="card"
    >
      <Link
        href={href}
        className="card-media"
        aria-label={`Read more about ${p.title}`}
        style={{
          display: "block",
          background: p.image
            ? undefined
            : "radial-gradient(120% 120% at 15% 0%, color-mix(in srgb, var(--accent) 26%, transparent), transparent 60%), var(--bg-2)",
        }}
      >
        {p.image ? (
          <Image
            src={p.image}
            alt=""
            fill
            sizes="(max-width: 720px) 100vw, 380px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <span
            className="display"
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              padding: "1rem",
              textAlign: "center",
              fontSize: "1.1rem",
              color: "var(--text-2)",
            }}
          >
            {p.title}
          </span>
        )}
        {p.video && (
          <span className="mono card-badge" style={{ zIndex: 2 }}>
            ▶ Demo
          </span>
        )}
      </Link>

      <div
        style={{
          padding: "1.15rem 1.25rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
          flex: 1,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.75rem" }}>
          <h3
            style={{
              fontSize: "0.97rem",
              fontWeight: 600,
              letterSpacing: "-0.015em",
              lineHeight: 1.35,
            }}
          >
            <Link href={href}>{p.title}</Link>
          </h3>
          <span className="mono" style={{ fontSize: "0.68rem", color: "var(--text-3)" }}>
            {p.year}
          </span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {p.stack.slice(0, 3).map((t) => (
            <span key={t} className="mono tag">
              {t}
            </span>
          ))}
        </div>

        <p
          style={{
            fontSize: "0.84rem",
            color: "var(--text-2)",
            lineHeight: 1.7,
            flex: 1,
          }}
        >
          {p.desc}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
          <Link href={href} className="link-arrow" style={{ color: "var(--text)" }}>
            Read more <ArrowRight size={14} />
          </Link>
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className="link-arrow" aria-label={`${p.title} source code`}>
              <SiGithub size={14} /> Code
            </a>
          )}
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="link-arrow" style={{ color: "var(--accent)" }}>
              {p.liveLabel ?? "Live"} <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectGroup({ meta, position }: { meta: (typeof sections)[number]; position: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const items = projectsBySection(meta.id);
  const featured = meta.id === "work";
  const sectionIndex = position;

  if (items.length === 0) return null;

  return (
    <div
      ref={ref}
      id={`projects-${meta.id}`}
      style={{
        scrollMarginTop: "calc(var(--nav-h) + 16px)",
        paddingTop: sectionIndex === 0 ? 0 : "clamp(3.5rem, 7vw, 5.5rem)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "1rem 2rem",
          flexWrap: "wrap",
          marginBottom: featured ? "2.75rem" : "2rem",
        }}
      >
        <div>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>
            {String(sectionIndex + 1).padStart(2, "0")} · {meta.eyebrow}
          </p>
          {featured ? (
            <h2 className="section-title">{meta.title}</h2>
          ) : (
            <h3 className="display" style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.75rem)" }}>
              {meta.title}
            </h3>
          )}
        </div>
        <p style={{ fontSize: "0.86rem", color: "var(--text-3)", maxWidth: "44ch", lineHeight: 1.65 }}>
          {meta.blurb}
        </p>
      </motion.div>

      <div className="grid-auto">
        {items.map((p, i) => (
          <ProjectCard key={p.slug} p={p} index={i} inView={inView} />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  // Empty sections (e.g. Volunteer before it has entries) are hidden and don't take a number.
  // University lives in its own low-key <UniversityProjects /> section above Contact.
  const visible = sections.filter((s) => s.id !== "university" && projectsBySection(s.id).length > 0);

  return (
    <section id="projects" className="section" style={{ background: "var(--bg-2)" }}>
      <div className="shell">
        {visible.map((s, i) => (
          <ProjectGroup key={s.id} meta={s} position={i} />
        ))}
      </div>
    </section>
  );
}
