import {isProductionDeployment} from '@/lib/deployment';

export default function robots(){return {rules:isProductionDeployment?{userAgent:'*',allow:'/'}:{userAgent:'*',disallow:'/'},sitemap:'https://oddlogicstudio.com/sitemap.xml'}}
