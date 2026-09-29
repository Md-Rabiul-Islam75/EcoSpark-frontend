'use client';

import { useEffect, useState } from 'react';
import { getCategories } from '@/lib/api';

interface FilterSidebarProps {
  sortBy: 'recent' | 'topVoted' | 'mostCommented';
  onSortChange: (sort: 'recent' | 'topVoted' | 'mostCommented') => void;
  categoryId: string;
  onCategoryChange: (categoryId: string) => void;
  isPaid?: boolean;
  onPaidChange: (isPaid: boolean | undefined) => void;
}

export default function FilterSidebar({
  sortBy,
  onSortChange,
  categoryId,
  onCategoryChange,
  isPaid,
  onPaidChange,
}: FilterSidebarProps) {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getCategories();
        const data = response.data?.data || response.data;
        setCategories(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#708173]">Sort By</h4>
        <div className="space-y-2">
          {(['recent', 'topVoted', 'mostCommented'] as const).map((option) => (
            <label
              key={option}
              className="flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-sm text-[#344239] transition hover:bg-[#F1F4EC]"
            >
              <input
                 type="radio"
                 name="sort"
                 checked={sortBy === option}
                 onChange={() => onSortChange(option)}
                 className="!h-4 !w-4 shrink-0 accent-[#4F7A5A]"
              />
              <span className="leading-5">
                {option === 'recent' && 'Most Recent'}
                {option === 'topVoted' && 'Top Voted'}
                {option === 'mostCommented' && 'Most Commented'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#708173]">Category</h4>
        <select
          value={categoryId}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="h-11 w-full rounded-xl border border-[#D6DED7] bg-white px-3 text-sm text-[#344239] outline-none transition focus:border-[#4F7A5A] focus:ring-2 focus:ring-[#4F7A5A]/20"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Payment Status */}
      <div>
        <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#708173]">Type</h4>
        <div className="space-y-2">
          <label className="flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-sm text-[#344239] transition hover:bg-[#F1F4EC]">
            <input
               type="radio"
               name="paid"
               checked={isPaid === undefined}
               onChange={() => onPaidChange(undefined)}
               className="!h-4 !w-4 shrink-0 accent-[#4F7A5A]"
            />
            <span>All Ideas</span>
          </label>
          <label className="flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-sm text-[#344239] transition hover:bg-[#F1F4EC]">
            <input
               type="radio"
               name="paid"
               checked={isPaid === false}
               onChange={() => onPaidChange(false)}
               className="!h-4 !w-4 shrink-0 accent-[#4F7A5A]"
            />
            <span className="text-sm">Free</span>
          </label>
          <label className="flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-sm text-[#344239] transition hover:bg-[#F1F4EC]">
            <input
               type="radio"
               name="paid"
               checked={isPaid === true}
               onChange={() => onPaidChange(true)}
               className="!h-4 !w-4 shrink-0 accent-[#4F7A5A]"
            />
            <span className="text-sm">Paid</span>
          </label>
        </div>
      </div>
    </div>
  );
}
