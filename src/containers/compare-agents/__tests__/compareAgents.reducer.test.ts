import reducer from "../state/compareAgents.reducer";
import {
  SELECT_AGENT_TO_COMPARE,
  DESELECT_AGENT_TO_COMPARE,
  RESET_AGENT_TO_COMPARE
} from "../state/compareAgents.types";

describe("Compare agent list reducer", () => {
  it("should return the initial state", () => {
    const reducerVal = reducer(undefined, {});
    expect(reducerVal.agentsSelected.size).toEqual(0);
  });

  it("should add an agent", () => {
    const reducerVal = reducer(undefined, {
      type: SELECT_AGENT_TO_COMPARE,
      id: 124
    });
    expect(reducerVal.agentsSelected.size).toEqual(1);
  });

  it("should remove an agent", () => {
    const reducerVal = reducer(undefined, {
      type: SELECT_AGENT_TO_COMPARE,
      id: 124
    });
    const reducerVal2 = reducer(reducerVal, {
      type: DESELECT_AGENT_TO_COMPARE,
      id: 124
    });
    expect(reducerVal2.agentsSelected.size).toEqual(0);
  });

  it("should reset all the agents", () => {
    const reducerVal = reducer(undefined, {
      type: SELECT_AGENT_TO_COMPARE,
      id: 124
    });
    const reducerVal2 = reducer(reducerVal, {
      type: SELECT_AGENT_TO_COMPARE,
      id: 456
    });
    const reducerVal3 = reducer(reducerVal, {
      type: RESET_AGENT_TO_COMPARE
    });
    expect(reducerVal3.agentsSelected.size).toEqual(0);
  });

  it("should handle remove unexisting values", () => {
    const reducerVal = reducer(undefined, {
      type: SELECT_AGENT_TO_COMPARE,
      id: 124
    });
    const reducerVal2 = reducer(reducerVal, {
      type: DESELECT_AGENT_TO_COMPARE,
      id: 456
    });
    expect(reducerVal2.agentsSelected.size).toEqual(1);
  });
  it("should handle remove values when empty", () => {
    const reducerVal = reducer(undefined, {
      type: RESET_AGENT_TO_COMPARE
    });
    const reducerVal1 = reducer(reducerVal, {
      type: DESELECT_AGENT_TO_COMPARE,
      id: 124
    });

    expect(reducerVal1.agentsSelected.size).toEqual(0);
  });
  it("should handle adding two times the same id", () => {
    const reducerVal = reducer(undefined, {
      type: RESET_AGENT_TO_COMPARE
    });
    const reducerVal1 = reducer(reducerVal, {
      type: SELECT_AGENT_TO_COMPARE,
      id: 124
    });
    const reducerVal2 = reducer(reducerVal1, {
      type: SELECT_AGENT_TO_COMPARE,
      id: 124
    });
    expect(reducerVal2.agentsSelected.size).toEqual(1);
  });
});
