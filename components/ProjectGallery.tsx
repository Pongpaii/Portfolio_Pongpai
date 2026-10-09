"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Shot = { src: string; caption: string };

/** Screenshot grid with a keyboard-navigable lightbox. */
export default function ProjectGallery({ shots }: { shots: Shot[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(() => setOpen((i) => (i === null ? i : (i + 1) % shots.length)), [shots.length]);
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + shots.length) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    if (open === null) return;
    document.body.classList.add("no-scroll");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, next, prev]);

  const current = open !== null ? shots[open] : null;

  return (
    <>
      <div className="work-gallery">
        {shots.map((shot, i) => (
          <figure key={shot.src} style={{ margin: 0 }}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Zoom: ${shot.caption}`}
              className="work-gallery-thumb"
            >
              <Image src={shot.src} alt={shot.caption} fill sizes="(max-width: 720px) 100vw, 520px" style={{ objectFit: "cover" }} />
            </button>
            <figcaption style={{ fontSize: "0.78rem", color: "var(--text-3)", lineHeight: 1.55, marginTop: "0.55rem" }}>
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <AnimatePresence>
        {current && open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 160,
              display: "grid",
              placeItems: "center",
              padding: "clamp(1rem, 4vw, 3rem)",
              background: "color-mix(in srgb, #000 82%, transparent)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <button
              type="button"
              onClick={close}
              className="icon-btn"
              aria-label="Close image"
              style={{ position: "absolute", top: "1.25rem", right: "1.25rem", zIndex: 3 }}
            >
              <X size={16} />
            </button>

            {shots.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="icon-btn"
                  aria-label="Previous image"
                  style={{ position: "absolute", left: "1.25rem", top: "50%", transform: "translateY(-50%)", zIndex: 3 }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="icon-btn"
                  aria-label="Next image"
                  style={{ position: "absolute", right: "1.25rem", top: "50%", transform: "translateY(-50%)", zIndex: 3 }}
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            <motion.figure
              key={current.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ margin: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.9rem" }}
            >
              <div
                style={{
                  position: "relative",
                  width: "min(1100px, 90vw)",
                  height: "min(72vh, 80vw)",
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <Image src={current.src} alt={current.caption} fill sizes="90vw" style={{ objectFit: "contain" }} />
              </div>
              <figcaption
                style={{ display: "flex", gap: "0.75rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.82)", textAlign: "center" }}
              >
                {shots.length > 1 && (
                  <span className="mono" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {open + 1} / {shots.length}
                  </span>
                )}
                {current.caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
