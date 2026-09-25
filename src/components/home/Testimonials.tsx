'use client';

import { useEffect, useState } from 'react';
import { getTopVotedIdeas } from '@/lib/api';

export default function Testimonials() {
  const [topIdeas, setTopIdeas] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopIdeas = async () => {
      try {
        const response = await getTopVotedIdeas(3);
        const responseData = response.data?.data || response.data;
        setTopIdeas(responseData.items || []);
      } catch (error) {
        console.error('Failed to fetch top ideas:', error);
      }
    };
    fetchTopIdeas();
  }, []);

  const rankAccent = ['bg-[#E3A23D] text-[#16281F]', 'bg-[#CBD4CC] text-[#16281F]', 'bg-[#B8875A] text-white'];

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 sm:mb-14 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#4F7A5A]">
            Community favorites
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#1C2620]"
            style={{ fontFamily: 'var(--font-fraunces, serif)' }}
          >
            Top Voted Ideas
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {topIdeas.length > 0 ? (
            topIdeas.map((idea: any, index: number) => (
              <div
                key={idea.id}
                className="group rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg border border-[#EAE6D8] bg-[#FAFAF6] p-7 hover:border-[#E3A23D]/50 hover:shadow-lg hover:shadow-[#16281F]/5 hover:-translate-y-1 transition-all duration-200"
              >
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-base font-bold mb-4 ${rankAccent[index] || rankAccent[2]}`}
                >
                  #{index + 1}
                </div>
                <h3 className="text-lg font-bold text-[#1C2620] mb-2 leading-snug">
                  {idea.title}
                </h3>
                <p className="text-sm text-[#6B7A70] leading-relaxed mb-6">
                  {idea.description?.substring(0, 100)}...
                </p>
                <div className="flex items-center justify-between text-sm pt-4 border-t border-[#EAE6D8]">
                  <span className="flex items-center gap-1.5 font-semibold text-[#4F7A5A]">
                    👍 {idea._count?.votes || 0} votes
                  </span>
                  <a
                    href={`/idea/${idea.slug}`}
                    className="font-semibold text-[#16281F] group-hover:text-[#E3A23D] transition-colors"
                  >
                    View →
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg border border-dashed border-[#C9D3C4] px-6 py-16 text-center text-[#6B7A70]">
              No approved ideas have votes yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}