const express = require('express');
const {authRouter} = require('./routes/authRouter');
const {todosRouter} = require('./routes/todosRouter');

const PORT = 3300;

const app = express();
app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api/todos', todosRouter);

app.listen(PORT, () => {
    console.log(`Server started in ${PORT}`)
});