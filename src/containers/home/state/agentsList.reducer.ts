import {
  REQUEST_AGENTS_LIST,
  RECEIVE_AGENTS_LIST,
  ERROR_AGENTS_LIST,
  AgentsListState,
  AgentsListActionType
} from "./agentsList.types";

const initialState: AgentsListState = {
  error: null,
  isLoading: false,
  list: []
};

export default (
  state: AgentsListState = initialState,
  action: AgentsListActionType
): AgentsListState => {
  switch (action.type) {
    case REQUEST_AGENTS_LIST:
      return {
        error: null,
        isLoading: true,
        list: [] // Invalidate cache for every new request
      };
    case RECEIVE_AGENTS_LIST:
      return {
        error: null,
        isLoading: false,
        list: action.results
      };
    case ERROR_AGENTS_LIST:
      return {
        error: action.error,
        isLoading: false,
        list: [] // Invalidate cache if error
      };
    default:
      return state;
  }
};
