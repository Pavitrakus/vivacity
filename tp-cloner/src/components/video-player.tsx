"use client";

import { useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

type VideoPlayerProps = {
  src: string;
  className?: string;
  caption?: string;
  badge?: string;
  autoPlay?: boolean;
};

export function VideoPlayer({
  src,
  className,
  caption,
  badge,
  autoPlay = true,
}: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(autoPlay);

  const toggleMute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) void v.play();
  };

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] transition duration-500 hover:-translate-y-0.5 hover:border-white/20",
        className
      )}
    >
      <video
        ref={ref}
        className="aspect-video w-full object-cover"
        src={src}
        autoPlay={autoPlay}
        muted
        loop
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 opacity-80 transition group-hover:opacity-100" />

      {(badge || caption) && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 pt-16">
          {badge ? (
            <span className="inline-block rounded bg-emerald-400 px-2 py-1 font-pixel text-[10px] tracking-wide text-black">
              {badge}
            </span>
          ) : null}
          {caption ? (
            <p className="mt-1 text-xs text-white/80 sm:text-sm">{caption}</p>
          ) : null}
        </div>
      )}

      <div className="absolute right-3 bottom-3 left-3 flex items-center gap-2 sm:right-auto sm:bottom-4 sm:left-4">
        <button
          type="button"
          onClick={togglePlay}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white backdrop-blur transition hover:bg-black/80"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Pause className="h-3.5 w-3.5 fill-white" />
          ) : (
            <Play className="h-3.5 w-3.5 fill-white" />
          )}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 bg-black/65 px-3 text-xs text-white backdrop-blur transition hover:bg-black/80"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline">{muted ? "Unmute" : "Mute"}</span>
        </button>
      </div>
    </div>
  );
}
