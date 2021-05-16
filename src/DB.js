const { USERS, TASKS, BOARDS } = require('./utils/constants');

class DB {
  constructor() {
    this[USERS] = [];
    this[TASKS] = [];
    this[BOARDS] = [];
  }

  getElements(tableName, params) {
    if (!params) {
      return this[tableName];
    }
    return this[tableName].filter(el =>
      Object.entries(params.where).every(([key, value]) =>
        el[key] === value
      )
    );
  }

  createElement(tableName, data) {
    if (this[tableName].find(({ id }) => id === data.id)) {
      return null;
    }
    this[tableName].push(data);
    return data;
  }

  getElementById(tableName, elementId) {
    return this[tableName].find(({ id }) => id === elementId);
  }

  removeById(tableName, elementId) {
    if(this.getElementById(tableName, elementId)){
      this[tableName] = this[tableName].filter(({id}) => id !== elementId);
      return true
    }
    return false;
  }

  updateById(tableName, elementId, data) {
    const index = this[tableName].findIndex(({ id }) => id === elementId);
    if (index < 0) {
      return false;
    }
    this[tableName][index] = { id: elementId, ...data };
    return this[tableName][index];
  }

}

module.exports = {
  DB: new DB()
};
