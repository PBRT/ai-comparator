import { RootState } from "../../../redux/rootReducer";
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
  return (dispatch: AgentsListThunkDispatch, getState: () => RootState) => {
    const { agentsList: { list, error } } = getState();
    if (error === null && list.length > 0) {
      return;
    }
    dispatch({ type: REQUEST_AGENTS_LIST });
    return getAgentApiInstance()
      .listAgents()
      .then(results => dispatch({ type: RECEIVE_AGENTS_LIST, results }))
      .catch(error => dispatch({ type: ERROR_AGENTS_LIST, error }));
  };
}
