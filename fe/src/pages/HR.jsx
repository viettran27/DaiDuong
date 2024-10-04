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
        name: "Xưởng",
        key: "Unit"
    },
    {
        name: "Nhà máy",
        key: "Fty"
    },
    {
        name: "KOIS",
        key: "KOIS"
    },
    {
        name: "Số công nhân",
        key: "Worker_A"
    },
    {
        name: "Số giờ",
        key: "Hours_A",
        format: (int) => {
            return int?.toFixed(1)
        }
    },
    {
        name: "Tổng số giờ",
        key: "Total_hours_A",
        format: (int) => {
            return int?.toFixed(1)
        }
    }
]

const HR = () => {
    return (
        <ExcelPage 
            title="Danh sách nhân sự"
            tableconfig={config}
            apiName={"hr"}
            filterValue={{
                "WorkDate": "",
                "Line": "",
                "Unit": ""
            }}
            filterConfig={{
                "WorkDate": {
                    name: "Ngày",
                    type: "date",
                },
                "Line": {
                    name: "Chuyền",
                    type: "text",
                    placeholder: "Nhập tên chuyền"
                },
                "Unit": {
                    name: "Xử lý",
                    type: "text",
                    placeholder: "Nhập tên xưởng"
                }
            }}
        />
    )
}

export default HR
