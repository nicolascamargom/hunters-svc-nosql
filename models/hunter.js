// models/hunter.js
import mongoose from "mongoose";

const hunterSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: Number,
  altura: Number,
  peso: Number,
  imageUrl: { type: String, required: true }
});

export default mongoose.model("Hunter", hunterSchema);
