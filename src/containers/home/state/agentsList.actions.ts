import { getAgentApiInstance } from "../../../api/agents.api";
import {
  REQUEST_AGENTS_LIST,
  RECEIVE_AGENTS_LIST,
  ERROR_AGENTS_LIST,
  AgentsListThunkResult,
  AgentsListThunkDispatch
} from "./agentsList.types";

// Retrieve list of agents and handle success/error
export function requestAgentsList(): AgentsListThunkResult {
  return (dispatch: AgentsListThunkDispatch) => {
    dispatch({ type: REQUEST_AGENTS_LIST });
    return getAgentApiInstance()
      .listAgents()
      .then(results => dispatch({ type: RECEIVE_AGENTS_LIST, results }))
      .catch(error => dispatch({ type: ERROR_AGENTS_LIST, error }));
  };
}
