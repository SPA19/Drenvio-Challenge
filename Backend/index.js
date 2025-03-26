import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js";
import specialPriceRoutes from "./routes/specialPriceRoutes.js";

//Variables de entorno
dotenv.config();

const PORT = process.env.PORT || 5000;
const BASE_PATH = process.env.BASE_PATH || "/api";
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const NODE_ENV = process.env.NODE_ENV || "development";

const app = express();

// Configuración de CORS más segura
const corsOptions = {
  origin: function (origin, callback) {
    // Lista de dominios permitidos
    const whiteList = [
      'http://localhost:3000',
      process.env.FRONTEND_URL
    ];

    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

//Configurar visualizacion de las peticiones solo para development
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Conexión a la base de datos
connectDB();

// Rutas
app.use(`${BASE_PATH}/productos`, productRoutes);
app.use(`${BASE_PATH}/precios-especiales`, specialPriceRoutes);

// Middleware para manejar errores de producción
if (NODE_ENV === 'production') {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal en el servidor');
  });
}

//Ruta base
app.get("/", (req, res) => {
  res.send(
    `API de Challenge React/MongoDB funcionando correctamente ${BASE_URL}`
  );
});

//Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto:${PORT}`);
  console.log(`Entorno: ${NODE_ENV}`);
  console.log(`API disponible en ${BASE_URL}`);
});
