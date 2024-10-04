"""
This FastAPI application generates cellular automata patterns based on a provided rule and size.
It supports CORS for frontend integration and stores automata run data (rule, size, pattern, timestamp)
in a PostgreSQL database using SQLAlchemy. The application manages the database connection lifecycle 
using FastAPI's lifespan context manager.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.automata import CellularAutomaton
from app.database import connect, disconnect, database
from app.models import Run
import datetime
import json

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
    automaton = CellularAutomaton(request.rule, request.size)
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
        return {"error": str(e)}

    return {"pattern": pattern}