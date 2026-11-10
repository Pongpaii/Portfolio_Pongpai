"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowUpRight, BadgeCheck } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

type Badge = { id: string; title: string; issuer: string; image: string };

const CREDLY_HOST = "https://www.credly.com";
const SKILLS_PROFILE_URL = "https://skillsprofile.skillbuilder.aws/user/pongpai/certification-badges";

const certification: Badge & { summary: string } = {
  id: "bf24634d-639c-449a-a35f-e62ace0d9eaa",
  title: "AWS Certified Cloud Practitioner",
  issuer: "Amazon Web Services",
  image: "https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png",
  summary:
    "Validates foundational knowledge of AWS Cloud concepts, core services, security, architecture, pricing and support.",
};

const trainingBadges: Badge[] = [
  {
    id: "c3f9e68c-0b84-4c5b-abfa-fe17d9b48ffc",
    title: "AWS SimuLearn: Cloud Practitioner",
    issuer: "Amazon Web Services",
    image: "https://images.credly.com/images/b6b54bbe-b797-49a3-b571-58ca96328b9b/blob",
  },
  {
    id: "2d144263-1886-43e5-8a46-a1cf576c5ea8",
    title: "AWS Cloud Quest: Cloud Practitioner",
    issuer: "Amazon Web Services",
    image: "https://images.credly.com/images/30816e43-2550-4e1c-be22-3f03c5573bb9/blob",
  },
  {
    id: "4ec4dd7e-2279-4ea9-9754-85ea36a03758",
    title: "AWS Knowledge: Cloud Essentials",
    issuer: "Amazon Web Services",
    image: "https://images.credly.com/images/7cf036b0-c609-4378-a7be-9969e1dea7ab/blob",
  },
  {
    id: "d5200073-166d-4a08-bf57-f284f3ca6e6b",
    title: "AWS Cloud Quest: Generative AI Practitioner",
    issuer: "Amazon Web Services",
    image: "https://images.credly.com/images/15fa08e6-ca73-4fa3-94ed-c36f7f157313/blob",
  },
];

const verifyUrl = (id: string) => `${CREDLY_HOST}/badges/${id}/public_url`;

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

        {/* Featured: the actual certification */}
        <motion.article variants={fadeUp} className="cert-feature">
          <div className="cert-feature-media">
            <Image
              src={certification.image}
              alt={`${certification.title} badge`}
              width={168}
              height={168}
              sizes="168px"
            />
          </div>
          <div className="cert-feature-body">
            <span className="cert-pill mono">
              <BadgeCheck size={14} aria-hidden /> Certification · Passed
            </span>
            <h3 className="display cert-feature-title">{certification.title}</h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-3)" }}>{certification.issuer}</p>
            <p className="lede" style={{ fontSize: "0.92rem", maxWidth: "52ch" }}>
              {certification.summary}
            </p>
            <div>
              <a
                href={verifyUrl(certification.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-primary"
              >
                Verify on Credly <ArrowUpRight size={14} aria-hidden />
              </a>
            </div>
          </div>
        </motion.article>

        {/* Supporting training badges */}
        <motion.p variants={fadeUp} className="mono cert-subhead">
          Training badges
        </motion.p>
        <ul className="badge-grid">
          {trainingBadges.map((b) => (
            <motion.li key={b.id} variants={fadeUp}>
              <a
                href={verifyUrl(b.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="badge-tile"
                aria-label={`${b.title} — verify on Credly`}
              >
                <Image src={b.image} alt="" width={84} height={84} sizes="84px" />
                <span className="badge-tile-title">{b.title}</span>
                <span className="badge-tile-meta">
                  {b.issuer} <ArrowUpRight size={12} aria-hidden className="badge-tile-arrow" />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
