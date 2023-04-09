import { Router } from "express";
import authController from "../controllers/authController";
import passport from "passport";

const router: Router = Router();

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  authController.current_get
);

router.post("/company/signUp", authController.company_signUp);
router.post("/company/login", authController.company_login);

router.post("/user/signUp", authController.user_signUp);
router.post("/user/login", authController.user_login);

export default router;
