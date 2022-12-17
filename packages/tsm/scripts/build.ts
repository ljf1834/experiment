import * as esbuild from 'esbuild'
esbuild.build({
  entryPoints: ['src/loader.ts', 'src/bin.ts', 'src/require.ts'],
  treeShaking: true,
  outdir: 'dist',
  format: 'esm',
  platform: 'node',
  target: 'node14',
  watch: process.env.NODE_ENV !== 'production'
})
