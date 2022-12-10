const mongoose = require("mongoose");

const bankSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama bank harus di isi"],
  },
  nameBank: {
    type: String,
    required: [true, "Nama rekening bank harus di isi"],
  },
  noRekening: {
    type: Number,
    default: 0,
  },
});

let Bank = mongoose.model("Bank", bankSchema);

module.exports = Bank;
