class CellularAutomaton:
    def __init__(self, rule, size):
        self.rule = rule
        self.size = size
        self.grid = [0] * size
        self.grid[size // 2] = 1  # Initial state with a single "on" cell

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
