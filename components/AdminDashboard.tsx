"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUp, Eye, EyeOff, RotateCcw, Save } from "lucide-react";
import { SECTION_IDS, SECTION_META, type SectionSetting, type SiteConfig } from "@/lib/siteConfig";

type Status = { kind: "idle" | "saving" | "saved" | "error"; message?: string };

const DEFAULT_SECTIONS: SectionSetting[] = SECTION_IDS.map((id) => ({ id, enabled: true }));

export default function AdminDashboard({ initial }: { initial: SiteConfig }) {
  const [saved, setSaved] = useState<SectionSetting[]>(initial.sections);
  const [sections, setSections] = useState<SectionSetting[]>(initial.sections);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const dirty = JSON.stringify(sections) !== JSON.stringify(saved);
  const enabledCount = sections.filter((s) => s.enabled).length;

  function move(index: number, delta: -1 | 1) {
    const target = index + delta;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    setSections(next);
    setStatus({ kind: "idle" });
  }

  function toggle(index: number) {
    setSections(sections.map((s, i) => (i === index ? { ...s, enabled: !s.enabled } : s)));
    setStatus({ kind: "idle" });
  }

  async function save() {
    setStatus({ kind: "saving" });
    try {
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(err?.error ?? `HTTP ${res.status}`);
      }
      const data = (await res.json()) as SiteConfig;
      setSaved(data.sections);
      setSections(data.sections);
      setStatus({ kind: "saved", message: "Saved to content/site-config.json — commit & push to publish." });
    } catch (e) {
      setStatus({ kind: "error", message: e instanceof Error ? e.message : "Save failed" });
    }
  }

  return (
    <main className="shell admin">
      <Link href="/" className="link-arrow" style={{ marginBottom: "2rem" }}>
        <ArrowLeft size={14} /> Back to site
      </Link>

      <header style={{ marginBottom: "2rem" }}>
        <p className="eyebrow" style={{ marginBottom: "1rem" }}>
          Dev only · Owner dashboard
        </p>
        <h1 className="section-title" style={{ marginBottom: "0.75rem" }}>
          Homepage sections
        </h1>
        <p style={{ color: "var(--text-3)", fontSize: "0.88rem", maxWidth: "60ch", lineHeight: 1.7 }}>
          Show, hide and reorder sections. The navbar follows the same order. Saving writes{" "}
          <code className="mono">content/site-config.json</code>; this page only exists while running{" "}
          <code className="mono">npm run dev</code>.
        </p>
      </header>

      <ol className="admin-list" aria-label="Sections in display order">
        {sections.map((s, i) => {
          const meta = SECTION_META[s.id];
          return (
            <li key={s.id} className="glass admin-row" data-enabled={s.enabled}>
              <span className="mono admin-index" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="admin-name">
                <span style={{ fontWeight: 600 }}>{meta.label}</span>
                <span className="mono" style={{ fontSize: "0.7rem", color: "var(--text-3)" }}>
                  #{meta.anchor}
                  {meta.nav ? ` · nav: ${meta.nav}` : " · not in nav"}
                </span>
              </span>

              <span className="admin-actions">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label={`Move ${meta.label} up`}
                >
                  <ArrowUp size={15} />
                </button>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => move(i, 1)}
                  disabled={i === sections.length - 1}
                  aria-label={`Move ${meta.label} down`}
                >
                  <ArrowDown size={15} />
                </button>
                <button
                  type="button"
                  role="switch"
                  aria-checked={s.enabled}
                  aria-label={`Show ${meta.label}`}
                  className="admin-switch"
                  onClick={() => toggle(i)}
                >
                  {s.enabled ? <Eye size={14} aria-hidden /> : <EyeOff size={14} aria-hidden />}
                  {s.enabled ? "Shown" : "Hidden"}
                </button>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="admin-footer">
        <span style={{ fontSize: "0.8rem", color: "var(--text-3)" }}>
          {enabledCount} of {sections.length} shown
        </span>
        <span style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => {
              setSections(DEFAULT_SECTIONS);
              setStatus({ kind: "idle" });
            }}
          >
            <RotateCcw size={14} aria-hidden /> Reset to default
          </button>
          <button
            type="button"
            className="btn btn-sm"
            disabled={!dirty}
            onClick={() => {
              setSections(saved);
              setStatus({ kind: "idle" });
            }}
          >
            Discard
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={!dirty || status.kind === "saving"}
            onClick={save}
          >
            <Save size={14} aria-hidden /> {status.kind === "saving" ? "Saving…" : "Save"}
          </button>
        </span>
      </div>

      <p
        role="status"
        aria-live="polite"
        style={{
          minHeight: "1.5em",
          marginTop: "1rem",
          fontSize: "0.82rem",
          color: status.kind === "error" ? "#ef4444" : "var(--accent)",
        }}
      >
        {status.kind === "error" ? `Error: ${status.message}` : status.message}
        {status.kind === "saved" && (
          <>
            {" "}
            <Link href="/" style={{ textDecoration: "underline" }}>
              View site
            </Link>
          </>
        )}
      </p>
    </main>
  );
}
