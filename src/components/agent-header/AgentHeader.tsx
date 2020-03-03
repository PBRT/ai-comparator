import React from "react";
import styled from "styled-components";

import { Agent } from "../../api/agents.types";

type Props = {
  agent: Agent;
  noMarginBottom?: boolean;
};

function AgentHeader({ agent, noMarginBottom }: Props) {
  return (
    <AgentHeadline noMarginBottom={noMarginBottom === true}>
      <AgentID># {agent.id}</AgentID>
      <AgentTitle>{agent.name}</AgentTitle>
    </AgentHeadline>
  );
}

export default AgentHeader;

const AgentTitle = styled.h3`
  margin: 0px;
  display: inline-block;
`;

const AgentID = styled.h3`
  margin: 0px 8px 0px 0px;
  display: inline-block;
  opacity: 0.5;
`;

const AgentHeadline =
  styled.div <
  { noMarginBottom: boolean } >
  `
  margin-bottom: ${p => (p.noMarginBottom === true ? 0 : 8)}px;
`;
