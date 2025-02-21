import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/user.js";

import { HttpError } from "../../helpers/index.js";

const { JWT_SECRET } = process.env;

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "email or password invalid 1");
  }

  if (!user.verify) {
    throw HttpError(401, "email or password invalid 2");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "email or password invalid 3");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  // console.log("Generated token:", token);
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
  });
};

export default signin;
