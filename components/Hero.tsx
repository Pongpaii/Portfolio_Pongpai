"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, FileText, Mail, MapPin } from "lucide-react";
import {
  SiFigma,
  SiGithub,
  SiHtml5,
  SiLaravel,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaAws, FaLinkedin } from "react-icons/fa6";
import { TbBrandCSharp } from "react-icons/tb";
import { useMediaQuery } from "./useMediaQuery";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

const marqueeItems = [
  { icon: FaAws, label: "AWS" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiReact, label: "React / React Native" },
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiTailwindcss, label: "Tailwind CSS" },
  { icon: SiFigma, label: "Figma" },
  { icon: SiLaravel, label: "Laravel" },
  { icon: TbBrandCSharp, label: "C#" },
  { icon: SiHtml5, label: "HTML / CSS" },
];

const quickFacts = [
  { value: "5 months", label: "Current contract @ Com7 · AWS", highlight: true },
  { value: "Dec 2026", label: "Contract ends · free from Jan 2027", highlight: true },
  { value: "3.73", label: "GPA · First Class Honors" },
  { value: "40K+", label: "Followers built as creator" },
];

export default function Hero() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const [hoveringCta, setHoveringCta] = useState(false);

  // Pointer position relative to viewport center, in the range [-1, 1].
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const finePointer = useMediaQuery("(pointer: fine)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const cursorOn = finePointer && !reduceMotion;

  const springCursorX = useSpring(cursorX, { damping: 40, stiffness: 420, mass: 0.35 });
  const springCursorY = useSpring(cursorY, { damping: 40, stiffness: 420, mass: 0.35 });

  // Smooth, springy parallax drivers shared by the aurora blobs.
  const px = useSpring(pointerX, { damping: 50, stiffness: 120, mass: 0.6 });
  const py = useSpring(pointerY, { damping: 50, stiffness: 120, mass: 0.6 });

  // Each aurora layer drifts a different distance for depth.
  const a1x = useTransform(px, [-1, 1], [-42, 42]);
  const a1y = useTransform(py, [-1, 1], [-32, 32]);
  const a2x = useTransform(px, [-1, 1], [34, -34]);
  const a2y = useTransform(py, [-1, 1], [26, -26]);
  const a3x = useTransform(px, [-1, 1], [-22, 22]);
  const a3y = useTransform(py, [-1, 1], [22, -22]);

  // Magnetic CTA cluster — nudges toward the pointer while hovered.
  const ctaRef = useRef<HTMLDivElement>(null);
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const springMagnetX = useSpring(magnetX, { damping: 20, stiffness: 260, mass: 0.4 });
  const springMagnetY = useSpring(magnetY, { damping: 20, stiffness: 260, mass: 0.4 });

  const onCtaMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cursorOn || !ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    magnetX.set(relX * 0.15);
    magnetY.set(relY * 0.3);
  };

  useEffect(() => {
    if (!cursorOn) return;
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      pointerX.set((e.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorOn, cursorX, cursorY, pointerX, pointerY]);

  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        paddingTop: "calc(var(--nav-h) + 3rem)",
        paddingBottom: "3.5rem",
        overflow: "hidden",
      }}
    >
      {cursorOn && (
        <motion.div
          aria-hidden
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 200,
            pointerEvents: "none",
            mixBlendMode: "difference",
            x: springCursorX,
            y: springCursorY,
            translateX: "-50%",
            translateY: "-50%",
            width: hoveringCta ? 46 : 12,
            height: hoveringCta ? 46 : 12,
            borderRadius: "50%",
            background: "#fff",
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.28 }}
        />
      )}

      <div className="aurora" aria-hidden>
        <motion.span className="a1" style={cursorOn ? { x: a1x, y: a1y } : undefined} />
        <motion.span className="a2" style={cursorOn ? { x: a2x, y: a2y } : undefined} />
        <motion.span className="a3" style={cursorOn ? { x: a3x, y: a3y } : undefined} />
      </div>
      <div className="dot-grid" aria-hidden />

      <motion.div
        className="shell"
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ position: "relative", zIndex: 1 }}
      >
        <motion.div variants={fadeUp} style={{ marginBottom: "1.5rem" }}>
          <span className="chip mono" style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}>
            <span className="dot-live" aria-hidden />
            On a 5-month contract at Com7 · AWS — until Dec 2026
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="display hero-name"
          style={{ fontSize: "clamp(2rem, 5.2vw, 3.4rem)", marginBottom: "0.9rem" }}
        >
          {"Pongpai Sodsong".split("").map((ch, i) => (
            <motion.span
              key={i}
              className="hero-name-char"
              whileHover={cursorOn ? { y: -10, color: "var(--accent)" } : undefined}
              transition={{ type: "spring", stiffness: 500, damping: 18 }}
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          style={{
            fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
            color: "var(--text-2)",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            marginBottom: "1.5rem",
          }}
        >
          IT Support / Teaching Assistant{" "}
          <span style={{ color: "var(--text-3)" }}>@ Com7 · AWS</span>
        </motion.p>

        <div className="two-col" style={{ alignItems: "end", marginBottom: "2.5rem" }}>
          <motion.div variants={fadeUp}>
            <p className="lede" style={{ maxWidth: "46ch" }}>
              I support the Education and Enterprise team at Com7 on AWS, mainly as a TA debugging
              live classrooms for the BOI STEM+ camp. It&apos;s a{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                5-month contract that ends in December 2026
              </strong>
              , so I&apos;m already talking to teams about what comes next.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.1rem",
                flexWrap: "wrap",
                marginTop: "1.25rem",
                fontSize: "0.8rem",
                color: "var(--text-3)",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                <MapPin size={14} /> Bangkok · Phatthanakan
              </span>
              <span style={{ width: 1, height: 12, background: "var(--border)" }} aria-hidden />
              <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                Available from January 2027
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            ref={ctaRef}
            onMouseEnter={() => setHoveringCta(true)}
            onMouseMove={onCtaMove}
            onMouseLeave={() => {
              setHoveringCta(false);
              magnetX.set(0);
              magnetY.set(0);
            }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
              x: cursorOn ? springMagnetX : undefined,
              y: cursorOn ? springMagnetY : undefined,
            }}
          >
            <a href="mailto:pongpai1112@gmail.com" className="btn btn-primary">
              <Mail size={15} /> Send email
            </a>
            <a
              href="https://www.linkedin.com/in/pongpai-sodsong"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <FaLinkedin size={14} /> LinkedIn <ArrowUpRight size={14} />
            </a>
            <a
              href="https://github.com/Pongpaii"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <SiGithub size={14} /> GitHub <ArrowUpRight size={14} />
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn">
              <FileText size={15} /> Resume <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* Quick facts */}
        <motion.dl
          variants={fadeUp}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "0.75rem",
            padding: 0,
            marginBottom: "2.5rem",
          }}
        >
          {quickFacts.map((f) => (
            <motion.div
              key={f.label}
              whileHover={cursorOn ? { y: -4 } : undefined}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              style={{
                borderRadius: 14,
                padding: "1.1rem 1.25rem",
                background: f.highlight
                  ? "color-mix(in srgb, var(--accent) 10%, transparent)"
                  : "var(--surface)",
              }}
            >
              <dt
                className="display"
                style={{
                  fontSize: "1.35rem",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.3rem",
                  color: f.highlight ? "var(--accent)" : "var(--text)",
                }}
              >
                {f.value}
              </dt>
              <dd style={{ fontSize: "0.75rem", color: "var(--text-3)", lineHeight: 1.5 }}>
                {f.label}
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        {/* Tech marquee */}
        <motion.div variants={fadeUp} className="marquee" aria-hidden>
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => {
              const Icon = item.icon;
              return (
                <span
                  key={`${item.label}-${i}`}
                  className="mono"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.74rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--text-3)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Icon size={16} /> {item.label}
                </span>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="mono"
        style={{
          position: "absolute",
          bottom: "1.25rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          fontSize: "0.66rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--text-3)",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
        Scroll
      </motion.a>
    </section>
  );
}
