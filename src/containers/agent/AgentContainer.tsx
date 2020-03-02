import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Spinner, Icon } from "@blueprintjs/core";
import React, { ReactNode, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TEST_IDS } from "../../tests/test-ids";
import { AgentDetails } from "./state/agent.types";
import { RootState } from "../../redux/rootReducer";
import { requestAgent } from "./state/agent.actions";
import SectionHeader from "../../components/section-header/SectionHeader";
import AgentDetailCard from "../../components/agent-detail-card/AgentDetailCard";

function AgentComp(props: { agentsDetailsObject: AgentDetails }) {
  const { agentsDetailsObject: { isLoading, error, agent } } = props;
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

  if (agent === null) {
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

  return <AgentDetailCard agent={agent} />;
}

function AgentContainerWrapper({
  children,
  refresh
}: {
  children: ReactNode;
  refresh: () => void;
}) {
  return (
    <div data-testid={TEST_IDS.CONTAINER_AGENT_ROOT}>
      <SectionHeader
        title="AI Agent Details"
        subtitle="Scan in details the properties related to this agent"
        actions={[
          {
            action: refresh,
            label: "Refresh",
            icon: "refresh",
            tooltipText: "Re-fresh to get the latest data.",
            disabled: false
          }
        ]}
      />
      {children}
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

  function refresh() {
    dispatch(requestAgent(id, false /* invalidate cache */));
  }

  // Load agents on the first render only
  useEffect(
    () => {
      getAgent();
    },
    [getAgent]
  );

  const selectAgentsDetails = (state: RootState) => state.agentsDetails;
  const agentsDetails = useSelector(selectAgentsDetails);

  if (id === undefined || agentsDetails[id] === undefined) {
    return (
      <AgentContainerWrapper refresh={refresh}>
        <LoadingStateContainer>
          <Icon icon="error" iconSize={20} />
          <h4>Invalid ID provided</h4>
          <ErrorTextContainer>
            Something went wrong while loading this agent.<br />You can either
            refresh the page, try again later, or contact your support team.
          </ErrorTextContainer>
        </LoadingStateContainer>
      </AgentContainerWrapper>
    );
  }

  const agentsDetailsObject = agentsDetails[id];

  return (
    <AgentContainerWrapper refresh={refresh}>
      <AgentComp agentsDetailsObject={agentsDetailsObject} />
    </AgentContainerWrapper>
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
