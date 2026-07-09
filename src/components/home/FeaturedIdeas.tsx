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
        const response = await getApprovedIdeas(1, 6, { sortBy: 'topVoted' });
        const responseData = response.data?.data || response.data;
        setIdeas(responseData.data || responseData);
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Ideas</h2>

        {ideas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea: any) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No ideas available yet.</p>
        )}

        <div className="text-center mt-12">
          <a
            href="/ideas"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition"
          >
            View All Ideas
          </a>
        </div>
      </div>
    </section>
  );
}
