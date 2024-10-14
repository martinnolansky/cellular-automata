export function RulesReference() {
  return (
    <>
      <h2 className="text-xl font-bold mt-6 mb-2">Cellular Automaton Rules</h2>
      <p className="mb-4">
        This application generates patterns based on Cellular Automaton rules.
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        The following is a reference for rules 1-256:
      </p>
      <ul className="list-disc ml-6 mb-4 text-sm">
        <li>Rule 30: A simple rule that produces complex patterns.</li>
        <li>Rule 110: A rule known for universal computation.</li>
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
    </>
  );
}
