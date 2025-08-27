import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connection = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Conexión con la base de datos realizada con éxito ✅");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error.message);
  }
};

connection();
export default connection;
export { prisma };
