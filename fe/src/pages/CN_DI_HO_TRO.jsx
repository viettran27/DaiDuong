import ExcelPage from 'components/ExcelPage'

const config = [
    {
        name: "Nhà máy",
        key: "NHA_MAY"
    },
    {
        name: "MST",
        key: "MST"
    },
    {
        name: "Họ tên",
        key: "HO_TEN"
    },
    {
        name: "Chức danh",
        key: "CHUC_DANH"
    },
    {
        name: "Chuyền",
        key: "CHUYEN"
    },
    {
        name: "Chuyền đi hỗ trợ",
        key: "CHUYEN_DI_HO_TRO",
    },
    {
        name: "Ngày đi hỗ trợ",
        key: "NGAY_DI_HO_TRO",
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
        name: "Giờ đi hỗ trợ",
        key: "GIO_DI_HO_TRO",
        format: (time_str) => {
            if (typeof time_str === 'undefined' || time_str === null) return "" 
            const time = time_str.split(":");
            return `${time[0]}:${time[1]}`
        }
    },
    {
        name: "Số giờ hỗ trợ",
        key: "SO_GIO_HO_TRO",
    }
]

const CN_DI_HO_TRO = () => {
  return (
    <ExcelPage 
        title="Danh sách công nhân may đi hỗ trợ"
        tableconfig={config}
        apiName={"cn_may_di_ho_tro"}
        filterValue={{
            "NGAY_DI_HO_TRO": "",
            "MST": "",
            "CHUYEN": ""
        }}
        filterConfig={{
            "NGAY_DI_HO_TRO": {
                type: "date"
            },
            "MST": {
                type: "text",
                placeholder: "Nhập MST"
            },
            "CHUYEN": {
                type: "text",
                placeholder: "Nhập tên chuyền"
            }
        }}
    />
  )
}

export default CN_DI_HO_TRO
