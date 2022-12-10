const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  index: async (req, res) => {
    try {
      let alertMessage = req.flash("alertMessage");
      let alertStatus = req.flash("alertStatus");
      let alert = {
        status: alertStatus,
        message: alertMessage,
      };
      let voucher = await Voucher.find()
        .populate("nominal")
        .populate("category");

      res.render("admin/voucher/view_voucher", { voucher, alert });
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log("errrr", error);
    }
  },
  viewCreate: async (req, res) => {
    try {
      const category = await Category.find();
      const nominal = await Nominal.find();

      res.render("admin/voucher/create", { category, nominal });
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log("errrr", error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, category, nominal } = req.body;
      let data = {
        name,
        category,
        nominal,
      };
      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt = req.file.originalname.split(".")[1];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`,
        );
        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          try {
            let voucher = new Voucher({
              name,
              category,
              nominal,
              thumbnail: filename,
            });
            await voucher.save();
            req.flash("alertMessage", `Berhasil menambahkan Voucher`);
            req.flash("alertStatus", "success");
            res.redirect("/voucher");
          } catch (error) {
            req.flash("alertMessage", `${error?.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
          }
        });
      } else {
        let voucher = await Voucher({
          ...data,
        });
        voucher.save();
        req.flash("alertMessage", `Berhasil menambahkan Voucher`);
        req.flash("alertStatus", "success");
        res.redirect("/voucher");
      }
    } catch (error) {
      req.flash("alertMessage", `${error?.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log("errrr", error);
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req?.params;
      const category = await Category.find();
      const nominal = await Nominal.find();
      let voucher = await Voucher.findById(id)
        .populate("nominal")
        .populate("category");

      res.render("admin/voucher/edit", { voucher, nominal, category });
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log("errrr", error);
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { name, category, nominal } = req.body;
      const { id } = req.params;

      let data = {
        name,
        category,
        nominal,
      };
      console.log("cek datanya 111", req.body);

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt = req.file.originalname.split(".")[1];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`,
        );
        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          try {
            let voucher = new Voucher.findOneAndUpdate({ _id: id }, [], {
              name,
              category,
              nominal,
              thumbnail: filename,
            });
            await voucher.save();
            req.flash("alertMessage", `Berhasil menambahkan Voucher`);
            req.flash("alertStatus", "success");
            res.redirect("/voucher");
          } catch (error) {
            req.flash("alertMessage", `${error?.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
          }
        });
      } else {
        let voucher = new Voucher.findOneAndUpdate(id, {
          name,
          category,
          nominal,
        });
        console.log("cek datanya adsfasdfasd", voucher);

        req.flash("alertMessage", `Berhasil menambahkan Voucher11`);
        req.flash("alertStatus", "success");
        res.redirect("/voucher");
      }
    } catch (error) {
      req.flash("alertMessage", `${error?.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log("errrr", error);
    }
  },
  actionUpdateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findById(id);
      console.log("cek datanya ", id, voucher);

      await Voucher.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            status: voucher.status == "Y" ? "N" : "Y",
          },
        },
      );
      req.flash("alertMessage", `Berhasil update status Voucher`);
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    } catch (error) {
      req.flash("alertMessage", `${error?.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log("errrr", error);
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      let voucher = await Voucher.findByIdAndDelete(id);
      req.flash("alertMessage", `Berhasil menghapus Voucher`);
      req.flash("alertStatus", "success");

      let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;

      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      res.redirect("/voucher");
    } catch (error) {
      req.flash("alertMessage", `${error?.message || "Internal server error"}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log("errrr", error);
    }
  },
};
