import type {Metadata} from 'next';
import {ContactForm} from '@/components/studio/interactive';
import {Mark} from '@/components/studio/shared';

export const metadata: Metadata = {
  title: 'Start a Project',
  description: 'Tell us what you need from your website or application. We’ll listen, help you explore the options, and work out the next steps together.',
  alternates: {canonical: '/contact'},
};

export default function Contact() {
  return (
    <main id="main" className="wrap">
      <section className="contact-page contact-layout">
        <div className="contact-copy">
          <h1>Tell us about your project<span className="blue">.</span></h1>
          <p>A new website, an idea for a tool, or a workflow that could work better. Tell us what you need, and we’ll explore the options and next steps together. No full brief needed.</p>
          <a className="text-link" href="mailto:hello@oddlogicstudio.com">hello@oddlogicstudio.com ↗</a>
          <span className="contact-note"><Mark/> A real conversation with someone who takes the time to understand your business.</span>
        </div>
        <ContactForm/>
      </section>
    </main>
  );
}
