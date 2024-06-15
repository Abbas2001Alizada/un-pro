import { Router } from 'express';
import {login, getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../Controllers/userController.js';

const router = Router();

// Define routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login',login);

export default router;
