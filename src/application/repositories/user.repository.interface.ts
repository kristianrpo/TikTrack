export default interface IUserRepository {
    listPaginated(
        pageNumber: number,
        limit: number
    ): Promise<
        {
            id: number;
            username: string;
            email: string;
            password: string;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        }[]
    >;

    count(): Promise<number>;

    // 👇 Agregar este método para el login
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
