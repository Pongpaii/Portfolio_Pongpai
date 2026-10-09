import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";
import { normalizeConfig, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Admin — Site sections",
  robots: { index: false, follow: false },
};

/** Dev-only dashboard. Production builds render a 404 here. */
export default async function AdminPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  // Read the file directly so the dashboard always shows what's on disk.
  const raw = await readFile(path.join(process.cwd(), "content", "site-config.json"), "utf8");
  const config = normalizeConfig(JSON.parse(raw)) ?? siteConfig;

  return <AdminDashboard initial={config} />;
}
