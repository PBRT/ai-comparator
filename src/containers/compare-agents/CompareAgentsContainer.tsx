import styled from "styled-components";
import React, { ReactNode, FormEvent, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IconNames } from "@blueprintjs/icons";
import { Intent } from "@blueprintjs/core";
import { useDispatch, useSelector } from "react-redux";

import { device } from "../../styles/device";
import { Agent } from "../../api/agents.types";
import { TEST_IDS } from "../../tests/test-ids";
import { RootState } from "../../redux/rootReducer";
import DualAgentsContainer from "./DualAgentsContainer";
import { requestAgent } from "../agent/state/agent.actions";
import { LoadError, LoadLoading } from "../../components/load/LoadComponents";
import { requestAgentsList } from "../home/state/agentsList.actions";
import SectionHeader from "../../components/section-header/SectionHeader";
import { AgentsListState } from "../home/state/agentsList.types";
import {
  selectAgentToCompare,
  removeAndAddAgentToCompare
} from "../../containers/compare-agents/state/compareAgents.actions";

function CompareAgentContainerWrapper({
  children,
  refresh,
  hasError
}: {
  children: ReactNode;
  refresh: () => void;
  hasError: boolean;
}) {
  const history = useHistory();
  function handleClose() {
    history.push("/");
  }
  return (
    <div data-testid={TEST_IDS.CONTAINER_COMPARISON_ROOT}>
      <SectionHeader
        title="AI Comparator"
        subtitle="Visualize the performances differences between two agents."
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
            tooltipText: "Refresh won't work since an error has been detected",
            disabled: hasError,
            intent: Intent.NONE
          }
        ]}
      />
      {children}
    </div>
  );
}

type AgentSelectorProps = {
  index: number;
  agents: ReadonlyArray<Agent>;
  value: number | undefined;
  disabledValue: number | undefined;
  isRight?: boolean;
};
function AgentSelector({
  index,
  agents,
  value,
  disabledValue,
  isRight
}: AgentSelectorProps) {
  const dispatch = useDispatch();

  function handleOnChange(event: FormEvent<HTMLSelectElement>) {
    const newValue = event.currentTarget.value;
    if (value === undefined) {
      dispatch(selectAgentToCompare(parseInt(newValue)));
    } else {
      dispatch(
        removeAndAddAgentToCompare(
          value,
          parseInt(newValue),
          index === 0 /* Insert first in the set if left side */
        )
      );
    }
  }
  const defaultValue = `Agent ${index + 1}`;
  return (
    <div className="bp3-select" style={{ marginLeft: isRight ? 8 : 0 }}>
      <select value={value} onChange={handleOnChange}>
        <option value={defaultValue} disabled>
          {defaultValue}
        </option>
        {agents.map(({ name, id }) => (
          <option value={id} key={id} disabled={id === disabledValue}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

function CompareAgentsLoader(props: {
  agentsList: AgentsListState;
  ids: Set<number>;
}) {
  const { agentsList: { isLoading, error, list }, ids } = props;
  if (isLoading) {
    return <LoadLoading text="Loading agents list..." />;
  }
  if (error != null) {
    return (
      <LoadError
        text={error.message}
        description="Something went wrong while loading the agents list. You can either refresh the list, try again later, or contact your support team."
      />
    );
  }

  let selectedIDS = Array.from(ids);
  return (
    <div>
      <FlexContainer>
        <AgentSelector
          agents={list}
          index={0}
          value={selectedIDS[0]}
          disabledValue={selectedIDS[1]}
        />
        <AgentSelector
          agents={list}
          index={1}
          value={selectedIDS[1]}
          disabledValue={selectedIDS[0]}
          isRight
        />
      </FlexContainer>
      {ids.size === 2 ? (
        <DualAgentsContainer ids={ids} />
      ) : (
        <LoadError
          text="Agents to compare not detected"
          description="No agents to compare are currently selected. Either select them using the top right selectors or go back to the home page."
        />
      )}
    </div>
  );
}

function CompareAgentsContainer() {
  const selectCompareAgents = (state: RootState) => state.compareAgents;
  const { agentsSelected } = useSelector(selectCompareAgents);
  const dispatch = useDispatch();

  const getAgentsList = useCallback(() => dispatch(requestAgentsList()), [
    dispatch
  ]);
  function refresh() {
    dispatch(requestAgentsList(false /* invalidate cache */));
    Array.from(agentsSelected.values()).forEach(id =>
      dispatch(requestAgent(`${id}`, false /* invalidate cache */))
    );
  }

  // Load agents on the first render only
  useEffect(
    () => {
      getAgentsList();
    },
    [getAgentsList]
  );
  const selectAgentsList = (state: RootState) => state.agentsList;
  const agentsList = useSelector(selectAgentsList);

  return (
    <CompareAgentContainerWrapper refresh={refresh} hasError={false}>
      <CompareAgentsLoader ids={agentsSelected} agentsList={agentsList} />
    </CompareAgentContainerWrapper>
  );
}

export default CompareAgentsContainer;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  @media ${device.mobileL} {
    justify-content: flex-end;
    margin-bottom: 0px;
  }
`;
