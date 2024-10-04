import pandas as pd
from fastapi import APIRouter, File, UploadFile, Depends
from app.helper.table import export_columns, execute_filtered_query, validate_and_import_excel
from sqlalchemy import DATE, VARCHAR, DECIMAL, Integer
from app.db.base import get_db_1, engine_1
from sqlalchemy.orm import Session
from datetime import date
router = APIRouter()

@router.get("/export")
async def get_sample_hr():
    examples = [[date.today(), "11S01", "1P01", "NT1", "K", 33, 11.5, 349.5]]
    return export_columns("HR_DD", "hr", engine_1, examples) 

@router.get("/")
async def filter_hr(db: Session = Depends(get_db_1), WorkDate: date | None = None, Line: str | None = None, Unit: str | None = None, page: int = 1, size: int = 20):
    filters = {
        "WorkDate": WorkDate,
        "Line": Line,
        "Unit": Unit
    }
    return execute_filtered_query(db, "HR_DD", "WorkDate", filters, page, size)

@router.post("/")
async def upload_excel(file: UploadFile = File(...)):
    dtype = {
        "WorkDate": DATE,
        "Line": VARCHAR(100),
        "Unit": VARCHAR(10),
        "Fty": VARCHAR(10),
        "KOIS": VARCHAR(10),
        "Worker_A": Integer,
        "Hours_A": DECIMAL(3, 1),
        "Total_hours_A": DECIMAL(5,1)
    }

    columns_to_validate = {
        "WorkDate": "date",
        "Worker_A": "integer",
        "Hours_A": "number",
        "Total_hours_A": "number"
    }

    return validate_and_import_excel(file, engine_1, "HR_DD", dtype, columns_to_validate)
