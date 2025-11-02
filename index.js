// index.js - Servicio NoSQL (MongoDB Atlas)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";
import huntersRouter from "./routes/hunters.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Conectar a MongoDB Atlas
const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error("❌ MONGODB_URI no definido en .env");
  process.exit(1);
}

try {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Conectado a MongoDB Atlas (NoSQL)");
} catch (err) {
  console.error("❌ Error al conectar a MongoDB:", err);
  process.exit(1);
}

// ✅ Swagger (solo para este microservicio)
const swaggerPath = path.join(__dirname, "./swagger-nosql.yaml");
const swaggerSpec = YAML.load(swaggerPath);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Rutas
app.use("/api/hunters", huntersRouter);

app.get("/", (req, res) => {
  res.json({ status: "OK", msg: "Servicio NoSQL activo" });
});

// ✅ Puerto
const PORT = process.env.PORT || 8081;
app.listen(PORT, () =>
  console.log(`🚀 Servicio NoSQL corriendo en puerto ${PORT}`)
);
