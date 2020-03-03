import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Elevation, Tooltip, Checkbox } from "@blueprintjs/core";

import { Agent } from "../../api/agents.types";
import { RootState } from "../../redux/rootReducer";
import {
  deselectAgentToCompare,
  selectAgentToCompare
} from "../../containers/compare-agents/state/compareAgents.actions";

type Props = {
  agent: Agent;
  showActions: boolean;
};
function AgentCard({ agent, showActions }: Props) {
  const history = useHistory();
  const dispatch = useDispatch();
  function handleRedirectToDetailView() {
    history.push(`/agent/${agent.id}`);
  }

  const selectCompareAgents = (state: RootState) => state.compareAgents;
  const { agentsSelected } = useSelector(selectCompareAgents);
  const isAgentSelected = agentsSelected.has(agent.id);
  const isSelectDisabled = agentsSelected.size === 2 && !isAgentSelected;

  function toggleSelection() {
    // Deselect
    if (agentsSelected.has(agent.id)) {
      dispatch(deselectAgentToCompare(agent.id));
    } else {
      dispatch(selectAgentToCompare(agent.id));
    }
  }

  return (
    <CardContainer interactive={false} elevation={Elevation.TWO}>
      <div>
        <AgentHeadline>
          <AgentID># {agent.id}</AgentID>
          <AgentTitle>{agent.name}</AgentTitle>
        </AgentHeadline>
        <p>{agent.description}</p>
        {showActions === true && (
          <ButtonsContainer>
            <ButtonComp
              onClick={handleRedirectToDetailView}
              icon="grouped-bar-chart"
            >
              Info
            </ButtonComp>
          </ButtonsContainer>
        )}
      </div>
      <div>
        <Tooltip
          disabled={!isSelectDisabled}
          content="You can select only up to two agents at once"
        >
          <Checkbox
            large
            checked={isAgentSelected}
            onChange={toggleSelection}
            disabled={isSelectDisabled}
          />
        </Tooltip>
      </div>
    </CardContainer>
  );
}

export default AgentCard;

const CardContainer = styled(Card)`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

const AgentTitle = styled.h3`
  margin: 0px;
  display: inline-block;
`;

const AgentID = styled.h3`
  margin: 0px 8px 0px 0px;
  display: inline-block;
  opacity: 0.5;
`;

const AgentHeadline = styled.div`
  margin-bottom: 8px;
`;

const ButtonsContainer = styled.div`
  margin-top: 20px;
`;

const ButtonComp = styled(Button)`
  margin-right: 8px;
`;
