const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-hellcore-text border-t-2 border-hellcore-red/40">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl text-hellcore-bg leading-none tracking-wide">
              HellCore Industries
            </p>
            <p className="text-hellcore-bg/60 text-xs mt-1 leading-relaxed max-w-xs">
              Skate, underground e cultura de rua — obras de arte e ilustrações em diferentes formatos.
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <a
              href="https://instagram.com/hellcore_industries"
              target="_blank"
              rel="noopener noreferrer"
              className="text-hellcore-bg/65 hover:text-hellcore-bg text-xs transition-colors"
            >
              @hellcore_industries
            </a>
            <span className="text-hellcore-bg/20 text-xs hidden sm:block">|</span>
            <p className="text-hellcore-bg/25 text-xs hidden sm:block">
              Pedidos via WhatsApp
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-hellcore-bg/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
          <p className="text-[10px] text-hellcore-bg/20">
            © {currentYear} HellCore Industries · Produção independente · Brasil
          </p>
          <p className="text-[10px] text-hellcore-bg/15 uppercase tracking-widest">
            Skate · Arte · Contracultura
          </p>
        </div>
      </div>
    </footer>
  );
}
