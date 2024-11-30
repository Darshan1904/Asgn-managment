import express from 'express';
import { authenticate } from '../middlewares/authenticate';
import { authorize } from '../middlewares/authorize';
import { viewAssignments, updateAssignmentStatusAccept, updateAssignmentStatusReject } from '../controllers/adminController';

const router = express.Router();

router.get('/assignments', authenticate, authorize(['admin']), viewAssignments);
router.post('/assignments/:id/accept', authenticate, authorize(['admin']), updateAssignmentStatusAccept);
router.post('/assignments/:id/reject', authenticate, authorize(['admin']), updateAssignmentStatusReject);

export default router;
