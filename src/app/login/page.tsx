'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/lib/api';
import { useAuth } from '@/providers/AuthProvider';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login: setAuthUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(formData.email, formData.password);
      const responseData = response.data?.data || response.data;
      setAuthUser(responseData.user, responseData.accessToken, responseData.refreshToken);

      const redirectTo = searchParams.get('next');
      const fallbackRoute = responseData.user?.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard';
      const targetRoute = redirectTo?.startsWith('/') ? redirectTo : fallbackRoute;

      router.replace(targetRoute);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-[#F1F4EC]">
      {/* Brand panel — hidden on mobile */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-[#16281F] px-14 py-14">
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#4F7A5A] opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-[#E3A23D] opacity-10 blur-3xl" />
        <span className="absolute left-[18%] top-[30%] h-2 w-2 rounded-full bg-[#E3A23D]/60" aria-hidden="true" />
        <span className="absolute right-[22%] top-[58%] h-2.5 w-2.5 rounded-full bg-[#7FA687]/60" aria-hidden="true" />

        <Link href="/" className="relative z-10 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-md bg-[#E3A23D] text-[#16281F] text-lg">
            🌱
          </span>
          <span
            className="text-2xl font-bold text-white"
            style={{ fontFamily: 'var(--font-fraunces, serif)' }}
          >
            EcoSpark
          </span>
        </Link>

        <div className="relative z-10 max-w-md">
          <h2
            className="text-4xl font-bold leading-tight text-white"
            style={{ fontFamily: 'var(--font-fraunces, serif)' }}
          >
            Welcome back to the <span className="italic text-[#7FA687]">community</span>
          </h2>
          <p className="mt-4 text-[#B9C4BB] leading-relaxed">
            Pick up where you left off — vote on ideas, track your submissions, and keep
            building a greener future together.
          </p>
        </div>

        <p className="relative z-10 text-sm text-[#7C8A7F]">
          &copy; {new Date().getFullYear()} EcoSpark Hub
        </p>
      </div>

      {/* Form panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-md bg-[#E3A23D] text-[#16281F] text-lg">
              🌱
            </span>
            <span
              className="text-2xl font-bold text-[#16281F]"
              style={{ fontFamily: 'var(--font-fraunces, serif)' }}
            >
              EcoSpark
            </span>
          </div>

          <h1
            className="text-3xl sm:text-[2.25rem] font-bold text-[#1C2620]"
            style={{ fontFamily: 'var(--font-fraunces, serif)' }}
          >
            Log in
          </h1>
          <p className="mt-2 text-[#6B7A70]">Good to see you again.</p>

          {error && (
            <div className="mt-6 rounded-lg border border-[#E8B9B2] bg-[#FBEDEB] px-4 py-3 text-sm font-medium text-[#B0473C]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-tl-xl! rounded-br-xl! rounded-tr-md! rounded-bl-md! bg-[#16281F]! hover:bg-[#1E3328]! py-3.5! font-bold!"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-[#6B7A70]">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-[#4F7A5A] hover:text-[#16281F] transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}