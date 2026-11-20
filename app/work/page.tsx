import type { Metadata } from 'next';
import { projects } from '@/lib/projects';
import { Arrow, ProjectPreview } from '@/components/studio/shared';
import { Clip } from '@/components/studio/interactive';
import { HomeMotion } from '@/components/studio/home-motion';
import { PageClosing } from '@/components/studio/page-closing';
import './portfolio.css';

export const metadata: Metadata = {
  title: 'Portfolio — Websites & Applications',
  description: 'Explore the Odd Logic Studio portfolio: distinctive websites, illustrated maps, interactive visitor guides, cloud architecture tools, and website audit applications.',
  alternates: { canonical: '/work' },
};

function ProjectLinks() {
  return (
    <ul>
      {projects.map(project => (
        <li key={project.slug}>
          <a href={`#${project.slug}`} data-event="portfolio_project_open" data-project={project.slug}>{project.name}</a>
        </li>
      ))}
    </ul>
  );
}

export default function Portfolio() {
  return (
    <main id="main" className="portfolio-page">
      <HomeMotion rootSelector=".portfolio-page" />
      <div className="wrap">
        <section className="page-heading">
          <h1>Portfolio<span className="blue">.</span></h1>
          <p>Custom websites, interactive guides, and applications. Take a closer look at the work, then try it for yourself.</p>
        </section>

        <nav className="portfolio-jump portfolio-jump-desktop" aria-label="Jump to a project">
          <p>Jump to a project</p>
          <ProjectLinks />
        </nav>
        <details className="portfolio-jump portfolio-jump-mobile">
          <summary>Jump to a project<span aria-hidden="true">+</span></summary>
          <nav aria-label="Jump to a project"><ProjectLinks /></nav>
        </details>

        {projects.map((project, index) => {
          const isProduct = ['buildplane', 'xray'].includes(project.asset);

          return (
            <section className="portfolio-project" id={project.slug} aria-labelledby={`${project.slug}-title`} key={project.slug}>
              <header className="case-heading case-heading--compact" data-home-reveal>
                <h2 id={`${project.slug}-title`} data-portfolio-project={project.slug}>{project.name}<span className="blue">.</span></h2>
                <div className="case-heading-bottom">
                  <p>{project.short}</p>
                  <a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer" data-event="outbound_portfolio" data-project={project.slug}>
                    {project.liveLabel || 'Visit live site'}<Arrow diagonal />
                  </a>
                  {isProduct && (
                    <a className="case-demo-link" href={project.asset === 'buildplane' ? 'https://buildplane.ai/workspace?template=junior-high-availability-web-app' : 'https://websitexray.com/demo'} target="_blank" rel="noopener noreferrer" data-event="outbound_portfolio" data-project={project.slug}>
                      {project.asset === 'buildplane' ? 'Try the sample' : 'Try the demo'}<Arrow diagonal />
                    </a>
                  )}
                </div>
              </header>

              <div className="case-details case-showcase" data-home-reveal>
                <div className="case-view">
                  <div className="detail-image case-media-stage">
                    <ProjectPreview project={project} variant={isProduct ? 'product' : 'desktop'} priority={index === 0} sizes="(max-width: 650px) calc(100vw - 80px), (max-width: 1100px) 52vw, 560px" />
                  </div>
                  <div className="annotation">
                    <h3>{project.decisions[0].title}</h3>
                    <p>{project.decisions[0].text}</p>
                  </div>
                </div>

                <div className="case-view case-view-mobile">
                  <div className="mobile-image case-media-stage">
                    <ProjectPreview project={project} variant="mobile" />
                  </div>
                  <div className="annotation">
                    <h3>{project.decisions[1].title}</h3>
                    <p>{project.decisions[1].text}</p>
                  </div>
                </div>
              </div>

              <p className="portfolio-project-context">{project.intro}</p>

              {project.clip && (
                <div className="portfolio-project-motion">
                  <Clip name={project.clip} poster={`/images/${project.asset}-product.webp`} />
                </div>
              )}
            </section>
          );
        })}
      </div>

      <PageClosing title="Your project could be the next one." description="Have something in mind? Let’s talk about what you’d like to build." />
    </main>
  );
}
