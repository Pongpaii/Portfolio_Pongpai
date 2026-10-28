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
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { useMediaQuery } from "./useMediaQuery";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

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
        <motion.h1
          variants={fadeUp}
          className="display hero-name"
          style={{ fontSize: "clamp(2rem, 5.2vw, 3.4rem)", marginBottom: "1.5rem" }}
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
          className="display"
          style={{
            fontSize: "clamp(1.15rem, 2.4vw, 1.6rem)",
            color: "var(--text-2)",
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
            maxWidth: "28ch",
            marginTop: "-0.6rem",
            marginBottom: "1.75rem",
          }}
        >
          Building, teaching, <span className="grad-text">and fixing things in real time.</span>
        </motion.p>

        <div className="two-col" style={{ alignItems: "end" }}>
          <motion.div variants={fadeUp}>
            <p className="lede" style={{ maxWidth: "44ch" }}>
              From a shop&apos;s back-office system to AWS labs for 10 cohorts of learners — I like the
              part where an idea becomes something real.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "1rem" }}>
              {["AWS Lab TA · Com7", "2 apps live on AWS", "First Class Honors · TNI"].map((t) => (
                <span key={t} className="chip mono" style={{ fontSize: "0.68rem" }}>
                  {t}
                </span>
              ))}
            </div>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                marginTop: "1rem",
                fontSize: "0.8rem",
                color: "var(--text-3)",
              }}
            >
              <MapPin size={14} /> Rayong &amp; Bangkok
            </span>
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
