import { config, collection, singleton, fields } from "@keystatic/core";

// Locally, Keystatic edits the files on disk. On Vercel it saves through GitHub,
// which then triggers a redeploy. Set NEXT_PUBLIC_KEYSTATIC_REPO="owner/repo"
// in Vercel once her GitHub account exists.
const repo = process.env.NEXT_PUBLIC_KEYSTATIC_REPO as `${string}/${string}` | undefined;
const storage = repo ? { kind: "github" as const, repo } : { kind: "local" as const };

const TOPICS = [
  { label: "Excel", value: "excel" },
  { label: "SQL", value: "sql" },
  { label: "Power BI", value: "power-bi" },
  { label: "Data Visualisation", value: "data-visualisation" },
  { label: "Statistics", value: "statistics" },
  { label: "Data Cleaning", value: "data-cleaning" },
  { label: "Career", value: "career" },
  { label: "Learning Log", value: "learning-log" },
];

const TOOLS = [
  { label: "Excel", value: "excel" },
  { label: "SQL", value: "sql" },
  { label: "Power BI", value: "power-bi" },
  { label: "Tableau", value: "tableau" },
  { label: "Python", value: "python" },
  { label: "Google Sheets", value: "google-sheets" },
];

const body = (label: string, dir: string) =>
  fields.markdoc({
    label,
    options: {
      image: { directory: `public/images/${dir}`, publicPath: `/images/${dir}/` },
    },
  });

export default config({
  storage,
  ui: {
    brand: { name: "Bilikis · Site editor" },
    navigation: {
      Writing: ["articles"],
      Work: ["projects"],
      "About me": ["profile"],
    },
  },
  singletons: {
    profile: singleton({
      label: "Profile",
      path: "content/profile",
      format: { contentField: "about" },
      schema: {
        name: fields.text({ label: "Full name", validation: { isRequired: true } }),
        headline: fields.text({
          label: "Headline",
          description: "One line under your name on the home page.",
        }),
        intro: fields.text({
          label: "Short intro",
          description: "Two or three sentences for the home page.",
          multiline: true,
        }),
        currentlyLearning: fields.text({
          label: "Currently learning",
          description: "Shown as a small badge, e.g. \"SQL joins\".",
        }),
        location: fields.text({ label: "Location" }),
        email: fields.text({ label: "Email" }),
        linkedin: fields.url({ label: "LinkedIn URL" }),
        github: fields.url({ label: "GitHub URL" }),
        photo: fields.image({
          label: "Photo",
          directory: "public/images/profile",
          publicPath: "/images/profile/",
        }),
        highlights: fields.array(
          fields.object({
            kind: fields.select({
              label: "Type",
              options: [
                { label: "Event", value: "event" },
                { label: "Certificate", value: "certificate" },
                { label: "Course", value: "course" },
                { label: "Award", value: "award" },
              ],
              defaultValue: "event",
            }),
            title: fields.text({ label: "Title", description: "e.g. Deep Learning Indaba 2026" }),
            role: fields.text({ label: "Role or result", description: "e.g. Attendee, Certified, Completed" }),
            detail: fields.text({ label: "One-line description", multiline: true }),
            date: fields.text({ label: "Date", description: "e.g. August 2026" }),
            url: fields.url({ label: "Link (optional)" }),
          }),
          {
            label: "Highlights (events, certificates, courses)",
            description: "Shown on the home page. Add a certificate here the day you earn it.",
            itemLabel: (props) => props.fields.title.value || "New highlight",
          },
        ),
        cv: fields.file({
          label: "CV (PDF)",
          directory: "public/files",
          publicPath: "/files/",
        }),
        about: body("About page", "profile"),
      },
    }),
  },
  collections: {
    articles: collection({
      label: "Articles",
      slugField: "title",
      path: "content/articles/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "publishedDate"],
      schema: {
        title: fields.slug({ name: { label: "Title", validation: { isRequired: true } } }),
        summary: fields.text({
          label: "Summary",
          description: "One or two sentences shown on article cards and in link previews.",
          multiline: true,
          validation: { length: { min: 1, max: 280 } },
        }),
        publishedDate: fields.date({
          label: "Published date",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        topics: fields.multiselect({ label: "Topics", options: TOPICS }),
        cover: fields.image({
          label: "Cover image (optional)",
          directory: "public/images/articles",
          publicPath: "/images/articles/",
        }),
        draft: fields.checkbox({
          label: "Draft",
          description: "Tick to hide this article from the site while you work on it.",
          defaultValue: false,
        }),
        content: body("Article", "articles"),
      },
    }),
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({ name: { label: "Title", validation: { isRequired: true } } }),
        summary: fields.text({ label: "Summary", multiline: true }),
        tools: fields.multiselect({ label: "Tools used", options: TOOLS }),
        publishedDate: fields.date({ label: "Date", defaultValue: { kind: "today" } }),
        dashboardEmbed: fields.url({
          label: "Dashboard embed URL (optional)",
          description: "Power BI 'Publish to web' or Tableau Public embed link.",
        }),
        repoOrFile: fields.url({ label: "Dataset or files link (optional)" }),
        cover: fields.image({
          label: "Cover image",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
        }),
        draft: fields.checkbox({ label: "Draft", defaultValue: false }),
        content: body("Write-up", "projects"),
      },
    }),
  },
});

export { TOPICS, TOOLS };
