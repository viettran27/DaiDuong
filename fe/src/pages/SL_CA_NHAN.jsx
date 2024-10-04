import ExcelPage from "components/ExcelPage";


const config = [
    {
        name: "MST",
        key: "MST"
    },
    {
        name: "Họ tên",
        key: "HO_TEN"
    },
    {
        name: "Chuyền",
        key: "CHUYEN"
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
        name: "Style",
        key: "STYLE"
    },
    {
        name: "Mã công đoạn",
        key: "MA_CONG_DOAN",
    },
    {
        name: "Sản lượng cá nhân",
        key: "SL_CA_NHAN",
    }
]

const SL_CA_NHAN = () => {
  return (
    <ExcelPage 
        title="Danh sách sản lượng cá nhân"
        tableconfig={config}
        apiName={"sl_ca_nhan"}
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
                placeholder: "Nhập tên chuyền"
            }
        }}
    />
  )
}

export default SL_CA_NHAN
