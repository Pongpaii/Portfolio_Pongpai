import rawConfig from "@/content/site-config.json";

/**
 * Homepage section registry + layout config.
 *
 * The owner edits order/visibility through /admin (dev only), which writes
 * content/site-config.json. That file is committed and read at build time,
 * so the production site stays fully static.
 */

export const SECTION_IDS = ["hero", "projects", "skills", "about", "certifications", "university", "contact"] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export type SectionSetting = { id: SectionId; enabled: boolean };

export type SiteConfig = { sections: SectionSetting[] };

/** Display metadata. `nav` is the Navbar label; sections without it don't appear in the menu. */
export const SECTION_META: Record<SectionId, { label: string; nav?: string; anchor: string }> = {
  hero: { label: "Hero (intro)", anchor: "top" },
  projects: { label: "Work projects", nav: "Work", anchor: "projects" },
  skills: { label: "Skills", nav: "Skills", anchor: "skills" },
  about: { label: "Experience", nav: "Experience", anchor: "about" },
  certifications: { label: "Certificates", nav: "Certificates", anchor: "certifications" },
  university: { label: "University projects", nav: "University", anchor: "projects-university" },
  contact: { label: "Contact", nav: "Contact", anchor: "contact" },
};

function isSectionId(v: unknown): v is SectionId {
  return typeof v === "string" && (SECTION_IDS as readonly string[]).includes(v);
}

/**
 * Validates untrusted input and returns a complete config:
 * unknown ids and duplicates are dropped, missing sections are appended (enabled).
 * Returns null if the shape is not usable at all.
 */
export function normalizeConfig(input: unknown): SiteConfig | null {
  if (typeof input !== "object" || input === null) return null;
  const list = (input as { sections?: unknown }).sections;
  if (!Array.isArray(list)) return null;

  const seen = new Set<SectionId>();
  const sections: SectionSetting[] = [];

  for (const item of list) {
    if (typeof item !== "object" || item === null) continue;
    const { id, enabled } = item as { id?: unknown; enabled?: unknown };
    if (!isSectionId(id) || seen.has(id)) continue;
    seen.add(id);
    sections.push({ id, enabled: enabled !== false });
  }

  for (const id of SECTION_IDS) {
    if (!seen.has(id)) sections.push({ id, enabled: true });
  }

  return { sections };
}

const DEFAULT_CONFIG: SiteConfig = { sections: SECTION_IDS.map((id) => ({ id, enabled: true })) };

export const siteConfig: SiteConfig = normalizeConfig(rawConfig) ?? DEFAULT_CONFIG;

/** Enabled section ids in display order. */
export function enabledSections(config: SiteConfig = siteConfig): SectionId[] {
  return config.sections.filter((s) => s.enabled).map((s) => s.id);
}

/** Navbar links following the configured order, only for enabled sections. */
export function navLinks(config: SiteConfig = siteConfig): { id: string; label: string }[] {
  return enabledSections(config).flatMap((id) => {
    const meta = SECTION_META[id];
    return meta.nav ? [{ id: meta.anchor, label: meta.nav }] : [];
  });
}
