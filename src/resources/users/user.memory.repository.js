const { TASKS } = require('../../utils/constants');
const { DB } = require('../../DB');
const {USERS} = require('../../utils/constants');

const getAll = async () => DB.getElements(USERS);

const create = async (data) => DB.createElement(USERS, data);

const getById = async (id) => DB.getElementById(USERS, id);

const removeById = async (id) => {
  const tasks = DB.getElements(TASKS, {where: { userId: id }})
  tasks.forEach(task => {
    DB.updateById(TASKS, task.id, {...task, userId: null})
  })
  return DB.removeById(USERS, id);
};

const updateById = async (id, data) => DB.updateById(USERS, id, data);

module.exports = { getAll, create, getById, removeById, updateById };
