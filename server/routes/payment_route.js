import express from "express";
import razorpay from "../config/razorpay.config";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import Order from "../models/order_model";
import Payment from "../models/payment_model";
import Refund from "../models/refund_model";

const router = express.Router();

const webhookSignature = "123456";
const secret_key = "123456";

router.get("/", (req, res) => {
  return res.send("payment router");
});

router.post("/new-order", async (req, res) => {
  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: new Date().getTime().toString(),
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);

    order.order_id = order.id;
    // delete order.id;

    const new_order = new Order(order);
    const response = await new_order.save();

    return res.send({
      message: "Order placed successfully.",
      order: response,
    });
  } catch (err) {
    res.status(400).send("Not able to create order. Please try again!");
  }
});

router.post("/webhook", async (req, res) => {
  const { event, payload } = req.body;

  console.log("WEBHOOKS WORKING: ", event);

  if (event === "order.paid") {
    const order = payload.order.entity;
    await Order.findOneAndUpdate(
      {
        order_id: order.id,
      },
      { status: order.status },
      { new: true }
    );
  }

  if (event === "payment.authorized") {
    const payment = payload.payment.entity;
    payment.payment_id = payment.id;

    const new_payment = new Payment(payment);
    await new_payment.save();
  }

  if (event === "payment.captured") {
    const payment = payload.payment.entity;

    await Payment.findOneAndUpdate(
      {
        payment_id: payment.id,
      },
      payment
    );
  }

  if (event === "payment.failed") {
    const payment = payload.payment.entity;
    payment.payment_id = payment.id;

    const new_payment = new Payment(payment);
    await new_payment.save();

    // setting order ID status as failed
    await Order.findOneAndUpdate(
      {
        order_id: payment.order_id,
      },
      { status: payment.status },
      { new: true }
    );
  }

  if (["refund.created", "refund.processed"].includes(event)) {
    const refund = payload.refund.entity;
    await Refund.findOneAndUpdate(
      {
        refund_id: refund.id,
      },
      refund
    );

    const payment = payload.payment.entity;
    await Payment.findOneAndUpdate(
      {
        payment_id: payment.id,
      },
      payment
    );
  }

  res.json({ status: "success" });
});

router.post("/refund", async (req, res) => {
  try {
    //Verify the payment Id first, then access the Razorpay API.

    const { payment_id } = req.body;
    if (!payment_id) return;

    const refund = await razorpay.payments.refund(payment_id, {
      speed: "optimum",
      amount: 1000,
    });

    refund.refund_id = refund.id;

    const new_refund = new Refund(refund);
    const resp = await new_refund.save();

    res.status(200).json({ message: "Successfully refunded" });
  } catch ({ error }) {
    res
      .status(200)
      .json({ message: error?.description ?? "Error in refunding money" });
  }
});

export default router;
