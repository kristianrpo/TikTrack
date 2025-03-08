import { NextRequest, NextResponse } from "next/server";
import { login } from "@/interface-adapters/controllers/auth.controller";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await login(body); // Llama al controller

    console.log("✅ Inicio de sesión exitoso:", response.user.email); // Log para depuración
    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error durante el inicio de sesión:", error.message); // Log para depuración
      return NextResponse.json({ error: error.message }, { status: 401 }); // Cambié 400 por 401
    }
    console.error("❌ Error desconocido durante el inicio de sesión:", error); // Log para depuración
    return NextResponse.json({ error: "Unknown error" }, { status: 500 }); // Cambié 400 por 500 para errores no manejados
  }
}