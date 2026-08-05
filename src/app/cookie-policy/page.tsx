import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Cookie Policy | EcoSpark Hub',
  description: 'Understand how cookies and similar technologies are used on EcoSpark Hub.',
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal / Cookies"
      title="Cookie Policy"
      description="This page explains the cookies and similar tools we use to keep EcoSpark Hub working smoothly."
      updatedAt="August 5, 2026"
      sections={[
        {
          title: 'What Cookies Do',
          body:
            'Cookies help remember your preferences, keep you signed in, and improve how pages load and behave while you browse.',
          items: [
            'Remember session and login status.',
            'Store basic preferences like theme or language choices.',
            'Measure usage so we can improve the site.',
          ],
        },
        {
          title: 'Types of Cookies We Use',
          body:
            'We use essential cookies for functionality and may use analytics cookies to understand how visitors interact with the site.',
          items: [
            'Essential cookies for security and navigation.',
            'Preference cookies for saved settings.',
            'Analytics cookies for performance insights.',
          ],
        },
        {
          title: 'Managing Cookies',
          body:
            'You can control cookies through your browser settings. Some features may stop working properly if you disable essential cookies.',
          items: [
            'Clear cookies from your browser when needed.',
            'Block non-essential cookies in browser settings.',
            'Contact support if you need help understanding cookie choices.',
          ],
        },
      ]}
    />
  );
}
