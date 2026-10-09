"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projectsBySection, sectionMeta, type Project } from "@/lib/projects";

type View = "carousel" | "list";

/** Image card used in the auto-scrolling carousel. */
function SlideCard({ p, hidden }: { p: Project; hidden?: boolean }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className="uni-slide"
      // The second copy of the track only exists to make the loop seamless.
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      <span className="uni-slide-media">
        {p.image ? (
          <Image src={p.image} alt="" fill sizes="300px" style={{ objectFit: "cover" }} />
        ) : (
          <span className="display uni-slide-fallback">{p.title}</span>
        )}
        {p.video && <span className="mono card-badge">▶ Demo</span>}
      </span>
      <span className="uni-slide-body">
        <span className="mono row-year">{p.year}</span>
        <span className="row-title">{p.title}</span>
        {p.role && <span className="row-role">{p.role}</span>}
      </span>
    </Link>
  );
}

function RowList({ items }: { items: Project[] }) {
  return (
    <ul className="row-list">
      {items.map((p) => (
        <li key={p.slug}>
          <Link href={`/work/${p.slug}`} className="row-link">
            <span className="mono row-year">{p.year}</span>
            <span className="row-main">
              <span className="row-title">{p.title}</span>
              {p.role && <span className="row-role">{p.role}</span>}
            </span>
            <span className="row-tags">
              {p.stack.slice(0, 3).map((t) => (
                <span key={t} className="mono tag">
                  {t}
                </span>
              ))}
            </span>
            <ArrowUpRight size={16} className="row-arrow" aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** University projects, shown just above Contact. Carousel by default, with a plain list view. */
export default function UniversityProjects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [view, setView] = useState<View>("carousel");
  const meta = sectionMeta("university");
  const items = projectsBySection("university");

  if (items.length === 0) return null;

  return (
    <section id="projects-university" ref={ref} className="section" style={{ paddingBlock: "clamp(3.5rem, 7vw, 5.5rem)" }}>
      <div className="shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1rem 2rem",
            flexWrap: "wrap",
            marginBottom: "1.75rem",
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: "0.9rem" }}>
              {meta.eyebrow}
            </p>
            <h2 className="display" style={{ fontSize: "clamp(1.2rem, 2.4vw, 1.5rem)", marginBottom: "0.6rem" }}>
              {meta.title}
            </h2>
            <p style={{ fontSize: "0.82rem", color: "var(--text-3)", maxWidth: "52ch", lineHeight: 1.65 }}>{meta.blurb}</p>
          </div>

          <div className="segmented" role="group" aria-label="Display mode">
            {(["carousel", "list"] as const).map((v) => (
              <button
                key={v}
                type="button"
                data-active={view === v}
                aria-pressed={view === v}
                onClick={() => setView(v)}
              >
                {v === "carousel" ? "Carousel" : "List"}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {view === "carousel" ? (
          <motion.div
            key="carousel"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="marquee uni-marquee"
          >
            <div className="marquee-track uni-marquee-track" style={{ animationDuration: `${items.length * 7}s` }}>
              {items.map((p) => (
                <SlideCard key={p.slug} p={p} />
              ))}
              {items.map((p) => (
                <SlideCard key={`${p.slug}-dup`} p={p} hidden />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            className="shell"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
          >
            <RowList items={items} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
