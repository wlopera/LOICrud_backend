// server.js
const express = require("express");
const cors = require("cors"); // Importa el middleware CORS
const app = express();
const port = 5000; // Puerto donde estará corriendo el backend

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Importar las rutas de Google Sheets
const sheetsRoute = require("./src/routes/sheetsRoute");

// Usar las rutas para la API de Google Sheets
app.use("/api/sheets", sheetsRoute);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
