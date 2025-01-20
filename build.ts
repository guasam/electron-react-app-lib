import type { BuildConfig } from 'bun';
import dts from 'bun-plugin-dts';
import './src/styles.css';
import './src/titlebar/components';
import './src/menus';

const defaultBuildConfig: BuildConfig = {
  entrypoints: ['./src/index.tsx', './src/menus.ts', './src/window.ts'],
  outdir: './dist',
  external: ['react', 'electron'],
};

await Promise.all([
  Bun.build({
    ...defaultBuildConfig,
    plugins: [dts()],
    format: 'esm',
    splitting: true,
    naming: {
      entry: '[dir]/[name].[ext]',
      asset: '[dir]/[name].[ext]',
    },
  }),
]);
