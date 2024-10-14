interface DarkModeToggleProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function DarkModeToggle({ darkMode, setDarkMode }: DarkModeToggleProps) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="mb-4 p-2 bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
    >
      Toggle Dark Mode
    </button>
  );
}
