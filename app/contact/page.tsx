import type {Metadata} from 'next';
import {ContactForm} from '@/components/studio/interactive';
import {Mark} from '@/components/studio/shared';
export const metadata:Metadata={title:'Start a Project',description:'Tell Odd Logic Studio about your website, interactive experience, or web application. A short introduction is all you need to start the conversation.',alternates:{canonical:'/contact'}};
export default function Contact(){return <main id="main" className="wrap"><section className="contact-page contact-layout"><div className="contact-copy"><h1>Tell us about your project<span className="blue">.</span></h1><p>A new website, an idea for a tool, or a workflow that could work better. Tell us a little about it—no full brief needed.</p><a className="text-link" href="mailto:hello@oddlogicstudio.com">hello@oddlogicstudio.com ↗</a><span className="contact-note"><Mark/> You’ll be talking directly with Boris.</span></div><ContactForm/></section></main>}
