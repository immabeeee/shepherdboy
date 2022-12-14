<!-- ABOUT THE PROJECT -->

## About The Project

[![Logo](https://raw.githubusercontent.com/immabeeee/shepherdboy/db79beeb63990960910f17514a05d3e86ddf67d2/shepherdboy-org/apps/shepherdboy-ui/src/assets/images/logo.svg)](https://github.com/immabeeee/shepherdboy/)

<a name="screenshot1" href="https://github.com/immabeeee/shepherdboy/blob/main/shepherdboy-org/documentation/screenshots/1.png"><img align="center" src="https://github.com/immabeeee/shepherdboy/blob/main/shepherdboy-org/documentation/screenshots/1.png?raw=true" alt="Screenshot #1"></a>

Before you start , it's a good idea to look in the <a href="https://github.com/immabeeee/shepherdboy/tree/main/shepherdboy-org/documentation">documentation folder</a>. There you will find a <a href="https://github.com/immabeeee/shepherdboy/tree/main/shepherdboy-org/documentation/videos">video</a> file with a presentation of the application, postman collections and few screenshots

### Built With

- [![Angular][angular.io]][angular-url]
- [![Nx][nx.dev]][nx-url]
- [![Typescript][typescript.io]][typescript-url]
- [![NestJs][nestjs.com]][nestjs-url]
- [![Jest][jestjs.io]][jest-url]
- [![Storybook][storybook.js.org]][storybook-url]
- [![Cypress][cypress.io]][cypress-url]

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm

  ```sh
  npm install npm@latest -g
  ```

- node (v14.16.0)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/immabeeee/shepherdboy.git
   ```
2. Install NPM packages
   ```sh
   cd shepherdboy-org
   npm install
   ```
3. Create a database based on config `apps/shepherdboy-api/.env`
   ```js
   POSTGRES_HOST = localhost;
   POSTGRES_PORT = 5432;
   POSTGRES_USER = postgres;
   POSTGRES_PASSWORD = 123;
   POSTGRES_DB = shepherdboy;
   ```
4. Serve API

   ```sh
   nx run shepherdboy-api:serve
   ```

5. To add data to the database, you can use Postman and the collection that can be found here (sherherdboy-org/documentation/postman-collections), or fire the e2e api tests.

   ```sh
   sherherdboy-org/documentation/postman-collections
   ```

   ```sh
   npm run test:api:e2e
   ```

6. Serve UI
   ```sh
   nx run start
   ```
   <!-- HELP COMMANDS -->

## Help commands

1. Run e2e:

```sh
nx e2e PROJECT_NAME --watch
```

2. Run unit tests:

```sh
nx run PROJECT_NAME:test
```

3. Run storybook:

```sh
nx run PROJECT_NAME:storybook
```

4. Run API e2e:

```sh
npm run test:api:e2e
```

5. Run UI e2e:

```sh
nx e2e PROJECT_NAME --watch
```

6. Generate storybook configuration:

```sh
nx g @nrwl/angular:storybook-configuration PROJECT_NAME
```

<!-- ROADMAP -->

## Roadmap

- [x] Add Shop UI Module
- [x] Unit tests for Shop UI Module
- [x] Storybook stories for Shop UI Module
- [x] e2e happy path for Shop UI Module
- [x] Add Order Registry UI Module
- [ ] Unit tests for Order Registry UI Module
- [ ] Storybook stories Order Registry UI Module
- [ ] e2e happy path for Order Registry UI Module
- [x] Add API
- [x] Create Postman collection for API
- [ ] Unit tests for API
- [ ] e2e tests for API
- [x] Multi-language Support
  - [x] Polish
  - [x] English
- [x] Multi-theme Support
  - [x] Light
  - [x] Dark

<!-- MARKDOWN LINKS & IMAGES -->

[angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-url]: https://github.com/angular
[nx.dev]: https://img.shields.io/badge/nx_workspace-002E52?style=for-the-badge&logo=nx&logoColor=white
[nx-url]: https://nx.dev
[typescript.io]: https://img.shields.io/badge/typescript-3178c6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[nestjs.com]: https://img.shields.io/badge/nest_js-ea2845?style=for-the-badge&logo=nestjs&logoColor=white
[nestjs-url]: https://nestjs.com/
[jestjs.io]: https://img.shields.io/badge/jest-15c213?style=for-the-badge&logo=jest&logoColor=white
[jest-url]: https://jestjs.io
[storybook.js.org]: https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white
[storybook-url]: https://storybook.js.org
[cypress.io]: https://img.shields.io/badge/cypress-04c38e?style=for-the-badge&logo=cypress&logoColor=white
[cypress-url]: https://cypress.io
