import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

 function ActivedButton({text, onClick=null}) {
  return (
    <button
    onClick={onClick}
    className={`h-12 px-4 py-2 bg-dark-rust text-white rounded hover:bg-dark-rust-400 active:bg-dark-rust-600 rounded-lg text-lg font-bold min-w-[120px] `}
    // {...props}
  >
   {text}
  </button>
  )
}

 function InActivedButton({text}) {
    return (
      <button
      // onClick={onClick}
      className={`h-12 px-4 py-2 bg-white text-black rounded-lg text-lg font-bold hover:bg-dark-rust-200 active:bg-dark-rust-600 text-black min-w-[120px]`}
      // {...props}
    >
     {text}
    </button>
    )
  }

 function IconButton({icon}){
    return (
        <button
        // onClick={onClick}
        className={`h-12 px-4 py-2  bg-white text-white rounded-lg text-lg font-bold hover:bg-custom-green-200  min-w-[50px]`}
        // {...props}
      >
       <i className=''> </i>
      </button>
      )
 }

 function AddButton({text, onClick}) {
  return (
    <button
    onClick={onClick}
    className={` flex justify-between items-center h-12 px-4 py-2 bg-custom-green text-black rounded-lg text-lg font-bold hover:bg-custom-green-200 active:bg-custom-green-600 text-black min-w-[120px] mb-5 `}
    // {...props}
  >
    <FaPlus className='text-black mr-2'/>
   {text}
  </button>
  )
}
function GreenButton({text, onClick}) {
  return (
    <button
    onClick={onClick}
    className={` h-12 px-4 py-2 bg-custom-green text-black rounded-lg text-lg font-bold hover:bg-custom-green-200 focus:bg-custom-green-600 focus:scale-130 text-black min-w-[120px] mb-5 `}
    // {...props}
  >
 
   {text}
  </button>
  )
}
function ToggleButton() {
  
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none 
        ${isToggled ? 'bg-green-500' : 'bg-gray-300'}`}
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300
          ${isToggled ? 'translate-x-8' : 'translate-x-1'}`}
      />
    </button>
  );
}
  export { InActivedButton, ActivedButton, AddButton , GreenButton, ToggleButton}