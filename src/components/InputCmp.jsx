import React from 'react'

export default function InputCmp({title,placeholder, value, onChangeValue, type}) {
  return (
    <div className=' flex flex-col m-2'>
      <label className='font-bold text-xl mb-0.5'> {title}</label>
      <input placeholder={placeholder} className='w-[440px] h-12 rounded-lg p-5 bg-[#F5F6FA] font-semibold text-xl'/>
    </div>
  )
}
