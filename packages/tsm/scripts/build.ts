import * as esbuild from 'esbuild'
esbuild.build({
  entryPoints: ['src/index.ts', 'src/loader.ts', 'src/bin.ts'],
  treeShaking: true,
  outdir: 'dist',
  format: 'esm',
  platform: 'node',
  target: 'node14',
  watch: process.env.NODE_ENV !== 'production'
})
