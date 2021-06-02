import Store from '../store';

describe('store', () => {
  const store = new Store();

  it('clears users and groups', () => {
    store.clear();
    expect(store.users.length).toBe(0);
    expect(store.groups.length).toBe(0);
    expect(store.lastCreatedUserId).toBe(0);
    expect(store.lastCreatedGroupId).toBe(0);
  });

  describe('group management', () => {
    it('adds two groups', () => {
      store.addGroup('Orion');
      expect(store.groups[0].id).toBe(1);
      expect(store.groups[0].name).toBe('Orion');
      store.addGroup('Lynx');
      expect(store.groups[1].id).toBe(2);
      expect(store.groups[1].name).toBe('Lynx');
      store.addGroup('Corvus');
      expect(store.groups[2].id).toBe(3);
      expect(store.groups[2].name).toBe('Corvus');
      expect(store.groups.length).toBe(3);
      expect(store.lastCreatedGroupId).toBe(3);
    });

    it('removes a group', () => {
      store.removeGroup(3);
      expect(store.groups.length).toBe(2);
    });
  });

  describe('user management', () => {
    it('adds an user', () => {
      store.addUser('Jared', 'Cook', 1);
      expect(store.users.length).toBe(1);
      expect(store.users[0].id).toBe(1);
      expect(store.users[0].firstName).toBe('Jared');
      expect(store.users[0].lastName).toBe('Cook');
      expect(store.users[0].groups[0]).toBe(1);
      expect(store.lastCreatedUserId).toBe(1);
    });

    it('adds a group to an existing user', () => {
      store.setUserGroups(1, [1, 2]);
      expect(store.users[0].groups[0]).toBe(1);
      expect(store.users[0].groups[1]).toBe(2);
      expect(store.users[0].groups.length).toBe(2);
      expect(store.groups[0].users[0]).toBe(1);
      expect(store.groups[1].users[0]).toBe(1);
    });

    it('removes an user', () => {
      store.removeUser(1);
      expect(store.users.length).toBe(0);
    });
  });
});
