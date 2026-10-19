// Fails fast when package-lock.json doesn't match package.json.
//
// CI and the Netlify deploy install with npm 10 (Node 20), which crashes with a
// cryptic "Cannot read properties of null (reading 'edgesOut')" on an out-of-sync
// lockfile. pnpm (used locally) doesn't touch this file, so it drifts easily.
// Fix: run `npm install --package-lock-only` in apps/web and commit the result.
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'))

const declared = { ...pkg.dependencies, ...pkg.devDependencies }
const root = lock.packages?.[''] ?? {}
const locked = { ...root.dependencies, ...root.devDependencies }

const mismatched = [...new Set([...Object.keys(declared), ...Object.keys(locked)])]
    .filter((name) => declared[name] !== locked[name] || !lock.packages?.[`node_modules/${name}`])
    .sort()

if (mismatched.length > 0) {
    const details = mismatched
        .map((name) => `  ${name}: package.json=${declared[name] ?? '(missing)'} lockfile=${locked[name] ?? '(missing)'}`)
        .join('\n')
    console.error(
        `apps/web/package-lock.json is out of sync with package.json:\n${details}\n\n` +
            'Run `npm install --package-lock-only` in apps/web and commit package-lock.json.',
    )
    process.exit(1)
}

console.log(`package-lock.json is in sync with package.json (${Object.keys(declared).length} dependencies).`)
