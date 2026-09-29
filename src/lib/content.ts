import "server-only";
import { cache } from "react";
import { createReader } from "@keystatic/core/reader";
import Markdoc, { type Node } from "@markdoc/markdoc";
import keystaticConfig, { TOPICS, TOOLS } from "../../keystatic.config";

export const reader = createReader(process.cwd(), keystaticConfig);

const topicLabel = Object.fromEntries(TOPICS.map((t) => [t.value, t.label]));
const toolLabel = Object.fromEntries(TOOLS.map((t) => [t.value, t.label]));
export const labelForTopic = (v: string) => topicLabel[v] ?? v;
export const labelForTool = (v: string) => toolLabel[v] ?? v;

function plainText(node: Node): string {
  let out = "";
  for (const n of node.walk()) {
    if (n.type === "text" && typeof n.attributes.content === "string") out += n.attributes.content + " ";
  }
  return out;
}

export function readingMinutes(node: Node) {
  const words = plainText(node).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function renderable(node: Node) {
  const errors = Markdoc.validate(node);
  if (errors.length) console.warn("Markdoc validation:", errors.map((e) => e.error.message));
  return Markdoc.transform(node);
}

const byDateDesc = (a?: string | null, b?: string | null) => (b ?? "").localeCompare(a ?? "");

export const getProfile = cache(async () => {
  const p = await reader.singletons.profile.read();
  return (
    p ?? {
      name: "Bilikis Onono Yahaya",
      headline: "",
      intro: "",
      currentlyLearning: "",
      location: "",
      email: "",
      linkedin: null,
      github: null,
      photo: null,
      cv: null,
      highlights: [],
      about: async () => ({ node: Markdoc.parse("") }),
    }
  );
});

export const getArticles = cache(async () => {
  const all = await reader.collections.articles.all();
  return all
    .filter((a) => !a.entry.draft)
    .sort((a, b) => byDateDesc(a.entry.publishedDate, b.entry.publishedDate));
});

export const getArticle = cache(async (slug: string) => {
  const a = await reader.collections.articles.read(slug);
  return a && !a.draft ? a : null;
});

export const getProjects = cache(async () => {
  const all = await reader.collections.projects.all();
  return all
    .filter((p) => !p.entry.draft)
    .sort((a, b) => byDateDesc(a.entry.publishedDate, b.entry.publishedDate));
});

export const getProject = cache(async (slug: string) => {
  const p = await reader.collections.projects.read(slug);
  return p && !p.draft ? p : null;
});

export function formatDate(iso?: string | null) {
  if (!iso) return "";
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
