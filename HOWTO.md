## What is MegaFlow?

MegaFlow is a React component to build workflows based on JSON schemas powered by React Hook Forms.

You pass a specific JSON to this component and it renders a multiple step form and delivers the form output at the end.

Main libraries/technologies used in MegaFlow:

- Storybook: Development playground.
- Styled Components: CSS-in-JS library we use
- RocksKit: license.rocks GmbH design system components for React.js
- React Hook Form

## How to use MegaFlow?

Like you do for any other JS lib or package, just run `yarn add @licenserocks/mega-flow`

## What is the process of builiding and packaging of MegaFlow?

We use Rollup for this process. It is configured in a way to use Babel to transpile the code and export the package in two formats: ESModules and CommonJS.

Now imagine we want to update a code in one of the components:

1. Update the component code and make sure everything is working at least in Storybook. If needed, update the code of component story in `stories.js` file.
2. Run `yarn build` and make sure build phase passes successfully and we have updated files in `dist` directory.
3. Update the version of package either manually or using `npm version` (better to do it manually).
4. Now run `npm publish`. Keep in mind that you should have configured you npm CLI before running this command. For that, you should login to npm and make sure you have access to @licenserocks packages using your account, and then use `npm login` to login into your account. For more information about how to login to NPM, visit this link: https://docs.npmjs.com/logging-in-to-an-npm-enterprise-registry-from-the-command-line .
5. Commit your changes and push to Github repository.

That's all!

## Schema File

There is a sample schema file in `src` folder which is named `sample.json` and it is used in the Storybook for testing and developing purposes. You can also refer to it to see how the schema works in different situations.
