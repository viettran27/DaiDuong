import ExcelPage from 'components/ExcelPage'

const config = [
    {
        name: "Ngày",
        key: "WorkDate",
        width: "20%",
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
        key: "Line"
    },
    {
        name: "Style",
        key: "Style_A"
    },
    {
        name: "MO",
        key: "MO_A"
    },
    {
        name: "Sản lượng",
        key: "Qty_A"
    },
    {
        name: "Thời gian",
        key: "Time_stamp",
        format: (datetime) => {
            if (typeof datetime === 'undefined' || datetime === null) return datetime 
            const date = new Date(datetime);
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');

            return `${hours}:${minutes}`;
        }
    }
]
const QTY_ETS = () => {
    return (
        <ExcelPage
            title="Danh sách sản lượng ETS"
            tableconfig={config}
            apiName={"qty"}
            filterValue={{
                "WorkDate": "",
                "Line": "",
                "Style_A": ""
            }}
            filterConfig={{
                "WorkDate": {
                    name: "Ngày",
                    type: "date",
                },
                "Line": {
                    name: "Chuyển",
                    type: "text",
                    placeholder: "Nhập tên chuyền"
                },
                "Style_A": {
                    name: "Style",
                    type: "text",
                    placeholder: "Nhập tên style"
                }
            }}
        />
    )
}

export default QTY_ETS
