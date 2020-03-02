import React from "react";
import styled from "styled-components";
import { Card, Elevation, Divider } from "@blueprintjs/core";

import TaskCard from "./TaskCard";
import TaskGraph from "./TaskGraph";
import { Agent } from "../../api/agents.types";
import { device } from "../../styles/device";
import { shardTasksPerCategories } from "../../utils/shardTasks";

type Props = {
  agent: Agent;
};

function AgentDetailCard({ agent }: Props) {
  const shardedTasks = shardTasksPerCategories(agent.tasks);
  const shardedTasksKeys = Array.from(shardedTasks.keys());
  return (
    <CardContainer interactive={false} elevation={Elevation.ONE}>
      <FlexContainerSpaced>
        <Title>{agent.name}</Title>
        <Title># {agent.id}</Title>
      </FlexContainerSpaced>
      <p>{agent.description}</p>
      <PanelDivider />
      <SectionTitle>Tasks per categories</SectionTitle>
      <FlexContainer>
        <TasksContainer>
          {shardedTasksKeys.map(key => {
            const categoryEntry = shardedTasks.get(key);
            if (categoryEntry === undefined) {
              return null;
            }
            return <TaskCard key={key} category={key} tasks={categoryEntry} />;
          })}
        </TasksContainer>
        <TaskGraph shardedTasks={shardedTasks} />
      </FlexContainer>
    </CardContainer>
  );
}

export default AgentDetailCard;

const CardContainer = styled(Card)`
  margin-bottom: 20px;
`;

const FlexContainer = styled.div`
  display: block;
  @media ${device.tablet} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const FlexContainerSpaced = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h3`
  margin: 0px 0px 8px;
`;

const SectionTitle = styled.h4`
  margin: 0px 0px 16px;
`;

const PanelDivider = styled(Divider)`
  margin: 20px 0px;
  border-color: ${p => p.theme.colors.DARK_GRAY5};
`;

const TasksContainer = styled.div`
  width: 100%;
  @media ${device.tablet} {
    width: 50%;
  }
`;
