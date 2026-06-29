import {Router} from "express";
import { authorizeClient, login } from "../controllers/auth.controllers.js";
import { getOpenIDConfiguration, getJWKS } from "../controllers/discovery.controllers.js";
const router: Router = Router();


router.get("/.well-known/openid-configuration",getOpenIDConfiguration)
router.get("/jwks.json", getJWKS);
export default router;