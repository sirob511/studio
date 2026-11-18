import {env} from 'cloudflare:workers';
const headers={'Content-Type':'application/json','Cache-Control':'no-store'};
const json=(value:unknown,status=200)=>new Response(JSON.stringify(value),{status,headers});
export async function POST(request:Request){
 if(request.headers.get('origin')&&request.headers.get('origin')!==new URL(request.url).origin)return json({error:'Please submit this form from the studio website.'},403);
 if(!request.headers.get('content-type')?.includes('application/json'))return json({error:'Invalid submission.'},415);
 const raw=await request.text();if(raw.length>12000)return json({error:'Please shorten your message and try again.'},413);
 let body:Record<string,unknown>;try{body=JSON.parse(raw);if(!body||typeof body!=='object'||Array.isArray(body))throw new Error()}catch{return json({error:'Invalid submission. Please try again.'},400)}
 if(body.company_fax)return json({error:'This submission could not be accepted.'},400);
 const value=(k:string)=>typeof body[k]==='string'?(body[k] as string).trim():'';
 const name=value('name'),email=value('email'),description=value('description'),website=value('website'),timeline=value('timeline'),budget=value('budget');
 if(!name||name.length>100||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254||description.length<15||description.length>6000||timeline.length>100||budget.length>100)return json({error:'Please check your name, email, and project description.'},400);
 if(website){try{const u=new URL(website);if(!['http:','https:'].includes(u.protocol)||website.length>500)throw new Error()}catch{return json({error:'Please enter a website beginning with https:// or http://, or leave it blank.'},400)}}
 const config=env as unknown as Record<string,string|undefined>;
 const inbox='hello@oddlogicstudio.com';
 const text=`New Odd Logic Studio project inquiry\n\nName: ${name}\nEmail: ${email}\n\nProject:\n${description}\n\nExisting website: ${website||'Not provided'}\nTimeline: ${timeline||'Not specified'}\nBudget: ${budget||'To discuss'}`;
 try{
  if(config.RESEND_API_KEY&&config.INQUIRY_FROM_EMAIL){
   const result=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${config.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:config.INQUIRY_FROM_EMAIL,to:[inbox],reply_to:email,subject:'New project inquiry — Odd Logic Studio',text}),signal:AbortSignal.timeout(15000)});
   const data=await result.json() as {id?:string};if(!result.ok||!data.id)throw new Error('delivery');
  }else if((config.FORM_PROVIDER||'formsubmit')==='formsubmit'){
   const result=await fetch(`https://formsubmit.co/ajax/${inbox}`,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json',Origin:'https://oddlogicstudio.com',Referer:'https://oddlogicstudio.com/contact'},body:JSON.stringify({name,email,message:description,website,timeline,budget,_subject:'New project inquiry — Odd Logic Studio',_template:'table',_captcha:'false',_url:'https://oddlogicstudio.com/contact'}),signal:AbortSignal.timeout(15000)});
   const data=await result.json() as {success?:boolean|string;message?:string};if(!result.ok||!['true',true].includes(data.success||false)||/activat|confirm/i.test(data.message||''))throw new Error('delivery');
  }else{return json({error:'The inquiry form is not ready to send yet. Your message is still here. Please email hello@oddlogicstudio.com directly.'},503)}
  return json({ok:true});
 }catch{return json({error:'Your inquiry could not be sent. Your message is still here; please try again or email hello@oddlogicstudio.com.'},502)}
}
