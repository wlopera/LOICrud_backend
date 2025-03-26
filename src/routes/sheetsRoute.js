// src/routes/sheetsRoute.js
const express = require("express");
const router = express.Router();
const sheetsController = require("../controllers/sheetsController");

// Ruta para obtener los datos de Google Sheets
router.get("/", sheetsController.getSheetData);

module.exports = router;
