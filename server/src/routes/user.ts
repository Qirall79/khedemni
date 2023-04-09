import { Router } from "express";
import usersController from "../controllers/usersController";
import passport from "passport";

const router: Router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  usersController.users_all
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  usersController.user_get
);

export default router;
