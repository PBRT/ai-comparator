## AI Comparator

A light-weight proof of concept UI to compare AI agent performances between themselves, as well as a detail page for each of those. The agents are currently simulated from a **config file**. In a short term future, this UI would be connected to real data, helping researchers to understand easily which ones perform the best.

### Local run

To run **locally**, follow those steps:

```
$ git clone https://github.com/PBRT/ai-comparator.git
$ cd ai-comparator
$ yarn start
```

That will install all the needed libraries and start a server. Then open your favourite browser and go to http://localhost:3000/.

### Build and deploy

To run the **production** version, follow those steps:

```
$ yarn build
$ yarn serve
```

Then open your favourite browser and go to http://localhost:9000/ to see the production version of the app. The app is currently hosted with [Netlify](https://www.netlify.com/). You can change the local port in the file `server.ts`.

### Tests

All the tests are running with [Jest](https://jestjs.io/) and can be run in watch mode simply by using the following command:

```
$ yarn test
```

Different kind of tests are covering this product:

* **View testing**:Check if all the views can be rendered and are not broken.
* **Reducers testing**: Ensure non-regression on refactor and data-structures.
* **Component testing**: Only for major components such as list view to check it renders properly.

### Libraries

To build this project, I've used the following:

* **UI Layer**

  * [React Router](https://reacttraining.com/react-router/web/guides/quick-start): Router to handle SPA multiple pages.
  * [Create React App](https://create-react-app.dev/docs/getting-started/): Bootstrap an react application with typescript.

* **Data Layer**

  * [Redux Thunk](https://github.com/reduxjs/redux-thunk): To handle side effects and write async actions creators.
  * [Redux](https://redux.js.org/) and [React Redux](https://react-redux.js.org/): Scalable way to manage state globally. New react hooks (`useReducer` and `useContext`) could have been used, but still miss features needed on large apps (time travelling, easy testing) and can be sub-optimal (to many re-renders).

* **Styles**

  * [Styled Components](https://styled-components.com/): Great to build re-usable components with all the CSS features.
  * [BlueprintJS](https://blueprintjs.com/): UI-kit including plenty of graphics components ideal to represent data.

* **Development tools**

  * [Commit Lint](https://github.com/conventional-changelog/commitlint): To keep a great commit history.
  * [Jest](https://jestjs.io/): To run the data layer and components tests.
  * [React Testing Library](https://testing-library.com/): Helpers to test React components.
  * [Redux Logger](https://github.com/LogRocket/redux-logger): Log actions fired and updated state in the console.
  * [Netlify](https://www.netlify.com/): Hooked to GitHub for easy deploy on master change, used for hosting online.
