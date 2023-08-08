import mongoose from "mongoose";
import "dotenv/config";

import app from "./app.js";

const { DB_HOST, PORT } = process.env;

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
