import { NextRequest, NextResponse } from "next/server";
import { UserLoginUseCase } from "@/application/use-cases/user-login.use-case";
import { AuthService } from "@/infrastructure/services/auth.service";

const authService = new AuthService();

export class AuthController {
    async login(req: NextRequest): Promise<NextResponse> {
        try {
            const { email, password } = await req.json();

            const userLoginUseCase = new UserLoginUseCase();
            const user = await userLoginUseCase.execute(email, password);

            if (!user) {
                return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
            }

            // Generamos el token JWT
            const token = authService.generateToken(user.getId().toString(), user.getRole());

            return NextResponse.json({
                message: "Login successful",
                token,   // Devolvemos el token al frontend
                user: {
                    id: user.getId(),
                    username: user.getUsername(),
                    email: user.getEmail(),
                    role: user.getRole(),
                },
            });
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }
}

export const authController = new AuthController();
