'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateIdeaForm from '@/components/forms/CreateIdeaForm';
import { getCategories } from '@/lib/api';

export default function CreateIdeaPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
      return;
    }

    async function fetchCategories() {
      try {
        const response = await getCategories();
        const data = response.data?.data || response.data;
        setCategories(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8">Create New Idea</h1>
      <CreateIdeaForm categories={categories} onSuccess={() => router.push('/dashboard')} />
    </div>
  );
}
