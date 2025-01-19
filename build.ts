import type { BuildConfig } from 'bun';
import dts from 'bun-plugin-dts';
import './src/styles.css';
import './src/titlebar/components';

const defaultBuildConfig: BuildConfig = {
  entrypoints: ['./src/index.tsx', './src/window.ts', './src/menus.ts'],
  outdir: './dist',
  external: ['react', 'electron'],
};

await Promise.all([
  Bun.build({
    ...defaultBuildConfig,
    plugins: [dts()],
    format: 'esm',
    naming: {
      entry: '[dir]/[name].[ext]',
      asset: '[dir]/[name].[ext]',
    },
  }),
]);
