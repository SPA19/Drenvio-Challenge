import Product from "../models/Product.js";
import SpecialPrice from "../models/SpecialPrice.js";

export const getAllProducts = async (req, res) => {
  try {
    const { userId } = req.query;

    //Obtenemos todos los productos
    const products = await Product.find({});

    //Si no se proporciona userId, devolvemos los productos con precios normales
    if (!userId) {
      return res.status(200).json(products);
    }

    //Si hay userId, buscamos precios especiales para este usuario
    const specialPrices = await SpecialPrice.find({
      userId,
      active: true,
      $or: [{ validUntil: { $gt: new Date() } }, { validUntil: null }],
    });

    //Creamos un mapeo para acceder rapidamente a los precios especiales por id del producto
    const specialPricesMap = new Map();
    specialPrices.forEach((sp) => {
      specialPricesMap.set(sp.productId, sp.specialPrice);
    });

    //Modificamos los precios de los productos segun corresponda
    const productsWithSpecialPrices = products.map((product) => {
      const productObj = product.toObject();
      if (specialPricesMap.has(productObj.id)) {
        productObj.originalPrice = productObj.price;
        productObj.price = specialPricesMap.get(productObj.id);
        productObj.hasSpecialPrice = true;
      }
      return productObj;
    });

    res.status(200).json(productsWithSpecialPrices);

  } catch (error) {
    console.error("Error al obtener productos:", error);
    res
      .status(500)
      .json({ message: "Error al obtener productos", error: error.message });
  }
};
