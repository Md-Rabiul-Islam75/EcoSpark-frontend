'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { createCategory, deleteCategory, getCategories, updateCategory } from '@/lib/api';
import { useAuth } from '@/providers/AuthProvider';

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count?: { ideas: number };
};

export default function AdminCategoriesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && user.role !== 'ADMIN') {
      router.replace('/dashboard');
      return;
    }

    async function loadCategories() {
      try {
        const response = await getCategories();
        const responseData = response.data?.data || response.data;
        setCategories(Array.isArray(responseData) ? responseData : []);
      } catch {
        setError('Unable to load categories. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, [router, user]);

  function resetForm() {
    setName('');
    setDescription('');
    setEditingId(null);
  }

  function startEditing(category: Category) {
    setEditingId(category.id);
    setName(category.name);
    setDescription(category.description || '');
    setError('');
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    setError('');
    try {
      const payload = { name: name.trim(), description: description.trim() || undefined };
      const response = editingId
        ? await updateCategory(editingId, payload)
        : await createCategory(payload);
      const savedCategory = response.data?.data || response.data;

      setCategories((currentCategories) =>
        editingId
          ? currentCategories.map((category) =>
              category.id === editingId ? { ...category, ...savedCategory } : category,
            )
          : [...currentCategories, savedCategory].sort((first, second) =>
              first.name.localeCompare(second.name),
            ),
      );
      resetForm();
    } catch {
      setError('Unable to save this category. Check that the name is unique.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(category: Category) {
    if (!window.confirm(`Delete the ${category.name} category?`)) return;

    setError('');
    try {
      await deleteCategory(category.id);
      setCategories((currentCategories) =>
        currentCategories.filter((currentCategory) => currentCategory.id !== category.id),
      );
      if (editingId === category.id) resetForm();
    } catch {
      setError('Unable to delete this category. Categories with ideas cannot be deleted.');
    }
  }

  if (loading) return <div className="p-8">Loading categories...</div>;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-[#16281F]">Manage Categories</h1>
          <p className="mt-2 text-gray-600">Organize the topics used by community ideas.</p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#16281F]">
            {editingId ? 'Edit Category' : 'Add Category'}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_2fr_auto_auto] md:items-end">
            <label className="text-sm font-semibold text-gray-700">
              Name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                minLength={2}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-normal outline-none focus:border-[#4F7A5A]"
              />
            </label>
            <label className="text-sm font-semibold text-gray-700">
              Description
              <input
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-normal outline-none focus:border-[#4F7A5A]"
              />
            </label>
            <button
              type="submit"
              disabled={saving}
              className="rounded bg-[#16281F] px-4 py-2 font-semibold text-white hover:bg-[#2A4232] disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Save' : 'Add'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Description</th>
                <th className="px-5 py-4">Ideas</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-[#16281F]">{category.name}</div>
                    <div className="text-xs text-gray-500">/{category.slug}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{category.description || 'No description'}</td>
                  <td className="px-5 py-4 text-gray-600">{category._count?.ideas || 0}</td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => startEditing(category)}
                      className="mr-3 font-semibold text-[#4F7A5A] hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(category)}
                      className="font-semibold text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {categories.length === 0 && <p className="px-5 py-8 text-center text-gray-500">No categories found.</p>}
        </div>
      </div>
    </DashboardLayout>
  );
}
