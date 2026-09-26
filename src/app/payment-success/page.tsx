'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    setSessionId(new URLSearchParams(window.location.search).get('session_id') || '');
    const redirectTimer = window.setTimeout(() => router.replace('/dashboard/purchases'), 2000);

    return () => window.clearTimeout(redirectTimer);
  }, [router]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
        ✓
      </div>
      <h1 className="text-3xl font-bold text-gray-900">Payment successful</h1>
      <p className="mt-3 text-gray-600">
        Your payment was received. The idea will be unlocked after Stripe confirms the payment.
      </p>
      <p className="mt-2 text-sm text-gray-500">Redirecting to your purchases...</p>
      {sessionId && <p className="mt-3 break-all text-xs text-gray-400">Session: {sessionId}</p>}
      <Link
        href="/dashboard"
        className="mt-8 rounded-md bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
      >
        Go to dashboard
      </Link>
    </main>
  );
}
