import { ImageResponse } from "next/og";
import { OG_SIZE, OgCard, ogBackground, ogFonts } from "@/lib/og";
import { getArticle, getProfile } from "@/lib/content";

export const alt = "Article by Bilikis Onono Yahaya";
export const size = OG_SIZE;
export const contentType = "image/png";


export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [a, p] = await Promise.all([getArticle(slug), getProfile()]);
  const title = a?.title ?? "Insights";
  return new ImageResponse(
    <OgCard bg={await ogBackground()} eyebrow="Insights" title={title} name={p.name} photo={null} titleSize={title.length > 60 ? 62 : 72} />,
    { ...size, fonts: await ogFonts() },
  );
}
