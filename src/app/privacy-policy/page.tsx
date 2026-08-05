import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | EcoSpark Hub',
  description: 'Learn how EcoSpark Hub collects and uses personal data.',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal / Privacy"
      title="Privacy Policy"
      description="This page explains what information we collect, why we collect it, and how we protect it."
      updatedAt="August 5, 2026"
      sections={[
        {
          title: 'Information We Collect',
          body:
            'We collect information you share directly, such as your email address, profile details, ideas, comments, and voting activity. We also collect basic usage data to help improve the experience.',
          items: [
            'Account details like email and display name.',
            'Content you submit, including ideas and comments.',
            'Technical data such as device type and usage patterns.',
          ],
        },
        {
          title: 'How We Use Data',
          body:
            'Your information helps us provide the service, keep accounts secure, moderate content, and improve features that support the EcoSpark community.',
          items: [
            'Deliver core features and personalize your experience.',
            'Send important updates and service messages.',
            'Detect abuse, fraud, or misuse of the platform.',
          ],
        },
        {
          title: 'Your Choices',
          body:
            'You can review, update, or delete some of your information through your account settings or by contacting support when needed.',
          items: [
            'Use privacy controls in your profile settings.',
            'Unsubscribe from marketing messages at any time.',
            'Request help if you want account or data support.',
          ],
        },
      ]}
    />
  );
}
