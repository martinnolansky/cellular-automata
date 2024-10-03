from fastapi import FastAPI
from pydantic import BaseModel
from app.automata import CellularAutomaton

app = FastAPI()

class AutomatonRequest(BaseModel):
    rule: int
    size: int = 10  # Default size

@app.get("/")
def read_root():
    return {"message": "Cellular Automata API"}

@app.post("/automata")
def generate_pattern(request: AutomatonRequest):
    automaton = CellularAutomaton(request.rule, request.size)
    return {"pattern": automaton.run()}

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow your Next.js app
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)
