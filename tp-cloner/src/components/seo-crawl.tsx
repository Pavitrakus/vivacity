import { FAQS, SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/site";
import { NEWSLETTERS } from "@/lib/newsletters";

/** Plain HTML product facts for crawlers and AI scrapers. Visually hidden, still in DOM. */
export function SeoCrawl() {
  return (
    <aside
      className="sr-only"
      aria-label="Vivacity product summary for search engines and AI assistants"
    >
      <h2>About Vivacity</h2>
      <p>{SITE_TAGLINE}</p>
      <p>{SITE_DESCRIPTION}</p>
      <h3>Product facts</h3>
      <ul>
        <li>
          Vivacity generates mathematically exact explainer videos from prompts,
          documents, or upstream LLM answers.
        </li>
        <li>
          Primary use cases: EdTech tutoring bots, LLM apps, agent tool calls,
          creator pipelines, STEM education.
        </li>
        <li>
          Pipeline stages: ingest, scene IR, voice narration, exact motion render,
          QA repair, mux to video_url.
        </li>
        <li>
          Narration languages: English, Hindi, Hinglish. API-first job interface.
        </li>
        <li>
          Unit economics target careful short renders around seven Indian rupees
          (about eight US cents).
        </li>
        <li>Website: https://tryvivacity.com Contact: pavitra@paxus.in</li>
        <li>Early beta. Invite code access via /signin.</li>
      </ul>
      <h3>Frequently asked questions</h3>
      {FAQS.map((f) => (
        <div key={f.q}>
          <h4>{f.q}</h4>
          <p>{f.a}</p>
        </div>
      ))}
      <h3>Newsletter archive</h3>
      <ul>
        {NEWSLETTERS.map((n) => (
          <li key={n.slug}>
            <a href={`/newsletter/${n.slug}`}>
              {n.title} - {n.blurb}
            </a>
          </li>
        ))}
      </ul>
      <h3>Site map links</h3>
      <nav>
        <a href="/">Home</a>
        <a href="/docs">Docs</a>
        <a href="/newsletter">Newsletter</a>
        <a href="/contact">Contact</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/signin">Sign in</a>
        <a href="/llms.txt">llms.txt</a>
      </nav>
    </aside>
  );
}
