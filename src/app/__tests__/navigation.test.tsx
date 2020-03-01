import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { click, render, fireEvent } from "@testing-library/react";

import { App, AppWithRouter } from "../App";
import { TEST_IDS } from "../../tests/test-ids";

const {
  COMPONENT_NAVBAR,
  COMPONENT_NAVBAR_HOME_BUTTON,
  COMPONENT_NAVBAR_COMPARISON_BUTTON,
  COMPONENT_NAVBAR_AGENT_BUTTON,
  CONTAINER_HOME_ROOT,
  CONTAINER_COMPARISON_ROOT,
  CONTAINER_AGENT_ROOT,
  CONTAINER_NOT_FOUND_ROOT
} = TEST_IDS;

it("Test the navbar navigation between all the routes", () => {
  const { getByTestId } = render(<AppWithRouter />);

  // Navigation components
  const navbar = getByTestId(COMPONENT_NAVBAR);
  const homeButton = getByTestId(COMPONENT_NAVBAR_HOME_BUTTON);
  const comparisonButton = getByTestId(COMPONENT_NAVBAR_COMPARISON_BUTTON);
  const agentButton = getByTestId(COMPONENT_NAVBAR_AGENT_BUTTON);

  // Check existence of buttons
  expect(navbar).toBeDefined();
  expect(homeButton).toBeDefined();
  expect(comparisonButton).toBeDefined();
  expect(agentButton).toBeDefined();

  // Check existence of containers
  expect(getByTestId(CONTAINER_HOME_ROOT)).toBeDefined();

  // Navigate to comparison
  fireEvent.click(comparisonButton);
  expect(getByTestId(CONTAINER_COMPARISON_ROOT)).toBeDefined();

  // Navigate to agent
  fireEvent.click(agentButton);
  expect(getByTestId(CONTAINER_AGENT_ROOT)).toBeDefined();

  // Navigate back home
  fireEvent.click(homeButton);
  expect(getByTestId(CONTAINER_HOME_ROOT)).toBeDefined();
});

it("Test the 404 page", () => {
  const history = createMemoryHistory();
  history.push("/BAD_ROUTE_NOT_EXISTING");
  const { getByTestId } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByTestId(CONTAINER_NOT_FOUND_ROOT)).toBeDefined();

  // Go back home
  history.push("/");
  expect(getByTestId(CONTAINER_HOME_ROOT)).toBeDefined();
});
