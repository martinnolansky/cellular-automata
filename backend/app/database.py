from sqlalchemy import MetaData
from databases import Database
import os
from dotenv import load_dotenv

load_dotenv()

# Determine if we're running in Docker or locally
def get_database_url():
    if os.environ.get('DOCKER_ENV'):
        return os.getenv("DATABASE_URL")
    return os.getenv("LOCAL_DATABASE_URL")

DATABASE_URL = get_database_url()
database = Database(DATABASE_URL)
metadata = MetaData()

async def connect():
    try:
        await database.connect()
        print(f"Successfully connected to database at {DATABASE_URL}")
    except Exception as e:
        print(f"Failed to connect to database: {str(e)}")
        raise

async def disconnect():
    await database.disconnect()