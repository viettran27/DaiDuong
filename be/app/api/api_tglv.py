from fastapi import APIRouter, File, UploadFile, Depends
from app.helper.table import export_columns, execute_filtered_query, validate_and_import_excel
from sqlalchemy import  DECIMAL, NVARCHAR, VARCHAR, NUMERIC, DATE
from app.db.base import get_db_2, engine_2
from sqlalchemy.orm import Session
from datetime import date

router = APIRouter()

@router.get("/export")
async def get_qte():
    examples = [["12806", "Nguyễn Văn A", "1ADM00",	date.today(),9.5, "Công nhân vệ sinh công nghiệp nơi sản xuất",	1.5]]
    return export_columns("TGLV_DD", "thoigianlamviec", engine_2, examples) 

@router.get("/")
async def filter_cn_cat(db: Session = Depends(get_db_2), NGAY: date | None = None, CHUYEN: str | None = None, MST: str | None = None, page: int = 1, size: int = 20):
    filters = {
        "NGAY": NGAY,
        "MST": MST,
        "CHUYEN": CHUYEN
    }
    return execute_filtered_query(db, "TGLV_DD", "NGAY", filters, page, size)

@router.post("/")
async def upload_excel(file: UploadFile = File(...)):    
    dtype = {
        "MST": VARCHAR(20),
        "HO_TEN": NVARCHAR(255),
        "CHUYEN": VARCHAR(100),
        "NGAY": DATE,
        "SO_GIO": NUMERIC(17,6),
        "CHUC_VU": NVARCHAR(255),
        "OT": DECIMAL(10,1)
    }

    columns_to_validate = {
        "NGAY": "date",
        "SO_GIO": "number",
        "OT": "number"
    }

    return validate_and_import_excel(file, engine_2, "TGLV_DD", dtype, columns_to_validate)