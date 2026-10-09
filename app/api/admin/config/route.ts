import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { normalizeConfig } from "@/lib/siteConfig";

/**
 * Dev-only config API for the /admin dashboard.
 * In any non-development build every method returns 404, so nothing can be
 * written on the deployed site (Vercel's filesystem is read-only anyway).
 */

const CONFIG_PATH = path.join(process.cwd(), "content", "site-config.json");
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

function notFound() {
  return new Response("Not found", { status: 404 });
}

/** Only allow requests addressed to this machine (blocks other devices on the LAN). */
function isLocal(request: Request): boolean {
  const host = new URL(request.url).hostname;
  return LOCAL_HOSTS.has(host);
}

export async function GET(request: Request) {
  if (process.env.NODE_ENV !== "development" || !isLocal(request)) return notFound();

  const raw = await readFile(CONFIG_PATH, "utf8");
  const config = normalizeConfig(JSON.parse(raw));
  return Response.json(config);
}

export async function PUT(request: Request) {
  if (process.env.NODE_ENV !== "development" || !isLocal(request)) return notFound();

  // Reject cross-site writes: a page on another origin must not be able to edit the config.
  const origin = request.headers.get("origin");
  if (!origin || new URL(origin).host !== new URL(request.url).host) {
    return Response.json({ error: "Cross-origin request rejected" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const config = normalizeConfig(body);
  if (!config) return Response.json({ error: "Expected { sections: [...] }" }, { status: 400 });

  await writeFile(CONFIG_PATH, JSON.stringify(config, null, 2) + "\n", "utf8");
  return Response.json(config);
}
