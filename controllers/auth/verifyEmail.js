import { HttpError } from "../../helpers/index.js";

import User from "../../models/user.js";

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  // console.log("Searching for user with verificationToken:", verificationToken);
  const user = await User.findOne({ verificationToken });
  // console.log("User verify:", user);
  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    message: "Verify success",
  });
};

export default verifyEmail;
