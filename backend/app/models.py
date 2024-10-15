from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Run(Base):
    __tablename__ = 'automaton_runs'

    id = Column(Integer, primary_key=True, index=True)
    rule = Column(Integer)
    size = Column(Integer)
    pattern = Column(String)
    timestamp = Column(DateTime)