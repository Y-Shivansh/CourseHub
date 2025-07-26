import express from 'express';
import verifyUserToken from "../middlewares/user.middleware.js";
import {registerUser, loginUser, getUserProfile, updateUser, deleteUser, registerOauthUser} from "../controllers/userControllers.js";
import {upload} from '../middlewares/multer.middleware.js';
import User from '../models/User.model.js';


const router = express.Router();
router.post("/signup", registerUser);
router.post("/oauth-login", registerOauthUser)
router.post("/signin", loginUser);
router.get("/me", verifyUserToken, getUserProfile);
router.put("/update", verifyUserToken, upload.single('profile') ,updateUser);
router.delete("/delete", verifyUserToken, deleteUser);


// For Syncing index of Schema.
router.get("/sync-indexes", async (req, res) => {
    await User.syncIndexes();
    res.send("done");
  });

export default router;