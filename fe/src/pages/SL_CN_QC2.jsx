import ExcelPage from 'components/ExcelPage'

const config = [
    {
        name: "MST",
        key: "MST"
    },
    {
        name: "Nhà máy",
        key: "NHA_MAY"
    },
    {
        name: "Ngày",
        key: "NGAY",
        format: (date_str) => {
            if (typeof date_str === 'undefined' || date_str === null) return date_str 
            const date = new Date(date_str);

            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
            const year = date.getFullYear();
            
            return `${day}/${month}/${year}`;
        }
    },
    {
        name: "SAH",
        key: "SAH"
    }
]

const SL_CN_QC2 = () => {
  return (
    <ExcelPage 
        title="Danh sách sản lượng QC2"
        tableconfig={config}
        apiName={"sl_cn_qc2"}
        filterValue={{
            "NGAY": "",
            "MST": ""
        }}
        filterConfig={{
            "NGAY": {
                type: "date"
            },
            "MST": {
                type: "text",
                placeholder: "Nhập MST"
            }
        }}
    />
  )
}

export default SL_CN_QC2
