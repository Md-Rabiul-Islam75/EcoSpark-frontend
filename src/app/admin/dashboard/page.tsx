'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import { getUser } from '@/lib/api';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  console.log('AdminDashboardPage rendered');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
      return;
    }

    async function fetchUser() {
      try {
        const response = await getUser();
        const userData = response.data?.data || response.data;
        if (userData.role !== 'ADMIN') {
          router.push('/dashboard');
          return;
        }
        setUser(userData);
      } catch (error) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <DashboardLayout>
      <AdminDashboard user={user} />
    </DashboardLayout>
  );
}
