const express = require("express");
const {
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete,
  index,
} = require("./controller");
const router = express.Router();

router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", actionCreate);
router.get("/edit/:id", viewEdit);
router.put("/edit/:id", actionEdit);
router.delete("/delete/:id", actionDelete);

module.exports = router;
