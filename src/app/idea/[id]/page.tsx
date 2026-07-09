'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import IdeaHeader from '@/components/idea-details/IdeaHeader';
import IdeaContent from '@/components/idea-details/IdeaContent';
import VotingSection from '@/components/idea-details/VotingSection';
import CommentSection from '@/components/idea-details/CommentSection';
import PaymentSection from '@/components/idea-details/PaymentSection';
import Loading from '@/components/ui/Loading';
import { getIdea } from '@/lib/api';

export default function IdeaDetailsPage() {
  const params = useParams();
  const ideaId = params.id as string;
  const [idea, setIdea] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIdea();
  }, [ideaId]);

  async function fetchIdea() {
    try {
      const response = await getIdea(ideaId);
      const responseData = response.data?.data || response.data;
      setIdea(responseData);
    } catch (error) {
      console.error('Failed to fetch idea:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;
  if (!idea) return <div className="container mx-auto px-4 py-8">Idea not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <IdeaHeader idea={idea} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <IdeaContent idea={idea} />
          <CommentSection ideaId={ideaId} />
        </div>
        <aside className="lg:col-span-1 space-y-6">
          <VotingSection ideaId={ideaId} votes={idea._count.votes} />
          {idea.isPaid && <PaymentSection idea={idea} />}
        </aside>
      </div>
    </div>
  );
}
