import { Router } from 'express';
import {  getAllUsers, createUser, updateUser,  getUserDetails,  deleteUser, login, } from '../Controllers/userController.js';
import upload from '../middleware/upload.js';



const router = Router();

// Define routes
router.get('/', getAllUsers);
router.post('/createUser', createUser);
router.delete('/:id',deleteUser);
router.post('/login', login);
router.get('/:id', getUserDetails);

router.put('/:id', upload.single("image"), updateUser);
export default router;


