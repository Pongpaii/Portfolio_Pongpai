import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import ProjectGallery from "@/components/ProjectGallery";
import { getProject, orderedProjects, projects, sectionMeta } from "@/lib/projects";
import { navLinks } from "@/lib/siteConfig";

// Every project is known at build time; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} — Pongpai Sodsong`,
    description: p.desc,
    openGraph: {
      title: p.title,
      description: p.desc,
      images: p.image ? [p.image] : undefined,
    },
  };
}

type Block =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "list"; items: { text: string; sub: string[] }[] };

/** Turns the lightweight `details` markup (see lib/projects.ts) into render blocks. */
function parseDetails(src: string): Block[] {
  const blocks: Block[] = [];
  for (const raw of src.split("\n")) {
    const line = raw.trim();
    if (!line) continue;

    const last = blocks[blocks.length - 1];
    const heading = line.match(/^\[\s*(.+?)\s*\]$/);

    if (heading) {
      blocks.push({ kind: "h", text: heading[1] });
    } else if (line.startsWith("•")) {
      const item = { text: line.slice(1).trim(), sub: [] as string[] };
      if (last?.kind === "list") last.items.push(item);
      else blocks.push({ kind: "list", items: [item] });
    } else if (line.startsWith("- ") && last?.kind === "list") {
      last.items[last.items.length - 1].sub.push(line.slice(2).trim());
    } else {
      blocks.push({ kind: "p", text: line });
    }
  }
  return blocks;
}

/** Bold the "Label:" prefix of a bullet so long lists are scannable. */
function Labeled({ text }: { text: string }) {
  const m = text.match(/^([^:：]{2,48})[:：]\s*(.*)$/);
  if (!m) return <>{text}</>;
  return (
    <>
      <strong style={{ color: "var(--text)", fontWeight: 600 }}>{m[1]}</strong>
      {m[2] ? <> — {m[2]}</> : null}
    </>
  );
}

export default async function WorkPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const meta = sectionMeta(p.section);
  const blocks = parseDetails(p.details);

  const ordered = orderedProjects();
  const idx = ordered.findIndex((x) => x.slug === p.slug);
  const prev = ordered[(idx - 1 + ordered.length) % ordered.length];
  const next = ordered[(idx + 1) % ordered.length];

  return (
    <>
      <ScrollProgress />
      <Navbar links={navLinks()} />
      <main className="work-page">
        <article className="shell work-shell">
          <Link href={`/#projects-${p.section}`} className="link-arrow" style={{ marginBottom: "2.25rem" }}>
            <ArrowLeft size={14} /> Back to {meta.eyebrow.toLowerCase()}
          </Link>

          <header style={{ marginBottom: "2.5rem" }}>
            <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>
              {meta.eyebrow} · {p.year}
            </p>
            <h1 className="display" style={{ fontSize: "clamp(1.9rem, 5vw, 3.2rem)", lineHeight: 1.1, marginBottom: "1rem" }}>
              {p.title}
            </h1>
            {p.role && (
              <p style={{ fontSize: "0.92rem", color: "var(--accent)", fontWeight: 500, marginBottom: "1.25rem" }}>{p.role}</p>
            )}
            <p className="lede" style={{ maxWidth: "62ch" }}>
              {p.desc}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "1.5rem" }}>
              {p.stack.map((t) => (
                <span key={t} className="chip" style={{ fontSize: "0.72rem" }}>
                  {t}
                </span>
              ))}
            </div>

            {(p.github || p.live) && (
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-sm">
                    <SiGithub size={14} /> View code <ArrowUpRight size={13} />
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                    {p.liveLabel ?? "Live"} <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            )}
          </header>

          {p.video ? (
            <div className="work-hero">
              <video autoPlay loop muted playsInline controls poster={p.image ?? undefined}>
                <source src={p.video} type="video/mp4" />
              </video>
            </div>
          ) : (
            p.image && (
              <div className="work-hero" style={{ aspectRatio: "16 / 9" }}>
                <Image src={p.image} alt={p.title} fill priority sizes="(max-width: 960px) 100vw, 920px" style={{ objectFit: "cover" }} />
              </div>
            )
          )}

          <div className="work-body">
            {blocks.map((b, i) => {
              if (b.kind === "h") return <h2 key={i}>{b.text}</h2>;
              if (b.kind === "p") return <p key={i}>{b.text}</p>;
              return (
                <ul key={i} className="bullets work-bullets">
                  {b.items.map((it) => (
                    <li key={it.text}>
                      <Labeled text={it.text} />
                      {it.sub.length > 0 && (
                        <ul className="work-sub">
                          {it.sub.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              );
            })}
          </div>

          {p.gallery && p.gallery.length > 0 && (
            <section style={{ marginTop: "3.5rem" }} aria-label="Screens">
              <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>
                Screens
              </p>
              <ProjectGallery shots={p.gallery} />
            </section>
          )}

          <nav aria-label="More projects" className="work-pager">
            <Link href={`/work/${prev.slug}`} className="work-pager-link">
              <span className="mono work-pager-label">
                <ArrowLeft size={12} /> Previous
              </span>
              <span className="work-pager-title">{prev.title}</span>
            </Link>
            <Link href={`/work/${next.slug}`} className="work-pager-link" style={{ textAlign: "right" }}>
              <span className="mono work-pager-label" style={{ justifyContent: "flex-end" }}>
                Next <ArrowRight size={12} />
              </span>
              <span className="work-pager-title">{next.title}</span>
            </Link>
          </nav>
        </article>
      </main>
    </>
  );
}
