import express from 'express';
import { authenticate } from '../middlewares/authenticate';
import { authorize } from '../middlewares/authorize';
import { viewAssignments, updateAssignmentStatusAccept, updateAssignmentStatusReject } from '../controllers/adminController';

const router = express.Router();

// View tagged assignments
router.get('/assignments', authenticate, authorize(['admin']), viewAssignments);

// Update assignment status
router.put('/assignments/:id/accept', authenticate, authorize(['admin']), updateAssignmentStatusAccept);
router.put('/assignments/:id/reject', authenticate, authorize(['admin']), updateAssignmentStatusReject);

export default router;
