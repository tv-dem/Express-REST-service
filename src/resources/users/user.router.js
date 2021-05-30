const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
    res.end();
  })
  .post(async (req, res) => {
    try {
      const { name, login, password } = req.body;
      const user = await usersService.create(new User({ name, login, password }));
      if (!user) {
        res.status(400)
      }
      else {
        res.status(201).json(User.toResponse(user));
      }
    } catch (err) {
      res.status(400)
    }
    res.end();
  });


router.route('/:id')
  .delete(async (req, res) => {
    const {id} = req.params;
    const result = await usersService.removeById(id);
    if(result){
      res.status(204)
    }
    else{
      res.status(404)
    }
    res.end();
  })
  .get(async (req, res) => {
    const {id} = req.params;
    const user = await usersService.getById(id);
    if(!user){
      res.status(404)
    }
    else {
      res.json(User.toResponse(user));
    }
    res.end();
  })
  .put(async (req, res) => {
    const { name, login, password } = req.body;
    const {id} = req.params;
    const user = await usersService.updateById(id, { name, login, password });
    res.json(User.toResponse(user));
    res.end()
  })

module.exports = router;
