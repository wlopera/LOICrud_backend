// server.js
const express = require("express");
const cors = require("cors"); // Importa el middleware CORS
const sheetsRoutes = require("./src/routes/sheetsRoutes"); // Asegúrate de que esta línea es la correcta

const app = express();
app.use(cors()); // Habilitar CORS para todas las solicitudes
app.use(express.json());

// Usar las rutas para la API de Google Sheets
app.use("/api/sheets", sheetsRoutes); // Asegúrate de que la ruta sea la correcta

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
