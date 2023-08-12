import bcrypt from "bcryptjs";
import User from "../../models/user.js";
import gravatar from "gravatar";

import { HttpError } from "../../helpers/index.js";

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "404",
  });

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
  });

  res.status(201).json({
    name: newUser.name,
    avatarURL: newUser.avatarURL,
    email: newUser.email,
  });
};

export default signup;
