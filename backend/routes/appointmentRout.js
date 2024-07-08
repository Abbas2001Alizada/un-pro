import { Router } from 'express';
import { getAllAppointments, deleteAppointment, updateAppointments, searchByFamilyCode, searchBySpecification, getAppointmentReport, } from '../Controllers/appointmentController.js';

const router = Router();

router.get('/', getAllAppointments);
router.post('/update', updateAppointments);
router.post('/searchByFamilyCode', searchByFamilyCode);
router.post('/searchBySpecification', searchBySpecification);
router.get('/report', getAppointmentReport);
router.delete('/:id', deleteAppointment);

export default router;
