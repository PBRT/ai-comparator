import React from "react";
import styled from "styled-components";
import { Spinner, Icon } from "@blueprintjs/core";

type LoadLoadingProps = {
  text: string;
};

export function LoadLoading({ text }: LoadLoadingProps) {
  return (
    <LoadingStateContainer>
      <Spinner size={30} />
      <h4>{text}</h4>
    </LoadingStateContainer>
  );
}

type LoadErrorProps = {
  text: string;
  description: string;
};

export function LoadError({ text, description }: LoadErrorProps) {
  return (
    <LoadingStateContainer>
      <Icon icon="error" iconSize={20} />
      <h4>{text}</h4>
      <ErrorTextContainer>{description}</ErrorTextContainer>
    </LoadingStateContainer>
  );
}

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
