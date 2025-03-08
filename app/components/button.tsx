import clsx from "clsx";
import { JSX, MouseEvent } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "danger";
  children: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void; // Agrega onClick como prop opcional
}

export default function Button({
  variant,
  children,
  onClick,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-md font-semibold transition-all hover:",
        variant === "primary" &&
          "bg-purple text-white cursor-pointer hover:bg-darkPurple",
        variant === "secondary" &&
          "bg-darkGrey text-white cursor-pointer hover:bg-black",
        variant === "danger" &&
          "bg-red-600 text-white cursor-pointer hover:bg-red-700"
      )}
      onClick={onClick} // Pasa onClick al botón
    >
      {children}
    </button>
  );
}