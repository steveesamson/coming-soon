import { StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { registerRoute } from 'workbox-routing';
import { getSupportedLanguage } from 'diy-pwa'; 
import config from '../package.json';


// Create a caching strategy
const htmlCachingStrategy = new StaleWhileRevalidate({
  cacheName: 'pages-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [200],
    }),
  ],
});

// Use it for navigations
registerRoute(
  async ({ request }) => {
    let oUrl = new URL(request.url);
    return oUrl.pathname === '/';
  },
  async ({event, request, params}) => {
    const isRoot = await params;
    if(isRoot){
      const sLang = getSupportedLanguage(config);
      return Response.redirect(`/${sLang}`, 302);
  
    }
    return htmlCachingStrategy.handle({ event, request });
}
);
