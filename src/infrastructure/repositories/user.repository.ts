import { count, eq } from "drizzle-orm";
import { usersTable } from "@/infrastructure/database/schemas/user.schema";
import IUserRepository from "@/application/repositories/user.repository.interface";
import db from "@/infrastructure/database/index";

export default class UserRepository implements IUserRepository {
  async listPaginated(
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
  > {
    const offset = (pageNumber - 1) * limit;

    const response = await db
      .select()
      .from(usersTable)
      .limit(limit)
      .offset(offset);

    return response;
  }

  async count(): Promise<number> {
    const response = await db.select({ count: count() }).from(usersTable);
    return response[0]?.count ?? 0;
  }

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

  async createUser(userData: {
    username: string;
    email: string;
    password: string;
    role: string; // Se agrega el rol
  }) {
    const { username, email, password, role } = userData;

    const [newUser] = await db
      .insert(usersTable)
      .values({
        username,
        email,
        password, // Debe venir encriptado
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning({
        id: usersTable.id,
        username: usersTable.username,
        email: usersTable.email,
        role: usersTable.role,
        createdAt: usersTable.createdAt,
        updatedAt: usersTable.updatedAt,
      });

    return newUser;
  }
}
