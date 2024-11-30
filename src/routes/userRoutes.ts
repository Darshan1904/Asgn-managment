import express from 'express';
import { authenticate } from '../middlewares/authenticate';
import { uploadAssignment } from '../controllers/userController';

const router = express.Router();

// Upload Route
router.post("/upload", authenticate, uploadAssignment);

export default router;