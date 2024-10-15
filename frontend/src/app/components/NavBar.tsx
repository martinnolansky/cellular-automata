"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cellularAutomataLogoLight from "../assets/cellular-automata-light.svg";
import cellularAutomataLogoDark from "../assets/cellular-automata-dark.svg";
import lightModeImage from "../assets/light-mode-icon.svg";
import darkModeImage from "../assets/dark-mode-icon.svg";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function NavBar({ darkMode, setDarkMode }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav
      className={`border-gray-200 ${
        darkMode ? "bg-gray-900" : "bg-white"
      } w-full`}
    >
      <div className="flex items-center justify-between mx-auto p-4 w-full ">
        <a href="/" className="flex items-center space-x-3">
          <Image
            src={
              darkMode ? cellularAutomataLogoDark : cellularAutomataLogoLight
            }
            className="h-10 w-10"
            alt="Cellular Automata Logo"
          />
          <span
            className={`text-2xl font-semibold whitespace-nowrap ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Elementary Cellular Automata
          </span>
        </a>
        <div className="flex items-center">
          <ul className="flex space-x-4">
            <li>
              <Link
                href={pathname === "/rules" ? "/" : "/rules"}
                className={`block py-2 px-3 rounded md:bg-transparent ${
                  darkMode ? "text-white" : "text-black"
                }`}
                aria-current="page"
              >
                {pathname === "/rules" ? "Home" : "Rules"}
              </Link>
            </li>
          </ul>
          <Image
            src={darkMode ? lightModeImage : darkModeImage}
            className="h-10 w-10 cursor-pointer"
            onClick={() => setDarkMode(!darkMode)}
            alt="Toggle Dark Mode"
          />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
