const Nominal = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      let alertMessage = req.flash("alertMessage");
      let alertStatus = req.flash("alertStatus");
      let alert = {
        status: alertStatus,
        message: alertMessage,
      };
      let nominal = await Nominal.find();
      console.log("cek da tanya nominal", nominal);

      res.render("admin/nominal/view_nominal", { nominal, alert });
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      console.log("errrr", error);
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/nominal/create");
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      console.log("errrr", error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { coinName, coinQuantity, price } = req.body;

      let nominal = await Nominal({
        coinName,
        coinQuantity,
        price,
      });
      nominal.save();
      req.flash("alertMessage", `Berhasil menambahkan Nominal`);
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error?.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      console.log("errrr", error);
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req?.params;

      let nominal = await Nominal.findById(id);

      res.render("admin/nominal/edit", { nominal });
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      console.log("errrr", error);
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { coinName, coinQuantity, price } = req.body;
      const { id } = req.params;

      let nominal = await Nominal.findByIdAndUpdate(id, {
        coinName,
        coinQuantity,
        price,
      });

      req.flash("alertMessage", `Berhasil mengubah Nominal`);
      req.flash("alertStatus", "success");

      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      console.log("errrr", error);
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      let nominal = await Nominal.findByIdAndDelete(id);
      req.flash("alertMessage", `Berhasil menghapus Nominal`);
      req.flash("alertStatus", "success");

      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      console.log("errrr", error);
    }
  },
};
