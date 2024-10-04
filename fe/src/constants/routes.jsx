import CN_DI_HO_TRO from "src/pages/CN_DI_HO_TRO"
import HR from "src/pages/HR"
import QTY_ETS from "src/pages/QTY_ETS"
import SL_CA_NHAN from "src/pages/SL_CA_NHAN"
import SL_CN_CAT from "src/pages/SL_CN_CAT"
import SL_CN_LA from "src/pages/SL_CN_LA"
import SL_CN_POLY from "src/pages/SL_CN_POLY"
import SL_CN_QC1 from "src/pages/SL_CN_QC1"
import SL_CN_QC2 from "src/pages/SL_CN_QC2"
import TGLV from "src/pages/TGLV"

export const routes = [
    {
        name: "Nhân sự",
        path: "/hr",
        component: <HR/>
    },
    {
        name: "Sản lượng ETS",
        path: "/qty",
        component: <QTY_ETS />
    },
    {
        name: "Sản lượng công nhân cắt",
        path: "/sl_cn_cat",
        component: <SL_CN_CAT />
    },
    {
        name: "Thời gian làm việc",
        path: "/tglv",
        component: <TGLV />
    },
    {
        name: "Công nhân may đi hỗ trợ",
        path: "/cn_di_ho_tro",
        component: <CN_DI_HO_TRO />
    },
    {
        name: "Sản lượng cá nhân",
        path: "/sl_ca_nhan",
        component: <SL_CA_NHAN />
    },
    {
        name: "Sản lượng QC may",
        path: "/sl_qc1",
        component: <SL_CN_QC1 />
    },
    {
        name: "Sản lượng là",
        path: "/sl_la",
        component: <SL_CN_LA />
    },
    {
        name: "Sản lượng QC là",
        path: "/sl_qc2",
        component: <SL_CN_QC2 />
    },
    {
        name: "Sản lượng Poly",
        path: "/sl_cn_poly",
        component: <SL_CN_POLY />
    }
]
