import type { Metadata } from 'next';
import { services, projects } from '@/lib/projects';
import { Arrow, Mark, ProjectPreview, ContactLink } from '@/components/studio/shared';
import { HomeMotion } from '@/components/studio/home-motion';
import { PageClosing } from '@/components/studio/page-closing';
import './services.css';

export const metadata: Metadata = {
  title: 'Web Design & Development Services',
  description: 'Custom websites, visual identities, and web applications. Designed for desktop and mobile, with speed, security, and search and AI discovery in mind.',
  alternates: { canonical: '/services' },
};

const questions = [
  ['Do I need a full brief?', 'No. A short description of your business, your idea, and what you want people to do is enough to start.'],
  ['Can you help with an existing website?', 'Yes. Tell us what works, what needs to change, and what you want the site to do.'],
  ['How will we work together?', 'You’ll have a clear point of contact who knows your project. We’ll listen to what you need, agree on the scope, and keep you involved in the decisions and progress through launch.'],
  ['What about search engines and AI discovery?', 'We organise your content clearly, make public pages accessible to search engines, and add descriptive page information. These foundations help search engines and AI tools understand your business and what you offer.'],
  ['What does a project cost?', 'Scope, complexity, content, and integrations affect the cost. We’ll discuss those first so the proposal is specific to your project.'],
];

function ServiceSymbol({ kind }: { kind: string }) {
  return <svg viewBox="0 0 100 80" fill="none" aria-hidden="true">
    {kind === 'custom-websites' ? <>
      <rect x="10" y="14" width="73" height="51" rx="4" />
      <path d="M10 27h73M19 20h2m5 0h2m5 0h2M21 38h25M21 46h18M21 55h13" />
      <rect x="57" y="37" width="16" height="18" rx="2" className="service-symbol-fill" />
      <path d="m78 52 12 8-7 2-3 7z" className="service-symbol-cursor" />
    </> : kind === 'interactive-web-experiences' ? <>
      <circle cx="48" cy="40" r="25" />
      <ellipse cx="48" cy="40" rx="43" ry="13" transform="rotate(-24 48 40)" />
      <path d="M48 15c-13 12-13 38 0 50M48 15c13 12 13 38 0 50M19 12v9m-4-4h8m61 39v9m-4-4h8" />
      <circle cx="83" cy="22" r="5" className="service-symbol-fill" />
    </> : <>
      <rect x="8" y="27" width="27" height="25" rx="4" />
      <rect x="66" y="8" width="27" height="25" rx="4" />
      <rect x="66" y="48" width="27" height="25" rx="4" className="service-symbol-fill" />
      <path d="M35 40h15m0 0V20h16M50 40v20h16M17 36h9m-9 7h6M75 17h9m-9 7h6" />
      <path d="m73 60 4 4 9-9" className="service-symbol-check" />
      <circle cx="50" cy="40" r="3" className="service-symbol-fill" />
    </>}
  </svg>;
}

export default function Services() {
  return (
    <main id="main" className="services-page studio-page">
      <HomeMotion rootSelector=".services-page" />
      <section className="services-hero" aria-labelledby="services-title">
        <div className="services-hero-layout wrap">
          <div className="services-hero-copy">
            <p className="services-eyebrow">From first idea to final detail</p>
            <h1 id="services-title">Design &amp;<br /><span>development.</span></h1>
            <p className="services-hero-description">Custom websites and applications that look great, work smoothly on desktop and mobile, and make life easier for you and your customers.</p>
            <ContactLink />
          </div>
          <nav className="services-hero-art" aria-label="Explore our services">
            <div className="services-art-backdrop" aria-hidden="true"><span /><span /></div>
            <Mark className="services-art-mark" />
            <div className="services-hero-options">
              {services.map(service => <a className="services-hero-option" href={`#${service.slug}`} key={service.slug}>
                <ServiceSymbol kind={service.slug} />
                <strong>{service.name}</strong>
              </a>)}
            </div>
          </nav>
        </div>
      </section>

      <div className="services-detail wrap">
        {services.map(service => {
          const project = projects.find(project => project.slug === service.projects[0])!;
          const isApplication = service.slug === 'web-applications';

          return (
            <section className={`service-detail service-detail--${service.slug}`} id={service.slug} aria-labelledby={`${service.slug}-title`} key={service.slug} data-home-reveal>
              <div className="service-intro">
                <p className="services-eyebrow">What we can build for you</p>
                <h2 id={`${service.slug}-title`}>{service.name}</h2>
                <p>{service.description}</p>
                <ul className="service-scope-list">
                  {service.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <a
                className={`service-example service-device-example${isApplication ? ' service-example--application' : ''}`}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit live site: ${project.name} (opens in a new tab)`}
                data-event="outbound_portfolio"
                data-project={project.slug}
              >
                <div className="service-example-stage">
                  <span className="service-stage-orbit" aria-hidden="true" />
                  <div className={isApplication ? 'service-product-preview' : 'service-device-pair'}>
                    <ProjectPreview
                      project={project}
                      variant={isApplication ? 'product' : 'desktop'}
                      sizes={isApplication
                        ? '(max-width: 650px) calc(100vw - 80px), (max-width: 900px) 560px, 40vw'
                        : '(max-width: 500px) calc(100vw - 160px), (max-width: 900px) 400px, 31vw'}
                    />
                    {!isApplication && <ProjectPreview project={project} variant="mobile" />}
                  </div>
                </div>
                <span className="service-example-caption"><span>{project.name}<small>Visit live site</small></span><Arrow diagonal /></span>
              </a>
            </section>
          );
        })}
      </div>

      <section className="services-faq" aria-labelledby="services-faq-title">
        <div className="services-faq-layout wrap">
          <div className="services-faq-heading" data-home-reveal>
            <p className="services-eyebrow">A few helpful answers</p>
            <h2 id="services-faq-title">Before <br />we begin.</h2>
            <Mark />
          </div>
          <div className="services-faq-questions" data-home-reveal>
            {questions.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <PageClosing eyebrow="Let’s make something yours" title="Let’s figure out what yours could be." description="Tell us what you have in mind. We’ll work through the possibilities and next steps together." />
    </main>
  );
}
