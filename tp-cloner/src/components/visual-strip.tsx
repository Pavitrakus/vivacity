export function VisualStrip() {
  const shots = [
    { src: "/videos/unit_circle.mp4", label: "Geometry" },
    { src: "/videos/matrix.mp4", label: "Linear algebra" },
    { src: "/videos/divergence.mp4", label: "Fields" },
    { src: "/videos/demo-537.mp4", label: "Explainers" },
  ];

  return (
    <section className="mx-auto hidden max-w-6xl px-5 py-10 md:block md:px-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <p className="font-pixel text-[11px] tracking-[0.16em] text-white/40 uppercase">
          Frames from the engine
        </p>
        <p className="text-xs text-white/35">Still motion, not stock art</p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {shots.map((s) => (
          <figure
            key={s.src}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)]"
          >
            <video
              className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              src={s.src}
              muted
              loop
              autoPlay
              playsInline
            />
            <figcaption className="border-t border-white/8 px-3 py-2 font-pixel text-[11px] text-white/50">
              {s.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
