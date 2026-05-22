const TICKER =
  " SKATE • ARTE • CONTRACULTURA • UNDERGROUND • HELLCORE INDUSTRIES •";

export function Hero() {
  return (
    <section>
      <div
        className="flex flex-col items-center py-4 md:py-4 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 70% 160% at 50% 50%, #1e1c14 0%, #111109 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(4, 4, 4, 0.98)" }}
          aria-hidden="true"
        />

        <div
          className="absolute mix-blend-screen pointer-events-none"
          style={{
            inset: "-300px",
            transform: "rotate(-10deg)",
            opacity: 0.1,
          }}
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

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-hellcore.png"
          alt="HellCore Industries"
          className="relative z-10 w-36 h-36 md:w-52 md:h-52 object-contain select-none pointer-events-none"
        />
      </div>

      <div className="bg-hellcore-text border-t border-hellcore-red/25 py-1.5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap w-max">
          <span className="text-[9px] font-bold uppercase tracking-[0.38em] text-hellcore-bg/40">
            {TICKER.repeat(8)}
          </span>
        </div>
      </div>

      <div className="hidden md:block bg-hellcore-bg border-b-2 border-hellcore-text">
        <div className="max-w-5xl mx-auto px-8 py-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-hellcore-text/30">
              Manifesto
            </span>
            <div className="h-px flex-1 bg-hellcore-text/10" />
          </div>

          <p className="text-hellcore-text text-xl leading-[1.7]">
            A HellCore Industries é uma marca pessoal que utiliza a linguagem
            visual do{" "}
            <span className="font-display text-[30px] text-hellcore-red leading-none">
              SKATE
            </span>
            , do{" "}
            <span className="font-display text-[30px] text-hellcore-red leading-none">
              UNDERGROUND
            </span>{" "}
            e da{" "}
            <span className="font-display text-[30px] text-hellcore-red leading-none">
              CULTURA DE RUA
            </span>{" "}
            <span className="text-hellcore-text/35">(Contracultura)</span> para
            produzir{" "}
            <strong className="font-bold">obras de arte e ilustrações</strong>{" "}
            em diferentes formatos.
          </p>
        </div>
      </div>
    </section>
  );
}
