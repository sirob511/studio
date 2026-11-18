import {services} from '@/lib/projects';
import {Arrow, ContactLink} from '@/components/studio/shared';
import {ContactForm} from '@/components/studio/interactive';

const serviceCopy: Record<string, string> = {
  'custom-websites': 'From logo design and visual identity to a website built around your business and your customers.',
  'interactive-web-experiences': 'Illustrated worlds, guides, maps, and tools that invite people to explore and take part.',
  'web-applications': 'Portals, dashboards, and custom workflows that connect your data and make complicated tasks easier.',
};

export default function Home() {
  return (
    <main id="main">
      <section className="home-intro wrap">
        <h1>Custom websites.<br/>Anything but ordinary<span className="blue">.</span></h1>
        <div className="home-intro-bottom">
          <p>Distinctive websites and useful web applications, designed and built around your business.</p>
          <div className="home-actions">
            <ContactLink/>
            <a className="text-link" href="/work">View work <Arrow/></a>
          </div>
        </div>
      </section>
      <section className="home-services" aria-labelledby="home-services-title">
        <div className="wrap">
          <h2 id="home-services-title">What we can build for you</h2>
          <div className="home-service-grid">
            {services.map(service => (
              <a className="home-service" href={`/services#${service.slug}`} key={service.slug}>
                <h3>{service.name}<Arrow diagonal/></h3>
                <p>{serviceCopy[service.slug]}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="home-about wrap section">
        <h2>A direct line to the person building it.</h2>
        <div>
          <p>I bring design and engineering together, from logo design and visual identity to the complex business logic behind a website or application.</p>
          <p>You work directly with me from the first conversation through launch. The person you talk to is the person making the design and technical decisions.</p>
          <a href="/about" className="text-link">Meet the studio <Arrow/></a>
        </div>
      </section>
      <section className="contact-section" id="contact">
        <div className="wrap section contact-layout">
          <div className="contact-copy">
            <h2>What do you have in mind<span className="blue">?</span></h2>
            <p>A new business. A better website. A tool you wish existed. A short introduction is all we need to start.</p>
            <a className="text-link" href="mailto:hello@oddlogicstudio.com">hello@oddlogicstudio.com <Arrow diagonal/></a>
          </div>
          <ContactForm/>
        </div>
      </section>
    </main>
  );
}
