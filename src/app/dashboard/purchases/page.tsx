'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { getUserPayments } from '@/lib/api';

type Purchase = {
  id: string;
  amount: string | number;
  currency: string;
  status: string;
  createdAt: string;
  idea: {
    id: string;
    title: string;
    slug: string;
    description: string;
  };
};

export default function PurchasesPage() {
  const router = useRouter();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPurchases() {
      try {
        const response = await getUserPayments();
        const data = response.data?.data || response.data;
        setPurchases(Array.isArray(data) ? data : []);
      } catch (requestError: any) {
        if (requestError.response?.status === 401) {
          router.replace('/login');
          return;
        }
        setError(requestError.response?.data?.message || 'Unable to load your purchases.');
      } finally {
        setLoading(false);
      }
    }

    loadPurchases();
  }, [router]);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900">My Purchases</h1>
        <p className="mt-2 text-gray-600">Ideas you have unlocked with Stripe payments.</p>

        {loading && <p className="mt-8 text-gray-600">Loading purchases...</p>}
        {error && <p className="mt-8 text-red-600">{error}</p>}
        {!loading && !error && purchases.length === 0 && (
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-600">You have no completed purchases yet.</p>
            <Link href="/ideas" className="mt-4 inline-block font-semibold text-green-700 hover:text-green-800">
              Browse ideas
            </Link>
          </div>
        )}

        {!loading && !error && purchases.length > 0 && (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {purchases.map((purchase) => (
              <article key={purchase.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold text-gray-900">{purchase.idea.title}</h2>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase text-green-700">
                    {purchase.status}
                  </span>
                </div>
                <p className="mt-3 line-clamp-3 text-sm text-gray-600">{purchase.idea.description}</p>
                <p className="mt-4 text-sm text-gray-500">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: purchase.currency || 'USD',
                  }).format(Number(purchase.amount))}
                </p>
                <Link
                  href={`/idea/${purchase.idea.slug}`}
                  className="mt-5 inline-block font-semibold text-green-700 hover:text-green-800"
                >
                  View idea
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
