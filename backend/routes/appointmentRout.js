import { Router } from 'express';
import { getAllAppointments, deleteAppointment, updateAppointments, searchByFamilyCode, searchBySpecification, } from '../Controllers/appointmentController.js';

const router = Router();

router.get('/', getAllAppointments);
router.post('/update', updateAppointments);
router.post('/searchByFamilyCode', searchByFamilyCode);
router.post('/searchBySpecification', searchBySpecification);
// router.post('/searchBySpecification', searchBySpecification);
router.delete('/:id', deleteAppointment);

export default router;
