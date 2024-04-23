const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema({
  payment_id: { type: String, required: true },
  entity: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, required: true },
  order_id: { type: String, required: true },
  invoice_id: { type: String, default: null },
  international: { type: Boolean, default: false },
  method: { type: String, required: true },
  amount_refunded: { type: Number, default: 0 },
  refund_status: { type: String, default: null },
  captured: { type: Boolean, default: false },
  description: { type: String, default: null },
  card_id: { type: String, default: null },
  bank: { type: String, default: null },
  wallet: { type: String, default: null },
  vpa: { type: String, default: null },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  notes: [{ type: Schema.Types.Mixed }],
  fee: { type: Number, default: null },
  tax: { type: Number, default: null },
  error_code: { type: String, default: null },
  error_description: { type: String, default: null },
  error_source: { type: String, default: null },
  error_step: { type: String, default: null },
  error_reason: { type: String, default: null },
  acquirer_data: { type: Schema.Types.Mixed },
  created_at: { type: Date, default: Date.now },
  reward: { type: Schema.Types.Mixed, default: null },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
