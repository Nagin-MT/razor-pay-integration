import express from "express";
import dotenv from "dotenv";
import payment from "./routes/payment_route.js";
import "./config/db.config.js";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors("*"));

// Test Route
app.get("/", (req, res) => {
  return res.send(`Hello World.`);
});

app.use(bodyParser.json());

// imported routes
app.use("/payment", payment);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
