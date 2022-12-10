const Category = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      let alertMessage = req.flash("alertMessage");
      let alertStatus = req.flash("alertStatus");
      let alert = {
        status: alertStatus,
        message: alertMessage,
      };
      let category = await Category.find();
      console.log("cek datanya category", category);

      res.render("admin/category/view_category", { category, alert });
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      console.log("errrr", error);
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/category/create");
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      console.log("errrr", error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;

      let category = await Category({
        name,
      });
      category.save();
      req.flash("alertMessage", `Berhasil menambahkan Kategori`);
      req.flash("alertStatus", "success");
      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error?.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      console.log("errrr", error);
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req?.params;

      let category = await Category.findById(id);

      res.render("admin/category/edit", { category });
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      console.log("errrr", error);
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.params;

      let category = await Category.findByIdAndUpdate(id, {
        name,
      });

      req.flash("alertMessage", `Berhasil mengubah Kategori`);
      req.flash("alertStatus", "success");

      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      console.log("errrr", error);
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      let category = await Category.findByIdAndDelete(id);
      req.flash("alertMessage", `Berhasil menghapus Kategori`);
      req.flash("alertStatus", "success");

      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      console.log("errrr", error);
    }
  },
};
