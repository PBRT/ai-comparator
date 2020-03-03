import {
  SELECT_AGENT_TO_COMPARE,
  DESELECT_AGENT_TO_COMPARE,
  RESET_AGENT_TO_COMPARE,
  REMOVE_AND_ADD_AGENT_TO_COMPARE,
  CompareAgentsState,
  AgentToCompareActionType
} from "./compareAgents.types";

const initialState: CompareAgentsState = {
  agentsSelected: new Set()
};

export default (
  state: CompareAgentsState = initialState,
  action: AgentToCompareActionType
): CompareAgentsState => {
  switch (action.type) {
    case SELECT_AGENT_TO_COMPARE:
      return {
        agentsSelected: state.agentsSelected.add(action.id)
      };
    case DESELECT_AGENT_TO_COMPARE:
      const newSet = new Set(state.agentsSelected);
      newSet.delete(action.id);
      return {
        agentsSelected: newSet
      };
    case RESET_AGENT_TO_COMPARE:
      return {
        agentsSelected: new Set()
      };
    case REMOVE_AND_ADD_AGENT_TO_COMPARE:
      const updatedSet = new Set(state.agentsSelected);
      updatedSet.delete(action.idToRemove);
      // Needed to insure the right columns stays on the right
      // Not ideal - Would need a refactoring of the reducer to a more approriate DS
      if (action.insertAtBeginning) {
        return {
          agentsSelected: new Set([
            action.idToAdd,
            ...Array.from(updatedSet.values())
          ])
        };
      }
      return {
        agentsSelected: updatedSet.add(action.idToAdd)
      };
    default:
      return state;
  }
};
