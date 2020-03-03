import styled from "styled-components";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Icon } from "@blueprintjs/core";

import { Agent } from "../../api/agents.types";
import ComparisonTable from "./ComparisonTable";
import { RootState } from "../../redux/rootReducer";
import { requestAgent } from "../agent/state/agent.actions";

type DualAgentsProps = {
  firstAgent: Agent | null;
  secondAgent: Agent | null;
};

function DualAgents({ firstAgent, secondAgent }: DualAgentsProps) {
  if (firstAgent === null || secondAgent === null) {
    return (
      <LoadingStateContainer>
        <Icon icon="error" iconSize={20} />
        <h4>Invalid IDs provided</h4>
        <ErrorTextContainer>
          Something went wrong while loading those agents.<br />You can either
          refresh the page, try again later, or contact your support team.
        </ErrorTextContainer>
      </LoadingStateContainer>
    );
  }
  return <ComparisonTable firstAgent={firstAgent} secondAgent={secondAgent} />;
}

type Props = {
  ids: Set<number>;
};

function DualAgentsContainer({ ids }: Props) {
  const dispatch = useDispatch();
  const getAgents = useCallback(
    () => {
      Array.from(ids.values()).forEach(id => dispatch(requestAgent(`${id}`)));
    },
    [dispatch, ids]
  );

  // Load agents on the first render only
  useEffect(
    () => {
      getAgents();
    },
    [getAgents]
  );

  const selectAgentsDetails = (state: RootState) => state.agentsDetails;
  const agentsDetails = useSelector(selectAgentsDetails);
  const hasAnyAgentsMissing = Array.from(ids.values()).some(
    id => id === undefined || agentsDetails[id] === undefined
  );

  if (hasAnyAgentsMissing) {
    return (
      <LoadingStateContainer>
        <Icon icon="error" iconSize={20} />
        <h4>Invalid IDs provided</h4>
        <ErrorTextContainer>
          Something went wrong while loading those agents.<br />You can either
          refresh the page, try again later, or contact your support team.
        </ErrorTextContainer>
      </LoadingStateContainer>
    );
  }

  const agents = Array.from(ids.values()).map(id => agentsDetails[id]);
  const hasAgentsLoading = agents.some(agent => agent.isLoading === true);
  const hasAgentsWithError = agents.some(agent => agent.error !== null);

  if (hasAgentsLoading) {
    return (
      <LoadingStateContainer>
        <Spinner size={30} />
        <h4>Loading comparison data</h4>
      </LoadingStateContainer>
    );
  }

  if (hasAgentsWithError) {
    return (
      <LoadingStateContainer>
        <Icon icon="error" iconSize={20} />
        {agents.map(
          ({ error }, idx) =>
            error !== null ? (
              <h4 key={`${error.message}-${idx}`}>
                Error {idx}: {error.message}
              </h4>
            ) : null
        )}
        <ErrorTextContainer>
          Something went wrong while loading the agents.<br />You can either
          refresh the page, try again later, or contact your support team.
        </ErrorTextContainer>
      </LoadingStateContainer>
    );
  }

  return (
    <DualAgents firstAgent={agents[0].agent} secondAgent={agents[1].agent} />
  );
}

export default DualAgentsContainer;

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
