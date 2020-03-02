import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { Button, Divider, Spinner, Icon } from "@blueprintjs/core";
import { useDispatch, useSelector } from "react-redux";

import { device } from "../../styles/device";
import { TEST_IDS } from "../../tests/test-ids";
import { RootState } from "../../redux/rootReducer";
import { AgentsListState } from "./state/agentsList.types";
import { requestAgentsList } from "./state/agentsList.actions";

import AgentCard from "../../components/agent-card/AgentCard";

function AgentsListComp(props: { agentsList: AgentsListState }) {
  const { agentsList: { isLoading, error, list } } = props;
  if (isLoading) {
    return (
      <LoadingStateContainer>
        <Spinner size={30} />
        <h4>Loading list...</h4>
      </LoadingStateContainer>
    );
  }

  if (error != null) {
    return (
      <LoadingStateContainer>
        <Icon icon="error" iconSize={20} />
        <h4>{error.message}</h4>
        <ErrorTextContainer>
          Something went wrong while loading the agents list. You can either
          refresh the list, try again later, or contact your support team.
        </ErrorTextContainer>
      </LoadingStateContainer>
    );
  }

  return (
    <>
      {list.map(agent => (
        <div key={agent.id}>
          <AgentCard agent={agent} />
        </div>
      ))}
    </>
  );
}

function HomeContainer() {
  // Redux hooks
  const dispatch = useDispatch();
  // Memoized- fetch
  const getAgentsList = useCallback(() => dispatch(requestAgentsList()), [
    dispatch
  ]);

  function refresh() {
    dispatch(requestAgentsList(false /* invalidate cache */));
  }

  // Load agents on the first render only
  useEffect(
    () => {
      getAgentsList();
    },
    [getAgentsList]
  );

  const selectAgentsList = (state: RootState) => state.agentsList;
  const agentsList = useSelector(selectAgentsList);

  return (
    <RootContainer data-testid={TEST_IDS.CONTAINER_HOME_ROOT}>
      <FlexContainer>
        <HeaderContainer>
          <Title>AI Dashboard</Title>
          <Subtitle>
            Visualize all the AI Agents, check them individually, or select two
            for comparison.
          </Subtitle>
        </HeaderContainer>
        <div>
          <Button onClick={refresh} text="Refresh" icon="refresh" />
        </div>
      </FlexContainer>
      <PanelDivider />
      <AgentsListComp agentsList={agentsList} />
    </RootContainer>
  );
}

export default HomeContainer;

const RootContainer = styled.div`
  text-align: left;
`;

const FlexContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;

  @media ${device.mobileL} {
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 0px;
  }
`;

const HeaderContainer = styled.div`
  margin-right: 8px;
`;

const Title = styled.h2`
  margin-bottom: 4px;
`;

const Subtitle = styled.h5`
  margin-top: 0px;
`;

const PanelDivider = styled(Divider)`
  margin: 0px 0px 20px;
  border-color: ${p => p.theme.colors.DARK_GRAY5};
`;

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
