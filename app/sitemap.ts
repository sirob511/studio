import {origin,projects,services} from '@/lib/projects';
export default function sitemap(){return ['', '/work','/services','/about','/contact','/privacy',...projects.map(p=>'/work/'+p.slug),...services.map(s=>'/services/'+s.slug)].map(p=>({url:origin+p,changeFrequency:'monthly' as const,priority:p===''?1:0.7}))}
