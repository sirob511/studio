import type {Metadata} from 'next';
import {services,projects} from '@/lib/projects';
import {Arrow,ProjectPreview,ContactLink} from '@/components/studio/shared';
export const metadata:Metadata={title:'Web Design & Development Services',description:'Custom websites, interactive web experiences, and web applications. Design and engineering together, from the first idea through launch.',alternates:{canonical:'/services'}};
export default function Services(){return <main id="main" className="wrap"><section className="page-heading"><h1>Design & development<span className="blue">.</span></h1><p>Custom websites, interactive experiences, and web applications. One studio, from the first idea through launch.</p></section><div className="services-detail">{services.map(service => {
 const project = projects.find(project => project.slug === service.projects[0])!;
 const isApplication = service.slug === 'web-applications';
 return <section className="service-detail" key={service.slug}>
  <div>
   <h2>{service.name}</h2><p>{service.detail}</p>
   <ul className="plain-list">{service.items.map(item=><li key={item}>{item}</li>)}</ul>
   <a className="text-link" href={`/services/${service.slug}`}>Explore this service<Arrow/></a>
  </div>
  <a className="service-example service-device-example" href={`/work/${project.slug}`} style={{background:project.color}} aria-label={`View ${project.name} case study`} data-event="case_study_open" data-project={project.slug}>
   <div className={isApplication ? undefined : 'service-device-pair'}>
    <ProjectPreview project={project} variant={isApplication?'product':'desktop'} sizes="(max-width: 500px) 55vw, (max-width: 900px) 60vw, 420px"/>
    {!isApplication && <ProjectPreview project={project} variant="mobile"/>}
   </div>
   <span>{project.name}<Arrow diagonal/></span>
  </a>
 </section>;
})}</div><section className="process section"><span className="micro blue">A clear way forward</span><h2>Consider it. Shape it.<br/>Build it. Refine it.</h2><div className="process-grid">{[['01','Understand','Start with your audience, the problem, and what the experience needs to do.'],['02','Design','Explore the direction and work through the important screens and interactions.'],['03','Build','Bring the design to life, connecting content, data, and the systems it needs.'],['04','Launch','Check the details across devices, prepare the handoff, and put the work into the world.']].map(([n,t,d])=><div key={n}><span className="micro blue">{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section><section className="faq section"><span className="micro blue">A few things you may be wondering</span><h2>Before we begin.</h2>{[['Do I need a full brief?','No. A short description of your business, the idea, and what you want people to do is enough to start a useful conversation.'],['Can you help with an existing website?','Yes. Tell us what works, what feels limiting, and what you want to change. We can discuss whether a focused improvement or a larger redesign makes sense.'],['What does a project cost?','Scope, complexity, content, and integrations all affect the work. We’ll discuss those first so a proposal can be specific to your project.'],['Do you build applications as well as websites?','Yes. The portfolio includes interactive tools and web applications. If your project involves data, integrations, or a custom workflow, include that in your inquiry.']].map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</section><section className="inline-cta"><h2>Let’s figure out<br/>what yours could be.</h2><ContactLink/></section></main>}
