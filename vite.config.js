import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import mix from '@rhildred/vite-plugin-mix';
import ssr from 'vite-plugin-ssr/plugin';
import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';

const CompileServiceWorker = () => ({
  name: 'compile-service-worker',
  async writeBundle(_options, _outputBundle) {
    const inputOptions = {
      input: 'src/sw.js',
      plugins: [
        json(),
        replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
          preventAssignment: true,
        }),
        nodeResolve(),
      ],
    };
    const outputOptions = {
      file: 'dist/client/sw.js',
      format: 'es',
    };
    const bundle = await rollup(inputOptions);
    await bundle.write(outputOptions);
    await bundle.close();
  },
});

export default {
  plugins: [
    CompileServiceWorker(),
    react(),
    mdx(),
    mix.default({
      handler: './src/handler.js',
    }),
    ssr({
      prerender: true,
      includeAssetsImportedByServer: true,
    }),
  ],
};
