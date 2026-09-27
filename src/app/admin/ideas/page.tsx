'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { approveIdea, featureIdea, getAllIdeas, rejectIdea } from '@/lib/api';
import { useAuth } from '@/providers/AuthProvider';
import toast from 'react-hot-toast';

export default function AdminIdeasPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user && user.role !== 'ADMIN') {
      router.push('/dashboard');
      return;
    }

    async function fetchIdeas() {
      try {
        const response = await getAllIdeas(1, 50, { status: 'UNDER_REVIEW' });
        const responseData = response.data?.data || response.data;
        setIdeas(responseData.items || responseData.data || []);
      } catch (error) {
        console.error('Failed to load ideas:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchIdeas();
  }, [router, user]);

  const selectedIdeaId = searchParams.get('ideaId');

  async function refreshIdeas() {
    const response = await getAllIdeas(1, 50, { status: 'UNDER_REVIEW' });
    const responseData = response.data?.data || response.data;
    setIdeas(responseData.items || responseData.data || []);
  }

  async function handleApprove(ideaId: string) {
    try {
      await approveIdea(ideaId);
      toast.success('Idea approved successfully');
      await refreshIdeas();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to approve idea');
    }
  }

  async function handleReject(ideaId: string) {
    try {
      await rejectIdea(ideaId, feedback[ideaId] || 'Rejected by admin');
      toast.success('Idea rejected');
      await refreshIdeas();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to reject idea');
    }
  }

  async function handleFeature(ideaId: string) {
    try {
      await featureIdea(ideaId);
      toast.success('Idea featured successfully');
      await refreshIdeas();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to feature idea');
    }
  }

  if (loading) {
    return <div className="p-8">Loading admin review queue...</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Review Ideas</h1>
          <p className="text-gray-600">Approve, reject, or feature ideas before they appear publicly.</p>
        </div>

        {selectedIdeaId && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
            Reviewing idea ID: {selectedIdeaId}
          </div>
        )}

        {ideas.length > 0 ? (
          <div className="grid gap-4">
            {ideas.map((idea) => (
              <div key={idea.id} className="rounded-lg bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-[#16281F]">{idea.title}</h2>
                    <p className="text-sm text-gray-600">By {idea.author?.name} • {idea.category?.name}</p>
                    <p className="text-sm text-gray-600">Status: {idea.status}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleApprove(idea.id)}
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleFeature(idea.id)}
                      className="rounded-lg bg-[#E3A23D] px-4 py-2 text-sm font-semibold text-[#16281F] hover:bg-[#EEB35A]"
                    >
                      Feature
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3">
                  <textarea
                    value={feedback[idea.id] || ''}
                    onChange={(e) => setFeedback({ ...feedback, [idea.id]: e.target.value })}
                    className="min-h-28 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#4F7A5A]"
                    placeholder="Optional rejection feedback"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleReject(idea.id)}
                      className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No ideas waiting for review.</p>
        )}
      </div>
    </DashboardLayout>
  );
}