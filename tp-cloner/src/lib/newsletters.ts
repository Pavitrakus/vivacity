export const NEWSLETTERS = [
  {
    slug: "exact-motion",
    title: "Why exact motion beats doodles for STEM.",
    blurb: "When the diagram is wrong, the lesson is wrong.",
    date: "Aug 2026",
    body: [
      "Most AI video tools optimize for speed of drawing. That is useful when you want a whiteboard vibe. It fails when the lesson depends on a correct diagram.",
      "Eigenvectors, flux, unit circles, and matrix transforms are not vibes. They are geometry with constraints. If the arrow points the wrong way, the student learns the wrong thing.",
      "Vivacity is built around mathematically exact motion. Scene plans, timed narration, and Manim-grade animation so the visual stays honest to the math.",
      "For EdTech chatbots and agent products, that honesty is the product. Text dumps already exist. Correct motion is still rare.",
    ],
  },
  {
    slug: "video-tool-call",
    title: "Video as a tool call for agents.",
    blurb: "Text was the easy medium. That is changing.",
    date: "Aug 2026",
    body: [
      "Agents already call search, code interpreters, and browsers. Video should be another tool output, not a separate app the user has to open.",
      "The interface is simple: submit a prompt or upstream model answer, poll job status, receive a video_url. Cheap enough that a tutoring bot can afford to call it.",
      "That is why we care about unit cost and near-real-time latency. If a render costs too much or takes too long, agents will never make video the default.",
      "The next wave of LLM products will not only answer. They will show.",
    ],
  },
  {
    slug: "unit-economics",
    title: "Unit economics of explainer infra.",
    blurb: "If it is not cheap, chatbots will never call it.",
    date: "Jul 2026",
    body: [
      "Hand-written Manim is beautiful and expensive. Freelancers and in-house teams burn hours on a few minutes of motion.",
      "Infra only works if the marginal cost of another explainer is low. Our careful short renders land around ₹7. That number is a product decision, not a footnote.",
      "Volume is the point. A JEE doubt bot should be able to fire hundreds of explainers a day without a render farm on the balance sheet.",
      "We will keep publishing notes on cost, latency, and what breaks when you put video behind a model.",
    ],
  },
] as const;

export type NewsletterSlug = (typeof NEWSLETTERS)[number]["slug"];

export function getNewsletter(slug: string) {
  return NEWSLETTERS.find((n) => n.slug === slug);
}
