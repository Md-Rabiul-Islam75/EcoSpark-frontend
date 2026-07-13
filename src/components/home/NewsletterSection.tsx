'use client';

import { useState } from 'react';
import { subscribeNewsletter } from '@/lib/api';
import Button from '@/components/ui/Button';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await subscribeNewsletter(email);
      setMessage('✅ Successfully subscribed to our newsletter!');
      setEmail('');
    } catch (error: any) {
      setMessage('❌ ' + (error.response?.data?.message || 'Failed to subscribe'));
    } finally {
      setLoading(false);
    }
  }

  const isSuccess = message.startsWith('✅');

  return (
    <section className="relative overflow-hidden bg-[#1E3328] py-20 sm:py-24">
      <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 h-64 w-[36rem] rounded-full bg-[#E3A23D] opacity-[0.07] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-xl px-5 sm:px-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#E3A23D]/15 text-2xl">
          📧
        </span>

        <h2
          className="mt-6 text-3xl sm:text-4xl font-bold text-white"
          style={{ fontFamily: 'var(--font-fraunces, serif)' }}
        >
          Stay Updated
        </h2>
        <p className="mt-3 text-[#B9C4BB] text-base sm:text-lg leading-relaxed">
          Subscribe for the latest sustainability ideas and platform updates.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-9 flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            required
            className="flex-1 rounded-lg border border-[#3A5642] bg-[#16281F] px-5 py-3.5 text-white placeholder:text-[#7C8A7F] focus:outline-none focus:ring-2 focus:ring-[#E3A23D] transition-shadow"
          />
          <Button
            type="submit"
            disabled={loading}
            variant="secondary"
            className="whitespace-nowrap !rounded-tl-lg !rounded-br-lg !rounded-tr-md !rounded-bl-md !bg-[#E3A23D] !text-[#16281F] !font-bold hover:!bg-[#EEB35A] px-7 py-3.5"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>

        {message && (
          <div
            className={`mt-5 inline-block rounded-lg px-4 py-2.5 text-sm font-semibold ${
              isSuccess
                ? 'bg-[#2B4A34] text-[#9FD4A8]'
                : 'bg-[#4A2B2B] text-[#F1A398]'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </section>
  );
}