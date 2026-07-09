'use client';

import { useEffect, useState } from 'react';
import { getUserStats, getUserIdeas } from '@/lib/api';
import Link from 'next/link';

interface UserDashboardProps {
  user: any;
}

export default function UserDashboard({ user }: UserDashboardProps) {
  const [stats, setStats] = useState<any>(null);
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, ideasData] = await Promise.all([
          getUserStats(),
          getUserIdeas(1, 5),
        ]);
        setStats(statsData);
        setIdeas(ideasData.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Welcome, {user?.name}! 👋</h1>
        <p className="text-gray-600">Here's an overview of your activity.</p>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-green-600">{stats.ideas}</div>
            <div className="text-gray-600">Ideas Created</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-blue-600">{stats.votes}</div>
            <div className="text-gray-600">Votes Made</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-purple-600">{stats.comments}</div>
            <div className="text-gray-600">Comments</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-yellow-600">{stats.payments}</div>
            <div className="text-gray-600">Purchases</div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Your Recent Ideas</h2>
          <Link href="/create-idea" className="text-green-600 hover:underline">
            Create New ✨
          </Link>
        </div>

        {ideas.length > 0 ? (
          <div className="space-y-4">
            {ideas.map((idea: any) => (
              <div key={idea.id} className="border-l-4 border-green-600 pl-4 py-2">
                <h3 className="font-bold">{idea.title}</h3>
                <div className="text-sm text-gray-600">
                  Status: {idea.status} • {new Date(idea.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No ideas yet.{' '}
            <Link href="/create-idea" className="text-green-600 hover:underline">
              Create your first idea
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
