const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} = require('../controllers/taskController');

// Stats route (must be before /:id route)
router.get('/stats', getTaskStats);

// Main CRUD routes
router
  .route('/')
  .get(getAllTasks) // GET /api/tasks
  .post(createTask); // POST /api/tasks

router
  .route('/:id')
  .get(getTaskById) // GET /api/tasks/:id
  .put(updateTask) // PUT /api/tasks/:id
  .delete(deleteTask); // DELETE /api/tasks/:id

module.exports = router;
