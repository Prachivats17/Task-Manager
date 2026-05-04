import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getDashboardStats,
} from '../controllers/taskController.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.get('/dashboard/stats', getDashboardStats);
router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
