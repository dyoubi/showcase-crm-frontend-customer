# Merix Next.js boilerplate

## Usage

Clone this repo and copy all files and directories except .git folder to new project folder

## Coding guidelines

Detailed Merixstudio coding guidelines can be found [here](https://merixstudio.atlassian.net/wiki/spaces/DEV/pages/37847427/JavaScript)

## Tools and technologies used in this project:

- [Next.js](https://nextjs.org/)
- [styled-components](https://styled-components.com/)
- [Yarn](https://yarnpkg.com/lang/en/)

## Getting started

### Installing Node.js

Node.js can be downloaded [here](https://nodejs.org/).

Please be sure you have Node.js and npm (node package manager that comes along with Node) in your OS enviroment path so it can be run from command line interface.

#### Installing Yarn

To manage dependencies please use Yarn that can be downloaded [here](https://yarnpkg.com/lang/en/).

#### Dependencies

To install all required local dependencies mentioned above run this command in the project root (where `package.json` file is located):

```
yarn install
```

This will install all the required modules in the `node_modules` folder. This folder is not versioned and has to be installed manually by everyone working on the project.

### Running

To start development server simply run:

```
yarn dev
```

## Building

To build the application for production usage run:

```
yarn build
```

Then to start the Next.js production server using that build run:

```
yarn start
```

## Folder structure

```
├── .chart/              * this is a a package to be used with Helm to configure Kubernetes
├── .next/               * contains the built project
├── app/
|   ├──common            * contains common components used accross different pages
|   ├──routes            * contains folders grouping containers and components by pages
|   ├──store             * contains the Redux store - configuration, actions, reducers and selectors
|   ├──themes            * contains the styled-components style themes
|   ├──utils             * contains utility functions - helpers, JWT and request configuration
├── docker/              * contains configuration files for Docker
├── pages/               * contains Next.js pages which are React Components associated with a route based on their file name
```

## Docker

### Development usage

To build docker image use command

```
docker-compose build
```

After docker build finishes successfully, run image by command

```
docker-compose up
```

To open your app use [http://localhost:3000](http://localhost:3000) (also works on your local ip)

### Production image testing

To test the production image locally run:

```
docker build -t bitplay-frontend --build-arg CI_COMMIT_SHA=$(git rev-parse HEAD) .
docker run --rm -ti -p 3000:3000 --env-file .env bitplay-frontend
```

## Helm

To encrypt a secret install [kubeseal](https://github.com/bitnami-labs/sealed-secrets#installation) and run:

```
echo -n 'secret-string' | kubeseal --raw --scope cluster-wide
```

Please pay attention to the selected kubernetes context as production use a different one.

## Translations

A precommit hook runs before every commit allowing user to make sure that there are no missing translations in the project.

The `manage-translations.js` script is used to generate a CSV file with translations from the project. This should be run after the `intl:extract`. To use it, run:

```
node manage-translations.js csv
```

The script will throw an error if there are missing translations in the current CSV file. If there are any, it will generate a `translations_DDMMYYYY.csv` file in the root of the project. This file can be sent for tranaslation and added to the sharepoint translations file (Contact Esteban for more details).

After receiving the translated CSV file, copy the file in the project and replace the existing translations.csv (if present) you can run the script again to update the translations in the project. To do this, run:

```
node manage-translations.js json
```

This will generate a `[lang].json` file in the `app/lang/extracted` folder.
This should be run after the `intl:extract` script and before the `intl:compile` script.
