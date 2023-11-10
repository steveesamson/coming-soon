export { render };

import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';

async function render(pageContext) {
  const { Page, pageProps } = pageContext;
  const domNode = document.getElementById("io_github_diy-pwa_spa_root");
  if(domNode){
    const root = createRoot(domNode);
    root.render(
      <Page {...pageProps} />
    );
  }else{
    hydrateRoot(
      document.getElementById("io_github_diy-pwa_root"),
      <Page {...pageProps} />
    );
  
  }
}
