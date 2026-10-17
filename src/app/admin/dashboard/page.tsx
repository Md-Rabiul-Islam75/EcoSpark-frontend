'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import { useAuth } from '@/providers/AuthProvider';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login?redirectTo=/admin/dashboard');
    } else if (!isLoading && user?.role !== 'ADMIN') {
      router.replace('/dashboard');
    }
  }, [isLoading, router, user]);

  if (isLoading || !user || user.role !== 'ADMIN') return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <AdminDashboard user={user} />
    </DashboardLayout>
  );
}
