import React from "react";
import styled from "styled-components";
import {
  AnchorButton,
  Divider,
  IconName,
  Tooltip,
  Position,
  Intent
} from "@blueprintjs/core";

import { device } from "../../styles/device";

type Props = {
  title: string;
  subtitle: string;
  actions: Array<{
    action: () => void;
    label: string;
    icon: IconName;
    tooltipText: string;
    disabled: boolean;
    intent: Intent | undefined;
  }>;
};

function SectionHeader({ title, subtitle, actions }: Props) {
  return (
    <div>
      <FlexContainer>
        <HeaderContainer>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </HeaderContainer>
        <ActionButtonContainer>
          {actions.map(action => (
            <Tooltip
              content={action.tooltipText}
              position={Position.BOTTOM}
              key={action.label}
              disabled={!action.disabled}
            >
              <ActionButton
                onClick={action.action}
                text={action.label}
                icon={action.icon}
                disabled={action.disabled}
                intent={action.intent}
              />
            </Tooltip>
          ))}
        </ActionButtonContainer>
      </FlexContainer>
      <PanelDivider />
    </div>
  );
}

export default SectionHeader;

const FlexContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;

  @media ${device.mobileL} {
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 0px;
  }
`;

const HeaderContainer = styled.div`
  margin-right: 8px;
`;

const Title = styled.h2`
  margin-bottom: 4px;
`;

const Subtitle = styled.h5`
  margin-top: 0px;
`;

const PanelDivider = styled(Divider)`
  margin: 0px 0px 20px;
  border-color: ${p => p.theme.colors.DARK_GRAY5};
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ActionButton = styled(AnchorButton)`
  margin-left: 8px;
`;
