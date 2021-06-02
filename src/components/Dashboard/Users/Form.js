import React, { Component } from 'react';
import { Form, Input, Button, Select } from 'semantic-ui-react';
import { observer } from 'mobx-react';

@observer
class GroupForm extends Component<*, *> {
  state = { firstName: '', lastName: '', groupId: -1 };

  setFirstName = event => this.setState({ firstName: event.target.value });

  setLastName = event => this.setState({ lastName: event.target.value });

  createUser = () => {
    const { firstName, lastName, groupId } = this.state;
    const { store } = this.props;
    store.addUser(firstName, lastName, groupId);
    this.setState({ firstName: '', lastName: '', groupId: -1 });
  };

  handleChange = (e, { value }) => this.setState({ groupId: value });

  render() {
    const { firstName, lastName, groupId } = this.state;
    const { store } = this.props;

    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="First name"
            placeholder="First name"
            value={firstName}
            onChange={this.setFirstName}
          />
          <Form.Field
            control={Input}
            label="Last name"
            placeholder="Last name"
            value={lastName}
            onChange={this.setLastName}
          />
        </Form.Group>
        <Form.Field
          control={Select}
          options={store.groupAsOptions}
          label={{ children: 'Group' }}
          placeholder="Group"
          onChange={this.handleChange}
        />
        <Form.Field
          primary
          fluid
          control={Button}
          content="Create User"
          onClick={this.createUser}
          value={groupId}
          disabled={!(firstName && lastName && groupId >= 0)}
        />
      </Form>
    );
  }
}

export default GroupForm;
