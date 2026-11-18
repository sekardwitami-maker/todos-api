const Todo = require('../model/todo.model');

const getAllTodosService = async () => {
    return await Todo.find();
};

const createTodoService = async (data) => {
    const todo = new Todo(data);
    return await todo.save();
};

module.exports = {
    getAllTodosService,
    createTodoService
};