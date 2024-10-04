import React from 'react'

const Input = ({type, placeholder, value, onChange}) => {
  return (
    <input 
        className='border border-gray-300 p-2 rounded-lg outline-none' 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
  )
}

export default Input
