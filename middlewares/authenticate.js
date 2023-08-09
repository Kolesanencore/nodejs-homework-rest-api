import jwt from "jsonwebtoken";

import User from "../models/user.js";

import { HttpError } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  // console.log("Authorization header :", authorization);
  if (!authorization || authorization === "") {
    throw HttpError(401, "No token provided");
  }

  const [bearer, token] = authorization.split(" ");
  // console.log("Token :", token);
  if (bearer !== "Bearer") {
    throw HttpError(401);
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      // console.log("User :", user);
      // console.log("User token:", user.token);
      throw HttpError(401);
    }
    req.user = user;

    next();
  } catch {
    throw HttpError(401);
  }
};

export default authenticate;
