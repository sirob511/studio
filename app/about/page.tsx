import type {Metadata} from 'next';
import Link from 'next/link';
import {Mark, Arrow, ContactLink, ProjectImage} from '@/components/studio/shared';
import {HomeMotion} from '@/components/studio/home-motion';
import {PageClosing} from '@/components/studio/page-closing';
import {projects} from '@/lib/projects';
import './about.css';

export const metadata: Metadata = {
  title: 'About — Websites Built Around Your Business',
  description: 'Meet Boris and Odd Logic Studio. Custom websites built for great design, desktop and mobile usability, speed, security, and search and AI discovery.',
  alternates: {canonical: '/about'},
};

const osaka = projects.find(project => project.slug === 'osaka-garden')!;
const buildplane = projects.find(project => project.slug === 'buildplane')!;
const benefits = [
  {
    title: 'Distinctive design. Easy to use.',
    description: 'A website that feels like your business and helps people find what they need. We design and test the layouts, navigation, and key actions on desktop and mobile.',
  },
  {
    title: 'Built for speed and security.',
    description: 'We keep pages lean, test how they perform, and build in safeguards suited to your forms, data, and integrations. A smooth experience for your customers, with care for the information they share.',
  },
  {
    title: 'Help customers find you.',
    description: 'Clear content, thoughtful page structure, and useful business information help search engines and AI tools understand what you offer. We build those foundations into your website from the start.',
  },
];

function BenefitIllustration({kind}: {kind: number}) {
  return <svg viewBox="0 0 160 110" fill="none" className="about-benefit-art" aria-hidden="true">
    {kind === 0 ? <>
      <rect x="14" y="17" width="105" height="70" rx="5"/>
      <path d="M14 33h105M27 25h2m7 0h2m7 0h2M28 48h40M28 58h27M42 98h48M66 87v11"/>
      <rect className="about-art-fill" x="94" y="46" width="42" height="57" rx="5"/>
      <path className="about-art-cutout" d="M102 57h26M102 66h18M110 94h10"/>
    </> : kind === 1 ? <>
      <path d="M80 12c16 12 31 16 45 17v30c0 22-21 37-45 45-24-8-45-23-45-45V29c14-1 29-5 45-17Z"/>
      <path className="about-art-fill" d="m83 31-20 31h17l-3 23 23-34H83l4-20Z"/>
      <path d="M12 44h13M7 57h18m-8 13h10m106-25h15m-15 13h21m-21 13h12"/>
    </> : <>
      <circle cx="71" cy="49" r="33"/>
      <path d="m95 73 28 28M38 49h66M71 16c-18 17-18 49 0 66M71 16c18 17 18 49 0 66"/>
      <path d="M130 13v20m-10-10h20M17 80v14m-7-7h14"/>
      <circle className="about-art-fill" cx="119" cy="64" r="5"/>
    </>}
  </svg>;
}

export default function About() {
  return (
    <main id="main" className="about-page studio-page">
      <HomeMotion rootSelector=".about-page"/>
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero-inner wrap">
          <div className="about-hero-copy">
            <p className="studio-eyebrow">About the studio</p>
            <h1 id="about-title">Meet Odd<br/>Logic <span className="studio-accent">Studio.</span></h1>
            <p className="about-hero-description">We work with you to create a website that looks great, works smoothly, and helps people discover your business.</p>
            <ContactLink className="home-portfolio-link">Start a conversation</ContactLink>
          </div>
          <div className="about-hero-art">
            <div className="about-studio-board" aria-hidden="true">
              <span className="about-board-orbit"/>
              <p>Good ideas.<br/>Made real.</p>
            </div>
            <Mark className="about-hero-mark"/>
            <Link href="/work#osaka-garden" className="about-project-window" data-event="portfolio_project_open" data-project="osaka-garden" aria-label="Explore the Osaka Garden project">
              <span className="about-window-bar"><span>Osaka Garden</span><span>Explore project</span></span>
              <ProjectImage project={osaka} priority sizes="(max-width: 650px) 90vw, (max-width: 900px) 70vw, 42vw"/>
            </Link>
          </div>
        </div>
      </section>

      <section className="about-profile wrap" aria-labelledby="about-profile-title" data-home-reveal>
        <div className="about-profile-heading">
          <p className="studio-eyebrow">Hello, I’m Boris.</p>
          <h2 id="about-profile-title">The person<br/>behind the studio.</h2>
          <ContactLink className="text-link">Start a conversation</ContactLink>
        </div>
        <div className="about-profile-copy">
          <p>My background brings together design and engineering. I use both to create websites that look right for your business and work well for the people using them.</p>
          <p>Whether you need a visual identity, a new website, or an application that makes your day easier, we start with your goals and work out what will help.</p>
          <p>You’ll always know who to talk to. I’ll help you weigh the options, explain the decisions, and keep you involved from our first conversation to launch.</p>
        </div>
      </section>

      <section className="about-benefits" aria-labelledby="about-benefits-title">
        <div className="wrap">
          <div className="about-section-heading" data-home-reveal>
            <p className="studio-eyebrow">Made to work beautifully</p>
            <h2 id="about-benefits-title">What you can expect.</h2>
          </div>
          <div className="about-benefit-grid">
            {benefits.map((benefit, index) => (
              <article className="about-benefit" key={benefit.title} data-home-reveal>
                <BenefitIllustration kind={index}/>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-products wrap" aria-labelledby="about-products-title">
        <div className="about-products-copy" data-home-reveal>
          <p className="studio-eyebrow">Another side of Odd Logic</p>
          <h2 id="about-products-title">A studio for your ideas.<br/>A product business for ours.</h2>
          <p>Odd Logic Studio designs and builds for clients. Odd Logic AI develops our own software products, including BuildPlane and Website X-Ray. You’ll see those in the portfolio as examples of what we can build.</p>
          <a href="https://oddlogic.ai/" target="_blank" rel="noopener noreferrer" className="text-link" data-event="outbound_portfolio" data-project="oddlogic-ai">Explore Odd Logic AI<Arrow diagonal/></a>
        </div>
        <div className="about-products-art" data-home-reveal>
          <Link href="/work#buildplane" className="about-product-window" data-event="portfolio_project_open" data-project="buildplane" aria-label="Explore the BuildPlane project">
            <span className="about-window-bar"><span>BuildPlane</span><span>From idea to application</span></span>
            <ProjectImage project={buildplane} variant="product" sizes="(max-width: 650px) 86vw, (max-width: 900px) 70vw, 42vw"/>
          </Link>
          <span className="about-product-caption">One of our own ideas, brought to life.</span>
        </div>
      </section>

      <PageClosing title="Have something in mind?" description="Tell us what you need. We’ll explore the possibilities and work out the next steps together."/>
    </main>
  );
}
