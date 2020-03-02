import reducer from "../state/agent.reducer";
import * as types from "../state/agent.types";

// Mock data
import AGENTS from "../../../api/agents.data";

describe("Agent reducer", () => {
  it("should return the initial state", () => {
    expect(Object.keys(reducer(undefined, {})).length).toEqual(0);
  });

  it("should handle REQUEST_AGENT", () => {
    const id = AGENTS[0].id.toString();
    expect(
      reducer(undefined, {
        type: types.REQUEST_AGENT,
        id
      })
    ).toEqual({
      [id]: {
        error: null,
        isLoading: true,
        agent: null
      }
    });
  });

  it("should handle RECEIVE_AGENT", () => {
    const FAKE_ID = "1000";
    const ID_1 = AGENTS[0].id.toString();
    const reducerWithData = reducer(undefined, {
      type: types.RECEIVE_AGENT,
      agent: AGENTS[0],
      id: ID_1
    });
    const reducerWithNoData = reducer(undefined, {
      type: types.RECEIVE_AGENT,
      agent: null,
      id: FAKE_ID
    });

    expect(Object.keys(reducerWithData[ID_1].agent).length).toBeGreaterThan(0);
    expect(reducerWithData[ID_1].isLoading).toEqual(false);
    expect(reducerWithData[ID_1].error).toEqual(null);

    expect(reducerWithNoData[FAKE_ID].agent).toBeNull();
    expect(reducerWithNoData[FAKE_ID].isLoading).toEqual(false);
    expect(reducerWithNoData[FAKE_ID].error).toEqual(null);
  });

  it("should handle ERROR_AGENT", () => {
    const errorMessage = "Something went wrong";
    const error = new Error(errorMessage);
    const ID_1 = AGENTS[0].id.toString();
    const reducerWithData = reducer(undefined, {
      type: types.ERROR_AGENT,
      error,
      id: ID_1
    });
    expect(reducerWithData[ID_1].agent).toBeNull();
    expect(reducerWithData[ID_1].isLoading).toEqual(false);
    expect(reducerWithData[ID_1].error.message).toEqual(errorMessage);
  });

  it("should handle RECEIVE_AGENT multiple times and cache it", () => {
    const FAKE_ID = "1000";
    const ID_1 = AGENTS[0].id.toString();
    const ID_2 = AGENTS[1].id.toString();
    const reducerWithData1 = reducer(undefined, {
      type: types.RECEIVE_AGENT,
      agent: AGENTS[0],
      id: ID_1
    });
    const reducerWithData2 = reducer(reducerWithData1, {
      type: types.RECEIVE_AGENT,
      agent: AGENTS[1],
      id: ID_2
    });
    const reducerWithData3 = reducer(reducerWithData2, {
      type: types.RECEIVE_AGENT,
      agent: null,
      id: FAKE_ID
    });

    expect(Object.keys(reducerWithData2[ID_1].agent).length).toBeGreaterThan(0);
    expect(Object.keys(reducerWithData2[ID_2].agent).length).toBeGreaterThan(0);
    expect(Object.keys(reducerWithData3[ID_1].agent).length).toBeGreaterThan(0);
    expect(Object.keys(reducerWithData3[ID_2].agent).length).toBeGreaterThan(0);
    expect(reducerWithData3[FAKE_ID].agent).toBeNull();
  });
});
