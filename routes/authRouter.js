const {check, validationResult} = require("express-validator");
const {Router} = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const lowDB = require('lowdb');
const shortId = require('shortid');
const FileAsync = require('lowdb/adapters/FileAsync');
const router = Router();
const adapter = new FileAsync('./usersDB.json');
const jwtSecret = 'token123';


router.post('/register',
    [
        check('userName', 'Incorrect username').notEmpty(),
        check('password', 'Password Min length 6 characters').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errorValidation = validationResult(req);
            if (!errorValidation.isEmpty()) {
                res.status(422).send({message: errorValidation.array()[0].msg});
                return
            }

            const {userName, password} = req.body;
            const usersDb = await lowDB(adapter);
            const candidate = await usersDb.get(userName).value();
            if (candidate !== undefined) {
                res.status(409).send({message: `User '${userName}' already exist`});
                return
            }

            const hashedPassword = await bcrypt.hash(password, 13);
            const id = shortId.generate();
            await usersDb
                .set(`${userName}.password`, hashedPassword)
                .set(`${userName}.id`, id)
                .set(`${userName}.todos`, [])
                .write();

            res.status(201).send({message: 'User added successfully'});

        } catch (e) {
            res.status(500).send(e.message)
        }

    });


router.post('/login',
    [
        check('userName', 'Incorrect username').notEmpty(),
        check('password', 'Password cannot be empty').notEmpty()
    ],
    async (req, res) => {
        try {
            const errorValidation = validationResult(req);
            if (!errorValidation.isEmpty()) {
                res.status(401).send({message: errorValidation.array()[0].msg});
                return
            }

            const {userName, password} = req.body;
            const usersDb = await lowDB(adapter);
            const user = usersDb.get(`${userName}`).value();
            if (user === undefined) {
                res.status(401).send({message: 'Username and password do not match (UserName)'});
                return
            }

            const userPass = await usersDb.get(`${userName}.password`).value();
            const isMatchPass = await bcrypt.compare(password, userPass);
            if (!isMatchPass) {
                return res.status(401).send({message: 'Username and password do not match (password)'})
            }

            const userId = await usersDb.get(`${userName}.id`).value();
            const token = jwt.sign({userName: userName}, jwtSecret, {expiresIn: '1h'});

            res.send({token, userId, userName, message: `Welcome ${userName}`})

        } catch (e) {
            res.status(500).send({message: e.message, default: 'Something went wrong, try later'})
        }

    });

module.exports = {authRouter: router};