function InstagramIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstagramCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 200% at 50% 50%, #1e1c14 0%, #111109 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(4, 4, 4, 0.98)" }}
        aria-hidden="true"
      />

      <div
        className="absolute mix-blend-screen pointer-events-none"
        style={{ inset: "-300px", transform: "rotate(-10deg)", opacity: 0.1 }}
        aria-hidden="true"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: "url('/logo-hellcore.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "100px 100px",
            filter: "invert(1)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-14 md:py-16 flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-hellcore-bg/30 mb-3">
            Acompanhe no Instagram
          </p>
          <p className="font-display text-5xl md:text-7xl text-hellcore-bg leading-none">
            @hellcore_industries
          </p>
        </div>

        <a
          href="https://instagram.com/hellcore_industries"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-3 border border-hellcore-bg/20 hover:border-hellcore-red/60 px-6 py-3.5 text-hellcore-bg/60 hover:text-hellcore-bg transition-all group"
        >
          <InstagramIcon
            size={18}
            className="group-hover:text-hellcore-red transition-colors"
          />
          <span className="font-display text-xl tracking-widest">Seguir</span>
        </a>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-hellcore-red/25" />
    </section>
  );
}
