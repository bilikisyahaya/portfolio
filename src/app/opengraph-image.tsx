import { ImageResponse } from "next/og";
import { OG_SIZE, OgCard, ogBackground, ogFonts, photoDataUrl } from "@/lib/og";
import { getProfile } from "@/lib/content";

export const alt = "Bilikis Onono Yahaya, Business Intelligence & Data Analyst";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const p = await getProfile();
  return new ImageResponse(
    <OgCard
      bg={await ogBackground()}
      eyebrow="Business Intelligence · Data Analysis"
      title={p.name}
      subtitle={p.headline || "I turn business questions into clear, data-driven answers."}
      name={p.name}
      photo={await photoDataUrl(p.photo)}
    />,
    { ...size, fonts: await ogFonts() },
  );
}
