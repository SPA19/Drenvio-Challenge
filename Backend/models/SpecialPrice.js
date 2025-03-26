import mongoose from "mongoose";

//Creo el modelo para crear los preción especiales con mi apellido y numero
const collectionName = "preciosEspecialesPosada77";

const specialPriceSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      ref: "Product",
    },
    userId: {
      type: String,
      required: true,
    },
    specialPrice: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      default: "",
    },
    validUntil: {
      type: Date,
      default: null,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//Creamos un índice compuesto para optimizar las búsquedas
specialPriceSchema.index({ productId: 1, userId: 1 }, { unique: true });

export default mongoose.model(
  "SpecialPrice",
  specialPriceSchema,
  collectionName
);
