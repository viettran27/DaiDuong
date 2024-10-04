import React from 'react'

const Table = ({ hasIndex, config, data, top, startIndex }) => {    
    return (
        <table className='table-auto w-full border-separate border-spacing-0'>
            <thead className='sticky' style={{ top: top ? top : 0 }}>
                <tr>
                    {hasIndex && <td className='font-bold first:border-l border-t border-b border-r border-gray-300 text-center bg-[#4e73df] text-white'>STT</td>}
                    {config.map((item, index) => (
                        <th
                            key={index}
                            style={{ minWidth: item.width ? item.width : 'auto', width: item.width ? item.width : 'auto' }}
                            className='font-bold border-t border-b border-r py-2 border-gray-300 text-center bg-[#4e73df] text-white'>
                            {item.name}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    !data || data?.length === 0 ?
                        <tr className='text-center'>
                            <td className='py-2 border-r border-l border-b border-gray-300' colSpan={hasIndex ? config.length + 1 : config.length}>Không có dữ liệu</td>
                        </tr>
                        :
                        data?.map((item, index) => (
                            <tr key={index}>
                                {hasIndex && <td className='first:border-l border-b border-r border-gray-300 text-center py-2'>{startIndex ? startIndex + index + 1 : index + 1}</td>}
                                {config.map((col, index) => (
                                    <td
                                        key={index}
                                        className='border-b border-r border-gray-300 text-center py-2'
                                    >
                                        {col?.format ? col.format(item[col.key]) : item[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                }
            </tbody>
        </table>
    )
}

export default Table
