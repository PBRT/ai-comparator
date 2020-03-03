import {
  SELECT_AGENT_TO_COMPARE,
  DESELECT_AGENT_TO_COMPARE,
  RESET_AGENT_TO_COMPARE
} from "./compareAgents.types";

export function selectAgentToCompare(id: number) {
  return {
    type: SELECT_AGENT_TO_COMPARE,
    id
  };
}

export function deselectAgentToCompare(id: number) {
  return {
    type: DESELECT_AGENT_TO_COMPARE,
    id
  };
}

export function resetAgentToCompare() {
  return {
    type: RESET_AGENT_TO_COMPARE
  };
}
