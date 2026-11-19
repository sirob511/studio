import type {Metadata} from 'next';
import {projects} from '@/lib/projects';
import {ContactLink,ProjectCard} from '@/components/studio/shared';
export const metadata:Metadata={title:'Portfolio — Websites & Applications',description:'Explore the Odd Logic Studio portfolio: distinctive websites, illustrated maps, interactive visitor guides, cloud architecture tools, and website audit applications.',alternates:{canonical:'/work'}};
export default function Portfolio(){return <main id="main" className="wrap"><section className="page-heading"><h1>Portfolio<span className="blue">.</span></h1><p>Custom websites, interactive guides, and applications. Explore how design and practical functionality come together in our projects.</p></section><div className="work-grid">{projects.map(project=><ProjectCard key={project.slug} project={project}/>)}</div><section className="inline-cta"><h2>Your project could<br/>be the next one.</h2><ContactLink/></section></main>}
