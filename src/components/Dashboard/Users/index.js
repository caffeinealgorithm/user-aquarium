import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import Form from './Form';
import List from './List';

@observer
class Users extends Component<*, *> {
  render() {
    const { store } = this.props;

    return (
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <List store={store} />
          </Grid.Column>

          <Grid.Column>
            <Form store={store} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Users;
