const boardsRepo = require('./task.memory.repository');

const getAll = (params) => boardsRepo.getAll(params);

const create = (data) => boardsRepo.create(data);

const getById = (id) => boardsRepo.getById(id);

const removeById = (id) => boardsRepo.removeById(id);

const updateById = (id, data) => boardsRepo.updateById(id, data);

module.exports = { getAll, create, getById, removeById, updateById };
