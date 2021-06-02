import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { Button, Dropdown, Icon, Accordion } from 'semantic-ui-react';

const renderLabel = label => ({
  color: 'blue',
  content: label.text,
  icon: 'user'
});

@observer
class GroupList extends Component<*, *> {
  state = {
    activeIndex: 0, // eslint-disable-next-line
    options: this.props.store.userAsOptions
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  removeGroup = groupId => {
    const { store } = this.props;
    store.removeGroup(groupId);
  };

  handleAddition = (e, { value }) => {
    this.setState({
      // eslint-disable-next-line
      options: [{ text: value, value }, ...this.state.options]
    });
  };

  // eslint-disable-next-line
  handleChange = (e, { value }) => {
    const { activeIndex } = this.state;
    const { store } = this.props;
    store.setGroupUsers(activeIndex + 1, value);
  };

  loadGroups = () => {
    const { activeIndex, options } = this.state;
    const {
      store: { groups }
    } = this.props;

    return groups.map(group => (
      <Fragment key={group.id}>
        <Accordion.Title
          active={activeIndex === group.id - 1}
          index={group.id - 1}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          {group.name}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === group.id - 1}>
          <Dropdown
            options={options}
            placeholder="Choose Users"
            search
            selection
            fluid
            multiple
            value={group.users}
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
            onClick={() => this.removeGroup(group.id)}
            disabled={group.users.length !== 0}
          />
        </Accordion.Content>
      </Fragment>
    ));
  };

  render() {
    return <Accordion styled>{this.loadGroups()}</Accordion>;
  }
}

export default GroupList;
