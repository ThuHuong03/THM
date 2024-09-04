import React from 'react'
import {ActivedButton, InActivedButton} from './Button'
import { Link } from 'react-router-dom'

function NavBar({isActive}) {
  return (
    <div className=' flex items-center space-x-4 bg-white p-2'>

        <span className='w-[40%] text-4xl text-custom-green font-bold'> THM system</span>
        {
            isActive==1? <Link to='/khachhang'> <ActivedButton text="Khách hàng"/>  </Link>:   <Link to='/khachhang'> <InActivedButton text="Khách hàng"/></Link>
        }
       
       {
            isActive==2?< Link to='/daily'>  <ActivedButton text="Đại lý"/></Link> :  < Link to='/daily'>  <InActivedButton text="Đại lý"/></Link>
        }
       
       {
            isActive==3?  < Link to='/nhacungcap'><ActivedButton text="Nhà cung cấp"/> </Link>:    < Link to='/nhacungcap'>  <InActivedButton text="Nhà cung cấp"/> </Link>
        }
       
       {
            isActive==4? <Link to='/kho/xuatkho'> <ActivedButton text="Kho"/>  </Link>:  <Link to='/kho/xuatkho'>  <InActivedButton text="Kho"/> </Link>
        }
       
       {
            isActive==5? <ActivedButton text="Báo cáo"/> :    <InActivedButton text="Báo cáo"/>
        }
       
    </div>
  )
}

 function SubNavBar ({isActive}){
  return(
    <div className='flex items-center space-x-4 bg-dark-rust p-2 inline-flex rounded-lg mb-5 mt-5'>
      {
        isActive==1? <InActivedButton text="Xuất kho"/> :
     <Link to='/kho/xuatkho'><ActivedButton text="Xuất kho"/></Link> 
    }
     {
        isActive==2? <InActivedButton text="Nhập kho"/> :
        <Link to='/kho/nhapkho'>  <ActivedButton text="Nhập kho"/> </Link>
    }
     {
        isActive==3? <InActivedButton text="Quản lý phiếu xuất/ nhập kho"/> :
      <ActivedButton text="Quản lý phiếu xuất/ nhập kho"/>
    }
      
    </div>
  )
}

export { NavBar, SubNavBar}
