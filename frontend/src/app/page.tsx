/**
 * This React component implements a simple user interface for generating cellular automata patterns.
 * Users can input a rule number (0-255) to generate a corresponding pattern using a POST request
 * to a FastAPI backend. The component manages the loading state, error messages, and displays
 * the generated pattern in a grid format. It uses Axios for making API calls and maintains
 * the state using React hooks.
 */

"use client";
import { useState } from "react";
import axios from "axios";

interface Pattern {
  pattern: number[][];
}

export default function Home() {
  const [pattern, setPattern] = useState<number[][]>([]);
  const [rule, setRule] = useState<number>(30);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchPattern = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post<Pattern>(
        "http://127.0.0.1:8000/automata",
        {
          rule,
          size: 10,
        }
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
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Cellular Automata</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={rule}
          onChange={(e) => setRule(parseInt(e.target.value) || 0)}
          className="border rounded p-2"
          min={0}
          max={255}
        />
        <button
          onClick={fetchPattern}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-10 gap-1">
        {pattern.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={`w-4 h-4 ${
                  cell ? "bg-black" : "bg-white"
                } border border-gray-200`}
              />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
