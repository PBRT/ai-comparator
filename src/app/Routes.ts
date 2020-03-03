import { FC } from "react";
import { IconName } from "@blueprintjs/icons";
import { RouteComponentProps } from "react-router-dom";

import { TEST_IDS } from "../tests/test-ids";
import HomeContainer from "../containers/home/HomeContainer";
import AgentContainer from "../containers/agent/AgentContainer";
import CompareAgentsContainer from "../containers/compare-agents/CompareAgentsContainer";

// Extra route configuration
export interface RouteConfig {
  label: string;
  path: string;
  icon: IconName;
  testID: string;
  showInNavigation: boolean;
}

// Extended with component for rendering
export interface RouteConfigWithComponent extends RouteConfig {
  component: FC<RouteComponentProps>;
}

// Router-like data structure
// Home route is separated since handled differently both in NavBar and Router
export interface RoutesConfig {
  home: RouteConfigWithComponent;
  routes: Array<RouteConfigWithComponent>;
}

// Static routes - Easy to add new ones
const ROUTES: RoutesConfig = {
  home: {
    label: "AI Comparator",
    path: "/",
    icon: "doughnut-chart",
    component: HomeContainer,
    testID: TEST_IDS.COMPONENT_NAVBAR_HOME_BUTTON,
    showInNavigation: true
  },
  routes: [
    {
      label: "Compare",
      path: "/compare-agents",
      icon: "comparison",
      component: CompareAgentsContainer,
      testID: TEST_IDS.COMPONENT_NAVBAR_COMPARISON_BUTTON,
      showInNavigation: false
    },
    {
      label: "Agent",
      path: "/agent/:id",
      icon: "locate",
      component: AgentContainer,
      testID: TEST_IDS.COMPONENT_NAVBAR_AGENT_BUTTON,
      showInNavigation: false
    }
  ]
};

export default ROUTES;
