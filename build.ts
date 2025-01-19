import type { BuildConfig } from 'bun';
import dts from 'bun-plugin-dts';
import './src/styles.css';

const defaultBuildConfig: BuildConfig = {
  entrypoints: ['./src/index.tsx'],
  outdir: './dist',
  external: ['react'],
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
