const router = require('express').Router();
const taskService = require('./task.service');
const Task = require('./task.model');

router.route('/:boardId/tasks')
  .get(async (req, res) => {
    const {boardId} = req.params;
    const tasks = await taskService.getAll({where: {boardId}});
    if (tasks) {
      res.json(tasks);
    } else {
      res.status(400);
    }
  })
  .post(async (req, res) => {
    const {boardId} = req.params;
    const {
      title,
      order,
      description,
      userId,
      columnId
    } = req.body;
    const task = new Task({
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    });
    const result = await taskService.create(task);
    res.status(201).json(Task.toResponse(result));
  });

router.route('/:boardId/tasks/:taskId')
  .delete(async (req, res)=>{
    const {taskId, boardId} = req.params;
    const result = await taskService.removeById(taskId, {where: {boardId, taskId}});
    if(!result){
      res.status(404)
    } else{
      res.status(204)
    }
    res.end();
  })
  .get(async (req, res) => {
    const {taskId} = req.params;
    const task = await taskService.getById(taskId);
    if(!task){
      res.status(404).end()
    }
    res.json(task)
  })
  .put(async (req, res) => {
    const {taskId, boardId} = req.params;
    const {
      title,
      order,
      description,
      userId,
      columnId} = req.body;
    const result = await  taskService.updateById(taskId, {title, order, description, userId, columnId, boardId});
    if(result){
      res.json(Task.toResponse(result))
    } else{
      res.status(404);
    }
    res.end();
  })

module.exports = router;
