"""
CellularAutomaton Class Overview:

This class implements a 1D Cellular Automaton that evolves based on a specified rule (0-255) and grid size.

1. __init__(self, rule, size):
   - Initializes the automaton with a rule and grid size. The grid starts with the center cell active.

2. apply_rule(self, left, center, right):
   - Applies the rule to a triplet of cells (left, center, right) to determine the next state of the center cell.

3. run(self):
   - Runs the automaton for a number of generations (equal to grid size), updating the grid according to the rule.
   - Returns the state of the grid for each generation.
"""

class CellularAutomaton:
    def __init__(self, rule, size):
        self.rule = rule
        self.size = size
        self.grid = [0] * size
        self.grid[size // 2] = 1

    def apply_rule(self, left, center, right):
        rule_bin = f"{self.rule:08b}"
        index = (left << 2) | (center << 1) | right
        return int(rule_bin[7 - index])

    def run(self):
        generations = [self.grid.copy()]
        for _ in range(self.size):
            new_grid = [0] * self.size
            for i in range(1, self.size - 1):
                new_grid[i] = self.apply_rule(self.grid[i - 1], self.grid[i], self.grid[i + 1])
            self.grid = new_grid
            generations.append(new_grid.copy())
        return generations
