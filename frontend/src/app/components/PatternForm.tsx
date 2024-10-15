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
    <div className="flex items-end gap-4 mb-4">
      <div className="flex flex-col">
        <label
          htmlFor="rule"
          className="text-gray-700 dark:text-gray-300 mb-1 mt-2"
        >
          Rule
        </label>
        <input
          type="number"
          id="rule"
          value={rule}
          onChange={(e) =>
            setRule(e.target.value === "" ? "" : parseInt(e.target.value))
          }
          className="border rounded-lg p-2 w-[10rem] bg-gray-100 dark:bg-gray-800 dark:text-white focus:outline-none"
          min={1}
          max={256}
          placeholder="30"
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="size"
          className="text-gray-700 dark:text-gray-300 mb-1 mt-2"
        >
          Generations
        </label>
        <input
          type="number"
          id="size"
          value={size}
          onChange={(e) =>
            setSize(e.target.value === "" ? "" : parseInt(e.target.value))
          }
          className="border rounded-lg p-2 w-[10rem] bg-gray-100 dark:bg-gray-800 dark:text-white focus:outline-none"
          min={1}
          max={1000}
          placeholder="100"
        />
      </div>

      <button
        onClick={fetchPattern}
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate"}
      </button>
    </div>
  );
}
