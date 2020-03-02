import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Elevation, Intent, Tooltip } from "@blueprintjs/core";

import { Agent } from "../../api/agents.types";
import { RootState } from "../../redux/rootReducer";
import {
  deselectAgentToCompare,
  selectAgentToCompare
} from "../../containers/compare-agents/state/compareAgents.actions";

function AgentCard({ agent }: { agent: Agent }) {
  const history = useHistory();
  const dispatch = useDispatch();
  function handleRedirectToDetailView() {
    history.push(`/agent/${agent.id}`);
  }

  const selectCompareAgents = (state: RootState) => state.compareAgents;
  const { agentsSelected } = useSelector(selectCompareAgents);
  const isAgentSelected = agentsSelected.has(agent.id);
  const buttonLabel = isAgentSelected ? "Deselect" : "Select";
  const isButtonDisabled = agentsSelected.size === 2 && !isAgentSelected;

  function toggleSelection() {
    // Deselect
    if (agentsSelected.has(agent.id)) {
      dispatch(deselectAgentToCompare(agent.id));
    } else {
      dispatch(selectAgentToCompare(agent.id));
    }
  }

  return (
    <CardContainer interactive={true} elevation={Elevation.TWO}>
      <FlexContainer>
        <AgentTitle>{agent.name}</AgentTitle>
        <AgentTitle># {agent.id}</AgentTitle>
      </FlexContainer>
      <p>{agent.description}</p>
      <ButtonsContainer>
        <ButtonComp onClick={handleRedirectToDetailView}>Details</ButtonComp>
        <Tooltip
          disabled={!isButtonDisabled}
          content="You can select only up to two agents at once"
        >
          <ButtonComp
            intent={isAgentSelected ? Intent.WARNING : Intent.PRIMARY}
            onClick={toggleSelection}
            disabled={isButtonDisabled}
          >
            {buttonLabel}
          </ButtonComp>
        </Tooltip>
      </ButtonsContainer>
    </CardContainer>
  );
}

export default AgentCard;

const CardContainer = styled(Card)`
  margin-bottom: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const AgentTitle = styled.h3`
  margin: 0px;
`;

const ButtonsContainer = styled.div`
  margin-top: 20px;
`;

const ButtonComp = styled(Button)`
  margin-right: 8px;
`;
