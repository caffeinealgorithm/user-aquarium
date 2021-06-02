import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react';

@observer
class GroupForm extends Component<*, *> {
  state = { name: '' };

  setName = event => {
    this.setState({ name: event.target.value });
  };

  createGroup = () => {
    const { name } = this.state;
    const { store } = this.props;
    store.addGroup(name);
    this.setState({ name: '' });
  };

  render() {
    const { name } = this.state;

    return (
      <Form>
        <Form.Field
          control={Input}
          label="Name"
          placeholder="Name"
          value={name}
          onChange={this.setName}
        />
        <Form.Field
          primary
          fluid
          control={Button}
          content="Create Group"
          onClick={this.createGroup}
          disabled={!name}
        />
      </Form>
    );
  }
}

export default GroupForm;
