'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { getUserIdeas } from '@/lib/api';

export default function MyIdeasPage() {
  const router = useRouter();
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
      return;
    }

    async function fetchIdeas() {
      try {
        const response = await getUserIdeas(1, 50);
        const responseData = response.data?.data || response.data;
        setIdeas(responseData.items || responseData.data || []);
      } catch (error) {
        router.push('/dashboard');
      } finally {
        setLoading(false);
      }
    }

    fetchIdeas();
  }, [router]);

  if (loading) {
    return <div className="p-8">Loading your ideas...</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">My Ideas</h1>
          <p className="text-gray-600">All ideas you have created and submitted.</p>
        </div>

        {ideas.length > 0 ? (
          <div className="grid gap-4">
            {ideas.map((idea) => (
              <div key={idea.id} className="rounded-lg bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#16281F]">{idea.title}</h2>
                    <p className="text-sm text-gray-600">
                      Status: {idea.status} • {new Date(idea.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-[#4F7A5A]">
                    {idea.isPaid ? 'Paid idea' : 'Free idea'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have not created any ideas yet.</p>
        )}
      </div>
    </DashboardLayout>
  );
}