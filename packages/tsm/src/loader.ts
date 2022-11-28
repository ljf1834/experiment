import { fileURLToPath, URL } from 'node:url'

export function resolve(specifier, context, defaultResolver) {
  console.log('resolve', specifier, context);
  return defaultResolver(specifier, context, defaultResolver);
}

export async function load(url, context, defaultLoad) {
  // console.log('load', fileURLToPath(url));
  const esbuild = await import('esbuild');
  const res = esbuild.transform(``)
  return defaultLoad(url, context, defaultLoad);
}
