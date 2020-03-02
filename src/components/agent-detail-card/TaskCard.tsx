import React, { useState } from "react";
import styled from "styled-components";
import { Card, Collapse, Button } from "@blueprintjs/core";

import { device } from "../../styles/device";
import statistics from "../../utils/statistics";
import { Category, Task } from "../../api/agents.types";

type Props = {
  category: Category;
  tasks: Map<string, Task>;
};

function TaskCard({ category, tasks }: Props) {
  const taskKeys = Array.from(tasks.keys());
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TaskContainer>
      <FlexContainerSpaced>
        <div>
          <TaskCategoryTitle>{category.toUpperCase()}</TaskCategoryTitle>
          {statistics.map((stat, idx) => (
            <StatContainer key={stat.id}>
              <strong>{stat.name}</strong>: {stat.calculus(tasks)}
            </StatContainer>
          ))}
        </div>
        <Button
          icon={isOpen ? "minus" : "plus"}
          text={isOpen ? "Hide" : "Show"}
          onClick={() => setIsOpen(!isOpen)}
        />
      </FlexContainerSpaced>
      {taskKeys.map(taskKey => {
        const task = tasks.get(taskKey);
        if (task === undefined) {
          return null;
        }
        return (
          <Collapse isOpen={isOpen} key={taskKey}>
            <TaskDetail>
              <div>
                <TaskAttribute>{task.name}</TaskAttribute>
                <TaskAttribute>ID: {task.id}</TaskAttribute>
              </div>
              <TaskScore>Score: {task.score}</TaskScore>
            </TaskDetail>
          </Collapse>
        );
      })}
    </TaskContainer>
  );
}

export default TaskCard;

const TaskContainer = styled(Card)`
  width: 100%;
  margin-bottom: 16px;
`;

const TaskCategoryTitle = styled.h4`
  margin: 0px 0px 8px;
`;

const FlexContainerSpaced = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskDetail = styled.div`
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid ${p => p.theme.colors.DARK_GRAY5};
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const TaskAttribute = styled.p`
  font-weight: bold;
  margin: 0px;
  flex: 1;
`;

const TaskScore = styled(TaskAttribute)`
  text-align: right;
`;

const StatContainer = styled.div`
  padding-right: 8px;
  display: block;
  @media ${device.mobileL} {
    display: inline-block;
  }
`;
