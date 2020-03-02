import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { Agent } from "../../../api/agents.types";
import { RootState } from "../../../redux/rootReducer";

export const REQUEST_AGENT = "REQUEST_AGENT";
export const RECEIVE_AGENT = "RECEIVE_AGENT";
export const ERROR_AGENT = "ERROR_AGENT";

export interface AgentDetailsState {
  isLoading: boolean;
  error: Error | null;
  agents: {
    [id: number]: Agent;
  };
}

export interface RequestAgentAction {
  type: typeof REQUEST_AGENT;
}

export interface ReceiveAgentAction {
  type: typeof RECEIVE_AGENT;
  agent: Agent | null;
}

export interface ErrorAgentAction {
  type: typeof ERROR_AGENT;
  error: Error;
}

export type AgentActionType =
  | RequestAgentAction
  | ReceiveAgentAction
  | ErrorAgentAction;

export type AgentThunkResult = ThunkAction<
  Promise<AgentActionType> | undefined,
  RootState,
  undefined,
  AgentActionType
>;

export type AgentThunkDispatch = ThunkDispatch<
  RootState,
  undefined,
  AgentActionType
>;
