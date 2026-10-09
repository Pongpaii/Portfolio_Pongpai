"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";
import { FaAws } from "react-icons/fa6";
import { ArrowUpRight, BookOpenCheck } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

type Course = { title: string; issuer: string; status: string; tags: string[]; image?: string };

const courses: Course[] = [
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "AWS Skill Builder",
    status: "Completed",
    tags: ["Cloud Concepts", "AWS Services", "Security", "Billing & Pricing"],
    image: "/images/AWS Cloud Practitioner Essentials.png",
  },
];

type Badge = { id: string; title: string; issuer: string };

const badges: Badge[] = [
  {
    id: "c3f9e68c-0b84-4c5b-abfa-fe17d9b48ffc",
    title: "AWS SimuLearn - Cloud Practitioner - Training Badge",
    issuer: "Amazon Web Services",
  },
];

const CREDLY_HOST = "https://www.credly.com";

export default function Certifications() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="certifications" ref={ref} className="section">
      <motion.div className="shell" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
        <motion.div variants={fadeUp} style={{ marginBottom: "2rem" }}>
          <p className="eyebrow" style={{ marginBottom: "1.1rem" }}>
            Learning
          </p>
          <h2 className="section-title">Courses & certificates</h2>
        </motion.div>

        <div className="grid-auto">
          {/* Courses */}
          {courses.map((c) => (
            <motion.article key={c.title} variants={fadeUp} className="glass" style={{ padding: "1.4rem 1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <span style={{ color: "#FF9900", display: "flex" }}>
                  <FaAws size={26} />
                </span>
                <span
                  className="mono"
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                  }}
                >
                  Course · {c.status}
                </span>
              </div>
              <h3 className="display" style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                {c.title}
              </h3>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--text-3)",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <BookOpenCheck size={14} aria-hidden /> {c.issuer}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {c.tags.map((t) => (
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

              {c.image && (
                <a
                  href={c.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View full certificate"
                  style={{
                    display: "block",
                    marginTop: "1.2rem",
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 3",
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    background: "#fff",
                  }}
                >
                  <Image
                    src={c.image}
                    alt={`${c.title} certificate`}
                    fill
                    sizes="(max-width: 720px) 100vw, 380px"
                    style={{ objectFit: "contain" }}
                  />
                </a>
              )}
            </motion.article>
          ))}

          {/* Credly badges — rendered as the same iframe Credly's embed.js would inject */}
          {badges.map((b) => (
            <motion.article
              key={b.id}
              variants={fadeUp}
              className="glass"
              style={{
                padding: "1.4rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "0.9rem",
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  alignSelf: "flex-start",
                }}
              >
                Badge · Credly
              </span>
              <iframe
                src={`${CREDLY_HOST}/embedded_badge/${b.id}`}
                title={b.title}
                width={150}
                height={270}
                loading="lazy"
                frameBorder={0}
                scrolling="no"
                style={{ border: 0, borderRadius: 12, background: "#fff" }}
              />
              <div>
                <h3 className="display" style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.2rem" }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: "0.78rem", color: "var(--text-3)" }}>{b.issuer}</p>
              </div>
              <a
                href={`${CREDLY_HOST}/badges/${b.id}/public_url`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
              >
                Verify on Credly <ArrowUpRight size={14} aria-hidden />
              </a>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
