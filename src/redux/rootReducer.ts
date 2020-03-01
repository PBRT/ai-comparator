import { combineReducers } from "redux";

// Reducers list
import agentsListReducer from "../containers/home/state/agentsList.reducer";

export const rootReducer = combineReducers({
  agentsList: agentsListReducer
});

export type RootState = ReturnType<typeof rootReducer>;
