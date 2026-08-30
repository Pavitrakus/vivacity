import { FAQS, SITE_DESCRIPTION, SITE_EMAIL, SITE_TAGLINE } from "@/lib/site";

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
          Vivacity is an executable simulation runtime for AI agents, not a
          world-model lab and not a consumer video product.
        </li>
        <li>
          Interface verbs: create, observe, act, simulate, fork, rollback,
          verify, commit, render.
        </li>
        <li>
          State is what is true. Observation is what somebody sees. Rendering
          is optional and late.
        </li>
        <li>
          The execution router selects exact physics, scientific solvers,
          learned world models, robotics simulators, game engines, or private
          backends.
        </li>
        <li>
          There is no self-serve signup. Design partners book a demo at
          /demo. Contact: {SITE_EMAIL}
        </li>
      </ul>
      <h3>Frequently asked questions</h3>
      {FAQS.map((f) => (
        <div key={f.q}>
          <h4>{f.q}</h4>
          <p>{f.a}</p>
        </div>
      ))}
      <nav>
        <a href="/">Home</a>
        <a href="/docs">Docs</a>
        <a href="/demo">Book a demo</a>
        <a href="/contact">Contact</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/llms.txt">llms.txt</a>
      </nav>
    </aside>
  );
}
