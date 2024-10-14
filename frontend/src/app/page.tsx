"use client";

import { useState } from "react";
import axios from "axios";

import { PatternForm } from "./components/PatternForm";
import { RulesReference } from "./components/RulesReference";
import { PatternGrid } from "./components/PatternGrid";
import { ErrorMessage } from "./components/ErrorMessage";
import { useDarkMode } from "./DarkModeContext";

interface Pattern {
  pattern: number[][];
}

export default function Home() {
  const [pattern, setPattern] = useState<number[][]>([]);
  const [rule, setRule] = useState<number | "">("");
  const [size, setSize] = useState<number | "">("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { darkMode } = useDarkMode();
  const [isCanvasVisible, setCanvasVisible] = useState<boolean>(false);

  const fetchPattern = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post<Pattern>(
        "http://127.0.0.1:8000/automata",
        { rule: rule || 30, size: size || 10 }
      );
      setPattern(response.data.pattern);
      setCanvasVisible(true);
    } catch (error) {
      setError("Failed to generate pattern. Please try again.");
      console.error("Error fetching pattern:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "dark:bg-gray-900 dark:text-white" : "bg-white text-black"
        }`}
      >
        <main className="p-6 max-w-2xl mx-auto">
          <RulesReference />
          <PatternForm
            rule={rule}
            size={size}
            setRule={setRule}
            setSize={setSize}
            fetchPattern={fetchPattern}
            isLoading={isLoading}
          />
          <ErrorMessage error={error} />
          {isCanvasVisible && (
            <PatternGrid pattern={pattern} size={size} darkMode={darkMode} />
          )}
        </main>
      </div>
    </>
  );
}
