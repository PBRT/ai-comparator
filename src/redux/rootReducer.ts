import { combineReducers } from "redux";

// Reducers list
import agentReducer from "../containers/agent/state/agent.reducer";
import agentsListReducer from "../containers/home/state/agentsList.reducer";

export const rootReducer = combineReducers({
  agentsList: agentsListReducer,
  agentsDetails: agentReducer
});

export type RootState = ReturnType<typeof rootReducer>;
