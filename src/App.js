import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader';
import styled, { injectGlobal } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import WebFont from 'webfontloader';
import client from './client';
import Block from './components/Block';
import Data from './containers/Data';
import Clean from './containers/Clean';
import Train from './containers/Train';

WebFont.load({
  google: {
    families: ['Fredoka One'],
  },
});

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    margin: 0;
    font-family: 'Fredoka One', cursive;
  }
`;

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 100vh;
`;

const App = () => (
  <ApolloProvider client={client}>
    <AppWrapper>
      <Block title="Data">
        <Data />
      </Block>
      <Block title="Clean">
        <Clean />
      </Block>
      <Block title="Train">
        <Train />
      </Block>
    </AppWrapper>
  </ApolloProvider>
);

export default hot(module)(App);
