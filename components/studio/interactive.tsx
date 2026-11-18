'use client';
import {useEffect,useId,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {inject,track as trackVercelEvent} from '@vercel/analytics';
import {projects} from '@/lib/projects';
import {Arrow,Mark,Wordmark} from './shared';
export function Header(){const [open,setOpen]=useState(false);const path=usePathname();useEffect(()=>setOpen(false),[path]);return <header className={`header wrap${path==='/'?' header--home':''}`}><Wordmark/><nav className={open?'nav nav-open':'nav'} aria-label="Main navigation"><a href="/" aria-current={path==='/'?'page':undefined}>Home</a><a href="/work" aria-current={path.startsWith('/work')?'page':undefined}>Work</a><a href="/services" aria-current={path.startsWith('/services')?'page':undefined}>Services</a><a href="/about" aria-current={path==='/about'?'page':undefined}>About</a>{path==='/'&&<a href="/contact" data-event="start_project">Contact</a>}</nav>{path!=='/'&&<a href="/contact" className="nav-cta" data-event="start_project">Start a project <Arrow diagonal/></a>}<button className="menu-toggle" aria-expanded={open} aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(!open)}>{open?'Close':'Menu'}<span>{open?'−':'+'}</span></button></header>}
let measurementEnabled=false;
const eventNames=new Set(['case_study_open','case_study_view','outbound_portfolio','start_project','inquiry_success']);
export function Analytics({enabled}:{enabled:boolean}){
 const path=usePathname();
 useEffect(()=>{
  measurementEnabled=enabled&&navigator.doNotTrack!=='1';
  if(!measurementEnabled)return;
  inject({framework:'next',basePath:process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH,beforeSend:event=>{
   if(navigator.doNotTrack==='1')return null;
   const url=new URL(event.url);url.search='';url.hash='';
   return {...event,url:url.toString()};
  }},process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG);
  function handle(event:MouseEvent){
   const target=event.target;
   if(!(target instanceof Element))return;
   const el=target.closest<HTMLElement>('[data-event]');
   if(el)track(el.dataset.event!,el.dataset.project||'');
  }
  document.addEventListener('click',handle);
  return()=>{measurementEnabled=false;document.removeEventListener('click',handle)};
 },[enabled]);
 useEffect(()=>{if(path.startsWith('/work/'))track('case_study_view',path.split('/')[2])},[path,enabled]);
 return null;
}
export function track(event:string,project=''){
 if(!measurementEnabled||navigator.doNotTrack==='1'||!eventNames.has(event))return;
 if(project&&!projects.some(item=>item.slug===project))return;
 trackVercelEvent(event,project?{project}:{});
}
export function ContactForm(){
 const titleId=useId();
 const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle');
 const [message,setMessage]=useState('');
 const [errors,setErrors]=useState<Record<string,string>>({});
 const formRef=useRef<HTMLFormElement>(null);
 useEffect(()=>{
  const firstError=Object.keys(errors)[0];
  if(!firstError)return;
  const firstInvalid=formRef.current?.elements.namedItem(firstError) as HTMLElement | null;
  const optionalGroup=firstInvalid?.closest('details');
  if(optionalGroup)optionalGroup.open=true;
  firstInvalid?.focus();
 },[errors]);
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
   setStatus('error');setMessage('');
   return;
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
 if(status==='success')return <section className="inquiry-panel inquiry-panel--success"><div className="form-success" role="status"><Mark/><h2>Message received</h2><p>Thanks for telling us about your project. We’ll be in touch at the email you provided.</p><button className="button" onClick={()=>{setStatus('idle');setMessage('');setErrors({})}}>Send another inquiry <Arrow/></button></div></section>;
 return <section className="inquiry-panel"><div className="inquiry-heading"><h2 id={titleId}>Start a project</h2><p>A few details are enough to start the conversation.</p></div><form ref={formRef} className="inquiry-form" aria-labelledby={titleId} onSubmit={submit} noValidate><div className="form-row"><div className="field"><label htmlFor="name">Your name <span>*</span></label><input id="name" name="name" autoComplete="name" maxLength={100} placeholder="Alex Taylor" required aria-invalid={!!errors.name} aria-describedby={errors.name?'name-error':undefined}/>{errors.name&&<span className="field-error" id="name-error">{errors.name}</span>}</div><div className="field"><label htmlFor="email">Email address <span>*</span></label><input id="email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="alex@company.com" required aria-invalid={!!errors.email} aria-describedby={errors.email?'email-error':undefined}/>{errors.email&&<span className="field-error" id="email-error">{errors.email}</span>}</div></div><div className="field"><label htmlFor="description">What do you have in mind? <span>*</span></label><textarea id="description" name="description" rows={4} maxLength={6000} placeholder="A new website, an idea for a tool, a workflow that could work better…" required aria-invalid={!!errors.description} aria-describedby={errors.description?'description-error':undefined}/>{errors.description&&<span className="field-error" id="description-error">{errors.description}</span>}</div><div className="honeypot" aria-hidden="true"><label htmlFor="company_fax">Leave this empty</label><input id="company_fax" name="company_fax" tabIndex={-1} autoComplete="off"/></div><details className="optional-fields"><summary>A few more details <span>optional <span aria-hidden="true">+</span></span></summary><div className="field"><label htmlFor="website">Existing website</label><input id="website" name="website" type="url" maxLength={500} placeholder="https://" aria-invalid={!!errors.website} aria-describedby={errors.website?'website-error':undefined}/>{errors.website&&<span className="field-error" id="website-error">{errors.website}</span>}</div><div className="form-row"><div className="field"><label htmlFor="timeline">Ideal timeline</label><select id="timeline" name="timeline"><option value="">Not sure yet</option><option>As soon as practical</option><option>1–3 months</option><option>3–6 months</option><option>Exploring possibilities</option></select></div><div className="field"><label htmlFor="budget">Budget range</label><select id="budget" name="budget"><option value="">Let’s discuss</option><option>Under $5,000</option><option>$5,000–$10,000</option><option>$10,000–$25,000</option><option>$25,000+</option></select></div></div></details><div className="form-submit"><button className="button" type="submit" disabled={status==='sending'}>{status==='sending'?'Sending…':'Send project inquiry'}<Arrow diagonal/></button></div>{message&&<p className="form-message" role="alert">{message}</p>}<p className="form-privacy">We’ll use these details to reply to your inquiry. <a href="/privacy">Privacy policy</a></p></form></section>
}
export function Clip({name,poster}:{name:string;poster:string}){const [playing,setPlaying]=useState(false);const ref=useRef<HTMLVideoElement>(null);return <div className="clip"><video ref={ref} controls={playing} preload="none" playsInline poster={poster} onEnded={()=>setPlaying(false)}><source src={`/clips/${name}.webm`} type="video/webm"/></video>{!playing&&<button className="play-button" onClick={()=>{setPlaying(true);ref.current?.play().catch(()=>setPlaying(false))}} aria-label={`Play ${name==='buildplane'?'BuildPlane canvas':'Website X-Ray report'} walkthrough`}><span aria-hidden="true">▶</span> See it in action <span className="micro">Short capture</span></button>}</div>}
