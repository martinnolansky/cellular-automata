"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDarkMode } from "../DarkModeContext";

interface Rule {
  rule_number: number;
  name: string;
  description: string;
  pattern_example: string[];
  common_applications: string[];
}

const Rules = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get(
          "/static/cellular_automata_rules.json"
        );
        setRules(response.data);
      } catch (error) {
        console.error("Error fetching rules:", error);
      }
    };

    fetchRules();
  }, []);

  const filteredRules = rules.filter((rule) =>
    rule.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start p-6 ${
        darkMode ? "dark:bg-gray-900 dark:text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-2 mt-4">Cellular Automata Rules</h1>
      <input
        type="text"
        placeholder="Search for a rule..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full max-w-md"
      />

      <div className="overflow-x-auto w-full max-w-7xl">
        <div className="overflow-y-auto max-h-[40rem]">
          {" "}
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="py-2 px-2 text-left">Name</th>
                <th className="py-2 px-2 text-left">Description</th>
                <th className="py-2 px-2 text-left">Common Applications</th>
              </tr>
            </thead>
            <tbody>
              {filteredRules.length > 0 ? (
                filteredRules.map((rule) => (
                  <tr
                    key={rule.rule_number}
                    className="hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <td className="border px-2 py-1">{rule.name}</td>
                    <td className="border px-2 py-1">{rule.description}</td>
                    <td className="border px-2 py-1">
                      <ul className="list-disc pl-5">
                        {rule.common_applications.map((app, index) => (
                          <li key={index}>{app}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="border px-2 py-1 text-center">
                    No matching rules found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Rules;
