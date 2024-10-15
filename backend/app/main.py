from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.automata import CellularAutomaton
from app.database import connect, disconnect, database
from app.models import Run
import datetime
import json
import os

RULES_JSON_PATH = os.path.join("frontend", "public", "static", "cellular_automata_rules.json")

def load_rule_data(rule_number):
    with open(RULES_JSON_PATH, 'r') as file:
        rules = json.load(file)
    rule_data = next((rule for rule in rules if rule["rule_number"] == rule_number), None)
    if not rule_data:
        raise HTTPException(status_code=404, detail=f"Rule {rule_number} not found in JSON file.")
    return rule_data

async def lifespan(app: FastAPI):
    await connect()
    yield
    await disconnect()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AutomatonRequest(BaseModel):
    rule: int
    size: int = 10

@app.post("/automata")
async def generate_pattern(request: AutomatonRequest):
    if request.rule < 0 or request.rule > 255:
        raise HTTPException(status_code=400, detail="Rule must be between 1 and 256.")
    if request.size < 1:
        raise HTTPException(status_code=400, detail="Generations must be between 1 and 1000.")

    rule_data = load_rule_data(request.rule)
    basic_rules = rule_data["basic_rules"]

    automaton = CellularAutomaton(basic_rules, request.size)
    pattern = automaton.run()

    run_record = Run(
        rule=request.rule,
        size=request.size,
        pattern=json.dumps(pattern),
        timestamp=datetime.datetime.now()
    )
    try:
        query = Run.__table__.insert().values(
            rule=run_record.rule,
            size=run_record.size,
            pattern=run_record.pattern,
            timestamp=run_record.timestamp
        )
        await database.execute(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

    return {"pattern": pattern}
