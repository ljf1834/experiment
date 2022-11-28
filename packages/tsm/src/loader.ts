import { fileURLToPath, URL } from 'node:url'
import * as esbuild from 'esbuild'


export function resolve(specifier, context, defaultResolver) {
  console.log('resolve', specifier, context);
  return defaultResolver(specifier, context, defaultResolver);
}

export async function load(url, context, defaultLoad) {
  console.log('load', fileURLToPath(url));
  const res = esbuild.transform(``)
  return defaultLoad(url, context, defaultLoad);
}
