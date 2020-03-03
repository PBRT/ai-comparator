import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Agent } from "../../api/agents.types";
import ComparisonTable from "./ComparisonTable";
import { RootState } from "../../redux/rootReducer";
import { requestAgent } from "../agent/state/agent.actions";
import { LoadLoading, LoadError } from "../../components/load/LoadComponents";

type DualAgentsProps = {
  firstAgent: Agent | null;
  secondAgent: Agent | null;
};

function DualAgents({ firstAgent, secondAgent }: DualAgentsProps) {
  if (firstAgent === null || secondAgent === null) {
    return (
      <LoadError
        text="Invalid IDs provided"
        description="Something went wrong while loading those agents. You can either refresh the page, try again later, or contact your support team."
      />
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
      <LoadError
        text="Invalid IDs provided"
        description="Something went wrong while loading those agents. You can either refresh the page, try again later, or contact your support team."
      />
    );
  }

  const agents = Array.from(ids.values()).map(id => agentsDetails[id]);
  const hasAgentsLoading = agents.some(agent => agent.isLoading === true);
  const hasAgentsWithError = agents.some(agent => agent.error !== null);

  if (hasAgentsLoading) {
    return <LoadLoading text="Loading comparison data..." />;
  }

  if (hasAgentsWithError) {
    const errorNumber = agents.filter(({ error }) => error !== null).length;
    return (
      <LoadError
        text={`${errorNumber} error${errorNumber > 1 ? "s" : ""} found`}
        description="Something went wrong while loading those agents. You can either refresh the page, try again later, or contact your support team."
      />
    );
  }

  return (
    <DualAgents firstAgent={agents[0].agent} secondAgent={agents[1].agent} />
  );
}

export default DualAgentsContainer;
