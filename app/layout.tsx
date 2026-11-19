import type { Metadata } from 'next';
import './globals.css';
import './home.css';
import './studio-pages.css';
import './footer.css';
import '@/components/studio/project-media.css';
import '@/components/studio/inquiry.css';
import {Header,Analytics} from '@/components/studio/interactive';
import {Footer} from '@/components/studio/shared';
import {origin} from '@/lib/projects';
import {isProductionDeployment} from '@/lib/deployment';
export const metadata:Metadata={metadataBase:new URL(origin),title:{default:'Custom Web Design & Development | Odd Logic Studio',template:'%s | Odd Logic Studio'},description:'Custom websites and web applications that look great and work smoothly on desktop and mobile. Built for speed, security, and search and AI discovery.',alternates:{canonical:'/'},openGraph:{type:'website',siteName:'Odd Logic Studio',title:'Custom Web Design & Development | Odd Logic Studio',description:'Distinctive websites and useful applications, built around your business. Great design, smooth desktop and mobile experiences, and a real person to guide your project.',images:[{url:'/images/social-2026-11-light.jpg',width:1200,height:630,alt:'Odd Logic Studio — custom websites, featuring Lakefront Trail and A Planet of Her Own'}]},twitter:{card:'summary_large_image'},icons:{icon:'/favicon.svg'},robots:{index:isProductionDeployment,follow:isProductionDeployment}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><link rel="preload" href="/fonts/bricolage.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/><link rel="preload" href="/fonts/instrument.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/></head><body><a className="skip-link" href="#main">Skip to content</a><Header/>{children}<Footer/><Analytics enabled={isProductionDeployment}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'ProfessionalService',name:'Odd Logic Studio',url:origin,description:'Custom websites, interactive experiences, and web applications built for desktop and mobile, with speed, security, and search and AI discovery in mind.',areaServed:'Worldwide',founder:{'@type':'Person',givenName:'Boris'},sameAs:['https://oddlogic.ai/']})}}/></body></html>}
