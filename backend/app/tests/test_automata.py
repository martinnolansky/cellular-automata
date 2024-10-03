from app.automata import CellularAutomaton

def test_automaton():
    ca = CellularAutomaton(30, 10)
    assert len(ca.run()) > 0
