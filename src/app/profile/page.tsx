'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { getUser, getUserStats, updateProfile } from '@/lib/api';
import { useAuth } from '@/providers/AuthProvider';

type ProfileData = {
  id: string;
  name: string;
  email: string;
  profileImage?: string | null;
  bio?: string | null;
  role?: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const { updateUser } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [stats, setStats] = useState<{ ideas: number; votes: number; comments: number; payments: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profileImage: '',
    bio: '',
    password: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
      return;
    }

    async function fetchProfile() {
      try {
        const [profileResponse, statsResponse] = await Promise.all([getUser(), getUserStats()]);
        const profileData = profileResponse.data?.data || profileResponse.data;
        const statsData = statsResponse.data?.data || statsResponse.data;

        setProfile(profileData);
        setStats(statsData);
        setFormData({
          name: profileData.name || '',
          email: profileData.email || '',
          profileImage: profileData.profileImage || '',
          bio: profileData.bio || '',
          password: '',
        });
      } catch (fetchError) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    try {
      const payload: Record<string, string> = {
        name: formData.name,
        email: formData.email,
        profileImage: formData.profileImage,
        bio: formData.bio,
      };

      if (formData.password.trim()) {
        payload.password = formData.password;
      }

      const response = await updateProfile(payload);
      const updatedProfile = response.data?.data || response.data;

      setProfile(updatedProfile);
      updateUser({
        id: updatedProfile.id,
        name: updatedProfile.name,
        email: updatedProfile.email,
        role: updatedProfile.role,
        profileImage: updatedProfile.profileImage || undefined,
      });
      setFormData((current) => ({ ...current, password: '' }));
      setMessage('Profile updated successfully.');
    } catch (submitError: any) {
      setError(submitError.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-[#F4F6EF] p-8 text-[#16281F]">Loading profile...</div>;
  }

  if (!profile) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="rounded-3xl bg-[#16281F] px-8 py-10 text-white shadow-xl">
          <p className="text-sm uppercase tracking-[0.25em] text-[#8DB89A]">Account Profile</p>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-fraunces, serif)' }}>
                {profile.name}
              </h1>
              <p className="mt-2 text-[#C6D2C8]">Manage your public details and account settings.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-[#E9EDE7]">
              <div className="font-semibold text-[#E3A23D]">{profile.role}</div>
              <div>{profile.email}</div>
            </div>
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="text-3xl font-bold text-[#4F7A5A]">{stats.ideas}</div>
              <div className="mt-1 text-sm text-[#708173]">Ideas</div>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="text-3xl font-bold text-[#1D6F5C]">{stats.votes}</div>
              <div className="mt-1 text-sm text-[#708173]">Votes</div>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="text-3xl font-bold text-[#B87D1A]">{stats.comments}</div>
              <div className="mt-1 text-sm text-[#708173]">Comments</div>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="text-3xl font-bold text-[#B0473C]">{stats.payments}</div>
              <div className="mt-1 text-sm text-[#708173]">Purchases</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#16281F]">Edit Profile</h2>
              <p className="mt-1 text-sm text-[#708173]">Update your account details and profile bio.</p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {message && (
              <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                {message}
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#16281F]">Full Name</span>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-2xl border border-[#DCE4D8] px-4 py-3 outline-none transition focus:border-[#4F7A5A] focus:ring-2 focus:ring-[#4F7A5A]/20"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#16281F]">Email</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-2xl border border-[#DCE4D8] px-4 py-3 outline-none transition focus:border-[#4F7A5A] focus:ring-2 focus:ring-[#4F7A5A]/20"
                  required
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-semibold text-[#16281F]">Profile Image URL</span>
              <input
                value={formData.profileImage}
                onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                className="w-full rounded-2xl border border-[#DCE4D8] px-4 py-3 outline-none transition focus:border-[#4F7A5A] focus:ring-2 focus:ring-[#4F7A5A]/20"
                placeholder="https://..."
              />
            </label>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-semibold text-[#16281F]">Bio</span>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="min-h-35 w-full rounded-2xl border border-[#DCE4D8] px-4 py-3 outline-none transition focus:border-[#4F7A5A] focus:ring-2 focus:ring-[#4F7A5A]/20"
                placeholder="Tell people a bit about yourself"
              />
            </label>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-semibold text-[#16281F]">New Password</span>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full rounded-2xl border border-[#DCE4D8] px-4 py-3 outline-none transition focus:border-[#4F7A5A] focus:ring-2 focus:ring-[#4F7A5A]/20"
                placeholder="Leave blank to keep current password"
              />
            </label>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={saving}
                className="rounded-2xl bg-[#4F7A5A] px-6 py-3 font-semibold text-white transition hover:bg-[#41644A] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="rounded-2xl border border-[#DCE4D8] px-6 py-3 font-semibold text-[#16281F] transition hover:bg-[#F8FAF5]"
              >
                Back to Dashboard
              </button>
            </div>
          </form>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#16281F]">Profile Preview</h2>
              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-[#F1F4EC] text-2xl font-bold text-[#4F7A5A]">
                  {profile.profileImage ? (
                    <img src={profile.profileImage} alt={profile.name} className="h-full w-full object-cover" />
                  ) : (
                    profile.name.slice(0, 1).toUpperCase()
                  )}
                </div>
                <div>
                  <div className="font-bold text-[#16281F]">{profile.name}</div>
                  <div className="text-sm text-[#708173]">{profile.email}</div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-[#F8FAF5] p-4 text-sm leading-7 text-[#44524A]">
                {profile.bio || 'No bio added yet.'}
              </div>
            </div>

            <div className="rounded-3xl border border-[#E7ECE5] bg-[#16281F] p-6 text-white shadow-sm">
              <h3 className="text-lg font-bold">Quick Links</h3>
              <div className="mt-4 space-y-3 text-sm">
                <button onClick={() => router.push('/dashboard')} className="block text-left text-[#E3A23D] hover:text-white">
                  View dashboard
                </button>
                <button onClick={() => router.push('/create-idea')} className="block text-left text-[#E3A23D] hover:text-white">
                  Create a new idea
                </button>
                <button onClick={() => router.push('/ideas')} className="block text-left text-[#E3A23D] hover:text-white">
                  Browse ideas
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}