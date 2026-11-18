import {env} from 'cloudflare:workers';
import {projects} from '@/lib/projects';
const allowed=new Set(['case_study_open','case_study_view','outbound_portfolio','start_project','inquiry_success']);
export async function POST(request:Request){
 if(request.headers.get('origin')&&request.headers.get('origin')!==new URL(request.url).origin)return new Response(null,{status:403});
 if(request.headers.get('DNT')==='1')return new Response(null,{status:204});
 const raw=await request.text();if(raw.length>500)return new Response(null,{status:413});
 try{const {event,project}=JSON.parse(raw);if(!allowed.has(event)||typeof project!=='string'||(project&&!projects.some(p=>p.slug===project)))return new Response(null,{status:400});if(env.DB)await env.DB.prepare('INSERT INTO analytics_events (event, project, created_at) VALUES (?, ?, ?)').bind(event,project,new Date().toISOString()).run();return new Response(null,{status:204,headers:{'Cache-Control':'no-store'}})}catch{return new Response(null,{status:400})}
}
