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
        setTopIdeas(Array.isArray(responseData) ? responseData : responseData.data || []);
      } catch (error) {
        console.error('Failed to fetch top ideas:', error);
      }
    };
    fetchTopIdeas();
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Top Voted Ideas</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topIdeas.length > 0 ? (
            topIdeas.map((idea: any, index: number) => (
              <div key={idea.id} className="bg-white rounded-lg shadow p-6">
                <div className="text-green-600 text-4xl font-bold mb-3">#{index + 1}</div>
                <h3 className="text-xl font-bold mb-2">{idea.title}</h3>
                <p className="text-gray-600 mb-4">
                  {idea.description?.substring(0, 100)}...
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>👍 {idea._count?.votes || 0} votes</span>
                  <a
                    href={`/idea/${idea.id}`}
                    className="text-green-600 hover:text-green-700 font-semibold"
                  >
                    View →
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              Loading top ideas...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
