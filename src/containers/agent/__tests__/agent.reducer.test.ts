import reducer from "../state/agent.reducer";
import * as types from "../state/agent.types";

// Mock data
import AGENTS from "../../../api/agents.data";

describe("Agent reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      error: null,
      isLoading: false,
      agents: {}
    });
  });

  it("should handle REQUEST_AGENT", () => {
    expect(
      reducer(undefined, {
        type: types.REQUEST_AGENT
      })
    ).toEqual({
      error: null,
      isLoading: true,
      agents: {}
    });
  });

  it("should handle RECEIVE_AGENT", () => {
    const reducerWithData = reducer(undefined, {
      type: types.RECEIVE_AGENT,
      agent: AGENTS[0]
    });
    const reducerWithNoData = reducer(undefined, {
      type: types.RECEIVE_AGENT,
      agent: null
    });

    expect(reducerWithData.agents[AGENTS[0].id]).toBeDefined();
    expect(reducerWithData.isLoading).toEqual(false);
    expect(reducerWithData.error).toEqual(null);
    expect(Object.keys(reducerWithNoData.agents).length).toEqual(0);
  });

  it("should handle ERROR_AGENT", () => {
    const error = new Error("Something went wrong");
    const reducerWithData = reducer(undefined, {
      type: types.ERROR_AGENT,
      error
    });
    expect(reducerWithData).toEqual({
      error,
      isLoading: false,
      agents: {}
    });
  });

  it("should handle RECEIVE_AGENT multiple times and cache it", () => {
    const reducerWithData1 = reducer(undefined, {
      type: types.RECEIVE_AGENT,
      agent: AGENTS[0]
    });
    const reducerWithData2 = reducer(reducerWithData1, {
      type: types.RECEIVE_AGENT,
      agent: AGENTS[1]
    });
    const reducerWithData3 = reducer(reducerWithData2, {
      type: types.RECEIVE_AGENT,
      agent: null
    });

    expect(reducerWithData1.agents[AGENTS[0].id]).toBeDefined();
    expect(reducerWithData2.agents[AGENTS[0].id]).toBeDefined();
    expect(reducerWithData2.agents[AGENTS[1].id]).toBeDefined();
    expect(reducerWithData3.agents[AGENTS[0].id]).toBeDefined();
    expect(reducerWithData3.agents[AGENTS[1].id]).toBeDefined();
  });
});
