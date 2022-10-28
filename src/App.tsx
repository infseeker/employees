import * as React from 'react';
import { Reset } from 'styled-reset'
import styled, { createGlobalStyle } from 'styled-components';
import { AppRoutes } from './routes/AppRoutes';

const GlobalStyle = createGlobalStyle`
  * {
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
    box-sizing: border-box;
  }
  html,
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
      Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }
  html {
    margin-left: calc(100vw - 100%);
  }
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <>
        <Reset />
        <GlobalStyle />
        <AppRoutes />
      </>
    );
  }
}
