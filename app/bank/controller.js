const Bank = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      let alertMessage = req.flash("alertMessage");
      let alertStatus = req.flash("alertStatus");
      let alert = {
        status: alertStatus,
        message: alertMessage,
      };
      let bank = await Bank.find();
      console.log("cek da tanya bank", bank);

      res.render("admin/bank/view_bank", { bank, alert });
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log("errrr", error);
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/bank/create");
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log("errrr", error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, nameBank, noRekening } = req.body;

      let bank = await Bank({
        name,
        nameBank,
        noRekening,
      });
      bank.save();
      req.flash("alertMessage", `Berhasil menambahkan Bank`);
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error?.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log("errrr", error);
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req?.params;

      let bank = await Bank.findById(id);

      res.render("admin/bank/edit", { bank });
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log("errrr", error);
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { name, nameBank, noRekening } = req.body;
      const { id } = req.params;

      let bank = await Bank.findByIdAndUpdate(id, {
        name,
        nameBank,
        noRekening,
      });

      req.flash("alertMessage", `Berhasil mengubah Bank`);
      req.flash("alertStatus", "success");

      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log("errrr", error);
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      let bank = await Bank.findByIdAndDelete(id);
      req.flash("alertMessage", `Berhasil menghapus Bank`);
      req.flash("alertStatus", "success");

      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log("errrr", error);
    }
  },
};
