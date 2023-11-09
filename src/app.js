import express from "express";
import config from "./config/default";
import authRoutes from './routes/auth.routes';
import lotteryRoutes from './routes/lottery.routes';
import { notFound, developmentErrors, productionErrors } from'./handlers/error.handlers';
import cors from "cors";

const app = express();

//settings
app.set( 'port', config.port);

//middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Routes
app.use(cors()); // Habilita CORS para todas las rutas
app.use(authRoutes);
app.use(lotteryRoutes);

// Controlador para errores 404 (Not Found)
app.use(notFound);

// Controlador de errores en entorno de desarrollo
if (process.env.NODE_ENV === 'development') {
  app.use(developmentErrors);
}

// Controlador de errores en entorno de producción
app.use(productionErrors);

export { app };