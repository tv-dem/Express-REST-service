const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const create = (data) => usersRepo.create(data);

const getById = (id) => usersRepo.getById(id);

const removeById = (id) => usersRepo.removeById(id);

const updateById = (id, data) => usersRepo.updateById(id, data);

module.exports = { getAll, create, getById, removeById, updateById };
