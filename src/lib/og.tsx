import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

export async function ogBackground() {
  const buf = await readFile(join(process.cwd(), "src/assets", "og-bg.png"));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

/** Inter, bundled in src/assets, so the cards use the site's font at real weights. */
export async function ogFonts() {
  const load = (w: number) => readFile(join(process.cwd(), "src/assets", `inter-${w}.woff`));
  const [medium, bold] = await Promise.all([load(500), load(700)]);
  return [
    { name: "Inter", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Inter", data: bold, weight: 700 as const, style: "normal" as const },
  ];
}

/** The profile photo as a data URL, so the share card can embed it without a network call. */
export async function photoDataUrl(publicPath: string | null | undefined) {
  if (!publicPath) return null;
  try {
    const buf = await readFile(join(process.cwd(), "public", publicPath));
    const type = publicPath.endsWith(".png") ? "image/png" : "image/jpeg";
    return `data:${type};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

/** Shared dark card: brand glow, name block on the left, optional photo on the right. */
export function OgCard({
  eyebrow,
  title,
  subtitle,
  name,
  photo,
  titleSize = 76,
  bg,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  name: string;
  photo: string | null;
  titleSize?: number;
  bg: string;
}) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#070a13", color: "#f8fafc", position: "relative", fontFamily: "Inter" }}>
      {/* pre-rendered glow: the image generator draws CSS radial gradients with a hard edge */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={bg} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0 }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", flex: 1, position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: 9999, background: "#2dd4b0", color: "#04120f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700 }}>BO</div>
          <div style={{ fontSize: 26, fontWeight: 600, color: "#cbd5e1" }}>{name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#2dd4b0" }}>{eyebrow}</div>
          <div style={{ marginTop: 18, fontSize: titleSize, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2, maxWidth: photo ? 700 : 1000 }}>{title}</div>
          {subtitle && <div style={{ marginTop: 22, fontSize: 30, color: "#94a3b8", maxWidth: photo ? 680 : 980, lineHeight: 1.35 }}>{subtitle}</div>}
        </div>
        <div style={{ fontSize: 22, color: "#64748b" }}>bilikisyahaya.vercel.app</div>
      </div>
      {photo && (
        <div style={{ display: "flex", alignItems: "center", paddingRight: 72, position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt="" width={330} height={412} style={{ borderRadius: 32, objectFit: "cover", objectPosition: "top", border: "2px solid #1c2433" }} />
        </div>
      )}
    </div>
  );
}
