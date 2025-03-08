import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

// Verifica que la variable de entorno DATABASE_URL esté definida
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está definida en las variables de entorno");
}

// Crea una nueva instancia de Client para conectarse a la base de datos
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Intenta conectar a la base de datos
client
  .connect()
  .then(() => {
    console.log("✅ Conexión a la base de datos establecida correctamente");
  })
  .catch((err) => {
    console.error("❌ Error al conectar a la base de datos:", err);
  });

// Exporta la instancia de Drizzle ORM
const db = drizzle(client);
export default db;