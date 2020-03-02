import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Spinner, Icon } from "@blueprintjs/core";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TEST_IDS } from "../../tests/test-ids";
import { AgentDetailsState } from "./state/agent.types";
import { RootState } from "../../redux/rootReducer";
import { requestAgent } from "./state/agent.actions";
import { isInvalidID } from "../../utils/validateID";

function AgentComp(props: {
  agentsDetailsObject: AgentDetailsState;
  id: number;
}) {
  const { agentsDetailsObject: { isLoading, error, agents }, id } = props;
  if (isLoading) {
    return (
      <LoadingStateContainer>
        <Spinner size={30} />
        <h4>Loading agent details</h4>
      </LoadingStateContainer>
    );
  }

  if (error != null) {
    return (
      <LoadingStateContainer>
        <Icon icon="error" iconSize={20} />
        {error.message !== null && <h4>{error.message}</h4>}
        <ErrorTextContainer>
          Something went wrong while loading this agent.<br />You can either
          refresh the page, try again later, or contact your support team.
        </ErrorTextContainer>
      </LoadingStateContainer>
    );
  }

  // The ID has been validated up-front, it's safe to use parseInt
  if (agents[id] === null || agents[id] === undefined) {
    return (
      <LoadingStateContainer>
        <Icon icon="error" iconSize={20} />
        <h4>Agent cannot be found</h4>
        <ErrorTextContainer>
          This agent doesn't seems to exist.<br />Try to select another one from
          the dashboard.
        </ErrorTextContainer>
      </LoadingStateContainer>
    );
  }

  const agent = agents[id];

  return (
    <div>
      <h1>Agent ID: {agent.id}</h1>
      <h3>Agent Name: {agent.name}</h3>
      <h3>Agent description: {agent.description}</h3>
      <h3>Agent Tasks: {agent.tasks.length}</h3>
    </div>
  );
}

function AgentContainer() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const getAgent = useCallback(() => dispatch(requestAgent(id)), [
    dispatch,
    id
  ]);

  // Load agents on the first render only
  useEffect(
    () => {
      getAgent();
    },
    [getAgent]
  );

  const selectAgentsDetails = (state: RootState) => state.agentsDetails;
  const agentsDetailsObject = useSelector(selectAgentsDetails);

  return (
    <div data-testid={TEST_IDS.CONTAINER_AGENT_ROOT}>
      {isInvalidID(id) || id === undefined ? (
        <LoadingStateContainer>
          <Icon icon="error" iconSize={20} />
          <h4>Invalid ID provided</h4>
          <ErrorTextContainer>
            Something went wrong while loading this agent.<br />You can either
            refresh the page, try again later, or contact your support team.
          </ErrorTextContainer>
        </LoadingStateContainer>
      ) : (
        <AgentComp
          agentsDetailsObject={agentsDetailsObject}
          id={parseInt(id)}
        />
      )}
    </div>
  );
}

export default AgentContainer;

const LoadingStateContainer = styled.div`
  width: 100%;
  max-width: 480px;
  margin: auto;
  text-align: center;
  margin-top: 40px;
`;

const ErrorTextContainer = styled.p`
  margin: 0px;
`;
