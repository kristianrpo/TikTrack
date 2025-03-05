import IUserRepository from "@/application/repositories/user.repository.interface";
import { User } from "@/domain/entities/user";
import { AuthService } from "@/infrastructure/services/auth.service";
import repositoryContainer from "~/containers/repository.container";

export class UserLoginUseCase {
  private userRepository: IUserRepository;
  private authService: AuthService;

  constructor() {
    this.userRepository = repositoryContainer.get<IUserRepository>("IUserRepository");
    this.authService = new AuthService();
  }

  async execute(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      // No se encontró el usuario
      return null;
    }

    const passwordMatches = await this.authService.comparePasswords(password, user.password);
    
    if (!passwordMatches) {
      // Contraseña incorrecta
      return null;
    }

    // Devuelve el usuario encontrado (sin la contraseña por seguridad)
    return new User(
      user.id,
      user.username,
      user.email,
      user.password,
      user.role,
      user.createdAt,
      user.updatedAt
    );
  }
}
