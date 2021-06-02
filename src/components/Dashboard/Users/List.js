import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { Button, Dropdown, Icon, Accordion } from 'semantic-ui-react';

const renderLabel = label => ({
  color: 'blue',
  content: label.text,
  icon: 'group'
});

@observer
class UserList extends Component<*, *> {
  state = {
    activeIndex: 0, // eslint-disable-next-line
    options: this.props.store.groupAsOptions
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  removeUser = userId => {
    const { store } = this.props;
    store.removeUser(userId);
  };

  handleAddition = (e, { value }) => {
    this.setState({
      // eslint-disable-next-line
      options: [{ text: value, value }, ...this.state.options]
    });
  };

  handleChange = (e, { value }) => {
    const { activeIndex } = this.state;
    const { store } = this.props;
    if (value.length !== 0) store.setUserGroups(activeIndex + 1, value);
  };

  loadUsers = () => {
    const { activeIndex, options } = this.state;
    const {
      store: { users }
    } = this.props;

    return users.map(user => (
      <Fragment key={user.id}>
        <Accordion.Title
          active={activeIndex === user.id - 1}
          index={user.id - 1}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          {user.firstName} {user.lastName}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === user.id - 1}>
          <Dropdown
            options={options}
            placeholder="Choose Groups"
            search
            selection
            fluid
            multiple
            value={user.groups}
            onAddItem={this.handleAddition}
            onChange={this.handleChange}
            renderLabel={renderLabel}
          />
          <Button
            style={{ marginTop: '10px' }}
            negative
            content="Remove"
            basic
            fluid
            onClick={() => this.removeUser(user.id)}
          />
        </Accordion.Content>
      </Fragment>
    ));
  };

  render() {
    return <Accordion styled>{this.loadUsers()}</Accordion>;
  }
}

export default UserList;
