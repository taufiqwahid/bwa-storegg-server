const Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
  index: async (req, res) => {
    try {
      let alertMessage = req.flash("alertMessage");
      let alertStatus = req.flash("alertStatus");
      let alert = {
        status: alertStatus,
        message: alertMessage,
      };
      let payment = await Payment.find().populate("banks");
      console.log("cek da tanya payment", payment);

      res.render("admin/payment/view_payment", { payment, alert });
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log("errrr", error);
    }
  },
  viewCreate: async (req, res) => {
    try {
      const bank = await Bank.find();
      res.render("admin/payment/create", { bank });
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log("errrr", error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { type, banks } = req.body;

      let payment = await Payment({
        type,
        banks,
      });
      payment.save();
      req.flash("alertMessage", `Berhasil menambahkan Payment`);
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error?.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log("errrr", error);
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req?.params;
      const bank = await Bank.find();

      let payment = await Payment.findById(id);

      res.render("admin/payment/edit", { payment, bank });
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log("errrr", error);
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { type, status, banks } = req.body;
      const { id } = req.params;

      let payment = await Payment.findByIdAndUpdate(id, {
        type,
        status,
        banks,
      });

      req.flash("alertMessage", `Berhasil mengubah Payment`);
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log("errrr", error);
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      let payment = await Payment.findByIdAndDelete(id);
      req.flash("alertMessage", `Berhasil menghapus Payment`);
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log("errrr", error);
    }
  },
};
