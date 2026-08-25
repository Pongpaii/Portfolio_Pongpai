"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("projects");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 110,
          height: "var(--nav-h)",
          display: "flex",
          alignItems: "center",
          borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
          background: scrolled ? "color-mix(in srgb, var(--bg) 72%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(160%)" : "none",
          transition: "background-color .4s var(--ease), border-color .4s var(--ease)",
        }}
      >
        <div
          className="shell"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}
        >
          <a
            href="#top"
            className="display"
            style={{ fontSize: "0.95rem", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: "0.55rem" }}
          >
            <span
              aria-hidden
              style={{
                width: 9,
                height: 9,
                borderRadius: 3,
                background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              }}
            />
            Pongpai
          </a>

          <nav
            aria-label="Sections"
            style={{ display: "none", alignItems: "center", gap: "0.25rem" }}
            className="nav-desktop"
          >
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                style={{
                  position: "relative",
                  padding: "0.45rem 0.85rem",
                  borderRadius: 999,
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  color: active === l.id ? "var(--text)" : "var(--text-3)",
                  transition: "color .25s",
                }}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 999,
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      zIndex: -1,
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {l.label}
              </a>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ThemeToggle />
            <a href="#contact" className="btn btn-primary btn-sm nav-desktop-cta" style={{ display: "none" }}>
              Get in touch
            </a>
            <button
              type="button"
              className="icon-btn nav-mobile-btn"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 105,
              paddingTop: "calc(var(--nav-h) + 1.5rem)",
              background: "color-mix(in srgb, var(--bg) 92%, transparent)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
            }}
            onClick={() => setOpen(false)}
          >
            <nav className="shell" aria-label="Mobile sections" style={{ display: "grid", gap: "0.4rem" }}>
              {links.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="display"
                  style={{
                    fontSize: "1.6rem",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid var(--border)",
                    color: active === l.id ? "var(--text)" : "var(--text-2)",
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
