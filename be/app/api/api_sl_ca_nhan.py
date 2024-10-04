from fastapi import APIRouter, File, UploadFile, Depends
from app.helper.table import export_columns, execute_filtered_query, validate_and_import_excel
from sqlalchemy import  NVARCHAR, VARCHAR, INTEGER, DATE
from app.db.base import get_db_2, engine_2
from sqlalchemy.orm import Session
from datetime import date

router = APIRouter()

@router.get("/export")
async def get_qte():
    samples = [["1455",	"Nguyễn Văn A",	"11S01", date.today(), "244F110", 43, 23]]
    return export_columns("SL_CA_NHAN_DD", "sanluongcanhan", engine_2, samples, ["ID"]) 

@router.get("/")
async def filter_cn_cat(db: Session = Depends(get_db_2), NGAY: date | None = None, CHUYEN: str | None = None, MST: str | None = None, page: int = 1, size: int = 20):
    filters = {
        "NGAY": NGAY,
        "MST": MST,
        "CHUYEN": CHUYEN
    }
    return execute_filtered_query(db, "SL_CA_NHAN_DD", "NGAY", filters, page, size)

@router.post("/")
async def upload_excel(file: UploadFile = File(...)):    
    dtype = {
        "MST": VARCHAR(10),
        "HO_TEN": NVARCHAR(250),
        "CHUYEN": VARCHAR(20),
        "NGAY": DATE,
        "STYLE": VARCHAR(50),
        "MA_CONG_DOAN": VARCHAR(10),
        "SL_CA_NHAN": INTEGER,
    }

    columns_to_validate = {
        "NGAY": "date",
        "SL_CA_NHAN": "integer"
    }

    return validate_and_import_excel(file, engine_2, "SL_CA_NHAN_DD", dtype, columns_to_validate)