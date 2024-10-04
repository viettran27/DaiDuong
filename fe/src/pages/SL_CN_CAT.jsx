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

const SL_CN_CAT = () => {
    return (
        <ExcelPage 
            title="Danh sách sản lượng công nhân cắt"
            tableconfig={config}
            apiName={"sl_cn_cat"}
            filterValue={{
                "NGAY": "",
                "MST": "",
                "NHA_MAY": ""
            }}
            filterConfig={{
                "NGAY": {
                    name: "Ngày",
                    type: "date"
                },
                "MST": {
                    name: "MST",
                    type: "text",
                    placeholder: "Nhập MST"
                }
            }}
        />
    )
}

export default SL_CN_CAT
