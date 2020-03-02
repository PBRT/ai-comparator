import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { RootState } from "../../../redux/rootReducer";
import { Agent } from "../../../api/agents.types";

export const REQUEST_AGENTS_LIST = "REQUEST_AGENTS_LIST";
export const RECEIVE_AGENTS_LIST = "RECEIVE_AGENTS_LIST";
export const ERROR_AGENTS_LIST = "ERROR_AGENTS_LIST";

export interface AgentsListState {
  isLoading: boolean;
  error: Error | null;
  list: ReadonlyArray<Agent>;
}

export interface RequestAgentsListAction {
  type: typeof REQUEST_AGENTS_LIST;
}

export interface ReceiveAgentsListAction {
  type: typeof RECEIVE_AGENTS_LIST;
  results: ReadonlyArray<Agent>;
}

export interface ErrorAgentsListAction {
  type: typeof ERROR_AGENTS_LIST;
  error: Error;
}

export type AgentsListActionType =
  | RequestAgentsListAction
  | ReceiveAgentsListAction
  | ErrorAgentsListAction;

export type AgentsListThunkResult = ThunkAction<
  Promise<AgentsListActionType>,
  RootState,
  undefined,
  AgentsListActionType
>;

export type AgentsListThunkDispatch = ThunkDispatch<
  RootState,
  undefined,
  AgentsListActionType
>;
