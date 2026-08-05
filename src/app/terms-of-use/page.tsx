import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Use | EcoSpark Hub',
  description: 'Read the terms that govern use of EcoSpark Hub.',
};

export default function TermsOfUsePage() {
  return (
    <LegalPage
      eyebrow="Legal / Terms"
      title="Terms of Use"
      description="These terms explain how you can use EcoSpark Hub, share ideas, and interact with the community."
      updatedAt="August 5, 2026"
      sections={[
        {
          title: 'Using EcoSpark Hub',
          body:
            'You may browse the platform, submit ideas, comment, vote, and engage with other members as long as you follow community rules and respect other users.',
          items: [
            'Do not post harmful, abusive, misleading, or illegal content.',
            'Do not copy, scrape, or redistribute content without permission.',
            'Keep your account details accurate and secure.',
          ],
        },
        {
          title: 'Content and Ownership',
          body:
            'You keep ownership of the content you create, but you grant EcoSpark Hub permission to display and moderate it so the platform can operate safely.',
          items: [
            'You are responsible for the ideas and comments you publish.',
            'We may remove content that violates platform rules.',
            'Community moderation helps keep the site useful for everyone.',
          ],
        },
        {
          title: 'Account and Service Rules',
          body:
            'We may update or suspend access when needed to protect users, improve the product, or respond to abuse.',
          items: [
            'Do not attempt to break or overload the service.',
            'Respect other members and their intellectual property.',
            'Use the site in a way that supports the sustainability community.',
          ],
        },
      ]}
    />
  );
}
