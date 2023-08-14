import { ctrlWrapper } from "../../decorators/index.js";
import * as authController from "./index.js";

export default {
  signup: ctrlWrapper(authController.signup),
  verifyEmail: ctrlWrapper(authController.verifyEmail),
  signin: ctrlWrapper(authController.signin),
  getCurrent: ctrlWrapper(authController.getCurrent),
  signout: ctrlWrapper(authController.signout),
  updateAvatar: ctrlWrapper(authController.updateAvatar),
  resendVerifyEmail: ctrlWrapper(authController.resendVerifyEmail),
};
