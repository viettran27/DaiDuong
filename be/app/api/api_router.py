from fastapi import APIRouter
from app.api import api_hr, api_qty, api_sl_cn_cat, api_tglv, api_cn_may_di_ho_tro, api_sl_ca_nhan, api_cn_qc1, api_cn_la, api_cn_qc2, api_cn_poly

router = APIRouter()

router.include_router(api_hr.router, tags=["HR"], prefix="/api_hr")
router.include_router(api_qty.router, tags=["Sản lượng ETS"], prefix="/api_qty")
router.include_router(api_sl_cn_cat.router, tags=["Số lượng công nhân cắt"], prefix="/api_sl_cn_cat")
router.include_router(api_tglv.router, tags=["Thời gian làm việc"], prefix="/api_tglv")
router.include_router(api_cn_may_di_ho_tro.router, tags=["Công nhân may đi hỗ trợ"], prefix="/api_cn_may_di_ho_tro")
router.include_router(api_sl_ca_nhan.router, tags=["Sản lượng cá nhân"], prefix="/api_sl_ca_nhan")
router.include_router(api_cn_qc1.router, tags=["Sản lượng công nhân qc1"], prefix="/api_sl_cn_qc1")
router.include_router(api_cn_la.router, tags=["Sản lượng công nhân la"], prefix="/api_sl_cn_la")
router.include_router(api_cn_qc2.router, tags=["Sản lượng công qc2"], prefix="/api_sl_cn_qc2")
router.include_router(api_cn_poly.router, tags=["Sản lượng công nhân poly"], prefix="/api_sl_cn_poly")