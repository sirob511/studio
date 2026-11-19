import Link from 'next/link';
import {projects, services} from '@/lib/projects';
import {Mark, ProjectImage} from '@/components/studio/shared';
import {ContactForm} from '@/components/studio/interactive';
import {HomeMotion} from '@/components/studio/home-motion';

const serviceCopy: Record<string, string> = {
  'custom-websites': 'From logo design and visual identity to a website built around your business and your customers.',
  'interactive-web-experiences': 'Illustrated worlds, guides, maps, and tools that invite people to explore and take part.',
  'web-applications': 'Portals, dashboards, and custom workflows that connect your data and make complicated tasks easier.',
};
const featuredProjects = ['center-of-the-universe-tulsa', 'osaka-garden', 'buildplane'].map(slug => projects.find(project => project.slug === slug)!);
const lakefront = projects.find(project => project.slug === 'lakefront-trail')!;
const planet = projects.find(project => project.slug === 'a-planet-of-her-own')!;

function ServiceIllustration({kind}: {kind: string}) {
  return <svg viewBox="0 0 160 110" fill="none" className="home-service-art" aria-hidden="true">
    {kind === 'custom-websites' ? <>
      <rect x="15" y="16" width="120" height="78" rx="5" />
      <path d="M15 34h120M28 25h2m7 0h2m7 0h2M29 49h42M29 59h29M29 76h23" />
      <rect className="service-art-fill" x="86" y="45" width="36" height="35" rx="3" />
      <path d="m100 69 8-13 8 13z" className="service-art-cutout" />
    </> : kind === 'interactive-web-experiences' ? <>
      <circle cx="76" cy="55" r="35" />
      <ellipse cx="76" cy="55" rx="58" ry="18" transform="rotate(-23 76 55)" />
      <path d="M76 20c-19 19-19 51 0 70M76 20c19 19 19 51 0 70" />
      <circle className="service-art-fill" cx="124" cy="32" r="8" />
      <path d="M30 17v12M24 23h12m93 59v12m-6-6h12" />
    </> : <>
      <rect x="14" y="39" width="35" height="31" rx="5" />
      <rect x="104" y="12" width="40" height="31" rx="5" />
      <rect className="service-art-fill" x="104" y="68" width="40" height="31" rx="5" />
      <path d="M49 55h26m0 0V28h29M75 55v28h29M26 49h11m-11 10h7M116 23h16m-16 10h10" />
      <circle cx="75" cy="55" r="5" className="service-art-fill" />
      <path d="m116 84 5 5 10-11" className="service-art-cutout" />
    </>}
  </svg>;
}

export default function Home() {
  return (
    <main id="main" className="home-page">
      <HomeMotion />
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-intro wrap">
          <div className="home-hero-copy">
            <p className="home-eyebrow">Independent design &amp; development</p>
            <h1 id="home-title">Custom websites.<br/>Anything but <span className="home-hero-word">ordinary.</span></h1>
            <p className="home-hero-description">Distinctive websites and useful web applications, designed and built around your business.</p>
            <Link className="home-portfolio-link" href="/work">Explore the portfolio</Link>
          </div>
          <div className="home-hero-art" aria-label="A glimpse of our projects">
            <div className="home-art-backdrop" aria-hidden="true"><span className="home-art-orbit"/><span className="home-art-orbit home-art-orbit--inner"/></div>
            <Mark className="home-art-mark" />
            <Link className="home-hero-window home-hero-window--map" href={`/work/${lakefront.slug}`} data-event="case_study_open" data-project={lakefront.slug} aria-label="Explore the Lakefront Trail project">
              <span className="home-window-bar"><span className="home-window-dots" aria-hidden="true"><i/><i/><i/></span><span>Lakefront Trail</span></span>
              <ProjectImage project={lakefront} priority sizes="(max-width: 650px) 86vw, (max-width: 900px) 70vw, 44vw" />
            </Link>
            <Link className="home-hero-window home-hero-window--planet" href={`/work/${planet.slug}`} data-event="case_study_open" data-project={planet.slug} aria-label="Explore A Planet of Her Own">
              <ProjectImage project={planet} priority sizes="(max-width: 650px) 57vw, (max-width: 900px) 43vw, 28vw" />
              <span className="home-window-label">A Planet of Her Own</span>
            </Link>
          </div>
        </div>
        <div className="home-hero-footer wrap"><span>Design with character. Development with care.</span><span>Made to work beautifully.</span></div>
      </section>
      <section className="home-selected wrap" aria-labelledby="home-selected-title">
        <div className="home-section-heading" data-home-reveal>
          <div><p className="home-eyebrow">Selected projects</p><h2 id="home-selected-title">See what an idea can become.</h2></div>
          <Link className="text-link" href="/work">View all projects</Link>
        </div>
        <div className="home-selected-grid">
          {featuredProjects.map(project => (
            <Link className="home-selected-project" href={`/work/${project.slug}`} key={project.slug} data-event="case_study_open" data-project={project.slug} data-home-reveal>
              <div className="home-selected-image"><ProjectImage project={project} variant={project.asset === 'buildplane' ? 'product' : 'desktop'} sizes="(max-width: 650px) calc(100vw - 40px), (max-width: 900px) 45vw, 31vw" /></div>
              <div className="home-selected-caption"><h3>{project.name}</h3><span>{project.category}</span></div>
              <p>{project.short}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="home-services" aria-labelledby="home-services-title">
        <div className="wrap">
          <div className="home-section-heading" data-home-reveal><div><p className="home-eyebrow">From first idea to final detail</p><h2 id="home-services-title">What we can build for you.</h2></div></div>
          <div className="home-service-grid">
            {services.map(service => (
              <Link className="home-service" href={`/services#${service.slug}`} key={service.slug} data-home-reveal>
                <ServiceIllustration kind={service.slug} />
                <h3>{service.name}</h3>
                <p>{serviceCopy[service.slug]}</p>
                <span className="home-service-more">Explore the possibilities</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="home-about wrap" data-home-reveal>
        <div className="home-about-title"><Mark/><p className="home-eyebrow">A small studio. A direct connection.</p><h2>A direct line to the person building it.</h2></div>
        <div className="home-about-copy">
          <p>I bring design and engineering together, from logo design and visual identity to the complex business logic behind a website or application.</p>
          <p>You work directly with me from the first conversation through launch. The person you talk to is the person making the design and technical decisions.</p>
          <Link href="/about" className="text-link">Meet the studio</Link>
        </div>
      </section>
      <section className="contact-section home-contact" id="contact">
        <div className="wrap section contact-layout">
          <div className="contact-copy" data-home-reveal>
            <p className="home-eyebrow">Let’s make something yours</p>
            <h2>What do you<br/>have in mind?</h2>
            <p>A new business. A better website. A tool you wish existed. A short introduction is all we need to start.</p>
            <a className="text-link" href="mailto:hello@oddlogicstudio.com">hello@oddlogicstudio.com</a>
            <Mark className="home-contact-mark"/>
          </div>
          <ContactForm/>
        </div>
      </section>
    </main>
  );
}
