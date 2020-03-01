import React from "react";
import styled from "styled-components";
import { Button } from "@blueprintjs/core";
import { useDispatch, useSelector } from "react-redux";

import { TEST_IDS } from "../../tests/test-ids";
import { RootState } from "../../redux/rootReducer";
import { requestAgentsList } from "./state/agentsList.actions";

function HomeContainer() {
  // Load available agents
  const dispatch = useDispatch();
  function getAgentsList() {
    dispatch(requestAgentsList());
  }

  const selectAgentsList = (state: RootState) => state.agentsList;
  const agentsList = useSelector(selectAgentsList);

  return (
    <RootContainer data-testid={TEST_IDS.CONTAINER_HOME_ROOT}>
      <h1>Agent List: {agentsList.list.length}</h1>
      <Button onClick={getAgentsList} text="Load agent list" />
    </RootContainer>
  );
}

export default HomeContainer;

const RootContainer = styled.div`
  text-align: center;
`;
