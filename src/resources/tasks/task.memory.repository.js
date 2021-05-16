const { DB } = require('../../DB');
const {TASKS} = require('../../utils/constants');

const getAll = async (params) => DB.getElements(TASKS, params);

const create = async (data) => DB.createElement(TASKS, data);

const getById = async (id) => DB.getElementById(TASKS, id);

const removeById = async (id) => DB.removeById(TASKS, id);

const updateById = async (id, data) => DB.updateById(TASKS, id, data);

module.exports = { getAll, create, getById, removeById, updateById };
