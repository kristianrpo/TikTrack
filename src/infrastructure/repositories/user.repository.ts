import { count } from "drizzle-orm";

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
    return response[0].count;
  }
}
