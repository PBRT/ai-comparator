import { FC } from "react";
import { IconName } from "@blueprintjs/icons";

import HomeContainer from "../containers/home/HomeContainer";
import AgentContainer from "../containers/agent/AgentContainer";
import CompareAgentsContainer from "../containers/compare-agents/CompareAgentsContainer";

// Extra route configuration
export interface RouteConfig {
  label: string;
  path: string;
  icon: IconName;
}

// Extended with component for rendering
export interface RouteConfigWithComponent extends RouteConfig {
  component: FC;
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
    component: HomeContainer
  },
  routes: [
    {
      label: "Compare",
      path: "/compare-agents",
      icon: "comparison",
      component: CompareAgentsContainer
    },
    {
      label: "Agent",
      path: "/agent",
      icon: "locate",
      component: AgentContainer
    }
  ]
};

export default ROUTES;
