"use client";

import { useState } from "react";
import axios from "axios";

interface Pattern {
  pattern: number[][];
}

export default function Home() {
  const [pattern, setPattern] = useState<number[][]>([]);
  const [rule, setRule] = useState<number | "">("");
  const [size, setSize] = useState<number | "">("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const fetchPattern = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post<Pattern>(
        "http://127.0.0.1:8000/automata",
        { rule: rule || 30, size: size || 10 } // Fallback to default values if empty
      );
      setPattern(response.data.pattern);
    } catch (error) {
      setError("Failed to generate pattern. Please try again.");
      console.error("Error fetching pattern:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <main className="p-6 max-w-2xl mx-auto dark:bg-gray-900 dark:text-white">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mb-4 p-2 bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          Toggle Dark Mode
        </button>

        <h1 className="text-3xl font-bold mb-4">Cellular Automata</h1>
        <p className="mb-4">
          This application generates patterns based on Cellular Automaton rules.
          You can choose a rule number (from 0 to 255) and set the grid size
          (number of cells in a row). The center cell will always start as
          active, and the automaton will evolve based on the rule you specify.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">
          Cellular Automaton Rules Reference
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          The following is a reference for rules 0-255:
        </p>

        <ul className="list-disc ml-6 mb-4 text-sm">
          <li>
            Rule 30: A simple rule that produces complex patterns from a single
            active cell.
          </li>
          <li>
            Rule 110: A rule known for its ability to perform universal
            computation.
          </li>
          <li>Rule 184: Models traffic flow with simple cellular automata.</li>
        </ul>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Find out more about the rules at{" "}
          <a
            href="https://mathworld.wolfram.com/ElementaryCellularAutomaton.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Wolfram MathWorld
          </a>
          .
        </p>

        <div className="flex gap-2 mb-4">
          <input
            type="number"
            value={rule}
            onChange={(e) =>
              setRule(e.target.value === "" ? "" : parseInt(e.target.value))
            }
            className="border rounded-lg p-3 w-24 bg-gray-100 dark:bg-gray-800 dark:text-white focus:outline-none"
            min={0}
            max={255}
            placeholder="Rule"
          />
          <input
            type="number"
            value={size}
            onChange={(e) =>
              setSize(e.target.value === "" ? "" : parseInt(e.target.value))
            }
            className="border rounded-lg p-3 w-24 bg-gray-100 dark:bg-gray-800 dark:text-white focus:outline-none"
            min={1}
            max={50}
            placeholder="Size"
          />
          <button
            onClick={fetchPattern}
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate"}
          </button>
        </div>

        <p className="mb-4">
          <strong>Note:</strong> The rule defines how the cells evolve based on
          their neighbors, and the size defines the width of the grid.
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className={`grid grid-cols-${size || 1} gap-1`}>
          {pattern.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`w-4 h-4 ${
                    cell ? "bg-black dark:bg-white" : "bg-white dark:bg-black"
                  } border border-gray-200`}
                />
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
