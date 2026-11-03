"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

type Badge = { id: string; title: string; issuer: string };

const badges: Badge[] = [
  {
    id: "c3f9e68c-0b84-4c5b-abfa-fe17d9b48ffc",
    title: "AWS SimuLearn - Cloud Practitioner - Training Badge",
    issuer: "Amazon Web Services",
  },
  {
    id: "2d144263-1886-43e5-8a46-a1cf576c5ea8",
    title: "AWS Cloud Quest: Cloud Practitioner - Training Badge",
    issuer: "Amazon Web Services",
  },
  {
    id: "4ec4dd7e-2279-4ea9-9754-85ea36a03758",
    title: "AWS Knowledge: Cloud Essentials - Training Badge",
    issuer: "Amazon Web Services",
  },
  {
    id: "d5200073-166d-4a08-bf57-f284f3ca6e6b",
    title: "AWS Cloud Quest: Generative AI Practitioner - Training Badge",
    issuer: "Amazon Web Services",
  },
];

const CREDLY_HOST = "https://www.credly.com";
const SKILLS_PROFILE_URL = "https://skillsprofile.skillbuilder.aws/user/pongpai/certification-badges";

export default function Certifications() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="certifications" ref={ref} className="section">
      <motion.div className="shell" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
        <motion.div
          variants={fadeUp}
          style={{
            marginBottom: "2rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: "1.1rem" }}>
              Learning
            </p>
            <h2 className="section-title">Certificates & badges</h2>
          </div>
          <a
            href={SKILLS_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
          >
            View all on AWS Skills Profile <ArrowUpRight size={14} aria-hidden />
          </a>
        </motion.div>

        <div className="grid-2x2">
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
