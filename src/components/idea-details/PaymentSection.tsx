'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { createPaymentSession } from '@/lib/api';
import Button from '@/components/ui/Button';

interface PaymentSectionProps {
  idea: {
    id: string;
    price: number;
  };
}

export default function PaymentSection({ idea }: PaymentSectionProps) {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handlePurchase() {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    setLoading(true);
    try {
      const response = await createPaymentSession(idea.id);
      const responseData = response.data?.data || response.data;
      // Redirect to Stripe checkout
      window.location.href = `https://checkout.stripe.com/pay/${responseData.sessionId}`;
    } catch (error: any) {
      console.error('Failed to create payment session:', error);
      alert(error.response?.data?.message || 'Failed to process payment');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">💰 Unlock Full Access</h3>

      <div className="text-4xl font-bold text-green-600 mb-2">
        ${typeof idea.price === 'number' ? idea.price.toFixed(2) : idea.price}
      </div>

      <p className="text-gray-600 text-sm mb-6">
        One-time payment to unlock full access to this premium idea.
      </p>

      <Button
        onClick={handlePurchase}
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        {loading ? 'Processing...' : 'Purchase Now'}
      </Button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Secure payment powered by Stripe
      </p>
    </div>
  );
}
