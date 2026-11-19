import Link from 'next/link';
import {Mark} from './shared';

export function PageClosing({eyebrow = 'Let’s make something yours', title, description}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <section className="studio-closing">
      <div className="studio-closing-inner wrap" data-home-reveal>
        <div>
          <p className="studio-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="studio-closing-description">{description}</p>
        </div>
        <Link href="/contact" className="studio-cta-button" data-event="start_project">Start a project</Link>
        <Mark className="studio-closing-mark"/>
      </div>
    </section>
  );
}
