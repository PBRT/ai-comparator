import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Colors, Classes } from "@blueprintjs/core";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// Components
import Navbar from "../components/navbar/Navbar";

// Routes
import ROUTES from "./Routes";
import NotFound from "../containers/not-found/NotFound";

// Theme for styled-components
const theme = {
  colors: Colors
};

function App() {
  return (
    <div className={"App " + Classes.DARK}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar routesConfig={ROUTES} />
          <Layout>
            <Route
              exact
              key={ROUTES.home.path}
              path={ROUTES.home.path}
              component={ROUTES.home.component}
            />
            {ROUTES.routes.map(({ path, component }) => (
              <Route exact key={path} path={path} component={component} />
            ))}
            <Route path="/404" component={NotFound} />
            <Redirect from="*" to="/404" />
          </Layout>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;

const Layout = styled.div`
  color: ${p => p.theme.colors.WHITE};
  padding: 12px;
  height: calc(100vh - 50px);
`;
