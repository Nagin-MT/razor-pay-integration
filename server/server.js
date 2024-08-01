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
  return res.send(`Hello World`);
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("-----------------------");
  console.log("req: ", req.url);
  next();
});

// imported routes
app.use("/payment", payment);

app.get("/testerror", (req, res) => {
  return res.status(502).send({ status: 200, message: "This is working fine" });
});

app.get("*", async (req, res) => {
  console.log("sdfjksndfksj");
  return res.send({});
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
