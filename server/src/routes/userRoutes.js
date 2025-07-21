import express from 'express';
import verifyUserToken from "../middlewares/user.middleware.js";
import {registerUser, loginUser, getUserProfile, updateUser, deleteUser} from "../controllers/userControllers.js";
import {upload} from '../middlewares/multer.middleware.js';


const router = express.Router();
router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.get("/me", verifyUserToken, getUserProfile);
router.put("/update", verifyUserToken, upload.single('profile') ,updateUser);
router.delete("/delete", verifyUserToken, deleteUser);

export default router;