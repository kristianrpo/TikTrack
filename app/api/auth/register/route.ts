import { NextRequest, NextResponse } from "next/server";
import { register } from "@/interface-adapters/controllers/auth.controller";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await register({
      ...body,
      role: body.role ?? "user", // Se asegura que el rol tenga un valor
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
