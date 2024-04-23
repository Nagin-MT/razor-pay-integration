import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    order_id: { type: String, required: true },
    entity: { type: String, required: true },
    amount: { type: Number, required: true },
    amount_paid: { type: Number, default: 0 },
    amount_due: { type: Number, required: true },
    currency: { type: String, required: true },
    receipt: { type: String, required: true },
    offer_id: { type: String, default: null },
    status: { type: String, required: true },
    attempts: { type: Number, default: 0 },
    notes: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
