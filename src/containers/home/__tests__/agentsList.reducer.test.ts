import reducer from "../state/agentsList.reducer";
import * as types from "../state/agentsList.types";

// Mock data
import AGENTS from "../../../api/agents.data";

describe("Agents list reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      error: null,
      isLoading: false,
      list: []
    });
  });

  it("should handle REQUEST_AGENTS_LIST", () => {
    expect(
      reducer(undefined, {
        type: types.REQUEST_AGENTS_LIST
      })
    ).toEqual({
      error: null,
      isLoading: true,
      list: []
    });
  });

  it("should handle RECEIVE_AGENTS_LIST", () => {
    const reducerWithData = reducer(undefined, {
      type: types.RECEIVE_AGENTS_LIST,
      results: AGENTS
    });
    const reducerWithNoData = reducer(undefined, {
      type: types.RECEIVE_AGENTS_LIST,
      results: []
    });
    expect(reducerWithData.list.length).toEqual(AGENTS.length);
    expect(reducerWithData.isLoading).toEqual(false);
    expect(reducerWithData.error).toEqual(null);
    expect(reducerWithNoData.list.length).toEqual(0);
  });

  it("should handle ERROR_AGENTS_LIST", () => {
    const error = new Error("Something went wrong");
    const reducerWithData = reducer(undefined, {
      type: types.ERROR_AGENTS_LIST,
      error
    });
    expect(reducerWithData).toEqual({
      error,
      isLoading: false,
      list: []
    });
  });

  it("should handle reset cache", () => {
    const reducerWithData = reducer(undefined, {
      type: types.RECEIVE_AGENTS_LIST,
      results: AGENTS
    });
    const reducerRequest = reducer(reducerWithData, {
      type: types.REQUEST_AGENTS_LIST
    });
    expect(reducerRequest.isLoading).toEqual(true);
    expect(reducerRequest.list.length).toEqual(0);
  });
});
