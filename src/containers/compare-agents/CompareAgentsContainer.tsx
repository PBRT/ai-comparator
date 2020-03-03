import styled from "styled-components";
import React, { ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { IconNames } from "@blueprintjs/icons";
import { Icon, Intent } from "@blueprintjs/core";
import { useDispatch, useSelector } from "react-redux";

import { TEST_IDS } from "../../tests/test-ids";
import { RootState } from "../../redux/rootReducer";
import DualAgentsContainer from "./DualAgentsContainer";
import { requestAgent } from "../agent/state/agent.actions";
import SectionHeader from "../../components/section-header/SectionHeader";

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

function CompareAgentsContainer() {
  const selectCompareAgents = (state: RootState) => state.compareAgents;
  const { agentsSelected } = useSelector(selectCompareAgents);
  const dispatch = useDispatch();

  function refresh() {
    Array.from(agentsSelected.values()).forEach(id =>
      dispatch(requestAgent(`${id}`, false /* invalidate cache */))
    );
  }

  if (agentsSelected.size !== 2) {
    return (
      <CompareAgentContainerWrapper refresh={refresh} hasError={true}>
        <LoadingStateContainer>
          <Icon icon="error" iconSize={20} />
          <h4>Agents to compare not detected</h4>
          <ErrorTextContainer>
            No agents to compare are currently selected . Go back to the home
            page and select two agents.
          </ErrorTextContainer>
        </LoadingStateContainer>
      </CompareAgentContainerWrapper>
    );
  }

  return (
    <CompareAgentContainerWrapper refresh={refresh} hasError={false}>
      <DualAgentsContainer ids={agentsSelected} />
    </CompareAgentContainerWrapper>
  );
}

export default CompareAgentsContainer;

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
