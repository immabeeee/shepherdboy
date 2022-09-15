<!-- ABOUT THE PROJECT -->

## About The Project

### Built With

- [![Angular][angular.io]][angular-url]

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
   git clone
   ```
2. Install NPM packages
   ```sh
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
5. Serve UI
   ```sh
   nx run start
   ```
   <!-- ROADMAP -->

## Help commands

1. Run e2e:

```sh
nx e2e shepherdboy-ui-e2e --watch
```

## Roadmap

- [ ] Add Shop UI Module
- [ ] Add Order Registry UI Module
- [ ] Add API
- [ ] Multi-language Support
  - [ ] Polish
  - [ ] English
- [ ] Multi-theme Support
  - [ ] Light
  - [ ] Dark

<!-- MARKDOWN LINKS & IMAGES -->

[angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-url]: https://github.com/angular
[mountain-image-credits-url]: https://all-free-download.com/free-vector/download/mountain_range_background_312045.html#google_vignette
