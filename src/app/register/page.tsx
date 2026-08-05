'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { register } from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await register(formData);

      const responseData = response.data?.data || response.data;

      localStorage.setItem('accessToken', responseData.accessToken);
      localStorage.setItem('refreshToken', responseData.refreshToken);
      localStorage.setItem('user', JSON.stringify(responseData.user));

      router.push('/dashboard');
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-[#F1F4EC] overflow-hidden">
      {/* ================= Left Section ================= */}

      <div className="relative hidden lg:flex lg:w-[48%] items-center bg-[#16281F] overflow-hidden">

        {/* Background Effects */}

        <div className="absolute -top-40 -left-32 h-[420px] w-[420px] rounded-full bg-[#E3A23D] opacity-10 blur-[120px]" />

        <div className="absolute -bottom-44 right-0 h-[400px] w-[400px] rounded-full bg-[#4F7A5A] opacity-20 blur-[120px]" />

        <span className="absolute left-[18%] top-[25%] h-2 w-2 rounded-full bg-[#E3A23D]" />

        <span className="absolute left-[24%] bottom-[24%] h-3 w-3 rounded-full bg-[#7FA687]" />

        <div className="relative z-10 flex h-full flex-col justify-between px-20 py-16">

          {/* Logo */}

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E3A23D] text-xl">
              🌱
            </div>

            <span
              className="text-3xl font-bold text-white"
              style={{ fontFamily: 'var(--font-fraunces, serif)' }}
            >
              EcoSpark
            </span>
          </Link>

          {/* Hero */}

          <div className="max-w-xl">

            <h2
              className="text-6xl font-bold leading-tight text-white"
              style={{ fontFamily: 'var(--font-fraunces, serif)' }}
            >
              Bring your{' '}
              <span className="italic text-[#7FA687]">
                idea
              </span>{' '}
              to the table
            </h2>

            <p className="mt-7 text-xl leading-9 text-[#B9C4BB]">
              Join a growing community of environmental innovators
              sharing ideas that inspire action, collaboration,
              and sustainable change.
            </p>

          </div>

          <p className="text-sm text-[#7C8A7F]">
            © {new Date().getFullYear()} EcoSpark Hub
          </p>
        </div>
      </div>

      {/* ================= Right Section ================= */}

      <div className="flex w-full lg:w-[52%] items-center justify-center px-6 py-12 lg:px-20">

        <div className="w-full max-w-lg rounded-3xl border border-[#E7ECE5] bg-white p-8 shadow-xl sm:p-12">

          {/* Mobile Logo */}

          <div className="mb-10 flex items-center gap-3 lg:hidden">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E3A23D] text-lg">
              🌱
            </div>

            <span
              className="text-2xl font-bold text-[#16281F]"
              style={{ fontFamily: 'var(--font-fraunces, serif)' }}
            >
              EcoSpark
            </span>
          </div>

          <h1
            className="text-4xl font-bold text-[#1C2620]"
            style={{ fontFamily: 'var(--font-fraunces, serif)' }}
          >
            Create your account
          </h1>

          <p className="mt-3 text-lg text-[#6B7A70]">
            Start sharing ideas in minutes.
          </p>

          <div className="my-8 h-px bg-[#E8ECE8]" />

          {error && (
            <div className="mb-6 rounded-xl border border-[#F0B9B2] bg-[#FFF1EF] px-4 py-3 text-sm font-medium text-[#B0473C]">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <Input
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              required
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              required
            />

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
              required
            />

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 h-14 w-full rounded-xl bg-[#16281F] text-lg font-semibold transition-all duration-300 hover:bg-[#1F3529] hover:shadow-lg"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <p className="mt-8 text-center text-[15px] text-[#6B7A70]">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-[#4F7A5A] transition-colors hover:text-[#16281F]"
            >
              Log in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}