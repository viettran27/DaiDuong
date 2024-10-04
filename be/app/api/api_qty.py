from fastapi import APIRouter, File, UploadFile, Depends
from app.helper.table import export_columns, execute_filtered_query, validate_and_import_excel
from sqlalchemy import DATE, INTEGER, DATETIME, VARCHAR
import pandas as pd 
from app.db.base import get_db_1, engine_1
from sqlalchemy.orm import Session
from datetime import date, datetime

router = APIRouter()

@router.get("/export")
async def get_qte():
    examples = [[date.today(), "11S01", "244N063", "V2401322002", 1496,	"9:30"]]
    return export_columns("ETS_Qty_DD", "sanluongETS", engine_1, examples) 

@router.get("/")
async def filter_hr(db: Session = Depends(get_db_1), WorkDate: date | None = None, Line: str | None = None, Style_A: str | None = None, page: int = 1, size: int = 20):
    filters = {
        "WorkDate": WorkDate,
        "Line": Line,
        "Style_A": Style_A
    }
    return execute_filtered_query(db, "ETS_Qty_DD", "WorkDate", filters, page, size)

@router.post("/")
async def upload_excel(file: UploadFile = File(...)):    
    dtype = {
        "WorkDate": DATE,
        "Line": VARCHAR(100),
        "Style_A": VARCHAR(100),
        "MO_A": VARCHAR(100),
        "Qty_A": INTEGER,
        "Time_stamp": DATETIME
    }

    columns_to_validate = {
        "WorkDate": "date",
        "Qty_A": "integer",
        "Time_stamp": "time"
    }

    return validate_and_import_excel(file, engine_1, "ETS_Qty_DD", dtype, columns_to_validate, "WorkDate")