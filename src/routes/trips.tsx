      <header className="flex items-center justify-between gap-3 border-b border-[#E7ECF3] px-4 py-2.5 sm:px-8">
        <Logo width={205} />
      </header>

      <section className="relative flex min-h-[135px] items-center overflow-hidden bg-[#143565] px-5 py-4 sm:min-h-[160px] sm:px-8">
        <img
          src={airplaneSunset}
          alt=""
          className="absolute inset-0 size-full object-cover object-center opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#092756]/90 via-[#12386B]/55 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            E-TICKET
          </h1>
          <p className="mt-2 max-w-[420px] text-[11px] uppercase tracking-[0.22em] text-white/80">
            Corporate Travel Made Simple
          </p>
        </div>
      </section>

      <footer className="flex items-center justify-between gap-2 bg-[#102B55] px-4 py-2.5 text-white">
        <Logo width={175} tone="white" />
        <p className="text-center text-[9px] text-white/85">Corporate Travel Made Simple</p>
      </footer>

      <header className="flex items-center justify-between gap-3 border-b border-[#D8E2F0] px-4 py-3 sm:px-8">
        <Logo width={190} />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-l-lg bg-[#153765] px-3 py-2 text-white sm:px-5">
            <Hotel className="size-5 shrink-0" />
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wide sm:text-sm">
                Hotel Voucher
              </p>
              <p className="text-[9px] text-white/75">Confirmation</p>
            </div>
          </div>
        </div>
      </header>

      <footer className="flex items-center justify-between gap-2 border-t border-[#D8E2F0] bg-[#102B55] px-4 py-2.5 text-white">
        <Logo width={170} tone="white" />
        <p className="text-right text-[9px] leading-relaxed text-white/80">
          Corporate Travel Made Simple
        </p>
      </footer>