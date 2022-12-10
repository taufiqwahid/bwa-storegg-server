const mongoose = require("mongoose");
let categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama kategori harus diisikan"],
  },
});

module.exports = mongoose.model("Category", categorySchema);
