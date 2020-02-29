## AI Comparator

A light-weight proof of concept UI to compare AI agent performances between themselves, as well as a detail page for each of those. The agents are currently simulated from a **config file**. In a short term future, this UI would be connected to real data, helping researchers to understand easily which ones perform the best.

### How to run it

To run **locally**, follow those steps:

```
$ git clone https://github.com/PBRT/ai-comparator.git
$ cd ai-comparator
$ yarn start
```

Then open your favourite browser and go to http://localhost:3000/.

To run the **production** version, follow those steps:

```
$ yarn build
$ yarn serve
```

Then open your favourite browser and go to http://localhost:9000/.

### Libraries used

To build this project, I've used the following:

* [Create React App](https://create-react-app.dev/docs/getting-started/): Bootstrap an react application with typescript.
* [React Router](https://reacttraining.com/react-router/web/guides/quick-start): Router to handle SPA multiple pages.
* [Styled Components](https://styled-components.com/): Great to build re-usable components with all the CSS features.
* [BlueprintJS](https://blueprintjs.com/): UI-kit including plenty of graphics components ideal to represent data.
* [Commit Lint](https://github.com/conventional-changelog/commitlint): To keep a great commit history
