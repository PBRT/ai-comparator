import React from "react";
import styled from "styled-components";
import { Button, Divider } from "@blueprintjs/core";

import { device } from "../../styles/device";

type Props = {
  title: string;
  subtitle: string;
  refresh: () => void;
};

function SectionHeader({ title, subtitle, refresh }: Props) {
  return (
    <div>
      <FlexContainer>
        <HeaderContainer>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </HeaderContainer>
        <div>
          <Button onClick={refresh} text="Refresh" icon="refresh" />
        </div>
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
