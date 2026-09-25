'use client';

import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
          <nav className="space-y-2">
            <Link
              href={user?.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'}
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              📊 Overview
            </Link>
            {user?.role === 'MEMBER' && (
              <>
                <Link
                  href="/create-idea"
                  className="block px-4 py-2 rounded hover:bg-gray-700"
                >
                  ✨ Create Idea
                </Link>
                <Link
                  href="/dashboard/my-ideas"
                  className="block px-4 py-2 rounded hover:bg-gray-700"
                >
                  💡 My Ideas
                </Link>
                <Link
                  href="/dashboard/purchases"
                  className="block px-4 py-2 rounded hover:bg-gray-700"
                >
                  🛒 My Purchases
                </Link>
              </>
            )}
            {user?.role === 'ADMIN' && (
              <>
                <Link
                  href="/admin/ideas"
                  className="block px-4 py-2 rounded hover:bg-gray-700"
                >
                  🔍 Review Ideas
                </Link>
                <Link
                  href="/admin/users"
                  className="block px-4 py-2 rounded hover:bg-gray-700"
                >
                  👥 Manage Users
                </Link>
                <Link
                  href="/admin/categories"
                  className="block px-4 py-2 rounded hover:bg-gray-700"
                >
                  📂 Categories
                </Link>
              </>
            )}
            <Link
              href="/profile"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              👤 Profile
            </Link>
          </nav>
        </div>
      </aside>

      <main className="flex-1 bg-gray-50 p-8">
        {children}
      </main>
    </div>
  );
}
