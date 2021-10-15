## How to go through process of builiding and packaging MegaFlow? 🧑🏻‍💻

We use Rollup for this process. It is configured in a way to use Babel to transpile the code and export the package in two formats: ESModules and CommonJS.

Now imagine we want to update a code in one of the components:

1. Update the component code and make sure everything is working, at least in Storybook. If needed, update the code of component story in `stories.js` file.
2. Begin the building process by running `yarn build` and make sure, that build phase passes successfully and we have updated files in `dist` directory.
3. Update the version of package either manually or using `npm version` (better to do it manually).
4. Make sure you have an access to @licenserocks packages using your npm account, then run `npm login` to complete authentication process.
5. Now run `npm publish`. Keep in mind that you should have configured your npm CLI before running this command. Then use `npm login` to login into your account. For more information about how to login to NPM, visit this link: https://docs.npmjs.com/logging-in-to-an-npm-enterprise-registry-from-the-command-line .
6. Commit your changes and push to Github repository.

That's all!🚀

## Running Locally 🏡

To run Rockskit with full view through storybook on localhost, follow steps below 👇

1. Clone repo to your machine, by running `git clone <remote url>`
2. Install dependencies by running `yarn`
3. Run on your local by `yarn start`

You can start modifying MegaFlow now 😉

## Configuration ⚙️

If it is super important to change some configurations for Babel or Rollup, it can be done carefully by editing `rollup.config.js` and `babel.config.js` files.
