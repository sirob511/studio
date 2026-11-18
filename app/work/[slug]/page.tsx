import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects, type Project } from '@/lib/projects';
import { Arrow, ProjectPreview, ContactLink } from '@/components/studio/shared';
import { Clip } from '@/components/studio/interactive';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return { title: 'Project not found' };

  return {
    title: `${project.name} — ${project.category} Case Study`,
    description: `${project.short} ${project.audience}`,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${project.name} | Odd Logic Studio`,
      description: project.short,
      images: [
        {
          url: `/images/${project.asset}-desktop.webp`,
          width: 1440,
          height: 1000,
        },
      ],
    },
  };
}

function attribution(project: Project) {
  if (project.credit === 'Odd Logic AI product') {
    return 'Built by Odd Logic AI, the studio’s product business.';
  }
  if (project.credit === 'Odd Logic initiative') {
    return 'An independent Odd Logic initiative supporting open science.';
  }
  if (project.asset === 'oddlogic') {
    return 'The studio-owned website for Odd Logic AI’s products and initiatives.';
  }
  return 'Designed and developed as part of the studio’s client and partner work.';
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const isProduct = ['buildplane', 'xray'].includes(project.asset);

  return (
    <main id="main">
      <div className="wrap">
        <a href="/work" className="back-link">← All work</a>

        <section className="case-heading">
          <h1>{project.name}<span className="blue">.</span></h1>
          <div className="case-heading-bottom">
            <p>{project.short}</p>
            <a
              className="text-link"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-event="outbound_portfolio"
              data-project={project.slug}
            >
              {project.liveLabel || 'Visit live site'}<Arrow diagonal />
            </a>
          </div>
        </section>

        <div
          className={`case-hero case-media-stage visual-${project.asset}`}
          style={{ background: project.color }}
        >
          <ProjectPreview
            project={project}
            priority
            variant={isProduct ? 'product' : 'desktop'}
          />
        </div>

        <section className="case-intro section">
          <div>
            <h2>{project.audience}</h2>
            <dl className="project-facts">
              <dt>Discipline</dt>
              <dd>Design &amp; development</dd>
              <dt>Experience</dt>
              <dd>{project.category}</dd>
            </dl>
            <div className="tags">
              {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
          <div>
            <p className="large-copy">{project.intro}</p>
            <p className="caption">{attribution(project)}</p>
          </div>
        </section>

        <section className="case-details">
          <div className="case-view">
            <div
              className="detail-image case-media-stage"
              style={{ background: project.color }}
            >
              <ProjectPreview
                project={project}
                variant={isProduct ? 'product-detail' : 'detail'}
              />
            </div>
            <div className="annotation">
              <h3>{project.decisions[0].title}</h3>
              <p>{project.decisions[0].text}</p>
            </div>
          </div>

          <div className="case-view case-view-mobile">
            <div
              className="mobile-image case-media-stage"
              style={{ background: project.color }}
            >
              <ProjectPreview project={project} variant="mobile" />
            </div>
            <div className="annotation">
              <h3>{project.decisions[1].title}</h3>
              <p>{project.decisions[1].text}</p>
            </div>
          </div>
        </section>

        {project.clip && (
          <section className="case-motion section">
            <div className="section-heading">
              <div><h2>See how it feels.</h2></div>
              <p>
                {project.asset === 'buildplane'
                  ? 'A public sample architecture, with a service repositioned on the editable canvas.'
                  : 'A walk from the demo report overview into its findings.'}
              </p>
            </div>
            <Clip name={project.clip} poster={`/images/${project.asset}-product.webp`} />
            <p className="caption">
              Captured from the live public {project.asset === 'buildplane' ? 'sample' : 'demo'}.
              {' '}Playback starts only when you choose.
            </p>
          </section>
        )}

        <section className="case-live">
          <div>
            <h2>Out in the world.</h2>
            <p>
              {project.asset === 'xray'
                ? 'Try the public demo report or explore a new audit.'
                : project.asset === 'buildplane'
                  ? 'Open a pre-generated example or start exploring the product.'
                  : 'Explore the live site and see the details in context.'}
            </p>
            {project.asset === 'buildplane' && (
              <a
                className="text-link"
                href="https://buildplane.ai/workspace?template=junior-high-availability-web-app"
                target="_blank"
                rel="noopener noreferrer"
                data-event="outbound_portfolio"
                data-project={project.slug}
              >
                Open the sample architecture <Arrow diagonal />
              </a>
            )}
            {project.asset === 'xray' && (
              <a
                className="text-link"
                href="https://websitexray.com/demo"
                target="_blank"
                rel="noopener noreferrer"
                data-event="outbound_portfolio"
                data-project={project.slug}
              >
                Open the demo report <Arrow diagonal />
              </a>
            )}
          </div>
          <a
            className="button"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            data-event="outbound_portfolio"
            data-project={project.slug}
          >
            Visit {project.name}<Arrow diagonal />
          </a>
        </section>

        <a
          className="next-project"
          href={`/work/${next.slug}`}
          data-event="case_study_open"
          data-project={next.slug}
        >
          <span className="micro">Next project</span>
          <h2>{next.name}</h2>
          <Arrow diagonal />
        </a>
        <section className="inline-cta">
          <h2>Something specific<br />in mind?</h2>
          <ContactLink />
        </section>
      </div>
    </main>
  );
}
