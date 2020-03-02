export const SELECT_AGENT_TO_COMPARE = "SELECT_AGENT_TO_COMPARE";
export const DESELECT_AGENT_TO_COMPARE = "DESELECT_AGENT_TO_COMPARE";
export const RESET_AGENT_TO_COMPARE = "RESET_AGENT_TO_COMPARE";

export interface CompareAgentsState {
  agentsSelected: Set<number>;
}

export interface SelectAgentToCompareAction {
  type: typeof SELECT_AGENT_TO_COMPARE;
  id: number;
}

export interface DeselectAgentToCompareAction {
  type: typeof DESELECT_AGENT_TO_COMPARE;
  id: number;
}

export interface ResetAgentToCompareAction {
  type: typeof RESET_AGENT_TO_COMPARE;
}

export type AgentToCompareActionType =
  | SelectAgentToCompareAction
  | DeselectAgentToCompareAction
  | ResetAgentToCompareAction;
