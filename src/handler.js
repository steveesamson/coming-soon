import {functionsHandler} from 'cloudflare2express'

const modules = import.meta.glob('../functions/**/*.js', {
  import: 'onRequest',
  eager: true,
});

const appFactory = functionsHandler(modules);
const handler = appFactory;

export {handler, appFactory};
