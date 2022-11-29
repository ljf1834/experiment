import { fileURLToPath, URL, pathToFileURL } from 'node:url'
import * as esbuild from 'esbuild'
import { readFileSync, existsSync } from 'node:fs'

const extnames = ['.ts','.js']
const matchExtensionRE = /\.\w+(?=\?|$)/

const check = (fileurl: string): string | void => existsSync(fileURLToPath(fileurl)) ? fileurl : void 0

const filterPath = (path: string): string | void => {
  for (const ext of extnames) {
    if (check(path + '/index' + ext)) return path + '/index' + ext
    if(check(path + ext)) return path + ext
  }
}

const rootFileURL = pathToFileURL(process.cwd())
export function resolve(specifier, context, defaultResolver) {
  if (/^\w+\:?/.test(specifier)) return defaultResolver(specifier, context, defaultResolver)
  const targetFileURL = new URL(specifier, context.parentURL || rootFileURL)
  const match = matchExtensionRE.exec(targetFileURL.href)
  if (match) {
    return { url: targetFileURL.href + match[0], shortCircuit: true }
  } else {
    let targetUrl = filterPath(targetFileURL.href)
    if (targetUrl) {
      return { url: targetUrl, shortCircuit: true }
    }
  }
  return defaultResolver(specifier, context, defaultResolver)
}

export async function load(uri, context, defaultLoad) {
  if (!matchExtensionRE.exec(uri)) return defaultLoad(uri, context, defaultLoad)
  const path = fileURLToPath(uri)
  const fileContent = readFileSync(path, 'utf8')
  let format = 'module'
  const result = await esbuild.transform(fileContent.toString(), {
    sourcefile: path,
    format: format == 'module' ? 'esm' : 'cjs',
  })
  return { format: 'module', source: result.code, shortCircuit: true };;
}
