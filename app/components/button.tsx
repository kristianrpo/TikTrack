import { ReactNode, JSX } from "react";
import clsx from "clsx";
import Link from "next/link"; // Importa Link de Next.js

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  href?: string; // Acepta href como una propiedad opcional
  onClick?: () => void; // Acepta onClick como una propiedad opcional
};

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
}: ButtonProps): JSX.Element {
  const className = clsx(
    "px-4 py-2 rounded-md font-semibold transition-all hover:",
    variant === "primary" &&
      "bg-purple text-white cursor-pointer hover:bg-darkPurple",
    variant === "secondary" &&
      "bg-darkGrey text-white cursor-pointer hover:bg-black",
    variant === "danger" &&
      "bg-red-600 text-white cursor-pointer hover:bg-red-700"
  );

  // Si hay un href, usa un enlace (<a>)
  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  // Si no hay href, usa un botón (<button>)
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}