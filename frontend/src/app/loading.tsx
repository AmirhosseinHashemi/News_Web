export function PageLoader() {
  const text = "در حال بارگذاری";
  return (
    <>
      {/* Custom keyframes — Tailwind ships none of these */}
      <style>{`
        @keyframes pl-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pl-bar-slide {
          0%   { transform: translateX(150%);  opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateX(-350%); opacity: 0; }
        }
        @keyframes pl-pulse {
          0%   { transform: scale(0.55); opacity: 0.35; }
          70%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        @keyframes pl-ring { to { transform: rotate(360deg); } }
        @keyframes pl-caption-blink {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }
      `}</style>

      <div
        className="fixed inset-0 z-9999 flex flex-col items-center justify-center gap-5 bg-background/72 backdrop-blur-[10px] backdrop-saturate-[1.05] animate-[pl-fade-in_0.28s_ease-out]"
        role="status"
        aria-live="polite"
        aria-label={text}
      >
        {/* Centered brand mark: pulse halo + rotating ring + core dot */}
        <div
          className="relative grid h-15 w-15 place-items-center"
          aria-hidden="true"
        >
          <span className="absolute inset-0 rounded-full bg-primary opacity-0 animate-[pl-pulse_1.8s_ease-out_infinite] motion-reduce:hidden" />
          <span className="absolute inset-1 rounded-full border-2 border-primary/22 border-s-primary border-t-primary animate-[pl-ring_0.95s_linear_infinite] motion-reduce:animate-none" />
        </div>

        <span className="font-bold text-lg tracking ">{text}</span>
      </div>
    </>
  );
}

export default PageLoader;
