import type { Metadata } from 'next';
import { services, projects } from '@/lib/projects';
import { Arrow, ProjectPreview, ContactLink } from '@/components/studio/shared';
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

export default function Services() {
  return (
    <main id="main" className="services-page wrap">
      <section className="page-heading">
        <h1>Design & development<span className="blue">.</span></h1>
        <p>Custom websites and applications that look great, work smoothly on desktop and mobile, and make life easier for you and your customers.</p>
      </section>

      <div className="services-detail">
        {services.map(service => {
          const project = projects.find(project => project.slug === service.projects[0])!;
          const isApplication = service.slug === 'web-applications';

          return (
            <section className="service-detail" id={service.slug} aria-labelledby={`${service.slug}-title`} key={service.slug}>
              <div className="service-intro">
                <h2 id={`${service.slug}-title`}>{service.name}</h2>
                <p>{service.description}</p>
                <ul className="service-scope-list">
                  {service.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <a
                className={`service-example service-device-example${isApplication ? ' service-example--application' : ''}`}
                href={`/work/${project.slug}`}
                aria-label={`View ${project.name} case study`}
                data-event="case_study_open"
                data-project={project.slug}
              >
                <div className={isApplication ? undefined : 'service-device-pair'}>
                  <ProjectPreview
                    project={project}
                    variant={isApplication ? 'product' : 'desktop'}
                    sizes={isApplication
                      ? '(max-width: 650px) calc(100vw - 40px), (max-width: 760px) 480px, (max-width: 1100px) 48vw, 480px'
                      : '(max-width: 500px) calc(100vw - 134px), (max-width: 760px) 360px, (max-width: 1100px) 34vw, 360px'}
                  />
                  {!isApplication && <ProjectPreview project={project} variant="mobile" />}
                </div>
                <span>{project.name}<Arrow diagonal /></span>
              </a>
            </section>
          );
        })}
      </div>

      <section className="faq section" aria-labelledby="services-faq-title">
        <h2 id="services-faq-title">Before we begin.</h2>
        {questions.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}<span aria-hidden="true">+</span></summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>

      <section className="inline-cta">
        <h2>Let’s figure out<br />what yours could be.</h2>
        <ContactLink />
      </section>
    </main>
  );
}
