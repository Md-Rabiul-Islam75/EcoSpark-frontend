'use client';

import { useEffect, useState } from 'react';
import IdeaCard from '@/components/ideas/IdeaCard';
import Loading from '@/components/ui/Loading';
import { getApprovedIdeas } from '@/lib/api';

export default function FeaturedIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIdeas() {
      try {
        const response = await getApprovedIdeas(1, 6, { sortBy: 'recent' });
        const responseData = response.data?.data || response.data;
        setIdeas(responseData.items || []);
      } catch (error) {
        console.error('Failed to fetch ideas:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchIdeas();
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="bg-[#F1F4EC] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 sm:mb-14 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#4F7A5A]">
            Fresh from the community
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#1C2620]"
            style={{ fontFamily: 'var(--font-fraunces, serif)' }}
          >
            Featured Ideas
          </h2>
        </div>

        {ideas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {ideas.map((idea: any) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        ) : (
          <div className="rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg border border-dashed border-[#C9D3C4] bg-white px-6 py-16 text-center">
            <p className="text-[#6B7A70]">No ideas available yet — be the first to share one.</p>
          </div>
        )}

        <div className="text-center mt-12 sm:mt-14">
          <a
            href="/ideas"
            className="inline-block rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-md bg-[#16281F] px-8 py-3.5 text-sm font-bold text-white hover:bg-[#1E3328] transition-colors duration-200"
          >
            View All Ideas
          </a>
        </div>
      </div>
    </section>
  );
}