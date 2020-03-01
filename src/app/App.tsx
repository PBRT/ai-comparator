import React from "react";
import { Provider } from "react-redux";
import { Colors, Classes } from "@blueprintjs/core";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import configureStore from "../redux/store";

// Components
import Navbar from "../components/navbar/Navbar";

// Routes
import ROUTES from "./Routes";
import NotFound from "../containers/not-found/NotFound";

// Theme for styled-components
const theme = {
  colors: Colors
};

export function App() {
  return (
    <Provider store={configureStore()}>
      <div className={`App ${Classes.DARK}`}>
        <ThemeProvider theme={theme}>
          <Navbar routesConfig={ROUTES} />
          <Layout>
            <Switch>
              <Route
                exact
                key={ROUTES.home.path}
                path={ROUTES.home.path}
                component={ROUTES.home.component}
              />
              {ROUTES.routes.map(({ path, component }) => (
                <Route exact key={path} path={path} component={component} />
              ))}
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </ThemeProvider>
      </div>
    </Provider>
  );
}

export function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

const Layout = styled.div`
  color: ${p => p.theme.colors.WHITE};
  padding: 12px 24px;
  height: calc(100vh - 50px);
`;
