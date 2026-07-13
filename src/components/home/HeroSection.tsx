export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#16281F]">
      {/* organic backdrop shapes */}
      <div className="pointer-events-none absolute -top-32 -right-20 h-96 w-96 rounded-full bg-[#4F7A5A] opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-[#E3A23D] opacity-10 blur-3xl" />

      {/* spark trail — signature element: a scattering of small marks that
          suggest ideas catching and spreading */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
        <span className="absolute left-[12%] top-[22%] h-2 w-2 rounded-full bg-[#E3A23D]/70" />
        <span className="absolute left-[20%] top-[62%] h-1.5 w-1.5 rounded-full bg-[#E3A23D]/50" />
        <span className="absolute right-[16%] top-[30%] h-2.5 w-2.5 rounded-full bg-[#E3A23D]/60" />
        <span className="absolute right-[24%] top-[70%] h-1.5 w-1.5 rounded-full bg-[#7FA687]/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 py-24 sm:py-32 md:py-36 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#2A4232] bg-[#1E3328] px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#E3A23D]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E3A23D]" />
          Welcome to EcoSpark Hub
        </span>

        <h1
          className="mt-7 text-[2.75rem] leading-[1.08] sm:text-6xl md:text-7xl font-bold text-white"
          style={{ fontFamily: 'var(--font-fraunces, serif)' }}
        >
          Share your{' '}
          <span className="italic text-[#7FA687]">sustainability</span> ideas
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-[#B9C4BB]">
          Help build a better, greener future for everyone. Share innovative ideas,
          collaborate with community members, and make a real impact.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/ideas"
            className="w-full sm:w-auto rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#E3A23D] px-8 py-4 text-base font-bold text-[#16281F] shadow-lg shadow-black/20 hover:bg-[#EEB35A] hover:-translate-y-0.5 transition-all duration-200"
          >
            Explore Ideas
          </a>
          <a
            href="/register"
            className="w-full sm:w-auto rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md border border-[#3A5642] bg-transparent px-8 py-4 text-base font-bold text-white hover:bg-[#1E3328] hover:-translate-y-0.5 transition-all duration-200"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}