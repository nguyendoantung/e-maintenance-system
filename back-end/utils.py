import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DATABASE_NAME = os.getenv("DATABASE_NAME")

db_url = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DATABASE_NAME}"


def create_session():
    engine = create_engine(
        db_url,
        poolclass=NullPool,
    )
    make_session = sessionmaker(bind=engine, autoflush=False)
    session = make_session()
    return session
