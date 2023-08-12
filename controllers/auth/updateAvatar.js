import path from "path";
import fs from "fs/promises";
import jimp from "jimp";
import User from "../../models/user.js";

const avatarPath = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  const image = await jimp.read(oldPath);
  await image.resize(250, 250).write(newPath);
  await fs.unlink(oldPath);
  const avatarURL = path.join("avatars", filename);
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
};

export default updateAvatar;
