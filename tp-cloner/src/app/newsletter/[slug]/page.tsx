import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { NEWSLETTERS, getNewsletter } from "@/lib/newsletters";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return NEWSLETTERS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsletter(slug);
  if (!post) return { title: "Newsletter - Vivacity" };
  return {
    title: `${post.title} - Vivacity`,
    description: post.blurb,
  };
}

export default async function NewsletterPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getNewsletter(slug);
  if (!post) notFound();

  return (
    <PageShell>
      <Link
        href="/newsletter"
        className="font-pixel text-[11px] text-white/40 transition hover:text-white/70"
      >
        ← Newsletter
      </Link>
      <p className="mt-6 font-pixel text-[11px] tracking-[0.16em] text-white/40 uppercase">
        {post.date}
      </p>
      <h1 className="mt-3 font-pixel text-3xl tracking-tight text-white text-balance sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 text-base text-white/50">{post.blurb}</p>
      <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-white/65">
        {post.body.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
    </PageShell>
  );
}
