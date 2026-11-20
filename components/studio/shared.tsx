import type { ReactNode } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/projects';

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{diagonal ? <path d="M5 19 19 5M5 5h14v14" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}</svg>;
}

export function Mark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M32 3v58M3 32h58M11.5 11.5l41 41m-41 0 41-41" stroke="currentColor" strokeWidth="10" /><circle cx="32" cy="32" r="8" fill="var(--paper)" /></svg>;
}

export function Wordmark() {
  return <Link className="wordmark" href="/" aria-label="Odd Logic Studio home"><Mark /><span>odd logic<span className="wordmark-sub">STUDIO</span></span></Link>;
}

type ProjectImageProps = {
  project: Project;
  variant?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function ProjectImage({ project, variant = 'desktop', priority = false, className = '', sizes = '(max-width: 700px) 100vw, (max-width: 1100px) 90vw, 1100px' }: ProjectImageProps) {
  const key = `${project.asset}-${variant}`;
  const mobile = variant === 'mobile';
  const description = mobile ? 'mobile view' : variant.includes('detail') ? 'detail of the live experience' : variant === 'product' ? 'live product interface' : 'website homepage';

  return <img className={className} src={`/images/${key}.webp`} srcSet={mobile ? undefined : `/images/${key}-720.webp 720w, /images/${key}.webp 1440w`} sizes={mobile ? undefined : sizes} width={mobile ? 390 : 1440} height={mobile ? 844 : 1000} alt={`${project.name} — ${description}`} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />;
}

type ProjectPreviewProps = ProjectImageProps & {
  device?: 'desktop' | 'phone';
};

export function ProjectPreview({ project, variant = 'desktop', device = variant === 'mobile' ? 'phone' : 'desktop', priority = false, className = '', sizes }: ProjectPreviewProps) {
  const image = <ProjectImage project={project} variant={variant} priority={priority} sizes={sizes} className="project-device-image" />;

  if (device === 'phone') {
    return <div className={`project-preview project-preview--phone ${className}`}>
      <div className="project-device-phone">
        <div className="project-phone-top" aria-hidden="true"><span /></div>
        <div className="project-phone-screen">{image}</div>
        <div className="project-phone-bottom" aria-hidden="true"><span /></div>
      </div>
    </div>;
  }

  const address = new URL(project.url).hostname.replace(/^www\./, '');
  return <div className={`project-preview project-preview--desktop ${className}`}>
    <div className="project-device-monitor">
      <div className="project-monitor-screen">
        <div className="project-browser-bar" aria-hidden="true"><span className="project-browser-controls"><i /><i /><i /></span><span className="project-browser-address">{address}</span><span className="project-browser-menu">···</span></div>
        {image}
      </div>
      <span className="project-monitor-light" aria-hidden="true" />
    </div>
    <div className="project-monitor-stand" aria-hidden="true"><span /></div>
  </div>;
}

export function ProjectCard({ project, reveal = false }: { project: Project; index?: number; featured?: boolean; reveal?: boolean }) {
  return <article className="project-card project-card--equal" data-home-reveal={reveal ? '' : undefined}>
    <Link className="project-visual project-preview-card" href={`/work#${project.slug}`} data-event="portfolio_project_open" data-project={project.slug} aria-label={`View ${project.name} project`}>
      <ProjectPreview project={project} variant={['buildplane', 'xray'].includes(project.asset) ? 'product' : 'desktop'} sizes="(max-width: 650px) calc(100vw - 88px), (max-width: 1100px) 42vw, 560px" />
      <span className="project-open"><Arrow diagonal /></span>
    </Link>
    <div className="project-caption"><div><h3><Link href={`/work#${project.slug}`} data-event="portfolio_project_open" data-project={project.slug}>{project.name}</Link></h3><p>{project.short}</p></div></div>
  </article>;
}

export function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer-main">
        <Wordmark />
        <a className="footer-email" href="mailto:hello@oddlogicstudio.com">hello@oddlogicstudio.com</a>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/work">Portfolio</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/contact" data-event="start_project">Contact</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Odd Logic Studio</span>
        <Link href="/privacy">Privacy</Link>
      </div>
    </footer>
  );
}

export function ContactLink({ children = 'Start a project', className = 'button' }: { children?: ReactNode; className?: string }) {
  return <Link href="/contact" className={className} data-event="start_project">{children}<Arrow diagonal /></Link>;
}
