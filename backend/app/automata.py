class CellularAutomaton:
    def __init__(self, basic_rules, size):
        self.size = size
        self.grid = [0] * size
        self.grid[size // 2] = 1
        self.basic_rules = basic_rules

    def apply_rule(self, left, center, right):
        pattern = f"{left}{center}{right}"
        return self.basic_rules[pattern]

    def run(self):
        generations = [self.grid.copy()]
        for _ in range(self.size):
            new_grid = [0] * self.size
            for i in range(self.size):
                left = self.grid[(i - 1) % self.size]
                center = self.grid[i]
                right = self.grid[(i + 1) % self.size]
                new_grid[i] = self.apply_rule(left, center, right)
            self.grid = new_grid
            generations.append(new_grid.copy())
        return generations
