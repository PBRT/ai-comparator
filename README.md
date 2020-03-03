## AI Comparator

A light-weight proof of concept UI to compare AI agent performances between themselves, as well as a detail page for each of those. The agents are currently simulated from a **config file**. In a short term future, this UI would be connected to real data, helping researchers to understand easily which ones perform the best. Available online at [https://jovial-booth-a20fb3.netlify.com/](https://jovial-booth-a20fb3.netlify.com/).

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

Then open your favourite browser and go to http://localhost:9000/ to see the production version of the app. The app is currently hosted with [Netlify](https://www.netlify.com/) on [https://jovial-booth-a20fb3.netlify.com/](https://jovial-booth-a20fb3.netlify.com/). You can change the local port in the file `server.ts`.

### Design choices

I built and designed this app with scalability in mind, more specifically for use cases where the amount of data to fetch grows overtime. Here's the global state described of the app:

* **agentsList**: A list of agents fetched from the API. We can imagine in a short term future that this will be paginated, and will fetch only a subset of the agent object for performances reasons (name, id ...).
* **agentsDetails**: A map of agents, explicitly separated from the **agentsList** since as stated above, this one will take care of fetching all (or almost) fields from the Agent object. It's using a map to cache the previous Agent loaded, helping to save expensive round trips.
* **compareAgents**: A simple set to keep track of which agents are selected for the comparison.

### Tests

All the tests are running with [Jest](https://jestjs.io/) and can be run in watch mode simply by using the following command:

```
$ yarn test
```

Different kind of tests are covering this product:

* **View testing**:Check if all the views can be rendered and are not broken.
* **Reducers testing**: Ensure non-regression on refactor and data-structures.

### Libraries

To build this project, I've used the following:

* **UI Layer**

  * [React Router](https://reacttraining.com/react-router/web/guides/quick-start): Router to handle SPA multiple pages.
  * [Recharts](http://recharts.org/): To render responsive and typed diagrams.
  * [Create React App](https://create-react-app.dev/docs/getting-started/): Bootstrap an react application with typescript.

* **Data Layer**

  * [Redux Thunk](https://github.com/reduxjs/redux-thunk): To handle side effects and write async actions creators.
  * [Redux](https://redux.js.org/) and [React Redux](https://react-redux.js.org/): Scalable way to manage state globally. New react hooks (`useReducer` and `useContext`) could have been used, but still miss features needed on large apps (time travelling, modular testing) and can be sub-optimal (to many re-renders). Redux is boilerplate but easier to scale.

* **Styles**

  * [Styled Components](https://styled-components.com/): Great to build re-usable components with all the CSS features.
  * [BlueprintJS](https://blueprintjs.com/): UI-kit including plenty of graphics components ideal to represent data.

* **Development tools**

  * [Commit Lint](https://github.com/conventional-changelog/commitlint): To keep a great commit history.
  * [Jest](https://jestjs.io/): To run the data layer and components tests.
  * [React Testing Library](https://testing-library.com/): Helpers to test React components.
  * [Redux Logger](https://github.com/LogRocket/redux-logger): Log actions fired and updated state in the console.
  * [Netlify](https://www.netlify.com/): Hooked to GitHub for easy deploy on master change, used for hosting online.

### Next steps

Here's a list of things to improve over time with this project:

* **Caching invalidation**: At the moment, when an object is loaded it's cached. The only way to invalidate it is by reload the page or click on _refresh_ in the UI as a user. A better version would be to invalidate using timestamps or others approaches. That would depend heavily on the requirements (how much the data needs to be fresh...).
* **agentsDetails parallel fetch**: The agentsDetails action API only allow to fetch one user at the time. That's sub-optimal in term of request and actions dispatched. A refactor to support multiple-ids fetch executed in parallel with `Promise.all` would improve that.
* **Test coverage**: There's some basic integrations test to ensure the app is working well, but they're very limited. Adding others flows is crucial to avoid big issues overtime. Same for **component level testing** which needs to be added using snapshots.
