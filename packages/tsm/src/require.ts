import { format } from 'path';

const esbuild = require('esbuild') as typeof import('esbuild');
const { extname } = require('path') as typeof import('path');
const { readFileSync } = require('fs') as typeof import('fs');

const loadJS = require.extensions['.js']
const transform = (source: string, options = {}): string => esbuild.transformSync(source, options).code

function loader(Module, sourcefile: string) {
  let extn = extname(sourcefile)
  let pitch = Module._compile!.bind(Module);
  if (sourcefile.endsWith('.ts')) {
    Module._compile = source => {
      let result = transform(source, { format: 'cjs' });
      return pitch(result, sourcefile);
    }
  }
  try {
    return loadJS(Module, sourcefile);
  } catch (err) {
    let ec = err && (err as any).code;
    if (ec !== 'ERR_REQUIRE_ESM') throw err;

    let input = readFileSync(sourcefile, 'utf8');
    let result = transform(input, { format: 'cjs' });
    return pitch(result, sourcefile);
  }
}

require.extensions['.ts'] = loader
