'use client';

import Link from 'next/link';

interface LegalSection {
  title: string;
  body: string;
  items?: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
}

export default function LegalPage({
  eyebrow,
  title,
  description,
  updatedAt,
  sections,
}: LegalPageProps) {
  return (
    <div className="bg-[#F1F4EC]">
      <section className="relative overflow-hidden bg-[#16281F] text-white">
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#E3A23D]/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-[#7FA687]/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#8DB89A]">
            {eyebrow}
          </p>
          <h1
            className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl"
            style={{ fontFamily: 'var(--font-fraunces, serif)' }}
          >
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#CBD4CC] sm:text-lg">
            {description}
          </p>
          <div className="mt-8 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#C6D2C8] backdrop-blur">
            Last updated: {updatedAt}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            {sections.map((section) => (
              <article
                key={section.title}
                className="rounded-3xl border border-[#DCE4D8] bg-white p-6 shadow-sm sm:p-8"
              >
                <h2
                  className="text-2xl font-bold text-[#16281F]"
                  style={{ fontFamily: 'var(--font-fraunces, serif)' }}
                >
                  {section.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#5F6E62] sm:text-base">
                  {section.body}
                </p>
                {section.items && (
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-[#4E5D52] sm:text-base">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#E3A23D]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-[#DCE4D8] bg-[#EAF3EA] p-6 shadow-sm sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4F7A5A]">
                Quick Notes
              </p>
              <div className="mt-4 space-y-4 text-sm leading-7 text-[#4E5D52]">
                <p>
                  These pages are written in plain language so visitors can understand how the site works.
                </p>
                <p>
                  If you need a formal legal review, replace this content with your jurisdiction-specific policy text.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#DCE4D8] bg-white p-6 shadow-sm sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4F7A5A]">
                Back to site
              </p>
              <Link
                href="/"
                className="mt-4 inline-flex rounded-full bg-[#16281F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#22382C]"
              >
                Return Home
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
