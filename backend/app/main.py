from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.automata import CellularAutomaton
from app.database import connect, disconnect, database
from app.models import Run
import datetime
import json

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:3000",  # Your frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from these origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

class AutomatonRequest(BaseModel):
    rule: int
    size: int = 10  # Default size

@app.post("/automata")
async def generate_pattern(request: AutomatonRequest):
    automaton = CellularAutomaton(request.rule, request.size)
    pattern = automaton.run()

    # Create a Run object
    run_record = Run(
        rule=request.rule,
        size=request.size,
        pattern=json.dumps(pattern),  # Serialize the pattern to a JSON string
        timestamp=datetime.datetime.now()
    )

    try:
        # Insert into the database using SQLAlchemy's ORM
        query = Run.__table__.insert().values(
            rule=run_record.rule,
            size=run_record.size,
            pattern=run_record.pattern,
            timestamp=run_record.timestamp
        )
        await database.execute(query)
    except Exception as e:
        return {"error": str(e)}  # Return the error message

    return {"pattern": pattern}

# Startup and shutdown functions
@app.on_event("startup")
async def startup_event():
    await connect()

@app.on_event("shutdown")
async def shutdown_event():
    await disconnect()
