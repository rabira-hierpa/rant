# `:tada:` __RANT__

![RANT LOGO](assets/rant-logo.png)
### REAT - ANT Design - Nest.js - Tailwindcss 
---

> Boilerplate for building ERP systems using MERN/PERN. Generated using [Nx](https://nx.dev).


🔎 **Smart, Extensible Build Framework**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@rant/mylib`.

## Development server

Run `nx run rant-web:serve` for a dev server. Navigate to http://localhost:4000/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Tailwindcss Setup (React)

1. Create Nx workspace with react preset
   `npx create-nx-workspace --preset=react`

2. Install Tailwindcss
   `npm install -D tailwindcss@latest postcss@latest autoprefixer@latest `

3. Create a new style folder in the root directory of your nx project

```bash
mkdir styles
touch tailwind.css
```

4. Create a new sytles folder in the root directory of your apps (e.g apps/rant-web)

```bash
cd apps/rant-web
mkdir styles
touch tailwind.dev.css
```

5. Define tailwind build in your project **package.json** file (repace "rant-web" with your app name)

```json
{
  ...
  "tailwind:rant-web:dev": "npx tailwindcss-cli@latest build  styles/tailwind.css -o apps/rant-web/src/styles/tailwind.dev.css -c  apps/rant-web/tailwind.config.js ",
  "tailwind:rant-web:prod": "cross-env NODE_ENV=production npx tailwindcss-cli@latest build  styles/tailwind.css  -c  apps/rant-web/tailwind.config.js  -o apps/rant-web/src/styles/tailwind.prod.css"
  ...
}
```

6. Add a custom command to enable nx host your app (e.g rant-web) to a specified port,and expose server to local network
   inside **workspace.json** file

```json
{
  ...
  "postServe": {
          "executor": "@nrwl/web:dev-server",
          "options": {
            "buildTarget": "rant-web:postBuild",
            "port": 4000,
            "host": "0.0.0.0"
          },
          "configurations": {
            "production": {
              "buildTarget": "rant-web:postBuild:production"
            },
            "development": {
              "buildTarget": "rant-web:postBuild:development"
            }
          }
        },
  ...
}
```

7. Add a postBuild option to server you app(rant-web) inside your **workspace.json** file

> Path - "projects" > "rant-web" > "targets"

```json
{
  ...
   "postBuild": {
          "executor": "@nrwl/web:build",
          "options": {
            "outputPath": "dist/apps/rant-web",
            "index": "apps/rant-web/src/index.html",
            "main": "apps/rant-web/src/main.tsx",
            "polyfills": "apps/rant-web/src/polyfills.ts",
            "tsConfig": "apps/rant-web/tsconfig.app.json",
            "assets": ["apps/rant-web/src/assets"],
            "styles": ["apps/rant-web/src/styles.scss"],
            "scripts": [],
            "webpackConfig": "@nrwl/react/plugins/webpack"
          },
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "apps/web/challenge/src/environments/environment.ts",
                  "with": "apps/web/challenge/src/environments/environment.prod.ts"
                },
                {
                  "replace": "apps/web/challenge/src/styles/tailwind.css",
                  "with": "apps/web/challenge/src/styles/tailwind.prod.css"
                }
              ],
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "extractLicenses": true,
              "vendorChunk": false,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                }
              ]
            },
            "development": {
              "fileReplacements": [
                {
                  "replace": "apps/web/rant-web/src/environments/environment.ts",
                  "with": "apps/web/rant-web/src/environments/environment.dev.ts"
                },
                {
                  "replace": "apps/web/rant-web/src/styles/tailwind.css",
                  "with": "apps/web/rant-web/src/styles/tailwind.dev.css"
                }
              ],
              "optimization": false,
              "sourceMap": true
            }
          }
        },
  ...
}
```

8. Modify your serve command in your **workspace.json** file to build your tailwind every time you run your project

```json
{
  ...
  "options": {
    "commands": [
      "npm run tailwind:rant-web:dev",
      "nx run rant-web:postServe --configuration=development"
    ],
    "hmr": true, # Hot Module Replacement
  }
  ...
}
```
9. Finally add a script in __package.json__ to start your dev server

`"start-ecsp-web": "nx run rant-web:serve",`

10. Import tailwindcss and antd into your __main.tsx__ file of your app (rant-web)
`import 'antd/dist/antd.css';`
`import './styles/tailwind.css; `

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

