import express from 'express';

import { registerUser, authenticateUser, logOutUser } from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', authenticateUser);

router.post('/logout', logOutUser);

export default router;