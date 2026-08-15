export default function Loading() {
  return (
    <div className="grain flex min-h-screen items-center justify-center bg-[#020202]">
      <div className="flex flex-col items-center gap-3">
        <p className="font-pixel text-xl tracking-tight text-white/90">vivacity</p>
        <div className="h-px w-14 overflow-hidden bg-white/10">
          <div className="h-full w-1/2 animate-[loadBar_0.9s_ease-in-out_infinite] bg-white/60" />
        </div>
      </div>
    </div>
  );
}
