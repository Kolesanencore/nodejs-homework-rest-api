import express from "express";

import authController from "../../controllers/auth/auth.js";

import usersSchemas from "../../schemas/users-schemas.js";

import { validateBody } from "../../decorators/index.js";

import { authenticate, upload } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(usersSchemas.userSignupSchema),
  authController.signup
);

authRouter.get("/verify/:verificationToken", authController.verifyEmail);

authRouter.post(
  "/verify",
  validateBody(usersSchemas.userEmailSchema),
  authController.resendVerifyEmail
);

authRouter.post(
  "/login",
  validateBody(usersSchemas.userSigninSchema),
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

export default authRouter;
