import * as esbuild from 'esbuild'
esbuild.build({
  entryPoints: ['src/index.ts', 'src/loader.ts'],
  bundle: true,
  treeShaking: true,
  outdir: 'dist',
  format: 'esm',
  platform: 'node',
  target: 'node14',
  watch: true
})
