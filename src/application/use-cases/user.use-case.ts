import { User } from "@/domain/entities/user";
import IUserRepository from "@/application/repositories/user.repository.interface";
import PaginationUtil from "@/shared/utils/pagination";
import repositoryContainer from "~/containers/repository.container";

export class UserUseCases {
  async listWithPagination(
    pageNumber: number,
    limit: number
  ): Promise<{
    users: User[];
    count: number;
    start: number;
    end: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const repository = repositoryContainer.get<IUserRepository>(
      "IUserRepository"
    );
    const tempUsers = await repository.listPaginated(pageNumber, limit);
    const tempCount = await repository.count();

    const users = tempUsers.map((user) => {
      return new User(
        user.id,
        user.username,
        user.email,
        user.password,
        user.role,
        user.createdAt,
        user.updatedAt,
      );
    });

    const count = Number(tempCount);
    const [start, end] = PaginationUtil.getIndexes(
      pageNumber.toString(),
      count,
      limit
    );

    return {
      users,
      count,
      start,
      end,
      hasNextPage: end < count,
      hasPreviousPage: start > 1,
    };
  }
}

export const userUseCases = new UserUseCases();
