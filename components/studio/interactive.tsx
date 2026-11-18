'use client';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {projects} from '@/lib/projects';
import {Arrow,Mark,Wordmark,ProjectCard} from './shared';
export function Header(){const [open,setOpen]=useState(false);const path=usePathname();useEffect(()=>setOpen(false),[path]);return <header className="header wrap"><Wordmark/><nav className={open?'nav nav-open':'nav'} aria-label="Main navigation"><a href="/work" aria-current={path.startsWith('/work')?'page':undefined}>Work</a><a href="/services" aria-current={path.startsWith('/services')?'page':undefined}>Services</a><a href="/about" aria-current={path==='/about'?'page':undefined}>About</a></nav><a href="/contact" className="nav-cta" data-event="start_project">Start a project <Arrow diagonal/></a><button className="menu-toggle" aria-expanded={open} aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(!open)}>{open?'Close':'Menu'}<span>{open?'−':'+'}</span></button></header>}
export function Analytics(){const path=usePathname();useEffect(()=>{function handle(event:MouseEvent){const el=(event.target as Element).closest<HTMLElement>('[data-event]');if(el)track(el.dataset.event!,el.dataset.project||'')}document.addEventListener('click',handle);return()=>document.removeEventListener('click',handle)},[]);useEffect(()=>{if(path.startsWith('/work/'))track('case_study_view',path.split('/')[2])},[path]);return null}
export function track(event:string,project=''){if(navigator.doNotTrack==='1')return;const payload=JSON.stringify({event,project});fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:payload,keepalive:true}).catch(()=>{})}
export function WorkGrid(){const [filter,setFilter]=useState('All work');const filters=['All work','Websites','Interactive','Applications'];const shown=filter==='All work'?projects:projects.filter(p=>p.category===filter);return <><div className="filters" aria-label="Filter projects">{filters.map(f=><button key={f} className={filter===f?'active':''} onClick={()=>setFilter(f)} aria-pressed={filter===f}>{f}<sup>{f==='All work'?projects.length:projects.filter(p=>p.category===f).length}</sup></button>)}</div><span className="sr-only" role="status">{shown.length} projects shown</span><div className="work-grid">{shown.map((p,i)=><ProjectCard key={p.slug} project={p} index={i} featured={filter==='All work'&&i===0}/>)}</div></>}
export function ContactForm(){
 const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle');
 const [message,setMessage]=useState('');
 const [errors,setErrors]=useState<Record<string,string>>({});
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  if(status==='sending')return;
  const form=e.currentTarget;
  const data=new FormData(form);
  const value=(key:string)=>String(data.get(key)||'').trim();
  const name=value('name'),email=value('email'),description=value('description'),website=value('website');
  const next:Record<string,string>={};
  if(!name)next.name='Please enter your name.';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))next.email='Please enter a valid email address.';
  if(description.length<15)next.description='Tell us a little more (at least 15 characters).';
  if(website){try{if(!['http:','https:'].includes(new URL(website).protocol))throw new Error()}catch{next.website='Enter a website beginning with https:// or http://, or leave it blank.'}}
  setErrors(next);
  if(Object.keys(next).length){
   setStatus('error');setMessage('A few details need your attention.');
   (form.elements.namedItem(Object.keys(next)[0]) as HTMLElement)?.focus();return;
  }
  setStatus('sending');setMessage('');
  try{
   if(value('company_fax'))throw new Error('This submission could not be accepted.');
   const response=await fetch('https://formsubmit.co/ajax/hello@oddlogicstudio.com',{
    method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
    body:JSON.stringify({name,email,message:description,website,timeline:value('timeline'),budget:value('budget'),_honey:value('company_fax'),_subject:'New project inquiry — Odd Logic Studio',_template:'table',_captcha:'false'}),
    signal:AbortSignal.timeout(20000)
   });
   const result=await response.json() as {success?:boolean|string;message?:string};
   if(!response.ok||![true,'true'].includes(result.success||false)||/activat|confirm/i.test(result.message||''))throw new Error('delivery');
   setStatus('success');track('inquiry_success');
  }catch{
   setStatus('error');setMessage('Your inquiry could not be sent. Your message is still here; please try again or email hello@oddlogicstudio.com.');
  }
 }
 if(status==='success')return <div className="form-success" role="status"><Mark/><span className="micro">Message received</span><h3>Good things start<br/>with a conversation.</h3><p>Thanks for telling us about your project. We’ll be in touch at the email you provided.</p><button className="text-link" onClick={()=>{setStatus('idle');setMessage('')}}>Send another inquiry <Arrow/></button></div>;
 return <form className="inquiry-form" onSubmit={submit} noValidate><div className="form-row"><div className="field"><label htmlFor="name">Your name <span>*</span></label><input id="name" name="name" autoComplete="name" maxLength={100} placeholder="Alex Taylor" required aria-invalid={!!errors.name} aria-describedby={errors.name?'name-error':undefined}/>{errors.name&&<span className="field-error" id="name-error">{errors.name}</span>}</div><div className="field"><label htmlFor="email">Email address <span>*</span></label><input id="email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="alex@company.com" required aria-invalid={!!errors.email} aria-describedby={errors.email?'email-error':undefined}/>{errors.email&&<span className="field-error" id="email-error">{errors.email}</span>}</div></div><div className="field"><label htmlFor="description">What do you have in mind? <span>*</span></label><textarea id="description" name="description" rows={4} maxLength={6000} placeholder="A new website, an idea for a tool, a workflow that could work better…" required aria-invalid={!!errors.description} aria-describedby={errors.description?'description-error':undefined}/>{errors.description&&<span className="field-error" id="description-error">{errors.description}</span>}</div><div className="honeypot" aria-hidden="true"><label htmlFor="company_fax">Leave this empty</label><input id="company_fax" name="company_fax" tabIndex={-1} autoComplete="off"/></div><details className="optional-fields"><summary>A few more details <span>optional <span aria-hidden="true">+</span></span></summary><div className="field"><label htmlFor="website">Existing website</label><input id="website" name="website" type="url" maxLength={500} placeholder="https://" aria-invalid={!!errors.website} aria-describedby={errors.website?'website-error':undefined}/>{errors.website&&<span className="field-error" id="website-error">{errors.website}</span>}</div><div className="form-row"><div className="field"><label htmlFor="timeline">Ideal timeline</label><select id="timeline" name="timeline"><option value="">Not sure yet</option><option>As soon as practical</option><option>1–3 months</option><option>3–6 months</option><option>Exploring possibilities</option></select></div><div className="field"><label htmlFor="budget">Budget range</label><select id="budget" name="budget"><option value="">Let’s discuss</option><option>Under $5,000</option><option>$5,000–$10,000</option><option>$10,000–$25,000</option><option>$25,000+</option></select></div></div></details><div className="form-submit"><button className="button" type="submit" disabled={status==='sending'}>{status==='sending'?'Sending…':'Send project inquiry'}<Arrow diagonal/></button><p>Just an introduction.<br/>No full brief needed.</p></div>{message&&<p className="form-message" role="alert">{message}</p>}<p className="form-privacy">We’ll use these details to reply to your inquiry. <a href="/privacy">Privacy policy</a></p></form>
}
export function Clip({name,poster}:{name:string;poster:string}){const [playing,setPlaying]=useState(false);const ref=useRef<HTMLVideoElement>(null);return <div className="clip"><video ref={ref} controls={playing} preload="none" playsInline poster={poster} onEnded={()=>setPlaying(false)}><source src={`/clips/${name}.webm`} type="video/webm"/></video>{!playing&&<button className="play-button" onClick={()=>{setPlaying(true);ref.current?.play().catch(()=>setPlaying(false))}} aria-label={`Play ${name==='buildplane'?'BuildPlane canvas':'Website X-Ray report'} walkthrough`}><span aria-hidden="true">▶</span> See it in action <span className="micro">Short capture</span></button>}</div>}
