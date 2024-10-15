"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import { PatternForm } from "./components/PatternForm";
import { RulesReference } from "./components/RulesReference";
import { PatternGrid } from "./components/PatternGrid";
import { ErrorMessage } from "./components/ErrorMessage";
import { useDarkMode } from "./DarkModeContext";
import cellularAutomataLogoLight from "./assets/cellular-automata-light.svg";
import cellularAutomataLogoDark from "./assets/cellular-automata-dark.svg";

interface Pattern {
  pattern: number[][];
}

interface Rule {
  rule_number: number;
  name: string;
  description: string;
  pattern_example: string[];
  common_applications: string[];
}

export default function Home() {
  const [pattern, setPattern] = useState<number[][]>([]);
  const [rule, setRule] = useState<number | "">("");
  const [size, setSize] = useState<number | "">("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [ruleDetails, setRuleDetails] = useState<Rule | null>(null);
  const { darkMode } = useDarkMode();
  const [isCanvasVisible, setCanvasVisible] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      timer = setTimeout(() => setShowLoading(true), 200);
    } else {
      setShowLoading(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  const fetchPattern = async () => {
    setIsLoading(true);
    setError("");
    setCanvasVisible(false);
    setRuleDetails(null);

    const isRuleValid = typeof rule === "number" && rule >= 1 && rule <= 256;
    const isSizeValid = typeof size === "number" && size >= 1 && size <= 1000;

    if (!isRuleValid || !isSizeValid) {
      const errorMessage = !isRuleValid
        ? "Please enter a cellular automata rule from 1 to 256."
        : "Please enter a valid number of generations between 1 and 1000.";

      setError(errorMessage);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post<Pattern>(
        "http://127.0.0.1:8000/automata",
        { rule: rule || 30, size: size || 10 }
      );
      setPattern(response.data.pattern);

      const ruleResponse = await axios.get<Rule[]>(
        `/static/cellular_automata_rules.json`
      );
      const matchedRule = ruleResponse.data.find((r) => r.rule_number === rule);
      setRuleDetails(matchedRule || null);

      setTimeout(() => {
        setCanvasVisible(true);
      }, 100);
    } catch (error) {
      setError("Failed to generate pattern. Please try again.");
      console.error("Error fetching pattern:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-stretch ${
        darkMode ? "dark:bg-gray-900 dark:text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto">
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <div className="top-1/2">
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
            {showLoading && (
              <div className="text-center mt-4">Generating pattern...</div>
            )}

            {ruleDetails && (
              <div className="mt-4 p-4 border border-gray-300 rounded dark:border-gray-600 w-full md:w-3/4 lg:w-2/3">
                <h2 className="text-lg font-bold">{ruleDetails.name}</h2>
                <p className="text-base">{ruleDetails.description}</p>
                <h3 className="mt-2 font-semibold">Common Applications:</h3>
                <ul className="list-disc pl-5">
                  {ruleDetails.common_applications.map((app, index) => (
                    <li key={index} className="text-base">
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 flex items-center justify-center overflow-auto">
          {isCanvasVisible ? (
            <PatternGrid pattern={pattern} size={size} darkMode={darkMode} />
          ) : (
            <Image
              src={
                darkMode ? cellularAutomataLogoDark : cellularAutomataLogoLight
              }
              className="h-41 w-41"
              alt="Cellular Automata Logo"
            />
          )}
        </div>
      </div>
    </div>
  );
}
