from fastapi import APIRouter, HTTPException, File, UploadFile, Depends
from app.helper.table import export_columns, execute_filtered_query, validate_and_import_excel
from sqlalchemy import DATE, VARCHAR, NVARCHAR, DECIMAL
import pandas as pd
from app.db.base import get_db_2, engine_2
from sqlalchemy.orm import Session
from datetime import date

router = APIRouter()

@router.get("/export")
async def get_qte():
    examples = [["731", "NT1", date.today(), 87.28731]]
    return export_columns("SL_CN_CUT_DD", "sanluongcongnhancat", engine_2, examples) 

@router.get("/")
async def filter_cn_cat(db: Session = Depends(get_db_2), NGAY: date | None = None, MST: str | None = None, page: int = 1, size: int = 20):
    filters = {
        "NGAY": NGAY,
        "MST": MST
    }
    return execute_filtered_query(db, "SL_CN_CUT_DD", "NGAY", filters, page, size)

@router.post("/")
async def upload_excel(file: UploadFile = File(...)):    
    dtype = {
        "MST": VARCHAR(100),
        "NHAMAY": NVARCHAR(3),
        "NGAY": DATE,
        "SAH": DECIMAL(38,7)
    }

    columns_to_validate = {
        "NGAY": "date",
        "SAH": "number"
    }

    return validate_and_import_excel(file, engine_2, "SL_CN_CUT_DD", dtype, columns_to_validate)