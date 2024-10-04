from fastapi import APIRouter, File, UploadFile, Depends
from app.helper.table import export_columns, execute_filtered_query, validate_and_import_excel
from sqlalchemy import NVARCHAR, VARCHAR, DECIMAL, DATE
from app.db.base import get_db_2, engine_2
from sqlalchemy.orm import Session
from datetime import date

router = APIRouter()

@router.get("/export")
async def get_qte():
    samples = [["1295", "NT1", date.today(), 3.0015]]
    return export_columns("SL_CN_QC1_DD", "sanluongqc1", engine_2, samples) 

@router.get("/")
async def filter_cn_cat(db: Session = Depends(get_db_2), NGAY: date | None = None, MST: str | None = None, page: int = 1, size: int = 20):
    filters = {
        "NGAY": NGAY,
        "MST": MST
    }
    return execute_filtered_query(db, "SL_CN_QC1_DD", "NGAY", filters, page, size)

@router.post("/")
async def upload_excel(file: UploadFile = File(...)):    
    dtype = {
        "MST": VARCHAR(100),
        "NHA_MAY": NVARCHAR(3),
        "NGAY": DATE,
        "SAH": DECIMAL(38,7)
    }

    columns_to_validate = {
        "NGAY": "date",
        "SAH": "number"
    }

    return validate_and_import_excel(file, engine_2, "SL_CN_QC1_DD", dtype, columns_to_validate)