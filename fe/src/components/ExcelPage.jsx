import { useState, useEffect, useRef } from 'react'
import { useOutletContext } from "react-router-dom";
import { useToast } from 'src/store/toast'
import axiosClient from 'api/axios'
import Input from 'components/Input'
import Table from 'components/Table'
import ReactPaginate from 'react-paginate'
import { X, Search } from 'lucide-react'
import { useLoading } from 'src/store/loading'
import PaginationButton from 'src/components/PaginationButton'
import { ERR } from 'src/constants/HTTP'
import UploadFile from './UploadFile';

const PAGE_SIZE = 20
const ExcelPage = ({tableconfig, apiName, filterValue, filterConfig, title}) => {
    const showMessage = useToast((state) => state.showMessage)
    const { showLoading, hideLoading } = useLoading((state) => state)

    const action = useRef(null)
    const scrollTop = useOutletContext()

    const [file, setFile] = useState(null)
    const [tableData, setTableData] = useState([])
    const [filter, setFilter] = useState(filterValue)
    const [totalPage, setTotalPage] = useState(0)
    const [page, setPage] = useState(1)
    const [top, setTop] = useState(0)

    useEffect(() => {
        setTop(action.current?.getBoundingClientRect().height + 80)
        
        const handleSetTopTable = () => {
            setTop(action.current?.getBoundingClientRect().height + 80)
        }

        window.addEventListener("resize", handleSetTopTable)
        return () => {
            window.removeEventListener("resize", handleSetTopTable)
        }
    }, [action.current])

    useEffect(() => {
        getDataTable()
    }, [])

    const getURL = (page) => {
        let url = `/api_${apiName}/`
        const queries = []
        Object.entries(filter).forEach(([key, value]) => {
            if (value) queries.push(`${key}=${value}`)
        })
        if (queries.length > 0) {
            url += `?${queries.join("&")}&page=${page}&size=${PAGE_SIZE}`
        } else {
            url += `?page=${page}&size=${PAGE_SIZE}`
        }

        return url
    }

    const getDataTable = (page_param) => {
        const url = getURL(page_param || page)

        showLoading()
        axiosClient.get(url)
            .then((res) => {
                setTableData(res?.data)
                setTotalPage(res?.total_page)
                scrollTop()
                hideLoading()
            })
            .catch((err) => {
                hideLoading()
                showMessage("error", err?.response?.data?.detail || ERR)
            })
    }

    const handleGetExample = () => {
        const url = `${import.meta.env.VITE_API}/api_${apiName}/export`

        const link = document.createElement('a');
        link.href = url;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleGetFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleSave = () => {
        const formData = new FormData()
        formData.append("file", file)
        showLoading()
        axiosClient.post(`/api_${apiName}`, formData)
            .then((res) => {
                showMessage("success", res?.message)
                handleDeleteSearch()
            }).catch((err) => {
                hideLoading()
                showMessage("error", err?.response?.data?.detail || ERR)
            })
    }

    const handleSeach = () => {
        showLoading()
        getDataTable(1)
        setPage(1)
    }

    const handleDeleteSearch = () => {
        setFilter(filterValue)
        showLoading()
        axiosClient.get(`/api_${apiName}?page=1&size=${PAGE_SIZE}`)
            .then((res) => {
                setTableData(res?.data)
                setTotalPage(res?.total_page)
                setPage(1)
                scrollTop()
                hideLoading()
            }).catch((err) => {
                hideLoading()
                showMessage("error", err?.response?.data?.detail || ERR)
            })
    }

    const handleChangePage = (e) => {
        const page = e.selected + 1
        showLoading()
        getDataTable(page)
        setPage(page)
    }

    return (
        <div>
            <div ref={action} className='bg-white px-2 py-4 sticky top-[80px] z-20'>
                <div className='flex gap-2 items-center py-2 flex-wrap'>
                    <button onClick={handleGetExample} className='p-2 pt-[0.45rem] flex item bg-green-600 rounded-xl text-white'>Lấy mẫu excel</button>
                    <UploadFile onChange={handleGetFile} />
                    <button onClick={handleSave} className='p-2 pt-[0.45rem] bg-green-600 rounded-xl text-white min-w-[70px]'>Lưu</button>
                </div>
                <div className='border-b border-gray-300 w-full mt-1'></div>
                <h1 className='text-black text-2xl font-bold mt-1'>{title}</h1>
                <div className='flex gap-2 mt-2 flex-wrap'>
                    {
                        Object.entries(filterConfig).map(([key, value]) => (
                            <Input 
                                key={key} 
                                type={value.type} 
                                placeholder={value.placeholder} 
                                value={filter[key]} 
                                onChange={(e) => setFilter({ ...filter, [key]: e.target.value })} 
                            />
                        ))
                    }
                    <button onClick={handleSeach} className='flex items-center bg-green-600 text-white rounded-lg p-2'>
                        <Search className='mr-1' />
                        Tìm kiếm
                    </button>
                    <button onClick={handleDeleteSearch} className='bg-red-500 text-white rounded-lg p-2'>
                        <X />
                    </button>
                </div>
            </div>
            <div className='px-2 pb-5'>
                <Table
                    config={tableconfig}
                    hasIndex={true}
                    data={tableData}
                    top={top}
                    startIndex={(page - 1) * PAGE_SIZE}
                />
                {
                    totalPage > 1 &&
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel={<PaginationButton direction="next" />}
                        pageRangeDisplayed={3}
                        pageCount={totalPage}
                        forcePage={page - 1}
                        className='flex items-center justify-center gap-2 mt-5'
                        pageLinkClassName='px-4 py-2 block border rounded-lg cursor-pointer overflow-hidden'
                        activeLinkClassName='bg-[#4e73df] text-white'
                        onPageChange={handleChangePage}
                        previousLabel={<PaginationButton direction="prev" />}
                        renderOnZeroPageCount={null}
                    />
                }
            </div>
        </div>
    )
}

export default ExcelPage
