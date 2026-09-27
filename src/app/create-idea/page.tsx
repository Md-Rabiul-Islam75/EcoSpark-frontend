'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateIdeaForm from '@/components/forms/CreateIdeaForm';
import { getCategories } from '@/lib/api';
import toast from 'react-hot-toast';

export default function CreateIdeaPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
      return;
    }

    async function fetchCategories() {
      try {
        const response = await getCategories();
        const data = response.data?.data || response.data;
        setCategories(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F1F4EC] py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <section className="relative overflow-hidden rounded-4xl bg-[#16281F] px-6 py-8 text-white shadow-2xl sm:px-8 sm:py-10 lg:sticky lg:top-8">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#E3A23D]/15 blur-3xl" />
            <div className="absolute -bottom-20 left-0 h-56 w-56 rounded-full bg-[#7FA687]/10 blur-3xl" />

            <div className="relative max-w-xl">
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#8DB89A]">
                Share an Idea
              </span>

              <h1
                className="mt-5 text-4xl font-bold leading-tight sm:text-5xl"
                style={{ fontFamily: 'var(--font-fraunces, serif)' }}
              >
                Build something useful for the planet.
              </h1>

              <p className="mt-5 max-w-lg text-base leading-8 text-[#C6D2C8] sm:text-lg">
                Write a clear problem, propose a practical solution, and choose the right category so the community can discover it.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ['Title', 'A short, clear idea name'],
                  ['Category', 'Pick the most relevant topic'],
                  ['Review', 'Save draft or submit'],
                ].map(([label, text]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="text-sm font-bold text-[#E3A23D]">{label}</div>
                    <div className="mt-2 text-sm leading-6 text-[#D5DED7]">{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-4xl border border-[#E2E8DF] bg-white p-4 shadow-sm sm:p-6">
            {categories.length === 0 && (
              <div className="mb-6 rounded-2xl border border-dashed border-[#D6DDD4] bg-[#F8FAF5] p-4 text-sm text-[#5D6A60]">
                No categories are available yet. The database is currently empty, so the dropdown will stay blank until categories are seeded.
              </div>
            )}

            <CreateIdeaForm
              categories={categories}
              onSuccess={(message) => {
                toast.success(message);
                router.push('/dashboard');
              }}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
