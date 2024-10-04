from sqlalchemy import Column, Integer, String, Float
from app.db.base import Base

class HR(Base):
    __tablename__ = "HR_DD"

    WorkDate = Column(String, primary_key=True)
    Line = Column(String)
    Unit = Column(String)
    Fty = Column(String)
    KOIS = Column(String)
    Worker_A = Column(Integer)
    Hours_A = Column(Float)
    Total_hours_A = Column(Float)
