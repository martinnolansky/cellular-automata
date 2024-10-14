class CellularAutomaton:
    def __init__(self, rule, size):
        self.rule = rule
        self.size = size
        self.grid = [0] * size
        self.grid[size // 2] = 1
        self.rule_binary = format(rule, '08b')

    def apply_rule(self, left, center, right):
        index = 4 * left + 2 * center + right
        return int(self.rule_binary[7 - index])

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
    