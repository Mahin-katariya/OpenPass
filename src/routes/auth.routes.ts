import {Router} from "express";
import { authorizeClient, login, tokenExchange } from "../controllers/auth.controllers.js";

const router: Router = Router();

router.get('/authorize', authorizeClient);
router.post('/login', login);
router.post('/token', tokenExchange);

export default router;