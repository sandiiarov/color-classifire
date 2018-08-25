import React from 'react';
import styled from 'styled-components';

const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  font-size: 40px;
  height: 20%;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Block = ({ title, children }) => (
  <BlockWrapper>
    <Header>{title}</Header>
    <Content>{children}</Content>
  </BlockWrapper>
);

export default Block;
