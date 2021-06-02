import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import { inject } from 'mobx-react';
import Users from './Users';
import Groups from './Groups';

const panes = [
  {
    menuItem: 'Users',
    render: ({ store }) => (
      <Tab.Pane>
        <Users store={store} />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Groups',
    render: ({ store }) => (
      <Tab.Pane>
        <Groups store={store} />
      </Tab.Pane>
    )
  }
];

@inject('store')
class Home extends Component<*, *> {
  render() {
    const { store } = this.props;

    return (
      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={panes}
        store={store}
      />
    );
  }
}

export default Home;
