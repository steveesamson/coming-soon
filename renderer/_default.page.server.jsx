import React from 'react';
import { renderToStream } from 'react-streaming/server';
import { escapeInject } from 'vite-plugin-ssr/server';
export { render };
export { passToClient };

// See https://vite-plugin-ssr.com/data-fetching
const passToClient = ['pageProps'];

async function render(pageContext) {
  const { Page, pageProps, userAgent } = pageContext;
  const { documentProps } = pageContext.exports;
  const sBuild = process.argv[process.argv.length - 1];
  let streamContents = <div id="io_github_diy-pwa_spa_root" />;
  if(!documentProps.isSPA){
    streamContents = <Page {...pageProps} />
  }
  const stream = await renderToStream(
    streamContents,
    { userAgent }
  );

  return escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <title>${documentProps.title}</title>
        <meta name="description" content="${documentProps.description}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico">
        <link rel="manifest" href="/site.webmanifest" />
        <!-- ios support -->
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-status-bar" content="#db4938" />
        <meta name="theme-color" content="#db4938" />
        <script>
        if ('serviceWorker' in navigator && 'build' == '${sBuild}') {
          navigator.serviceWorker.register('/sw.js');
        }
        </script>
      </head>
      <body>
        <main id="io_github_diy-pwa_root">${stream}</main>
      </body>
    </html>`;
}
