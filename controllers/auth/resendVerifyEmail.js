import { HttpError, sendEmail } from "../../helpers/index.js";

import User from "../../models/user.js";

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  // console.log("Searching for user with email:", email);
  const user = await User.findOne({ email });
  // console.log("User found:", user);

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Email already verify");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/verify/${user.verificationToken}" target="_blank">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email resend",
  });
};

export default resendVerifyEmail;
