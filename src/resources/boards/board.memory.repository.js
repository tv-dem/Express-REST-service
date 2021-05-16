const { TASKS } = require('../../utils/constants');
const { DB } = require('../../DB');
const {BOARDS} = require('../../utils/constants');

const getAll = async () => DB.getElements(BOARDS);

const create = async (data) => DB.createElement(BOARDS, data);

const getById = async (id) => DB.getElementById(BOARDS, id);

const removeById = async (id) => {
  const tasks = DB.getElements(TASKS, {where: {boardId: id}});
  tasks.forEach(task => {
    DB.removeById(TASKS, task.id)
  })
  return DB.removeById(BOARDS, id);
};

const updateById = async (id, data) => DB.updateById(BOARDS, id, data);

module.exports = { getAll, create, getById, removeById, updateById };
