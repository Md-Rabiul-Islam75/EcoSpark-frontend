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
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold mb-4">Filters</h3>

      {/* Sort */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Sort By</h4>
        <div className="space-y-2">
          {(['recent', 'topVoted', 'mostCommented'] as const).map((option) => (
            <label key={option} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="sort"
                checked={sortBy === option}
                onChange={() => onSortChange(option)}
                className="mr-2"
              />
              <span className="text-sm">
                {option === 'recent' && 'Most Recent'}
                {option === 'topVoted' && 'Top Voted'}
                {option === 'mostCommented' && 'Most Commented'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Category</h4>
        <select
          value={categoryId}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Payment Status */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Type</h4>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="paid"
              checked={isPaid === undefined}
              onChange={() => onPaidChange(undefined)}
              className="mr-2"
            />
            <span className="text-sm">All Ideas</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="paid"
              checked={isPaid === false}
              onChange={() => onPaidChange(false)}
              className="mr-2"
            />
            <span className="text-sm">Free</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="paid"
              checked={isPaid === true}
              onChange={() => onPaidChange(true)}
              className="mr-2"
            />
            <span className="text-sm">Paid</span>
          </label>
        </div>
      </div>
    </div>
  );
}
