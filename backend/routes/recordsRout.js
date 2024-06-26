import { Router } from 'express';
import { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord, insertRecord } from '../Controllers/recordController.js';
    
const router = Router();

// Define routes
router.get('/', getAllRecords);
router.get('/:id', getRecordById);
router.post('/', createRecord);
router.post('/witness',insertRecord)
router.put('/:id', updateRecord);
router.delete('/:id', deleteRecord);

export default router;
