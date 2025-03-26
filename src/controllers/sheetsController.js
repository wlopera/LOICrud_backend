const { google } = require("googleapis");
const credentials = require("../../credentials.json");
const axios = require("axios");

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const spreadsheetId = "1ei7nq49B63pCj7XHZSCAyZhwNbQFQ7lBWBfRatgqV6w";

/*
 * Consulta registros del archivo excel
 */
const getSheetData = async (req, res) => {
  try {
    const range = "A1:C10";
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    res.json(response.data.values);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).json({ error: "Error al obtener datos" });
  }
};

/*
 * Agregar registro al archivo excel
 */
const addRow = async (req, res) => {
  try {
    const { values } = req.body; // Valores desde el frontend

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "A1", // Puedes cambiar el rango
      valueInputOption: "RAW",
      resource: { values: values },
    });

    res.status(200).json({ message: "Fila agregada correctamente" });
    console.log("Agregar regsitro: ", response);
  } catch (error) {
    console.error("Error al agregar fila:", error);
    res.status(500).json({ error: "Error al agregar fila" });
  }
};

/*
 * Modificar registro del archivo excel
 */
const updateRow = async (req, res) => {
  try {
    const { values, rowIndex } = req.body; // valores nuevos y el índice de la fila a modificar

    // 'rowIndex' es el número de la fila que quieres modificar (1 es la primera fila)
    const range = `A${rowIndex}:C${rowIndex}`; // Rango de la fila a modificar, ajusta según la cantidad de columnas

    // Llamada para actualizar el valor de la fila
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: range, // Rango donde se actualizarán los datos
      valueInputOption: "RAW",
      resource: { values: [values] }, // Los nuevos valores de la fila
    });

    res.status(200).json({ message: "Fila modificada correctamente" });
  } catch (error) {
    console.error("Error al modificar fila:", error);
    res.status(500).json({ error: "Error al modificar fila" });
  }
};

/*
 * Eliminar registro del archivo excel
 */
const deleteRow = async (req, res) => {
  try {
    const { rowIndex } = req.body; // Índice de la fila a eliminar
    const batchUpdateRequest = {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: 0, // ID de la hoja, 0 es la primera hoja. Cambia esto si tienes varias hojas.
              dimension: "ROWS",
              startIndex: rowIndex, // Índice de la fila a eliminar
              endIndex: rowIndex + 1, // La fila se elimina entre rowIndex y rowIndex + 1
            },
          },
        },
      ],
    };

    // Ejecuta la operación de eliminación
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: batchUpdateRequest,
    });

    res.status(200).json({ message: "Fila eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar fila:", error);
    res.status(500).json({ error: "Error al eliminar fila" });
  }
};

module.exports = { getSheetData, addRow, updateRow, deleteRow };
