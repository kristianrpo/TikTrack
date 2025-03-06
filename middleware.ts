import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

console.log("Middleware cargado");

export default function middleware(req: NextRequest) {
  console.log("Ruta solicitada:", req.nextUrl.pathname);

  return createMiddleware(routing)(req);
}

export const config = {
  matcher: ["/", "/(en|es)/:path*"],
};
