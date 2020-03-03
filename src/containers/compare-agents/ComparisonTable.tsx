import React from "react";
import styled from "styled-components";

import { device } from "../../styles/device";
import { Agent } from "../../api/agents.types";
import AgentHeader from "../../components/agent-header/AgentHeader";
import {
  ComparisonResult,
  shardTasksPerCategories,
  computeCategoriesShards,
  buildComparisonResultsForAgent
} from "../../utils/shardTasks";

type StatCellBasicProps = {
  id: string;
  categoryKey: string;
};

type StatCellPropsWithComparison = StatCellBasicProps & {
  values: Map<string, ComparisonResult>;
};

function StatCellWithComparison({
  id,
  categoryKey,
  values
}: StatCellPropsWithComparison) {
  const keys = Array.from(values.keys());
  return (
    <div>
      {keys.map((key, idx) => {
        const val = values.get(key);
        const isLast = idx === keys.length - 1;
        return (
          <StatComp key={`${key}-${id}`} isLast={isLast}>
            <LineDisplay>{key}: </LineDisplay>
            <LineDisplay>{val !== undefined ? val.value : "-"} </LineDisplay>
            {val !== undefined &&
              val.delta !== undefined &&
              val.delta > 0 && (
                <LineDisplay>
                  <DeltaContainer>+{val.delta}%</DeltaContainer>
                </LineDisplay>
              )}
          </StatComp>
        );
      })}
    </div>
  );
}

type StatCellPropsWithoutComparison = StatCellBasicProps & {
  values: Map<string, number> | undefined;
};

function StatCellWithoutComparison({
  id,
  categoryKey,
  values
}: StatCellPropsWithoutComparison) {
  if (values === undefined) {
    return <div>-</div>;
  }
  const keys = Array.from(values.keys());
  return (
    <div>
      {keys.map((key, idx) => {
        const val = values.get(key);
        const isLast = idx === keys.length - 1;
        return (
          <StatComp key={`${key}-${id}`} isLast={isLast}>
            <LineDisplay>{key}: </LineDisplay>
            <LineDisplay>{val !== undefined ? val : "-"} </LineDisplay>
          </StatComp>
        );
      })}
    </div>
  );
}

function EmptyRow() {
  return (
    <tr>
      <td>-</td>
      <td>-</td>
      <td>-</td>
    </tr>
  );
}

type Props = {
  firstAgent: Agent;
  secondAgent: Agent;
};

function ComparisonTable({ firstAgent, secondAgent }: Props) {
  const firstAgentCategories = shardTasksPerCategories(firstAgent.tasks);
  const secondAgentCategories = shardTasksPerCategories(secondAgent.tasks);
  const shardedCategories = computeCategoriesShards(
    { values: firstAgentCategories, key: firstAgent.name },
    { values: secondAgentCategories, key: secondAgent.name }
  );
  const shardedCategoriesKeys = Array.from(shardedCategories.keys());
  return (
    <TableContainer className="bp3-html-table bp3-html-table-striped">
      <thead>
        <tr>
          <th>
            <CategoryHeader>Category</CategoryHeader>
          </th>
          <th>
            <AgentHeader agent={firstAgent} noMarginBottom />
          </th>
          <th>
            <AgentHeader agent={secondAgent} noMarginBottom />
          </th>
        </tr>
      </thead>
      <tbody>
        {shardedCategoriesKeys.map(key => {
          const entry = shardedCategories.get(key);
          if (entry === undefined) {
            return <EmptyRow key={key} />;
          }

          const firstAgentEntry = entry.get(firstAgent.name);
          const secondAgentEntry = entry.get(secondAgent.name);

          if (firstAgentEntry === undefined || secondAgentEntry === undefined) {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>
                  <StatCellWithoutComparison
                    id={firstAgent.name}
                    categoryKey={key}
                    values={firstAgentEntry}
                  />
                </td>
                <td>
                  <StatCellWithoutComparison
                    id={secondAgent.name}
                    categoryKey={key}
                    values={secondAgentEntry}
                  />
                </td>
              </tr>
            );
          }

          const firstAgentCompared = buildComparisonResultsForAgent(
            firstAgentEntry,
            secondAgentEntry
          );
          const secondAgentCompared = buildComparisonResultsForAgent(
            secondAgentEntry,
            firstAgentEntry
          );

          return (
            <tr key={key}>
              <td>{key}</td>
              <td>
                <StatCellWithComparison
                  id={firstAgent.name}
                  categoryKey={key}
                  values={firstAgentCompared}
                />
              </td>
              <td>
                <StatCellWithComparison
                  id={secondAgent.name}
                  categoryKey={key}
                  values={secondAgentCompared}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </TableContainer>
  );
}

export default ComparisonTable;

const TableContainer = styled.table`
  width: 100%;
  table-layout: fixed;
  margin-top: 20px;
`;

const DeltaContainer = styled.span`
  background-color: #15b371;
  border-radius: 4px;
  padding: 2px;
  margin-left: 0px;
  @media ${device.mobileL} {
    margin-left: 8px;
  }
`;

const StatComp =
  styled.div <
  { isLast: boolean } >
  `
  margin-bottom: ${props => (props.isLast ? 0 : 16)}px;
`;

const LineDisplay = styled.span`
  display: block;
  text-align: center;
  @media ${device.mobileL} {
    display: inline;
    text-align: left;
  }
`;

const CategoryHeader = styled.h3`
  margin: 0px;
`;
