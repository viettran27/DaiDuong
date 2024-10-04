from typing import Generator
from app.core.config import settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine_1 = create_engine(settings.DATABASE_1_URL, pool_pre_ping=True)
SessionLocal_1 = sessionmaker(autocommit=False, autoflush=False, bind=engine_1)

engine_2 = create_engine(settings.DATABASE_2_URL, pool_pre_ping=True)
SessionLocal_2 = sessionmaker(autocommit=False, autoflush=False, bind=engine_2)

Base = declarative_base()

def get_db_1() -> Generator:
    try:
        db = SessionLocal_1()
        yield db
    finally:
        db.close()

def get_db_2() -> Generator:
    try:
        db = SessionLocal_2()
        yield db
    finally:
        db.close()
        