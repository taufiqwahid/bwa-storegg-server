const express = require("express");
const {
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete,
  index,
  actionUpdateStatus,
} = require("./controller");
const router = express.Router();
const multer = require("multer");
const os = require("os");

router.get("/", index);
router.get("/create", viewCreate);
router.post(
  "/create",
  multer({ dest: os.tmpdir() }).single("thumbnail"),
  actionCreate,
);
router.get("/edit/:id", viewEdit);
router.put(
  "/edit/:id",
  multer({ dest: os.tmpdir() }).single("thumbnail"),
  actionEdit,
);
router.get("/status/:id", index);
router.put("/status/:id", actionUpdateStatus);
router.delete("/delete/:id", actionDelete);

module.exports = router;
