class TodoModel {
    constructor(id, title) {
        this.id = id;
        this.date = new Date().toLocaleString();
        this.title = title;
        this.isCompleted = false
    }
}

module.exports = {
    todoModel: TodoModel
};