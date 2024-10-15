import React, { useRef, useEffect } from "react";

interface PatternGridProps {
  pattern: number[][];
  size: number | "";
  darkMode?: boolean;
}

export function PatternGrid({ pattern, size, darkMode }: PatternGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current || size === "") return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = size > 50 ? 4 : size > 20 ? 6 : 8;
    const canvasWidth = pattern.length * cellSize;
    const canvasHeight = pattern.length * cellSize;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = darkMode ? "#1f2937" : "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    pattern.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        ctx.fillStyle = cell
          ? darkMode
            ? "#ffffff"
            : "#000000"
          : "transparent";

        ctx.fillRect(
          cellIndex * cellSize,
          rowIndex * cellSize,
          cellSize,
          cellSize
        );
      });
    });
  }, [pattern, size, darkMode]);

  return (
    <div
      className="flex items-center justify-center"
      style={{ maxWidth: "100%", maxHeight: "80vh", overflow: "hidden" }}
    >
      <canvas
        ref={canvasRef}
        className="transition-opacity duration-300 opacity-100"
      />
    </div>
  );
}
