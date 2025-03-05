export default interface IUserRepository {
    listPaginated(
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
    }[]>;

    count(): Promise<number>;

    /**
     * Busca un usuario por su email.
     * @param email - Correo electrónico del usuario a buscar.
     * @returns El usuario encontrado o null si no existe.
     */
    findByEmail(email: string): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
