import { RootState } from "../../../redux/rootReducer";
import { isInvalidID } from "../../../utils/validateID";
import { getAgentApiInstance } from "../../../api/agents.api";

import {
  REQUEST_AGENT,
  RECEIVE_AGENT,
  ERROR_AGENT,
  AgentThunkResult,
  AgentThunkDispatch
} from "./agent.types";

// Retrieve list of agents and handle success/error
export function requestAgent(id: string | undefined): AgentThunkResult {
  return (dispatch: AgentThunkDispatch, getState: () => RootState) => {
    // If ID invalid, avoid the API call and send error
    if (id === undefined || isInvalidID(id)) {
      return Promise.resolve(
        dispatch({
          type: ERROR_AGENT,
          error: new Error("Invalid ID provided")
        })
      );
    }
    // Parse the ID
    const validID = parseInt(id);

    // Cache-lookup
    const { agentsDetails: { agents } } = getState();
    const entry = agents[validID];

    // If the entry has already been loaded, we don't reload it
    if (entry !== undefined) {
      return;
    }

    dispatch({ type: REQUEST_AGENT });
    return getAgentApiInstance()
      .getAgent(validID)
      .then(agent =>
        dispatch({
          type: RECEIVE_AGENT,
          agent: agent !== undefined ? agent : null
        })
      )
      .catch(error => dispatch({ type: ERROR_AGENT, error }));
  };
}
