const mongoose = require("mongoose");

const bankSchema = mongoose.Schema({
  type: {
    type: String,
    required: [true, "Tipe pembayaran harus di isi"],
  },
  status: {
    type: String,
    enum: ["Y", "N"],
    default: "Y",
  },
  banks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bank",
    },
  ],
});

let Payment = mongoose.model("Payment", bankSchema);

module.exports = Payment;
