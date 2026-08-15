import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Vivacity API docs: quick start, pipeline architecture, authentication, POST /v1/jobs, and video_url polling for LLM explainer video infrastructure.",
  alternates: { canonical: "https://tryvivacity.com/docs" },
  openGraph: {
    title: "Vivacity Docs - API & architecture",
    description:
      "Quick start, pipeline architecture, and REST API shape for Vivacity video infrastructure.",
    url: "https://tryvivacity.com/docs",
  },
};

export default function DocsPage() {
  return (
    <PageShell wide>
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.02] p-4 lg:sticky lg:top-28">
          <p className="font-pixel text-[10px] tracking-[0.14em] text-white/35 uppercase">
            Getting started
          </p>
          <nav className="mt-3 space-y-1 text-sm text-white/60">
            <a
              href="#intro"
              className="block rounded-lg px-2 py-1.5 hover:bg-white/[0.05] hover:text-white"
            >
              Introduction
            </a>
            <a
              href="#quickstart"
              className="block rounded-lg px-2 py-1.5 hover:bg-white/[0.05] hover:text-white"
            >
              Quick start
            </a>
            <a
              href="#arch"
              className="block rounded-lg px-2 py-1.5 hover:bg-white/[0.05] hover:text-white"
            >
              Architecture
            </a>
            <a
              href="#api"
              className="block rounded-lg px-2 py-1.5 hover:bg-white/[0.05] hover:text-white"
            >
              API shape
            </a>
          </nav>
          <p className="mt-6 font-pixel text-[10px] tracking-[0.14em] text-white/35 uppercase">
            Access
          </p>
          <nav className="mt-3 space-y-1 text-sm text-white/60">
            <Link
              href="/signin"
              className="block rounded-lg px-2 py-1.5 hover:bg-white/[0.05] hover:text-white"
            >
              Sign in / beta code
            </Link>
            <Link
              href="/contact"
              className="block rounded-lg px-2 py-1.5 hover:bg-white/[0.05] hover:text-white"
            >
              Contact
            </Link>
          </nav>
        </aside>

        <article className="space-y-10 text-[15px] leading-relaxed text-white/65">
          <div>
            <p className="font-pixel text-[11px] tracking-[0.16em] text-white/40 uppercase">
              Docs · v0.1
            </p>
            <h1
              id="intro"
              className="mt-3 font-pixel text-3xl tracking-tight text-white sm:text-4xl"
            >
              Introduction
            </h1>
            <p className="mt-4">
              Vivacity is near-real-time video infrastructure for LLMs. It turns a
              prompt, document, or model answer into a narrated, mathematically exact
              explainer video you can call from an app or agent.
            </p>
            <p className="mt-3">
              It is not a slide deck tool. The output is a video URL. Math and science
              are where precision shows most.
            </p>
            <h3 className="mt-8 font-pixel text-[12px] tracking-[0.12em] text-white/50 uppercase">
              Who it is for
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Researchers who need to visualize a proof or derivation</li>
              <li>Educators preparing concept explanations</li>
              <li>Platforms integrating AI-generated educational content via API</li>
            </ul>
          </div>

          <div>
            <h2
              id="quickstart"
              className="font-pixel text-2xl tracking-tight text-white"
            >
              Quick start
            </h2>
            <p className="mt-3">
              During early beta, access is invite-only. Request access from the team,
              then open the workspace with your beta code.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-4 font-mono text-[12px] text-emerald-100/80">
{`# conceptual flow
POST /v1/jobs  { "prompt": "Explain eigenvectors" }
GET  /v1/jobs/:id
→ { "status": "ready", "video_url": "..." }`}
            </pre>
            <p className="mt-3">
              Official SDKs and full auth docs ship with broader beta. Until then, use
              the workspace UI at{" "}
              <Link
                href="/signin"
                className="text-white underline underline-offset-4"
              >
                /signin
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 id="arch" className="font-pixel text-2xl tracking-tight text-white">
              Pipeline architecture
            </h2>
            <p className="mt-3">Four stages run per request:</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-white/85">Prompt interpretation:</strong>{" "}
                extract mathematical intent and map it to a scene plan.
              </li>
              <li>
                <strong className="text-white/85">Code generation:</strong> turn the
                plan into executable motion code, with critique and repair.
              </li>
              <li>
                <strong className="text-white/85">Rendering:</strong> exact animation
                frames for the lesson.
              </li>
              <li>
                <strong className="text-white/85">Audio sync:</strong> align narration
                to animation keyframes.
              </li>
            </ol>
          </div>

          <div>
            <h2 id="api" className="font-pixel text-2xl tracking-tight text-white">
              REST API shape
            </h2>
            <p className="mt-3">
              Authentication will use API keys scoped to a workspace. Jobs are
              asynchronous. Poll status or subscribe to webhooks when available.
            </p>
            <h3 className="mt-6 font-pixel text-[12px] tracking-[0.12em] text-white/50 uppercase">
              Authentication
            </h3>
            <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-4 font-mono text-[12px] text-white/70">
{`Authorization: Bearer viv_live_xxx
Content-Type: application/json`}
            </pre>
            <h3 className="mt-6 font-pixel text-[12px] tracking-[0.12em] text-white/50 uppercase">
              Create a job
            </h3>
            <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-4 font-mono text-[12px] text-white/70">
{`POST /v1/jobs
{
  "prompt": "Explain the chain rule",
  "resolution": "1080p"
}

→ { "id": "job_…", "status": "queued" }`}
            </pre>
            <h3 className="mt-6 font-pixel text-[12px] tracking-[0.12em] text-white/50 uppercase">
              Poll status
            </h3>
            <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-4 font-mono text-[12px] text-white/70">
{`GET /v1/jobs/:id
→ { "status": "ready", "video_url": "https://…" }`}
            </pre>
          </div>
        </article>
      </div>
    </PageShell>
  );
}
