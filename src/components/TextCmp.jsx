import React from 'react'
import { ActivedButton } from './Button'
export default function TextCmp({title, text, OnClickButton}) {
  return (
    <div className='flex flex-row justify-between items-center'>

    <div className='flex flex-col min-w-[200px]'>
        <label className='text-dark-rust font-bold text-2xl '>{title}</label>
        <label className=' font-semibold text-xl'>{text}</label>
    </div>
    {
        OnClickButton&&  <ActivedButton text='Bán'/>
    }
   
    </div>

  )
}
