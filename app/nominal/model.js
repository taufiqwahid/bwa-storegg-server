const mongoose = require("mongoose");

const nominalSchema = mongoose.Schema({
  coinName: {
    type: String,
    required: [true, "Nama koin harus di isi"],
  },
  coinQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
});

let Nominal = mongoose.model("Nominal", nominalSchema);

module.exports = Nominal;
