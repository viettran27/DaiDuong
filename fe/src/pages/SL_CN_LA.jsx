import ExcelPage from 'components/ExcelPage'

const config = [
    {
        name: "MST",
        key: "MST"
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
        name: "Chuyền",
        key: "CHUYEN"
    },
    {
        name: "SAH",
        key: "SAH"
    }
]

const SL_CN_LA = () => {
  return (
    <ExcelPage 
        title="Danh sách sản lượng công nhân là"
        tableconfig={config}
        apiName={"sl_cn_la"}
        filterValue={{
            "NGAY": "",
            "MST": "",
            "CHUYEN": ""
        }}
        filterConfig={{
            "NGAY": {
                type: "date"
            },
            "MST": {
                type: "text",
                placeholder: "Nhập MST"
            },
            "CHUYEN": {
                type: "text",
                placeholder: "Nhập tên chuyên"
            }
        }}
    />
  )
}

export default SL_CN_LA
