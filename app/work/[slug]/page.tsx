import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects, type Project } from '@/lib/projects';
import { Arrow, ProjectPreview } from '@/components/studio/shared';
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
    <main id="main" className="case-page">
      <div className="wrap">
        <a href="/work" className="back-link">← All work</a>

        <section className="case-heading case-heading--compact">
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
            {isProduct && (
              <a
                className="case-demo-link"
                href={project.asset === 'buildplane'
                  ? 'https://buildplane.ai/workspace?template=junior-high-availability-web-app'
                  : 'https://websitexray.com/demo'}
                target="_blank"
                rel="noopener noreferrer"
                data-event="outbound_portfolio"
                data-project={project.slug}
              >
                {project.asset === 'buildplane' ? 'Try the sample' : 'Try the demo'}<Arrow diagonal />
              </a>
            )}
          </div>
        </section>

        <section className="case-details case-showcase" aria-label="Desktop and mobile views">
          <div className="case-view">
            <div
              className="detail-image case-media-stage"
              style={{ background: project.color }}
            >
              <ProjectPreview
                project={project}
                variant={isProduct ? 'product' : 'desktop'}
                priority
                sizes="(max-width: 650px) calc(100vw - 80px), 560px"
              />
            </div>
            <div className="annotation">
              <h2>{project.decisions[0].title}</h2>
              <p>{project.decisions[0].text}</p>
            </div>
          </div>

          <div className="case-view case-view-mobile">
            <div
              className="mobile-image case-media-stage"
              style={{ background: project.color }}
            >
              <ProjectPreview project={project} variant="mobile" priority />
            </div>
            <div className="annotation">
              <h2>{project.decisions[1].title}</h2>
              <p>{project.decisions[1].text}</p>
            </div>
          </div>
        </section>

        <section className="case-intro case-context">
          <div>
            <h2>About the project</h2>
            <p>{project.audience}</p>
            <p className="caption">Design &amp; development · {project.category}</p>
          </div>
          <div>
            <p>{project.intro}</p>
            <p className="caption">{attribution(project)}</p>
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

        <nav className="case-end-nav" aria-label="More projects">
          <a href="/work">← All work</a>
          <a
            href={`/work/${next.slug}`}
            data-event="case_study_open"
            data-project={next.slug}
          >
            <span>Next: {next.name}</span><Arrow />
          </a>
        </nav>
      </div>
    </main>
  );
}
