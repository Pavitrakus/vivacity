"use client";

import { useState } from "react";
import { SITE_EMAIL } from "@/lib/site";

const INTERESTS = [
  "Agent planning / tool use",
  "Robotics or autonomy",
  "Scientific or industrial simulation",
  "Games or private engines",
  "Research collaboration",
  "Something else",
] as const;

type FormState = {
  name: string;
  email: string;
  company: string;
  role: string;
  interest: string;
  need: string;
};

const empty: FormState = {
  name: "",
  email: "",
  company: "",
  role: "",
  interest: INTERESTS[0],
  need: "",
};

function isWorkEmail(value: string) {
  const v = value.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return false;
  return true;
}

function composeBody(data: FormState) {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company}`,
    `Role: ${data.role}`,
    `Interest: ${data.interest}`,
    "",
    "What they need the runtime to do:",
    data.need,
  ].join("\n");
}

export function BookDemo({ heading = "default" }: { heading?: "default" | "page" }) {
  const [data, setData] = useState<FormState>(empty);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const onChange = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!data.name.trim() || !data.company.trim() || !data.need.trim()) {
      setError("Name, company, and a short note are required.");
      return;
    }
    if (!isWorkEmail(data.email)) {
      setError("Use a real email so we can write back.");
      return;
    }
    const subject = `Vivacity demo — ${data.company}`;
    const href = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composeBody(data))}`;
    window.location.href = href;
    setSent(true);
  };

  return (
    <section id="demo" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          {heading === "page" ? (
            <h1 className="font-serif text-4xl tracking-tight text-[#eeeae2] sm:text-6xl">
              Book a demo.
            </h1>
          ) : (
            <>
              <p className="font-mono text-[11px] tracking-[0.16em] text-white/38 uppercase">
                10 — Design partners
              </p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#eeeae2] sm:text-5xl">
                If this layer belongs in your stack, tell us.
              </h2>
            </>
          )}
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/55">
            There is no signup and no self-serve key. We take a small number of
            design-partner conversations: what you are building, which backends
            you already have, and whether a shared runtime is actually the
            missing piece.
          </p>
          <p className="mt-6 font-mono text-[12px] text-white/45">
            {SITE_EMAIL}
          </p>
        </div>

        {sent ? (
          <div className="panel p-7">
            <p className="font-serif text-2xl text-[#eeeae2]">Your mail client should be open.</p>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              If it is not, write {SITE_EMAIL} with the same details. We read
              every note.
            </p>
            <button
              type="button"
              className="mt-6 text-sm text-white/70 underline underline-offset-4 hover:text-white"
              onClick={() => setSent(false)}
            >
              Edit and send again
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="panel p-5 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" value={data.name} onChange={onChange("name")} autoComplete="name" />
              <Field
                label="Work email"
                type="email"
                value={data.email}
                onChange={onChange("email")}
                autoComplete="email"
              />
              <Field
                label="Company"
                value={data.company}
                onChange={onChange("company")}
                autoComplete="organization"
              />
              <Field
                label="Role"
                value={data.role}
                onChange={onChange("role")}
                autoComplete="organization-title"
              />
            </div>
            <label className="mt-4 block">
              <span className="font-mono text-[10px] tracking-[0.12em] text-white/40 uppercase">
                What you are building
              </span>
              <select
                value={data.interest}
                onChange={onChange("interest")}
                className="mt-1.5 w-full rounded border border-white/10 bg-[#08090b] px-3 py-2.5 text-sm text-[#eeeae2] outline-none focus:border-white/30"
              >
                {INTERESTS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="mt-4 block">
              <span className="font-mono text-[10px] tracking-[0.12em] text-white/40 uppercase">
                What the runtime needs to do
              </span>
              <textarea
                value={data.need}
                onChange={onChange("need")}
                rows={5}
                className="mt-1.5 w-full resize-y rounded border border-white/10 bg-[#08090b] px-3 py-2.5 text-sm text-[#eeeae2] outline-none placeholder:text-white/25 focus:border-white/30"
                placeholder="Backends you already use, the agent loop, and the failure you hit when state does not persist."
              />
            </label>
            {error ? <p className="mt-3 text-sm text-rose-300/85">{error}</p> : null}
            <button
              type="submit"
              className="mt-5 inline-flex h-11 items-center rounded-full bg-[#eeeae2] px-6 text-[14px] text-[#0a0b0d] hover:bg-white"
            >
              Send demo request
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] tracking-[0.12em] text-white/40 uppercase">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="mt-1.5 w-full rounded border border-white/10 bg-[#08090b] px-3 py-2.5 text-sm text-[#eeeae2] outline-none placeholder:text-white/25 focus:border-white/30"
      />
    </label>
  );
}
