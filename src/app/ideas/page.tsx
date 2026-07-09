'use client';

import { useState, useEffect } from 'react';
import IdeaCard from '@/components/ideas/IdeaCard';
import SearchBar from '@/components/ideas/SearchBar';
import FilterSidebar from '@/components/ideas/FilterSidebar';
import Pagination from '@/components/ui/Pagination';
import Loading from '@/components/ui/Loading';
import { getApprovedIdeas } from '@/lib/api';

export default function IdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'topVoted' | 'mostCommented'>('recent');
  const [isPaid, setIsPaid] = useState<boolean | undefined>();

  useEffect(() => {
    fetchIdeas();
  }, [page, search, categoryId, sortBy, isPaid]);

  async function fetchIdeas() {
    setLoading(true);
    try {
      const response = await getApprovedIdeas(page, 12, {
        search,
        categoryId,
        sortBy,
        isPaid,
      });
      const responseData = response.data?.data || response.data;
      setIdeas(responseData.data || responseData);
      setTotal(responseData.pagination?.total || 0);
    } catch (error) {
      console.error('Failed to fetch ideas:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Sustainability Ideas</h1>
        <SearchBar onSearch={setSearch} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <FilterSidebar
            sortBy={sortBy}
            onSortChange={setSortBy}
            categoryId={categoryId}
            onCategoryChange={setCategoryId}
            isPaid={isPaid}
            onPaidChange={setIsPaid}
          />
        </aside>

        <main className="lg:col-span-3">
          {loading ? (
            <Loading />
          ) : ideas.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ideas.map((idea: any) => (
                  <IdeaCard key={idea.id} idea={idea} />
                ))}
              </div>

              {total > 12 && (
                <Pagination
                  currentPage={page}
                  totalPages={Math.ceil(total / 12)}
                  onPageChange={setPage}
                />
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No ideas found. Try adjusting your filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
