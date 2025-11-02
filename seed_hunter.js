// seed_hunter.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { conectarDB } from "./db.js";
import Hunter from "./models/hunter.js";

dotenv.config();

const datos = [
  { "nombre": "Netero", "edad": 120, "altura": 168, "peso": 57, "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9t_tzdqBHGq4mDc477f9jvQbOfcs2T8jI0A&s" },
  { "nombre": "Biscuit Krueger", "edad": 50, "altura": 145, "peso": 50, "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7JfAr6gNIfDhSDwaZsWKbMBnzEAE3a7fb4w&s" },
  { "nombre": "Meruem", "edad": 1, "altura": 200, "peso": 120, "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTntm-O58P6v27-H-EJt0CH1INf5neTbHOrjg&s" },
  { "nombre": "Illumi Zoldyck", "edad": 29, "altura": 190, "peso": 72, "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsWtEIUm6CKYrdoNqB0to5zaWqOMdkanizPQ&s" },
  { "nombre": "Feitan Portor", "edad": 22, "altura": 170, "peso": 60, "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1MiRJUAHnShi7-wvOl8ixbt8Zrl7t8G-fjA&s" },
  { "nombre": "Knuckle Bine", "edad": 28, "altura": 180, "peso": 86, "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9qo06mEbh_4Ks7OC5aRWPeZCf5GT6pUq1LQ&s" }
];

(async () => {
  try {
    console.log("🌍 Conectando a MongoDB Atlas para crear 'hunterxhunter'...");

    let base = process.env.MONGODB_URI;
    if (!base) throw new Error("❌ No se encontró MONGODB_URI en .env");

    // Agregar la base de datos /hunterxhunter si no está en la URI
    let uri = base;
    if (!uri.includes("/hunterxhunter")) {
      if (uri.includes("?")) {
        uri = uri.replace("/?", "/hunterxhunter?");
      } else if (uri.endsWith("/")) {
        uri = uri + "hunterxhunter";
      } else {
        uri = uri + "/hunterxhunter";
      }
    }

    console.log("🔗 Conectando con:", uri.replace(/(mongodb\+srv:\/\/[^:]+:)[^@]+(@.+)/, "$1***$2"));

    await conectarDB(uri);

    await Hunter.deleteMany({});
    console.log("🗑️ Base limpiada (hunterxhunter)");

    const resultado = await Hunter.insertMany(datos);
    console.log(`🌟 ${resultado.length} personajes insertados correctamente`);

    const total = await Hunter.countDocuments();
    console.log("📊 Total de documentos en la colección:", total);
    console.log("✅ Nombres:", resultado.map(p => p.nombre).join(", "));

  } catch (error) {
    console.error("❌ Error en seed_hunter:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Conexión cerrada");
  }
})();
