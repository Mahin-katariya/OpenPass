import {Router} from "express";
import { registerUser, registerClient } from "../controllers/register.controllers.js";

const router: Router = Router();

// User
router.post('/register', registerUser);

// Client
router.post('/client/register', registerClient);

export default router;