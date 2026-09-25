'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { getAllUsers, updateUser } from '@/lib/api';
import { useAuth } from '@/providers/AuthProvider';

type ManagedUser = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MEMBER';
  profileImage: string | null;
  isActive: boolean;
  createdAt: string;
};

export default function AdminUsersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.role !== 'ADMIN') {
      router.push('/dashboard');
      return;
    }

    async function fetchUsers() {
      try {
        const response = await getAllUsers();
        const responseData = response.data?.data || response.data;
        setUsers(Array.isArray(responseData) ? responseData : responseData.users || []);
      } catch {
        setError('Unable to load users. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [router, user]);

  async function changeUser(userId: string, data: { role?: 'ADMIN' | 'MEMBER'; isActive?: boolean }) {
    setUpdatingId(userId);
    setError('');
    try {
      const response = await updateUser(userId, data);
      const responseData = response.data?.data || response.data;
      setUsers((currentUsers) =>
        currentUsers.map((managedUser) =>
          managedUser.id === userId ? { ...managedUser, ...responseData } : managedUser,
        ),
      );
    } catch {
      setError('Unable to update this user. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return <div className="p-8">Loading users...</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-[#16281F]">Manage Users</h1>
          <p className="mt-2 text-gray-600">Review accounts and control access to the platform.</p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Joined</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((managedUser) => {
                const isCurrentUser = managedUser.id === user?.id;
                const isUpdating = updatingId === managedUser.id;

                return (
                  <tr key={managedUser.id} className="align-middle">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-[#16281F]">{managedUser.name}</div>
                      <div className="text-gray-500">{managedUser.email}</div>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={managedUser.role}
                        disabled={isUpdating || isCurrentUser}
                        onChange={(event) =>
                          changeUser(managedUser.id, {
                            role: event.target.value as ManagedUser['role'],
                          })
                        }
                        className="rounded border border-gray-300 bg-white px-2 py-1.5 text-sm disabled:cursor-not-allowed disabled:bg-gray-100"
                        aria-label={`Role for ${managedUser.name}`}
                      >
                        <option value="MEMBER">Member</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {new Date(managedUser.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          managedUser.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {managedUser.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        disabled={isUpdating || isCurrentUser}
                        onClick={() =>
                          changeUser(managedUser.id, { isActive: !managedUser.isActive })
                        }
                        className="rounded border border-[#4F7A5A] px-3 py-1.5 text-sm font-semibold text-[#4F7A5A] hover:bg-[#F1F4EC] disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
                      >
                        {isUpdating ? 'Updating...' : managedUser.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="px-5 py-8 text-center text-gray-500">No users found.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
