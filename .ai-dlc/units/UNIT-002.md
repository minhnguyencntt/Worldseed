# UNIT-002 — Act: Scaffold frontend Vite React TypeScript module

## Summary
Create root package.json, Vite/TS config, App stub, env example, and loadFrontendConfig.

## Description
Context: Root has only `README.md`; no frontend package.
Desired behavior: Add the frontend module files listed in code_paths with `loadFrontendConfig` implementing defaults.
Expected result: Repo root is a valid Vite React TS app with config helper and `.env.example`.
Why: Implements REQ-FE product code only (no tests).

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `package.json` · `new: package.json` · new
- **Do:** Create package.json name storyforge, private true, type module, scripts dev=vite, build=tsc -b && vite build, preview=vite preview; dependencies react and react-dom ^19; devDependencies typescript ^5.6, vite ^6, @vitejs/plugin-react ^4, @types/react, @types/react-dom.

```
{
  "name": "storyforge",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "~5.6.3",
    "vite": "^6.0.0"
  }
}
```

- **Expected:** package.json exists with Vite React scripts and dependencies.

### Step 2 — `tsconfig.json` · `new: tsconfig.json` · new
- **Do:** Create solution-style tsconfig referencing tsconfig.app.json and tsconfig.node.json.

```
{
  "files": [],
  "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }]
}
```

- **Expected:** tsconfig.json references app and node configs.

### Step 3 — `tsconfig.app.json` · `new: tsconfig.app.json` · new
- **Do:** Create app tsconfig with strict true, jsx react-jsx, module ESNext, moduleResolution bundler, include main.tsx App.tsx config.ts vite-env.d.ts.

```
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["main.tsx", "App.tsx", "config.ts", "vite-env.d.ts"]
}
```

- **Expected:** tsconfig.app.json enables strict TypeScript for app entry files.

### Step 4 — `tsconfig.node.json` · `new: tsconfig.node.json` · new
- **Do:** Create node tsconfig including vite.config.ts only.

```
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

- **Expected:** tsconfig.node.json covers vite.config.ts.

### Step 5 — `vite.config.ts` · `new: defineConfig` · new
- **Do:** Create Vite config exporting default defineConfig with plugins: [react()] from @vitejs/plugin-react.

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- **Expected:** vite.config.ts enables the React plugin.

### Step 6 — `index.html` · `new: index.html` · new
- **Do:** Create index.html with root div#root and script type=module src=/main.tsx.

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>StoryForge</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
```

- **Expected:** index.html mounts the React entry at /main.tsx.

### Step 7 — `vite-env.d.ts` · `new: ImportMetaEnv` · new
- **Do:** Create vite-env.d.ts referencing vite/client and declaring ImportMetaEnv optional string fields VITE_API_BASE_URL and VITE_APP_NAME.

```
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_APP_NAME?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

- **Expected:** Env key types are declared for the frontend config loader.

### Step 8 — `config.ts` · `new: loadFrontendConfig` · new
- **Do:** Create exported type FrontendConfig with apiBaseUrl:string and appName:string; export function loadFrontendConfig(env: { VITE_API_BASE_URL?: string; VITE_APP_NAME?: string }) that returns apiBaseUrl from env.VITE_API_BASE_URL or http://localhost:8080, and appName from env.VITE_APP_NAME or StoryForge.

```
export type FrontendConfig = {
  apiBaseUrl: string
  appName: string
}

export function loadFrontendConfig(
  env: { VITE_API_BASE_URL?: string; VITE_APP_NAME?: string },
): FrontendConfig {
  return {
    apiBaseUrl: env.VITE_API_BASE_URL ?? 'http://localhost:8080',
    appName: env.VITE_APP_NAME ?? 'StoryForge',
  }
}
```

- **Expected:** loadFrontendConfig applies documented defaults when keys are missing.

### Step 9 — `App.tsx` · `new: App` · new
- **Do:** Create App component that calls loadFrontendConfig(import.meta.env) and renders an h1 with config.appName and a paragraph showing config.apiBaseUrl.

```
import { loadFrontendConfig } from './config'

export function App() {
  const config = loadFrontendConfig(import.meta.env)
  return (
    <main>
      <h1>{config.appName}</h1>
      <p>API: {config.apiBaseUrl}</p>
    </main>
  )
}
```

- **Expected:** App renders StoryForge name and API base from config.

### Step 10 — `main.tsx` · `new: main` · new
- **Do:** Create main.tsx that createRoot on #root and renders <App /> under StrictMode.

```
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- **Expected:** React mounts App at #root.

### Step 11 — `.env.example` · `new: .env.example` · new
- **Do:** Create .env.example with lines VITE_API_BASE_URL=http://localhost:8080 and VITE_APP_NAME=StoryForge.

```
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_NAME=StoryForge
```

- **Expected:** .env.example documents both VITE keys.

## Acceptance criteria
- Given the Act is applied, when listing the repo root, then `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `main.tsx`, `App.tsx`, `config.ts`, and `.env.example` exist.
- Given `loadFrontendConfig({})`, when evaluated in source, then defaults are `http://localhost:8080` and `StoryForge` as specified in the step code.

## Definition of done
- All code_paths created with the specified symbols and behavior
- No test files added by this Act
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-002.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-002
- Requirement: REQ-002
- Unit (Act): UNIT-002
- Unit (Verify): UNIT-001
- Status: completed
- Change: NEW
