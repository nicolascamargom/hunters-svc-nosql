// db.js
import mongoose from "mongoose";

export async function conectarDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log("✅ Conectado correctamente a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1);
  }
}
