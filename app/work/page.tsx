import type {Metadata} from 'next';
import {WorkGrid} from '@/components/studio/interactive';
import {ContactLink} from '@/components/studio/shared';
export const metadata:Metadata={title:'Selected Work — Websites & Applications',description:'Explore the Odd Logic Studio portfolio: distinctive travel websites, interactive visitor guides, cloud architecture tools, and website audit applications.',alternates:{canonical:'/work'}};
export default function Work(){return <main id="main" className="wrap"><section className="page-heading"><h1>Websites & applications<span className="blue">.</span></h1><p>Explore the websites, interactive experiences, and tools we’ve designed and built.</p></section><WorkGrid/><section className="inline-cta"><h2>Your project could<br/>be the next one.</h2><ContactLink/></section></main>}
