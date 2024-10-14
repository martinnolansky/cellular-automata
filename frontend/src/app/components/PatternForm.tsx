interface PatternFormProps {
  rule: number | "";
  size: number | "";
  setRule: (value: number | "") => void;
  setSize: (value: number | "") => void;
  fetchPattern: () => void;
  isLoading: boolean;
}

export function PatternForm({
  rule,
  size,
  setRule,
  setSize,
  fetchPattern,
  isLoading,
}: PatternFormProps) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="number"
        value={rule}
        onChange={(e) =>
          setRule(e.target.value === "" ? "" : parseInt(e.target.value))
        }
        className="border rounded-lg p-3 w-[10rem] bg-gray-100 dark:bg-gray-800 dark:text-white focus:outline-none"
        min={1}
        max={256}
        placeholder="Rule"
      />
      <input
        type="number"
        value={size}
        onChange={(e) =>
          setSize(e.target.value === "" ? "" : parseInt(e.target.value))
        }
        className="border rounded-lg p-3 w-[10rem] bg-gray-100 dark:bg-gray-800 dark:text-white focus:outline-none"
        min={0}
        max={1000}
        placeholder="Generations"
      />
      <button
        onClick={fetchPattern}
        className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate"}
      </button>
    </div>
  );
}
