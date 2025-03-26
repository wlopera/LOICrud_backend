// src/controllers/sheetsController.js
const axios = require("axios");

const getSheetData = async (req, res) => {
  const sheetId = "1ei7nq49B63pCj7XHZSCAyZhwNbQFQ7lBWBfRatgqV6w"; // Reemplaza con tu Sheet ID
  const range = "A1:C10"; // Reemplaza con el rango que deseas consultar
  const apiKey = "AIzaSyDgRHAHP8IEprHe-rt7u8cfQwp0qDpVGkU"; // Coloca aquí tu API Key

  try {
    const response = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
    );
    res.json(response.data.values); // Devuelve los datos en formato JSON
  } catch (error) {
    console.error("Error al consultar Google Sheets:", error);
    res
      .status(500)
      .json({ message: "Error al obtener datos de Google Sheets" });
  }
};

module.exports = { getSheetData };
