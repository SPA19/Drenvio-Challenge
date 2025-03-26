import SpecialPrice from "../models/SpecialPrice.js";
import Product from "../models/Product.js";

export const createSpecialPrice = async (req, res) => {
  try {
    const { productId, userId, specialPrice, reason, validUntil } = req.body;

    //Verificar que el producto existe
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    //Verificar que el precio especial tiene sentido
    if (specialPrice <= 0) {
      return res
        .status(400)
        .json({ message: "El precio especial debe ser mayor que cero" });
    }

    //Buscar si ya existe un precio especial para este producto y usuario
    const existingSpecialPrice = await SpecialPrice.findOne({
      productId,
      userId,
    });

    //Actualizar el precio especial existente
    if (existingSpecialPrice) {
      existingSpecialPrice.specialPrice = specialPrice;
      existingSpecialPrice.reason = reason || existingSpecialPrice.reason;
      existingSpecialPrice.validUntil =
        validUntil || existingSpecialPrice.validUntil;
      existingSpecialPrice.active = true;

      await existingSpecialPrice.save();
      return res.status(200).json({
        message: "Precio especial actualizado correctamente",
        specialPrice: existingSpecialPrice,
      });
    }

    //Crear un nuevo precio especial
    const newSpecialPrice = new SpecialPrice({
      productId,
      userId,
      specialPrice,
      reason,
      validUntil,
      active: true,
    });

    await newSpecialPrice.save();

    res.status(201).json({
      message: "Precio especial creado correctamente",
      specialPrice: newSpecialPrice,
    });
  } catch (error) {
    console.error("Error al crear precio especial:", error);
    res
      .status(500)
      .json({
        message: "Error al crear precio especial",
        error: error.message,
      });
  }
};

export const getSpecialPricesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    //Buscamos precios especiales activos para este usuario
    const specialPrices = await SpecialPrice.find({
      userId,
      active: true,
      $or: [{ validUntil: { $gt: new Date() } }, { validUntil: null }],
    });

    //Obtenemos ids de los productos asociados
    const productIds = specialPrices.map((sp) => sp.productId);

    //Obtenemos los productos para mostrar información relevante
    const products = await Product.find({ _id: { $in: productIds } });

    //Mapeamos productos para incluir detalles
    const productsMap = new Map();
    products.forEach((product) => {
      productsMap.set(product.id, product);
    });

    //Combinamos la información de precios especiales y productos
    const specialPricesWithDetails = specialPrices.map((sp) => {
      const specialPriceObj = sp.toObject();
      const product = productsMap.get(sp.productId);

      if (product) {
        specialPriceObj.product = {
          name: product.name,
          originalPrice: product.price,
        };
      }

      return specialPriceObj;
    });

    res.status(200).json(specialPricesWithDetails);
  } catch (error) {
    console.error("Error al obtener precios especiales:", error);
    res
      .status(500)
      .json({
        message: "Error al obtener precios especiales",
        error: error.message,
      });
  }
};

export const deleteSpecialPrice = async (req, res) => {
  try {
    const { id } = req.params;

    const specialPrice = await SpecialPrice.findById(id);

    if (!specialPrice) {
      return res.status(404).json({ message: "Precio especial no encontrado" });
    }

    // En lugar de eliminar, marcamos como inactivo
    specialPrice.active = false;
    await specialPrice.save();

    res
      .status(200)
      .json({ message: "Precio especial eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar precio especial:", error);
    res
      .status(500)
      .json({
        message: "Error al eliminar precio especial",
        error: error.message,
      });
  }
};

export const checkUserHasSpecialPrices = async (req, res) => {
  try {
    const { userId } = req.params;

    //Hace la busqueda y cuenta cuantos archivos se tienen con ese usaurio
    const count = await SpecialPrice.countDocuments({
      userId,
      active: true,
      $or: [{ validUntil: { $gt: new Date() } }, { validUntil: null }],
    });

    res.status(200).json({
      hasSpecialPrices: count > 0,
      count,
    });
  } catch (error) {
    console.error("Error al verificar precios especiales:", error);
    res
      .status(500)
      .json({
        message: "Error al verificar precios especiales",
        error: error.message,
      });
  }
};
