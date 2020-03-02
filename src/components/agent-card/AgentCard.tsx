import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Button, Card, Elevation, Intent } from "@blueprintjs/core";

import { Agent } from "../../api/agents.types";

function AgentCard({ agent }: { agent: Agent }) {
  const history = useHistory();
  function handleRedirectToDetailView() {
    history.push(`/agent/${agent.id}`);
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
        <ButtonComp
          intent={Intent.PRIMARY}
          onClick={handleRedirectToDetailView}
        >
          Compare
        </ButtonComp>
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
