import { ctrlWrapper } from "../../decorators/index.js";
import * as authControllers from "./index.js";

export default {
  signup: ctrlWrapper(authControllers.signup),
  signin: ctrlWrapper(authControllers.signin),
  getCurrent: ctrlWrapper(authControllers.getCurrent),
  signout: ctrlWrapper(authControllers.signout),
};
