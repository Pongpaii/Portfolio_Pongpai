"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail, Phone } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

const EMAIL = "pongpai1112@gmail.com";

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const channels = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pongpai-sodsong", icon: FaLinkedin },
  { label: "GitHub", href: "https://github.com/Pongpaii", icon: SiGithub },
  { label: "0996156399", href: "tel:0996156399", icon: Phone },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" ref={ref} className="section" style={{ position: "relative", overflow: "hidden" }}>
      <div className="aurora" aria-hidden style={{ opacity: 0.6 }}>
        <span className="a2" />
        <span className="a3" />
      </div>

      <motion.div
        className="shell"
        variants={stagger}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        style={{ position: "relative", zIndex: 1 }}
      >
        <motion.p variants={fadeUp} className="eyebrow" style={{ marginBottom: "1.5rem" }}>
          Contact
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="display"
          style={{ fontSize: "clamp(2.4rem, 8vw, 5rem)", marginBottom: "1.5rem" }}
        >
          Let&apos;s build
          <br />
          <span className="grad-text">something together.</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="lede" style={{ maxWidth: "48ch", marginBottom: "2.5rem" }}>
          My 5-month contract at Com7 (AWS) runs until December 2026, so I&apos;m available from
          January 2027 for frontend or product-minded roles. Say hi — I reply fast.
        </motion.p>

        <motion.div variants={fadeUp} style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          <a href={`mailto:${EMAIL}`} className="btn btn-primary">
            <Mail size={15} /> {EMAIL}
          </a>
          <button type="button" onClick={copy} className="btn" aria-live="polite">
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied" : "Copy email"}
          </button>
        </motion.div>

        <motion.div variants={fadeUp} style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          {channels.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="chip"
                style={{ padding: "0.55rem 1rem", fontSize: "0.8rem" }}
              >
                <Icon size={15} /> {c.label}
                {c.href.startsWith("http") && <ArrowUpRight size={13} />}
              </a>
            );
          })}
        </motion.div>

        <motion.footer
          variants={fadeUp}
          style={{
            marginTop: "clamp(3.5rem, 8vw, 6rem)",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <span className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", color: "var(--text-3)" }}>
            © {new Date().getFullYear()} PONGPAI SODSONG
          </span>
          <span className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.1em", color: "var(--text-3)" }}>
            NEXT.JS · FRAMER MOTION · DEPLOYED ON VERCEL
          </span>
        </motion.footer>
      </motion.div>
    </section>
  );
}
