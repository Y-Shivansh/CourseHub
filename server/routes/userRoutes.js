import express from 'express';
import router from "./courseRoutes";
import verifyUserToken from "../middlewares/user.middleware";
import {registerUser, loginUser, getUserProfile, updateUser, deleteUser} from "../controllers/userControllers";


router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyUserToken, getUserProfile);
router.put("/update", verifyUserToken, updateUser);
router.delete("/delete", verifyUserToken, deleteUser);

export default router;