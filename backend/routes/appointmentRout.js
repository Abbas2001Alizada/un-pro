import { Router } from 'express';
import { getAllAppointments, createAppointment, deleteAppointment, checkAppointment, updateAppointments } from '../Controllers/appointmentController.js';

const router = Router();

// Define routes
router.get('/', getAllAppointments);
router.get('/:id', checkAppointment);
router.post('/', createAppointment);
router.post('/update', updateAppointments);
router.delete('/:id', deleteAppointment);

export default router;
