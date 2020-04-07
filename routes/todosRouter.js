const {Router} = require('express');
const router = Router();
const lowDB = require('lowdb');
const shortId = require('shortid');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('./usersDB.json');
const {todoModel} = require('../models/todoModel');
const expressJwt = require('express-jwt');
const jwtSecret = 'token123';


router.use(expressJwt({secret: jwtSecret}));

// ---- add todos----------
router.post('/', async (req, res) => {
    try {
        const {userName, title} = req.body;
        const todoId = shortId.generate();

        const todo = new todoModel(todoId, title);
        const todoDB = await lowDB(adapter);

        await todoDB.get(`${userName}.todos`)
            .push(todo)
            .write();
        res.status(201).send({message: 'todo added successfully'})

    } catch (e) {
        res.status(500).send(e.message)
    }
});


//------ get all todos-------
router.get('/',  async (req, res) => {
    try {
        const {userName} = req.user;        // from express-jwt middleware
        const todoDB = await lowDB(adapter);
        const userTodos = await todoDB.get(`${userName}.todos`).value();
        res.send(userTodos)
    } catch (e) {
        res.status(500).send(e.message)
    }
});

//----- change completed status todos----
router.put('/',  async (req, res) => {
    try {
        const {todoId, userName, isCompleted} = req.body;
        const todoDB = await lowDB(adapter);

        await todoDB.get(`${userName}.todos`)
            .find({id: todoId})
            .assign({isCompleted})
            .write();

        res.send({message: 'todo status updated successfully'})

    } catch (e) {
        res.status(500).send(e.message)
    }
});


//--------delete todos---------
router.delete('/',  async (req, res) => {
    try {
        const {todoId, userName} = req.body;
        const todoDB = await lowDB(adapter);

        await todoDB.get(`${userName}.todos`)
            .remove({id: todoId})
            .write();

        res.send({message: 'todo deleted successfully'})
    } catch (e) {
        res.status(500).send(e.message)
    }
});


module.exports = {
    todosRouter: router
};