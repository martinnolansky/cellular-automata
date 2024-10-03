"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [pattern, setPattern] = useState<number[][]>([]);
  const [rule, setRule] = useState<number>(30);

  const fetchPattern = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/automata", {
        rule,
        size: 10, // Optional: You can adjust this based on user input if needed
      });
      setPattern(response.data.pattern);
    } catch (error) {
      console.error("Error fetching pattern:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl">Cellular Automata</h1>
      <input
        type="number"
        value={rule}
        onChange={(e) => setRule(parseInt(e.target.value))}
        className="border p-2 m-2"
      />
      <button onClick={fetchPattern} className="bg-blue-500 text-white p-2">
        Generate
      </button>

      <div className="grid grid-cols-10 gap-1 mt-4">
        {pattern.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={`w-4 h-4 ${cell ? "bg-black" : "bg-white"}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
