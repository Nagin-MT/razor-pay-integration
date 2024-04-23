import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URL)
  .then((res) => console.log("Connected to Database"))
  .catch((err) => console.log(err.message));
