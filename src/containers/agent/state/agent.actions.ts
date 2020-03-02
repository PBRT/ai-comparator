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
export function requestAgent(
  id: string | undefined,
  useCache: boolean = true
): AgentThunkResult {
  return (dispatch: AgentThunkDispatch, getState: () => RootState) => {
    // Handled in the view directly
    if (id === undefined) {
      return;
    }

    if (isInvalidID(id)) {
      return Promise.resolve(
        dispatch({
          type: ERROR_AGENT,
          error: new Error("Invalid ID provided"),
          id
        })
      );
    }

    // Cache-lookup
    const { agentsDetails } = getState();
    const entry = agentsDetails[id];

    // If the entry has already been loaded, we don't reload it
    if (
      entry !== undefined &&
      entry.error === null &&
      entry.isLoading === false &&
      useCache === true
    ) {
      return;
    }

    dispatch({ type: REQUEST_AGENT, id });
    return getAgentApiInstance()
      .getAgent(parseInt(id))
      .then(agent =>
        dispatch({
          type: RECEIVE_AGENT,
          agent: agent !== undefined ? agent : null,
          id
        })
      )
      .catch(error => dispatch({ type: ERROR_AGENT, error, id }));
  };
}
