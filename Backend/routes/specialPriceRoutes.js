import express from "express";
import {
  createSpecialPrice,
  getSpecialPricesByUser,
  deleteSpecialPrice,
  checkUserHasSpecialPrices,
} from "../controllers/specialPriceController.js";

const router = express.Router();

//Crear nuevos precios especiales
router.post("/", createSpecialPrice);
//Obtener precios especiales de un usuario
router.get("/user/:userId", getSpecialPricesByUser);
//Eliminar un precio especial
router.delete("/:id", deleteSpecialPrice);
//Verificar si un usuario tiene precios especiales
router.get("/check/:userId", checkUserHasSpecialPrices);

export default router;