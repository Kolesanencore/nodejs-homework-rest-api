import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

import "dotenv/config";

import User from "../../models/user.js";

import { HttpError, sendEmail } from "../../helpers/index.js";

const { BASE_URL } = process.env;

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

  const verificationToken = nanoid();
  const newUser = await User.create({
    ...req.body,
    // avatarURL,
    password: hashPassword,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    name: newUser.name,
    avatarURL: newUser.avatarURL,
    email: newUser.email,
  });
};

export default signup;
