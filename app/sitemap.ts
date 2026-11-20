import {origin} from '@/lib/projects';
export default function sitemap(){return ['', '/work','/services','/about','/contact','/privacy'].map(p=>({url:origin+p,changeFrequency:'monthly' as const,priority:p===''?1:0.7}))}
