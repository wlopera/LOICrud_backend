const express = require("express");
const {
  getSheetData,
  addRow,
  updateRow,
  deleteRow,
} = require("../controllers/sheetsController");

const router = express.Router();

router.get("/data", getSheetData);
router.post("/add", addRow);
router.put("/update", updateRow);
router.delete("/delete", deleteRow);

module.exports = router;
