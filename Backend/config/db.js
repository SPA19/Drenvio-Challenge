import mongoose from "mongoose";

//Conexión a la base de datos
const connectDB = async () => {
  console.log("Verificando conexión a la base de datos...");
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URL}`);

    console.log(`MongoDB Conectado: ${conn.connection.host}`);

  } catch (error) {

    console.log(`Error de conexión: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
