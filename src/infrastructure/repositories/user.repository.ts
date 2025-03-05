import {  count, eq } from "drizzle-orm";
import { usersTable } from "@/infrastructure/database/schemas/user.schema";
import IUserRepository from "@/application/repositories/user.repository.interface";
import db from "@/infrastructure/database/index";

/**
 * Implementación del repositorio de usuarios.
 */
export default class UserRepository implements IUserRepository {

    /**
     * Obtiene una lista paginada de usuarios.
     * @param pageNumber - Número de página actual.
     * @param limit - Cantidad de registros por página.
     * @returns Lista de usuarios en la página solicitada.
     */
    async listPaginated(
        pageNumber: number,
        limit: number
    ): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }[]> {
        const offset = (pageNumber - 1) * limit;

        const response = await db
            .select()
            .from(usersTable)
            .limit(limit)
            .offset(offset);

        return response;
    }

    /**
     * Cuenta el total de usuarios registrados en la base de datos.
     * @returns Número total de usuarios.
     */
    async count(): Promise<number> {
        const response = await db
            .select({ count: count() })
            .from(usersTable);

        return response[0]?.count ?? 0;
    }

    /**
     * Busca un usuario por su correo electrónico.
     * @param email - Correo electrónico a buscar.
     * @returns El usuario encontrado o null si no existe.
     */
    async findByEmail(email: string): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    } | null> {
        const response = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email))
            .limit(1);

        if (response.length === 0) {
            return null;
        }

        return response[0];
    }

    /**
     * Crea un nuevo usuario en la base de datos.
     * @param userData - Datos del usuario a crear.
     * @returns El usuario creado.
     */
    async createUser(userData: { username: string; email: string; password: string }) {
        const { username, email, password } = userData;

        // Insertar el nuevo usuario en la base de datos
        const [newUser] = await db
            .insert(usersTable)
            .values({
                username,
                email,
                password, // Recuerda encriptar la contraseña antes de guardarla
                role: 'user', // O lo que sea necesario para tu aplicación
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning(); // Esto retorna el objeto del usuario creado

        return newUser;
    }
}
