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

  return (
    <section className="bg-gradient-to-r from-green-700 to-emerald-800 text-white py-20">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <div className="mb-6">
          <span className="text-5xl">📧</span>
        </div>
        
        <h2 className="text-4xl font-bold mb-3">Stay Updated</h2>
        <p className="text-green-50 mb-10 text-lg">
          Subscribe to our newsletter for the latest sustainability ideas and platform updates.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            required
            className="flex-1 px-5 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <Button
            type="submit"
            disabled={loading}
            variant="secondary"
            className="whitespace-nowrap"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>

        {message && (
          <div className={`text-center text-sm font-semibold ${message.startsWith('✅') ? 'text-green-100 bg-green-900/30 px-4 py-2 rounded inline-block' : 'text-red-100 bg-red-900/30 px-4 py-2 rounded inline-block'}`}>
            {message}
          </div>
        )}
      </div>
    </section>
  );
}
