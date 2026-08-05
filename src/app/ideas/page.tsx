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
  <div className="min-h-screen bg-gradient-to-b from-[#F8FAF5] via-[#F4F6EF] to-[#F1F4EC]">

    {/* ================= HERO ================= */}

    <section className="relative overflow-hidden bg-[#16281F]">

      {/* Background Glow */}

      <div className="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-[#E3A23D]/10 blur-[120px]" />
      <div className="absolute right-0 top-10 h-[420px] w-[420px] rounded-full bg-[#4F7A5A]/20 blur-[140px]" />
      <div className="absolute bottom-0 left-1/3 h-60 w-60 rounded-full bg-[#7FA687]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24">

        <p className="uppercase tracking-[0.25em] text-sm font-bold text-[#8DB89A]">
          Browse the Community
        </p>

        <h1
          className="mt-4 max-w-3xl text-5xl md:text-6xl font-bold leading-tight text-white"
          style={{ fontFamily: 'var(--font-fraunces, serif)' }}
        >
          Discover Inspiring
          <span className="text-[#E3A23D]"> Sustainability Ideas</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#C6D2C8]">
          Explore innovative environmental ideas, discover projects from creators,
          vote for your favourites and become part of a growing eco-friendly
          community.
        </p>

        {/* Search */}

        <div className="mt-10 max-w-3xl">
          <SearchBar onSearch={setSearch} />
        </div>

        {/* Popular Categories */}

        <div className="mt-8 flex flex-wrap gap-3">

          {[
            "🌱 Sustainability",
            "♻ Recycling",
            "☀ Solar",
            "💧 Water",
            "🌍 Climate",
            "⚡ Energy",
          ].map((item) => (
            <button
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white backdrop-blur transition hover:bg-white/10"
            >
              {item}
            </button>
          ))}

        </div>

      </div>

    </section>

    {/* ================= STATS ================= */}

    <section className="relative -mt-12 z-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid grid-cols-2 gap-5 rounded-3xl bg-white p-8 shadow-xl md:grid-cols-4">

          <div className="text-center">
            <p className="text-4xl font-bold text-[#16281F]">
              {total}
            </p>
            <p className="mt-2 text-sm text-[#708173]">
              Published Ideas
            </p>
          </div>

          <div className="text-center">
            <p className="text-4xl font-bold text-[#16281F]">
              120+
            </p>
            <p className="mt-2 text-sm text-[#708173]">
              Active Creators
            </p>
          </div>

          <div className="text-center">
            <p className="text-4xl font-bold text-[#16281F]">
              4.8★
            </p>
            <p className="mt-2 text-sm text-[#708173]">
              Community Rating
            </p>
          </div>

          <div className="text-center">
            <p className="text-4xl font-bold text-[#16281F]">
              1K+
            </p>
            <p className="mt-2 text-sm text-[#708173]">
              Eco Members
            </p>
          </div>

        </div>

      </div>

    </section>

    {/* ================= CONTENT ================= */}

    <section className="mx-auto max-w-7xl px-6 py-16">

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">

        {/* Sidebar */}

        <aside className="lg:col-span-1">

          <div className="sticky top-24 rounded-3xl border border-[#E7ECE5] bg-white p-7 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <h3 className="text-xl font-bold text-[#16281F]">
                  Filters
                </h3>

                <p className="mt-1 text-sm text-[#708173]">
                  Narrow your search
                </p>
              </div>

              <button
                onClick={() => {
                  setSearch('');
                  setCategoryId('');
                  setSortBy('recent');
                  setIsPaid(undefined);
                }}
                className="text-sm font-medium text-[#4F7A5A] hover:text-[#16281F]"
              >
                Reset
              </button>

            </div>

            <FilterSidebar
              sortBy={sortBy}
              onSortChange={setSortBy}
              categoryId={categoryId}
              onCategoryChange={setCategoryId}
              isPaid={isPaid}
              onPaidChange={setIsPaid}
            />

          </div>

        </aside>

         <main className="lg:col-span-3">

  {/* Results Header */}

  <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

    <div>
      <h2 className="text-2xl font-bold text-[#16281F]">
        Community Ideas
      </h2>

      <p className="mt-2 text-[#708173]">
        {loading
          ? "Loading ideas..."
          : `${total} ${total === 1 ? "idea" : "ideas"} available`}
      </p>
    </div>

    <div className="rounded-full bg-[#EAF3EA] px-5 py-2 text-sm font-medium text-[#2E5D3E]">
      {sortBy === "recent"
        ? "Most Recent"
        : sortBy === "topVoted"
        ? "Top Voted"
        : "Most Commented"}
    </div>

  </div>

  {/* Loading */}

  {loading ? (

    <div className="flex h-[450px] items-center justify-center rounded-3xl border border-[#E5EBE3] bg-white shadow-sm">

      <Loading />

    </div>

  ) : ideas.length > 0 ? (

    <>

      {/* Cards */}

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

        {ideas.map((idea: any) => (

          <div
            key={idea.id}
            className="transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]"
          >
            <IdeaCard idea={idea} />
          </div>

        ))}

      </div>

      {/* Pagination */}

      {total > 12 && (

        <div className="mt-14 flex justify-center">

          <Pagination
            currentPage={page}
            totalPages={Math.ceil(total / 12)}
            onPageChange={setPage}
          />

        </div>

      )}

    </>

  ) : (

    <div className="flex min-h-[500px] items-center justify-center">

      <div className="w-full rounded-[32px] border border-dashed border-[#C8D5C8] bg-white px-10 py-20 text-center shadow-sm">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#F3F8F2] text-5xl">
          🌱
        </div>

        <h3
          className="mt-8 text-3xl font-bold text-[#16281F]"
          style={{
            fontFamily: "var(--font-fraunces, serif)",
          }}
        >
          Nothing Found
        </h3>

        <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-[#708173]">
          We couldn't find any sustainability ideas matching
          your search or selected filters.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <button
            onClick={() => {
              setSearch("");
              setCategoryId("");
              setSortBy("recent");
              setIsPaid(undefined);
            }}
            className="rounded-xl bg-[#16281F] px-7 py-3 font-semibold text-white transition hover:bg-[#22382C]"
          >
            Clear Filters
          </button>

          <button
            onClick={() => {
              setSearch("");
              fetchIdeas();
            }}
            className="rounded-xl border border-[#4F7A5A] px-7 py-3 font-semibold text-[#4F7A5A] transition hover:bg-[#F4F8F4]"
          >
            Browse All Ideas
          </button>

        </div>

      </div>

    </div>

  )}

</main>

      </div>

    </section>

  </div>
);
}