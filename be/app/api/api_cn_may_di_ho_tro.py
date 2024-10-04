from fastapi import APIRouter, File, UploadFile, Depends
from app.helper.table import export_columns, execute_filtered_query, validate_and_import_excel
from sqlalchemy import  DECIMAL, NVARCHAR, VARCHAR, TIME, DATE
from app.db.base import get_db_2, engine_2
from sqlalchemy.orm import Session
from datetime import date

router = APIRouter()

@router.get("/export")
async def get_qte():
    examples = [["NT1", "11923", "Nguyễn Văn A", "Công nhân may công nghiệp", "11S01",	"11S03", date.today(), "15:00",	2.5]]
    return export_columns("CN_MAY_DI_HO_TRO_DD", "congnhanmaydihotro", engine_2, examples, ["ID"]) 

@router.get("/")
async def filter_cn_cat(db: Session = Depends(get_db_2), MST: date | None = None, CHUYEN: str | None = None, NGAY_DI_HO_TRO: str | None = None, page: int = 1, size: int = 20):
    filters = {
        "NGAY_DI_HO_TRO": NGAY_DI_HO_TRO,
        "MST": MST,
        "CHUYEN": CHUYEN
    }
    return execute_filtered_query(db, "CN_MAY_DI_HO_TRO_DD", "NGAY_DI_HO_TRO", filters, page, size)

@router.post("/")
async def upload_excel(file: UploadFile = File(...)):    
    dtype = {
        "NHA_MAY": VARCHAR(20),
        "MST": VARCHAR(20),
        "HO_TEN": NVARCHAR(100),
        "CHUC_DANH": NVARCHAR(200),
        "CHUYEN": VARCHAR(50),
        "CHUYEN_DI_HO_TRO": VARCHAR(50),
        "NGAY_DI_HO_TRO": DATE,
        "GIO_DI_HO_TRO": TIME(7),
        "SO_GIO_HO_TRO": DECIMAL(3,1)
    }

    columns_to_validate = {
        "NGAY_DI_HO_TRO": "date",
        "SO_GIO_HO_TRO": "number"
    }

    return validate_and_import_excel(file, engine_2, "CN_MAY_DI_HO_TRO_DD", dtype, columns_to_validate)