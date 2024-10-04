import React from 'react'
import ExcelPage from 'components/ExcelPage'

const config = [
    {
        name: "MST",
        key: "MST"
    },
    {
        name: "Họ và tên",
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
        name: "Số giờ",
        key: "SO_GIO",
        format: (value) => {
            return value?.toFixed(6)
        }
    },
    {
        name: "Chức vụ",
        key: "CHUC_VU"
    },
    {
        name: "OT",
        key: "OT",
        format: (value) => {
            return value?.toFixed(1)
        }
    }
]

const TGLV = () => {
  return (
    <ExcelPage 
        title="Danh sách thời gian làm việc"
        tableconfig={config}
        apiName={"tglv"}
        filterValue={{
            "NGAY": "",
            "MST": "",
            "CHUYEN": ""
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
            },
            "CHUYEN": {
                name: "CHUYEN",
                type: "text",
                placeholder: "Nhập tên chuyền"
            }
        }}
    />
  )
}

export default TGLV
