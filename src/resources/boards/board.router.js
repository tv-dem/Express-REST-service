const router = require('express').Router();
const Board = require('./board.model');
const Column = require('../columns/column.model');
const boardService = require('./board.service');

router.route('/')
  .get(async (req, res) => {
    const boards = await boardService.getAll();
    if (boards) {
      res.json(boards);
    } else {
      res.status(400);
    }
  })
  .post(async (req, res) => {
    const { title, columns } = req.body;
    const board = new Board({
      title,
      columns: columns.map(col => new Column(col))
    });
    const result = await boardService.create(board);
    res.status(201).json(Board.toResponse(result));
  });

router.route('/:id')
  .delete(async (req, res) => {
    const { id } = req.params;
    const result = await boardService.removeById(id);
    if(result){
      res.status(204)
    }
    else {
      res.status(404);
    }
    res.end()
  })
  .get(async (req, res) => {
    const { id } = req.params;
    const board = await boardService.getById(id);
    if(board){
      res.json(Board.toResponse(board));
    }
    else {
      res.status(404).end();
    }

  })
  .put(async (req, res) => {
    const { id } = req.params;
    const {title, columns} = req.body;
    const board = await boardService.updateById(id, {title, columns: columns.map(col => new Column(col))});
    if(board){
      res.json(board);
    } else {
      res.status(400);
    }
    res.end()
  })



module.exports = router;
