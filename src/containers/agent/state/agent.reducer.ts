import {
  REQUEST_AGENT,
  RECEIVE_AGENT,
  ERROR_AGENT,
  AgentDetailsState,
  AgentActionType
} from "./agent.types";

const initialState: AgentDetailsState = {};

export default (
  state: AgentDetailsState = initialState,
  action: AgentActionType
): AgentDetailsState => {
  switch (action.type) {
    case REQUEST_AGENT:
      return {
        ...state,
        [action.id]: {
          error: null,
          isLoading: true,
          agent: null
        }
      };
    case RECEIVE_AGENT:
      const { agent } = action;
      return {
        ...state,
        [action.id]: {
          error: null,
          isLoading: false,
          agent
        }
      };
    case ERROR_AGENT:
      return {
        ...state,
        [action.id]: {
          error: action.error,
          isLoading: false,
          agent: null
        }
      };
    default:
      return state;
  }
};
