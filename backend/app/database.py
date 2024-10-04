from sqlalchemy import MetaData
from databases import Database
import os
from dotenv import load_dotenv

load_dotenv()

# Get the local database URL
def get_database_url():
    url = os.getenv("LOCAL_DATABASE_URL")
    
    if not url:
        raise ValueError("No database URL provided. Please set LOCAL_DATABASE_URL in your environment.")
    
    return url

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
    try:
        await database.disconnect()
        print("Successfully disconnected from the database.")
    except Exception as e:
        print(f"Failed to disconnect from the database: {str(e)}")
        raise
