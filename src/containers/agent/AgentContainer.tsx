import { IconNames } from "@blueprintjs/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Intent } from "@blueprintjs/core";
import React, { ReactNode, useCallback, useEffect } from "react";

import { TEST_IDS } from "../../tests/test-ids";
import { AgentDetails } from "./state/agent.types";
import { RootState } from "../../redux/rootReducer";
import { requestAgent } from "./state/agent.actions";
import SectionHeader from "../../components/section-header/SectionHeader";
import AgentDetailCard from "../../components/agent-detail-card/AgentDetailCard";
import { LoadLoading, LoadError } from "../../components/load/LoadComponents";

function AgentComp(props: { agentsDetailsObject: AgentDetails }) {
  const { agentsDetailsObject: { isLoading, error, agent } } = props;
  if (isLoading) {
    return <LoadLoading text="Loading agent details..." />;
  }

  if (error != null) {
    return (
      <LoadError
        text={error.message}
        description="Something went wrong while loading this agent. You can either refresh the page, try again later, or contact your support team."
      />
    );
  }

  if (agent === null) {
    return (
      <LoadError
        text="Agent cannot be found"
        description="This agent doesn't seems to exist. Try to select another one from the dashboard."
      />
    );
  }

  return <AgentDetailCard agent={agent} />;
}

function AgentContainerWrapper({
  children,
  refresh
}: {
  children: ReactNode;
  refresh: () => void;
}) {
  const history = useHistory();
  function handleClose() {
    history.push("/");
  }
  return (
    <div data-testid={TEST_IDS.CONTAINER_AGENT_ROOT}>
      <SectionHeader
        title="AI Agent Details"
        subtitle="Scan in details the properties related to this agent"
        actions={[
          {
            action: handleClose,
            label: "Close",
            icon: IconNames.CROSS,
            tooltipText: "Re-fresh to get the latest data.",
            disabled: false,
            intent: Intent.NONE
          },
          {
            action: refresh,
            label: "Refresh",
            icon: IconNames.REFRESH,
            tooltipText: "Re-fresh to get the latest data.",
            disabled: false,
            intent: Intent.NONE
          }
        ]}
      />
      {children}
    </div>
  );
}

function AgentContainer() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const getAgent = useCallback(() => dispatch(requestAgent(id)), [
    dispatch,
    id
  ]);

  function refresh() {
    dispatch(requestAgent(id, false /* invalidate cache */));
  }

  // Load agents on the first render only
  useEffect(
    () => {
      getAgent();
    },
    [getAgent]
  );

  const selectAgentsDetails = (state: RootState) => state.agentsDetails;
  const agentsDetails = useSelector(selectAgentsDetails);

  if (id === undefined || agentsDetails[id] === undefined) {
    return (
      <AgentContainerWrapper refresh={refresh}>
        <LoadError
          text="Invalid ID provided"
          description="Something went wrong while loading this agent. You can either refresh the page, try again later, or contact your support team."
        />
      </AgentContainerWrapper>
    );
  }

  const agentsDetailsObject = agentsDetails[id];

  return (
    <AgentContainerWrapper refresh={refresh}>
      <AgentComp agentsDetailsObject={agentsDetailsObject} />
    </AgentContainerWrapper>
  );
}

export default AgentContainer;
