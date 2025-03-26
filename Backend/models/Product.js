import mongoose from "mongoose";

//Este modelo ya estaba en la base de datos y solo se replico
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema, "productos");
