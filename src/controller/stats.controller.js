const Todo = require('../model/todo.model.js');
const { catchAsync } = require('../util/appError.util');

// Endpoint Statistik / Summary untuk Machine-to-Machine
const getTodoStats = catchAsync(async (req, res, next) => {
    const totalTodos = await Todo.countDocuments();
    const completedTodos = await Todo.countDocuments({ status: 'completed' });
    const pendingTodos = await Todo.countDocuments({ status: 'pending' });
    const inProgressTodos = await Todo.countDocuments({ status: 'in-progress' });

    res.status(200).json({
        status: 'success',
        results: {
            totalTodos,
            completedTodos,
            pendingTodos,
            inProgressTodos
        }
    });
});

module.exports = {
    getTodoStats
};