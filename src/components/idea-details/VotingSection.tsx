'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { voteIdea } from '@/lib/api';
import Button from '@/components/ui/Button';

interface VotingSectionProps {
  ideaId: string;
  votes: number;
}

export default function VotingSection({ ideaId, votes }: VotingSectionProps) {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleVote(type: 'UP' | 'DOWN') {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    setLoading(true);
    try {
      await voteIdea(ideaId, type);
      // Refresh page or update state
      window.location.reload();
    } catch (error) {
      console.error('Failed to vote:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4">Voting</h3>

      <div className="space-y-3">
        <div className="text-center py-4 bg-gray-100 rounded">
          <div className="text-4xl font-bold text-green-600">{votes}</div>
          <div className="text-sm text-gray-600">Total Votes</div>
        </div>

        <Button
          onClick={() => handleVote('UP')}
          disabled={loading}
          className="w-full"
        >
          👍 Upvote
        </Button>

        <Button
          onClick={() => handleVote('DOWN')}
          disabled={loading}
          variant="outline"
          className="w-full"
        >
          👎 Downvote
        </Button>
      </div>
    </div>
  );
}
