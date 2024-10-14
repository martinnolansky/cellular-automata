"use client";
import React from "react";
import "./globals.css";
import { NavBar } from "./components/NavBar";
import { DarkModeProvider, useDarkMode } from "./DarkModeContext";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <html lang="en">
      <body>
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div
          className={`min-h-screen ${
            darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          {children}
        </div>
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DarkModeProvider>
      <Layout>{children}</Layout>
    </DarkModeProvider>
  );
}
