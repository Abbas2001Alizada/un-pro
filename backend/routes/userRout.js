import { Router } from 'express';
import { authenticateUser, getAllUsers, createUser, updateUser,  getUserDetails,  deleteUser, } from '../Controllers/userController.js';
import upload from '../middleware/upload.js';



const router = Router();

// Define routes
router.get('/', getAllUsers);
router.post('/createUser', createUser);
router.delete('/:id',deleteUser);
router.post('/login', authenticateUser);
router.get('/:id', getUserDetails);
router.put('/:id', upload.single("image"), updateUser);
export default router;
