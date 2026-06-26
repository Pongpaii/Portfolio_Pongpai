"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, Variants } from "framer-motion";
import { SiTypescript, SiReact, SiHtml5, SiLaravel, SiFigma } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

// ระบุประเภทตัวแปรระนาบเดียวกันเป็น Variants เพื่อไม่ให้ TypeScript บ่นเรื่องข้อผิดพลาดแอนิเมชัน
const stagger: Variants = { 
  hidden: {}, 
  show: { transition: { staggerChildren: 0.1 } } 
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const techStack = [
  { icon: SiFigma, label: "Figma", color: "#F24E1E" },
  { icon: SiHtml5, label: "HTML5", color: "#E34F26" },
  { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { icon: SiReact, label: "React Native / React", color: "#61DAFB" },
  { icon: TbBrandCSharp, label: "C#", color: "#239120" },
  { icon: SiLaravel, label: "Laravel", color: "#FF2D20" },
];

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  const buttonStyle = {
    padding: "12px 24px",
    borderRadius: "4px",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    cursor: "pointer",
    textDecoration: "none",
  };

  return (
    <>
      {/* Premium Blend-mode Cursor */}
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9999,
          pointerEvents: "none", mixBlendMode: "difference",
          x: cursorXSpring, y: cursorYSpring,
          translateX: "-50%", translateY: "-50%",
          width: isHovered ? 48 : 10,
          height: isHovered ? 48 : 10,
          borderRadius: "50%",
          backgroundColor: "var(--text, #fff)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      />

      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "0 2.5rem",
        borderBottom: "1px solid var(--border)", position: "relative",
        background: "var(--background)", overflow: "hidden"
      }}>
        {/* ครอบด้วยผืนแอนิเมชันใหญ่ (Stagger) */}
        <motion.div variants={stagger} initial="hidden" animate="show"
          style={{ maxWidth: "1080px", margin: "0 auto", width: "100%" }}
        >
          {/* Eyebrow */}
          <motion.p variants={fadeUp} style={{
            fontSize: "0.68rem", color: "var(--text-3)",
            letterSpacing: "0.2em", marginBottom: "1.5rem", fontWeight: 500
          }}>
            PORTFOLIO — 2026
          </motion.p>

          {/* Name + role */}
          <motion.div variants={fadeUp} style={{ marginBottom: "1.5rem" }}>
            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700,
              letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "0.5rem"
            }}>
              Pongpai Sodsong
            </h1>
            <p style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "var(--text-2)",
              fontWeight: 400, letterSpacing: "-0.02em", opacity: 0.9
            }}>
              Junior Developer <span style={{ color: "var(--text-3)", fontWeight: 300 }}></span> 
            </p>
          </motion.div>

          {/* Tech Stack Icons */}
          <motion.div 
            variants={fadeUp}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "1.2rem", 
              marginBottom: "2rem",
              background: "rgba(255,255,255,0.03)", 
              padding: "10px 16px",
              borderRadius: "8px",
              width: "fit-content",
              border: "1px solid rgba(255,255,255,0.05)"
            }}
          >
            <span style={{ fontSize: "0.7rem", color: "var(--text-3)", letterSpacing: "0.05em", marginRight: "0.5rem" }}>
              
            </span>
            {techStack.map((tech, idx) => {
              const IconComponent = tech.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4, scale: 1.1 }}
                  style={{ 
                    position: "relative", 
                    display: "flex", 
                    cursor: "pointer",
                    color: "var(--text-2)" 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = tech.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-2)";
                  }}
                  title={tech.label}
                >
                  <IconComponent size={22} style={{ transition: "color 0.2s ease" }} />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Location + status */}
          <motion.div variants={fadeUp} style={{
            display: "flex", alignItems: "center", gap: "1.5rem",
            marginBottom: "3.5rem", flexWrap: "wrap",
          }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "var(--text-2)" }}>
              <span style={{ 
                width: 6, height: 6, borderRadius: "50%", background: "#22c55e", 
                boxShadow: "0 0 12px #22c55e" 
              }} />
              Bangkok · Phatthanakan
            </span>
            <span style={{ width: "1px", height: "12px", background: "var(--border)" }} />
            <span style={{ fontSize: "0.8rem", color: "var(--text-3)", letterSpacing: "0.02em" }}>Available for hire</span>
          </motion.div>

          {/* Bottom Layout Split */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            gap: "3rem", flexWrap: "wrap"
          }}>
            
            {/* Bio */}
            <motion.p variants={fadeUp} style={{
              fontSize: "1rem", color: "var(--text-2)", lineHeight: 1.8,
              maxWidth: "560px", margin: 0, flex: "1 1 450px", fontWeight: 400
            }}>
              Multimedia Technology grad, First Class Honors. An agile learner who loves hands-on experimentation. 
              I bridge the gap between design and development — blending Figma prototyping with TypeScript coding 
              to build seamless digital experiences.
            </motion.p>

            {/* Buttons Group */}
            <motion.div variants={fadeUp} style={{ 
              display: "flex", gap: "0.75rem", flexWrap: "wrap", flex: "1 1 auto", justifyContent: "flex-start"
            }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <a href="mailto:pongpai1112@gmail.com"
                style={{
                  ...buttonStyle,
                  background: "var(--text)", color: "var(--background, #fff)",
                  border: "1px solid var(--text)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                Send Email &nbsp;↗
              </a>
              
              {[
                { label: "LinkedIn", url: "https://www.linkedin.com/in/pongpai-sodsong" },
                { label: "GitHub", url: "https://github.com/Pongpaii" },
                { label: "Resume", url: "public/resume.pdf" }
              ].map((link, index) => (
                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    ...buttonStyle,
                    border: "1px solid var(--border)", color: "var(--text)", background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--text)";
                    e.currentTarget.style.background = "var(--border)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {link.label} &nbsp;↗
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.5 }}
          style={{ position: "absolute", bottom: "2rem", left: "2.5rem", 
            fontSize: "0.68rem", color: "var(--text-3)", letterSpacing: "0.15em",
            display: "flex", alignItems: "center", gap: "8px" }}
        >
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            ↓
          </motion.span>
          <span>SCROLL TO DISCOVER</span>
        </motion.div>
      </section>
    </>
  );
}