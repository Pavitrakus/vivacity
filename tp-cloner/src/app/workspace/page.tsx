"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteNav } from "@/components/site-nav";

const STORAGE_KEY = "vivacity_beta_unlocked";

export default function WorkspacePage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "1") {
        router.replace("/signin");
        return;
      }
      setReady(true);
    } catch {
      router.replace("/signin");
    }
  }, [router]);

  if (!ready) {
    return (
      <div className="grain flex min-h-screen items-center justify-center text-white/50">
        <p className="font-pixel text-sm">Checking access…</p>
      </div>
    );
  }

  return (
    <div className="grain min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-5 pt-28 pb-16 md:px-8 md:pt-32">
        <p className="font-pixel text-[11px] tracking-[0.16em] text-emerald-300/70 uppercase">
          Beta workspace
        </p>
        <h1 className="mt-3 font-pixel text-3xl tracking-tight text-white sm:text-4xl">
          You are in.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-white/55">
          Early beta access is unlocked on this device. The full chat workspace is
          rolling out to invitees. Meanwhile, email the team with what you want to
          generate first.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="mailto:pavitra@paxus.in?subject=Vivacity%20workspace%20ready"
            className="rounded-full bg-white px-5 py-2.5 text-center font-pixel text-[12px] text-black"
          >
            Message the team
          </a>
          <Link
            href="/docs"
            className="rounded-full border border-white/20 px-5 py-2.5 text-center font-pixel text-[12px] text-white"
          >
            Read docs
          </Link>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]">
          <div className="border-b border-white/8 px-4 py-3 font-pixel text-[12px] text-white/70">
            vivacity · workspace
          </div>
          <div className="space-y-4 p-5">
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-white/[0.08] px-3.5 py-2.5 text-sm text-white/85">
              Explain eigenvectors like I am stuck at midnight.
            </div>
            <div className="flex gap-2">
              <span className="mt-1 font-pixel text-[11px] text-white/40">V.</span>
              <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-white/8 bg-black/40 px-3.5 py-2.5 text-sm text-white/75">
                Beta is live on your account. Full render jobs unlock as we expand the
                invite list. Hang tight.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
