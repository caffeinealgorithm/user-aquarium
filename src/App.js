import React, { Fragment } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Header, Icon, Divider } from 'semantic-ui-react';
import { Provider } from 'mobx-react';
import Dashboard from './components/Dashboard';
import Meta from './components/Meta';
import Store from './store';

const store = new Store();

const Content = styled.div`
  margin: 30px 0;
`;

const theme = {
  color: '#ffffff'
};

const GlobalStyle = createGlobalStyle`
  html, body {
    background-color: ${theme.color};
    font-family: 'Roboto', sans-serif;
    padding: 0 15px !important;
  }
`;

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Fragment>
        <Meta />
        <GlobalStyle />

        <Content>
          <Header as="h2" icon textAlign="center">
            <Icon name="id card outline" />
            user-aquarium
            <Header.Subheader>
              {
                "We can't forget that all the group names are constellations and that we're using MobX as a scalable state management instead of using Redux."
              }
            </Header.Subheader>
          </Header>

          <Divider />
          <Dashboard />
        </Content>
      </Fragment>
    </Provider>
  </ThemeProvider>
);

export default App;
