import env from "dotenv";
import Razorpay from "razorpay";

env.config();

const { RZP_KEY, RZP_SECRET } = process.env;

const razorpay = new Razorpay({
  key_id: RZP_KEY,
  key_secret: RZP_SECRET,
});

export default razorpay;
