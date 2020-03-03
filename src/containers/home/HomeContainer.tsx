import styled from "styled-components";
import { Intent } from "@blueprintjs/core";
import { useHistory } from "react-router-dom";
import { IconNames } from "@blueprintjs/icons";
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TEST_IDS } from "../../tests/test-ids";
import { RootState } from "../../redux/rootReducer";
import { AgentsListState } from "./state/agentsList.types";
import { requestAgentsList } from "./state/agentsList.actions";
import { resetAgentToCompare } from "../compare-agents/state/compareAgents.actions";

import AgentCard from "../../components/agent-card/AgentCard";
import { LoadLoading, LoadError } from "../../components/load/LoadComponents";
import SectionHeader from "../../components/section-header/SectionHeader";

function AgentsListComp(props: { agentsList: AgentsListState }) {
  const { agentsList: { isLoading, error, list } } = props;
  if (isLoading) {
    return <LoadLoading text="Loading list..." />;
  }

  if (error != null) {
    return (
      <LoadError
        text={error.message}
        description="Something went wrong while loading the agents list. You can either refresh the list, try again later, or contact your support team."
      />
    );
  }

  return (
    <>
      {list.map(agent => (
        <div key={agent.id}>
          <AgentCard agent={agent} showActions />
        </div>
      ))}
    </>
  );
}

function HomeContainer() {
  const dispatch = useDispatch();
  const getAgentsList = useCallback(() => dispatch(requestAgentsList()), [
    dispatch
  ]);
  const resetAgent = useCallback(() => dispatch(resetAgentToCompare()), [
    dispatch
  ]);
  const history = useHistory();
  function handleRedirectToCompareView() {
    history.push(`/compare-agents`);
  }

  function refresh() {
    dispatch(requestAgentsList(false /* invalidate cache */));
  }

  // Load agents on the first render only
  useEffect(
    () => {
      getAgentsList();
      resetAgent();
    },
    [getAgentsList, resetAgent]
  );

  const selectAgentsList = (state: RootState) => state.agentsList;
  const agentsList = useSelector(selectAgentsList);
  const selectCompareAgents = (state: RootState) => state.compareAgents;
  const { agentsSelected } = useSelector(selectCompareAgents);
  return (
    <RootContainer data-testid={TEST_IDS.CONTAINER_HOME_ROOT}>
      <SectionHeader
        title="AI Dashboard"
        subtitle="Visualize all the AI Agents, check them individually, or select two for comparison."
        actions={[
          {
            action: refresh,
            label: "Refresh",
            icon: IconNames.REFRESH,
            tooltipText: "Re-fresh to get the latest data.",
            disabled: false,
            intent: Intent.NONE
          },
          {
            action: handleRedirectToCompareView,
            label: "Compare",
            icon: IconNames.COMPARISON,
            tooltipText: "Select two agents to compare them",
            disabled: agentsSelected.size < 2,
            intent: Intent.SUCCESS
          }
        ]}
      />
      <AgentsListComp agentsList={agentsList} />
    </RootContainer>
  );
}

export default HomeContainer;

const RootContainer = styled.div`
  text-align: left;
`;
