'use client';

import { useEffect, useState } from 'react';
import { getDashboardStats, getAllIdeas } from '@/lib/api';
import Link from 'next/link';

interface AdminDashboardProps {
  user: any;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [stats, setStats] = useState<any>(null);
  const [pendingIdeas, setPendingIdeas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, ideasData] = await Promise.all([
          getDashboardStats(),
          getAllIdeas(1, 5, { status: 'UNDER_REVIEW' }),
        ]);
        const statsResponse = statsData.data?.data || statsData.data;
        const ideasResponse = ideasData.data?.data || ideasData.data;
        setStats(statsResponse);
        setPendingIdeas(ideasResponse.items || ideasResponse);
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard 🛡️</h1>
        <p className="text-gray-600">Manage the EcoSpark community.</p>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-blue-600">{stats.totalUsers}</div>
            <div className="text-gray-600">Total Users</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-green-600">{stats.approvedIdeas}</div>
            <div className="text-gray-600">Approved Ideas</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-yellow-600">{stats.pendingIdeas}</div>
            <div className="text-gray-600">Pending Review</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-red-600">{stats.rejectedIdeas}</div>
            <div className="text-gray-600">Rejected Ideas</div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Ideas Pending Review</h2>
          <Link href="/admin/ideas" className="text-green-600 hover:underline">
            View All →
          </Link>
        </div>

        {pendingIdeas.length > 0 ? (
          <div className="space-y-4">
            {pendingIdeas.map((idea: any) => (
              <div key={idea.id} className="border-l-4 border-yellow-600 pl-4 py-2">
                <h3 className="font-bold">{idea.title}</h3>
                <div className="text-sm text-gray-600">
                  By: {idea.author.name} • {new Date(idea.createdAt).toLocaleDateString()}
                </div>
                <Link
                  href={`/admin/ideas?ideaId=${idea.id}`}
                  className="text-green-600 hover:underline text-sm"
                >
                  Review →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No pending ideas.</p>
        )}
      </div>
    </div>
  );
}
