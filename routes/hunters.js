// routes/hunters.js
import { Router } from "express";
import Hunter from "../models/hunter.js";

const router = Router();

// GET /api/hunters
router.get("/", async (req, res) => {
  try {
    const data = await Hunter.find();
    res.json(data);
  } catch (error) {
    console.error("❌ Error al obtener hunters:", error);
    res.status(500).json({ error: "Error al obtener hunters" });
  }
});

// GET /api/hunters/:id
router.get("/:id", async (req, res) => {
  try {
    const data = await Hunter.findById(req.params.id);
    if (!data) return res.status(404).json({ error: "Hunter no encontrado" });
    res.json(data);
  } catch (error) {
    console.error("❌ Error GET /api/hunters/:id", error);
    res.status(400).json({ error: "ID inválido" });
  }
});

// POST /api/hunters
router.post("/", async (req, res) => {
  try {
    const { nombre, edad, altura, peso, imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ error: "imageUrl es obligatorio" });

    const nuevo = new Hunter({ nombre, edad, altura, peso, imageUrl });
    const saved = await nuevo.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Error al crear hunter:", error);
    res.status(400).json({ error: "Error al crear hunter", details: error.message });
  }
});

// PUT /api/hunters/:id
router.put("/:id", async (req, res) => {
  try {
    const updated = await Hunter.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: "Hunter no encontrado" });
    res.json(updated);
  } catch (error) {
    console.error("❌ Error al actualizar hunter:", error);
    res.status(400).json({ error: "Error al actualizar hunter", details: error.message });
  }
});

// DELETE /api/hunters/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Hunter.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Hunter no encontrado" });
    res.json({ message: "Hunter eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar hunter:", error);
    res.status(400).json({ error: "ID inválido" });
  }
});

export default router;
