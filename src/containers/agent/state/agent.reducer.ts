import {
  REQUEST_AGENT,
  RECEIVE_AGENT,
  ERROR_AGENT,
  AgentDetailsState,
  AgentActionType
} from "./agent.types";

const initialState: AgentDetailsState = {
  error: null,
  isLoading: false,
  agents: {}
};

export default (
  state: AgentDetailsState = initialState,
  action: AgentActionType
): AgentDetailsState => {
  switch (action.type) {
    case REQUEST_AGENT:
      return {
        error: null,
        isLoading: true,
        agents: state.agents
      };
    case RECEIVE_AGENT:
      const { agent } = action;
      return {
        error: null,
        isLoading: false,
        agents:
          agent != null ? { ...state.agents, [agent.id]: agent } : state.agents
      };
    case ERROR_AGENT:
      return {
        error: action.error,
        isLoading: false,
        agents: state.agents
      };
    default:
      return state;
  }
};
