#! bin/usr/env node
import { execSync } from 'child_process'
import { URL, pathToFileURL } from 'node:url'

const args = process.argv.slice(2)
execSync(`node --experimental-loader ${ new URL('loader.cjs', pathToFileURL(__filename)).href } ${args.join(' ')}`, { stdio: 'inherit' })
