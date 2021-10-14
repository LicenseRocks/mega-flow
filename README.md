<p align="center">
  <img src="https://license.rocks/wp-content/uploads/2020/08/logo-horizontal.png" width="350">
</p>

## What is MegaFlow? 🚀

MegaFlow is a React component to build workflows based on JSON schemas, powered by React Hook Forms.

As there are multiple workflows to generate in the company, which all of them are custom, also can be mofied, we decided to have a component which will be used across all of our projects, so that it is possible to keep consistency along them.

## Main libraries/technologies used in MegaFlow: 🦾

Below you can find main libraries/technologies which we have used in Rockskit.
All other libraries are used by basing on design needs. Moreover, there is an example (story) which shows how this component works, based on provided schema in Storybook.

##

<div align="center">
  <a href="https://github.com/storybookjs">
    <img src="https://user-images.githubusercontent.com/321738/63501763-88dbf600-c4cc-11e9-96cd-94adadc2fd72.png" alt="Storybook" height="110" width="500"/>
  </a>
  <a href="https://github.com/styled-components">
    <img alt="styled-components" src="https://raw.githubusercontent.com/styled-components/brand/master/styled-components.png" height="150px" />
  </a>
</div>

<div align="center">
  <a href=https://github.com/LicenseRocks/rockskit">
     <img src="https://license.rocks/wp-content/uploads/2020/08/logo-horizontal.png" alt="RocksKit design system" height="120px"/>
  </a>
  <a href="https://github.com/react-hook-form">
  <img src="https://raw.githubusercontent.com/react-hook-form/react-hook-form/master/docs/logo.png" alt="React Hook Form Logo - React hook custom hook for form validation" height="150px"/>
  </a>
</div>

##

- Storybook 👉 Shortly, it is a development playground. We use it as an environment for components development. Also we build and deploy it to Github Pages as a showcase for the components we have.
- Styled-Components 👉 CSS-in-JS library which we use to make style neatly arranged through every component
- Rocskit 👉 Most of the components are built on top of Rockskit, it lets us save significant amount of time, since we do not need to write everything from scratch and also be consistent wth the design in our projects
- React-Hook-Form 👉 Form elements are implemented in a way to be compatible with RHF, as it's one of the best form libraries for React.

## How to use MegaFlow? 🎮

1. Like you do for any other JS lib or package, just run `yarn add @licenserocks/mega-flow`
2. Import the component `<MegaFlow />` in your app and use that like in example below 👇

⚠️ Remember: schema prop is required to be passed. This component working rule is based on parsing JSON file, so that schema has to be like in example `*.json`

```jsx
import React from "react";
import schema from "./sample.json";

export const App = () => {
  return (
    <>
      <MegaFlow schema={schema} />
    </>
  );
};
```

Part of schema example 👇

```json
{
  "steps": [
    {
      "rows": [
        {
          "label": "Title",
          "fields": [
            {
              "name": "title",
              "required": "Name is required",
              "placeholder": "Name of your listed image"
            }
          ]
        }
      ],
      "title": "License Metrics"
    }
  ]
}
```

📝 Good practce: Visit a storybook for this project, and check which props you can pass to imported component 👇
https://licenserocks.github.io/mega-flow

## Props

defaultValues 👉 values rendered as default in provided schema
icons 👉 additional icons which are included in form
schema 👉 json file, the core of a form
onFinish 👉 function executed at the end of a form
onStepSubmit 👉
renderActionButtons 👉 additional buttons passed to the end of a form
theme 👉 theme variables used in styling part
watcher 👉 function which is executed to show declared variables in `inspect mode`
watchList 👉 array of string variables shown in `inspect mode`
wizardProps 👉 props passed directly to `Wizard component`
wrapperProps 👉 props passed directly to `Wrapper component`

## How MegaFlow works ✍️

There is a sample schema file in `src` folder which is named `sample.json` and it is used in the Storybook for testing and developing purposes. You can also refer to it to see how the schema works in different situations.

MegaFlow parses provided schema file and builds form basing on this data. Below is the most fundamental example of parsing JSON 👇

```js
const json = '{"result":true, "count":42}';
const obj = JSON.parse(json);

console.log(obj.count);
// expected output: 42

console.log(obj.result);
// expected output: true
```

Returning to MegaFlow parsing, this process is made by getting firstly, entire `schema` as `parsedchema`, then `steps` data is isolated from it, so that it is possible to render correctly complex forms with multiple steps.

```jsx
// Parse if schema was type of JSON string
const parsedSchema = typeof schema === "string" ? JSON.parse(schema) : schema;
const { steps } = parsedSchema;
```

How MegaFlow displays form based on parsed schema?

Basing on `{steps}` generated from `parsedSchema`, imported `Form` component is included in function `renderForm`,

```jsx
import { Form } from "./components";

const [wizardData, setWizardData] = useState({});
const stepFormData = wizardData[currentStep] || defaultValues;

const stepsArray = steps.map((st) => ({
  title: st.title,
}));

const renderForm = () => (
  <Form
    data={steps[currentStep]}
    key={currentStep}
    stepIndex={currentStep}
    stepFormData={stepFormData}
    defaultValues={defaultValues}
  />
);
```

which is passed further to `Wizard` component as `currentStepContent`. There was also created an array which contains steps titles, so that it can be easily displayed in `Wizard`

```jsx
<Wizard
  currentStepContent={renderForm()}
  currentStepIndex={currentStep}
  renderActionButtons={() => renderActionButtons(getOutputData(wizardData))}
  setCurrentStepIndex={setCurrentStep}
  steps={stepsArray}
  {...wizardProps}
  {...props}
/>
```

Imported `Form` component is build mostly on Rockskit library, it seperates from passed `data` concrete `rows` and renders it in similar way as `renderForm` function.

To collect data from current step, MegaFlow uses `wizardData` variable which is passed to `Wizard` component. This component is imported from `rockskit`.

```jsx
const [currentStep, setCurrentStep] = useState(0);
const isCurrentLastStep = currentStep === steps.length - 1;
const [wizardData, setWizardData] = useState({});
const stepFormData = wizardData[currentStep] || defaultValues;
```

`currentStep` is set to indicate first step, to start proceeding form at the beginning
`stepFormata` is getting values from `wizardData` at concrete step or passed `defaultValues`

```jsx
const getOutputData = (output) =>
  Object.values(output).reduce((obj, acc) => ({ ...obj, ...acc }), {});

const onSubmit = (data) => {
  const currentState = {
    ...wizardData,
    [currentStep]: data,
  };

  // Set step data in global wizard object
  setWizardData(currentState);

  if (!isCurrentLastStep) {
    setCurrentStep((prev) => prev + 1);
  } else {
    onFinish(getOutputData(currentState));
  }
};
```

Submitting is executed by a function `onSubmit`, this function firstly, declares constant variable `currentState` which contains previously passed `wizardData` and `data` collected from current step. Then `wizardData` is updated end form displays next step or executes `onFinish` function.
