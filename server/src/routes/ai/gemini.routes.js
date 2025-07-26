import express from 'express';
import verifyUserToken from '../../middlewares/user.middleware.js';
import { geminiChat } from '../../controllers/aiController.js';

const router = express.Router();
router.post('/chat', verifyUserToken, geminiChat ); 


export default router;