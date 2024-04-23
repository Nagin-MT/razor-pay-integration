const mongoose = require("mongoose");
const { Schema } = mongoose;

const refundSchema = new Schema({
  acquirer_data: { type: Schema.Types.Mixed },
  amount: { type: Number, required: true },
  batch_id: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  currency: { type: String, required: true },
  entity: { type: String, required: true },
  refund_id: { type: String, required: true },
  notes: [{ type: String }],
  payment_id: { type: String, required: true },
  receipt: { type: String, default: null },
  speed_processed: { type: String, default: "normal" },
  speed_requested: { type: String, default: "optimum" },
  status: { type: String, required: true },
});

const Refund = mongoose.model("Refund", refundSchema);

export default Refund;
