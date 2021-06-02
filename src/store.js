import { observable, action, computed } from 'mobx';

export default class Store {
  @observable lastCreatedUserId = 5;

  @observable lastCreatedGroupId = 3;

  @observable users = [
    { id: 1, firstName: 'John', lastName: 'Lawson', groups: [2] },
    { id: 2, firstName: 'Stacey', lastName: 'Willis', groups: [2, 3] },
    { id: 3, firstName: 'Alyssa', lastName: 'Moore', groups: [1, 3] },
    { id: 4, firstName: 'Shawn', lastName: 'Walters', groups: [1] },
    { id: 5, firstName: 'Jo', lastName: 'Taylor', groups: [2] }
  ];

  @observable groups = [
    { id: 1, name: 'Andromeda', users: [3, 4] },
    { id: 2, name: 'Hydra', users: [1, 2, 5] },
    { id: 3, name: 'Phoenix', users: [2, 3] }
  ];

  @action
  clear() {
    this.users.length = 0;
    this.groups.length = 0;
    this.lastCreatedUserId = 0;
    this.lastCreatedGroupId = 0;
  }

  @action
  addUser(firstName, lastName, groupId) {
    this.users.push({
      id: this.lastCreatedUserId + 1,
      firstName,
      lastName,
      groups: [groupId]
    });

    this.lastCreatedUserId += 1;

    this.groups.forEach(group => {
      if (group.id === groupId) group.users.push(this.lastCreatedUserId);
    });
  }

  @action
  setUserGroups(userId, groupIds) {
    this.users.forEach(user => {
      if (user.id === userId) {
        // eslint-disable-next-line
        user.groups = groupIds;
      }
    });

    groupIds.forEach(groupId => {
      this.addUserToGroup(userId, groupId, groupIds);
    });

    if (groupIds.length === 0) {
      this.groups.forEach(group => {
        const index = group.users.indexOf(userId);
        if (index !== -1) group.users.splice(index, 1);
      });
    }
  }

  @action
  addUserToGroup(userId, groupId, groupIds) {
    this.groups.forEach(group => {
      if (group.id === groupId && !group.users.includes(userId))
        group.users.push(userId);

      if (!groupIds.includes(group.id) && group.users.includes(userId)) {
        const index = group.users.indexOf(userId);
        group.users.splice(index, 1);
      }
    });
  }

  @action
  setGroupUsers(groupId, userIds) {
    this.groups.forEach(group => {
      if (group.id === groupId) {
        // eslint-disable-next-line
        group.users = userIds;
      }
    });

    userIds.forEach(userId => {
      this.addGroupToUser(groupId, userId, userIds);
    });

    if (userIds.length === 0) {
      this.users.forEach(user => {
        const index = user.groups.indexOf(groupId);
        if (index !== -1) user.groups.splice(index, 1);
      });
    }
  }

  @action
  addGroupToUser(groupId, userId, userIds) {
    this.users.forEach(user => {
      if (user.id === userId && !user.groups.includes(groupId))
        user.groups.push(groupId);

      if (!userIds.includes(user.id) && user.groups.includes(groupId)) {
        const index = user.groups.indexOf(groupId);
        user.groups.splice(index, 1);
      }
    });
  }

  @action
  addGroup(name) {
    this.groups.push({
      id: this.lastCreatedGroupId + 1,
      name,
      users: []
    });

    this.lastCreatedGroupId += 1;
  }

  @action
  removeUser(userId) {
    this.removeUserFromGroups(userId);
    this.users.splice(
      this.users.findIndex(user => user.id === userId),
      1
    );
  }

  @action
  removeUserFromGroups(userId) {
    this.groups.forEach(group => {
      const index = group.users.indexOf(userId);
      if (index >= 0) group.users.splice(index, 1);
    });
  }

  getGroups(groupIds) {
    const groups = [];

    groupIds.forEach(groupId => {
      groups.push(this.groupById(groupId));
    });

    return groups;
  }

  @action
  removeGroup(groupId) {
    this.groups.splice(
      this.groups.findIndex(group => group.id === groupId),
      1
    );
  }

  @action
  userById(userId) {
    return this.users.filter(user => user.id === userId);
  }

  @action
  groupById(groupId) {
    return this.groups.filter(group => group.id === groupId)[0];
  }

  @computed
  get userAsOptions() {
    return this.users.map(user => ({
      key: user.id,
      text: `${user.firstName} ${user.lastName}`,
      value: user.id
    }));
  }

  @computed
  get groupAsOptions() {
    return this.groups.map(group => ({
      key: group.id,
      text: group.name,
      value: group.id
    }));
  }
}
