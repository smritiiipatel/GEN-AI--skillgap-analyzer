import express from 'express';
import { registerUser, loginUser , logoutUser , getCurrentUser} from '../controllers/auth.contorller.js';
const authRouter = express.Router();
import { authUser } from '../middleware/auth.middleware.js';
/**
 * api register path - /api/auth/register
 * api login path - /api/auth/login
 */
authRouter.post("/register",registerUser);

authRouter.post("/login", loginUser);

authRouter.get("/logout", logoutUser);

authRouter.get("/getme",authUser,getCurrentUser);//get current user detail


export {authRouter};
