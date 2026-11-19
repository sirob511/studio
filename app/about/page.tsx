import type {Metadata} from 'next';
import {Mark, Arrow, ContactLink} from '@/components/studio/shared';

export const metadata: Metadata = {
  title: 'About — Websites Built Around Your Business',
  description: 'Meet Boris and Odd Logic Studio. Custom websites built for great design, desktop and mobile usability, speed, security, and search and AI discovery.',
  alternates: {canonical: '/about'},
};

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

export default function About() {
  return (
    <main id="main" className="wrap">
      <section className="page-heading">
        <h1>Meet Odd Logic Studio<span className="blue">.</span></h1>
        <p>We work with you to create a website that looks great, works smoothly, and helps people discover your business.</p>
      </section>
      <section className="about-section about-full">
        <div className="studio-art">
          <div className="art-top micro">Odd Logic Studio / Design + development</div>
          <Mark/>
          <div className="art-bottom">
            <span>CURIOUS MIND.<br/>CAPABLE HANDS.</span>
            <span className="micro">Independent<br/>by design.</span>
          </div>
        </div>
        <div className="about-copy">
          <span className="micro blue">Hello, I’m Boris.</span>
          <h2>The person<br/>behind the studio.</h2>
          <p>My background brings together design and engineering. I use both to create websites that look right for your business and work well for the people using them.</p>
          <p>Whether you need a visual identity, a new website, or an application that makes your day easier, we start with your goals and work out what will help.</p>
          <p>You’ll always know who to talk to. I’ll help you weigh the options, explain the decisions, and keep you involved from our first conversation to launch.</p>
          <ContactLink className="text-link">Start a conversation</ContactLink>
        </div>
      </section>
      <section className="principles section" aria-label="What you can expect">
        <span className="micro blue">What you can expect</span>
        {benefits.map((benefit, index) => (
          <div className="principle" key={benefit.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{benefit.title}</h2>
            <p>{benefit.description}</p>
          </div>
        ))}
      </section>
      <section className="sister-business">
        <Mark/>
        <div>
          <span className="micro blue">Another side of Odd Logic</span>
          <h2>A studio for your ideas.<br/>A product business for ours.</h2>
          <p>Odd Logic Studio designs and builds for clients. Odd Logic AI develops our own software products, including BuildPlane and Website X-Ray. You’ll see those in the portfolio as examples of what we can build.</p>
          <a href="https://oddlogic.ai/" target="_blank" rel="noopener noreferrer" className="text-link" data-event="outbound_portfolio" data-project="oddlogic-ai">Explore Odd Logic AI<Arrow diagonal/></a>
        </div>
      </section>
      <section className="inline-cta"><h2>Have something<br/>in mind?</h2><ContactLink/></section>
    </main>
  );
}
