import { combineReducers } from "redux";

// Reducers list
import agentReducer from "../containers/agent/state/agent.reducer";
import agentsListReducer from "../containers/home/state/agentsList.reducer";
import compareAgents from "../containers/compare-agents/state/compareAgents.reducer";

export const rootReducer = combineReducers({
  agentsList: agentsListReducer,
  agentsDetails: agentReducer,
  compareAgents: compareAgents
});

export type RootState = ReturnType<typeof rootReducer>;
