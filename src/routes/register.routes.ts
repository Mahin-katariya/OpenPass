import {Router} from "express";
import { registerUser } from "../controllers/register.controllers.js";

const router: Router = Router();

router.post('/register', registerUser);

export default router;