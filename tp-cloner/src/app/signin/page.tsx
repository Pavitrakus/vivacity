"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { ShineButton } from "@/components/ui/shine-button";
import { StaggerText } from "@/components/ui/stagger-text";

const BETA_CODE = "VIVACITYBETAV1";
const STORAGE_KEY = "vivacity_beta_unlocked";

export default function SignInPage() {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [authError, setAuthError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    } catch {
      /* ignore */
    }
  }, []);

  const unlock = (raw: string) => {
    const normalized = raw.trim().toUpperCase();
    if (normalized === BETA_CODE) {
      localStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
      setCodeError("");
      return true;
    }
    setCodeError("That code is not valid. Email the team if you need access.");
    return false;
  };

  const enterWorkspace = () => {
    router.push("/workspace");
  };

  const onSubmitAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!email.trim() || !password.trim()) {
      setAuthError("Enter email and password.");
      return;
    }
    setBusy(true);
    // Beta: accept local credentials and open workspace.
    try {
      localStorage.setItem(
        "vivacity_beta_user",
        JSON.stringify({ email: email.trim(), mode })
      );
      enterWorkspace();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grain min-h-screen">
      <SiteNav />
      <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-5 pt-28 pb-16 md:px-8">
        <p className="font-pixel text-[11px] tracking-[0.16em] text-white/40 uppercase">
          Access
        </p>
        <h1 className="mt-4 font-pixel text-[2.35rem] leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
          <StaggerText>This is in early beta testing.</StaggerText>
        </h1>
        <p className="mt-5 text-[16px] leading-relaxed text-white/55 sm:text-lg">
          Email the team to get access. If you already have a code, put it here.
          After the code unlocks, Google and email sign in appear below.
        </p>

        <ShineButton
          href="mailto:pavitra@paxus.in?subject=Vivacity%20beta%20access"
          variant="ghost"
          className="mt-6"
        >
          Email the team for access
        </ShineButton>

        {!unlocked ? (
          <form
            className="mt-10 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              unlock(code);
            }}
          >
            <label className="block font-pixel text-[11px] text-white/45">
              Beta code
            </label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter invite code"
              className="w-full rounded-full border border-white/12 bg-black/50 px-4 py-3 font-pixel text-[13px] tracking-wide text-white outline-none placeholder:text-white/25 focus:border-white/35"
              autoComplete="off"
              spellCheck={false}
            />
            {codeError ? (
              <p className="text-sm text-red-300/80">{codeError}</p>
            ) : null}
            <ShineButton type="submit" className="w-full py-3">
              Unlock sign in
            </ShineButton>
          </form>
        ) : (
          <div className="mt-10">
            <div className="mb-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3">
              <p className="font-pixel text-[12px] text-emerald-200/90">
                Code accepted. Sign in below to open the workspace.
              </p>
            </div>

            <div className="flex gap-2 rounded-full border border-white/10 bg-black/40 p-1 font-pixel text-[11px]">
              {(
                [
                  ["signin", "Sign in"],
                  ["signup", "Sign up"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMode(id)}
                  className={
                    mode === id
                      ? "flex-1 rounded-full bg-white/12 py-2 text-white"
                      : "flex-1 rounded-full py-2 text-white/45"
                  }
                >
                  {label}
                </button>
              ))}
            </div>

            <ShineButton
              type="button"
              variant="ghost"
              onClick={enterWorkspace}
              className="mt-5 w-full gap-2 py-3"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-black">
                G
              </span>
              Continue with Google
            </ShineButton>

            <div className="my-5 flex items-center gap-3 text-[11px] text-white/30">
              <span className="h-px flex-1 bg-white/10" />
              or email
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <form className="space-y-3" onSubmit={onSubmitAuth}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-full border border-white/12 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/35"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-full border border-white/12 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/35"
                required
              />
              {authError ? (
                <p className="text-sm text-red-300/80">{authError}</p>
              ) : null}
              <ShineButton
                type="submit"
                disabled={busy}
                className="w-full py-3"
              >
                {mode === "signin" ? "Sign in to workspace" : "Create account"}
              </ShineButton>
            </form>
          </div>
        )}

        <p className="mt-10 text-center text-xs text-white/35">
          <Link href="/" className="hover:text-white/60">
            ← Back home
          </Link>
        </p>
      </main>
    </div>
  );
}
