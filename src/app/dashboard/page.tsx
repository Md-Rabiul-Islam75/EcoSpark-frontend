'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import UserDashboard from '@/components/dashboard/UserDashboard';
import { useAuth } from '@/providers/AuthProvider';

export default function MemberDashboardPage() {
  const router = useRouter();
  const { user: authenticatedUser, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !authenticatedUser) {
      router.replace('/login?redirectTo=/dashboard');
    } else if (!authLoading && authenticatedUser?.role === 'ADMIN') {
      router.replace('/admin/dashboard');
    }
  }, [authLoading, authenticatedUser, router]);

  if (authLoading || !authenticatedUser || authenticatedUser.role === 'ADMIN') {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <UserDashboard user={authenticatedUser} />
    </DashboardLayout>
  );
}
