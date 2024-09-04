import React, { useState } from 'react'
import {  NavBar, SubNavBar } from '../../../components/NavBar'
import { ActivedButton, GreenButton } from '../../../components/Button'
import AddBill from './AddBill';
import BillByItem from './BillByItem';

export default function Bill() {
    const [type, setType] = useState(true);
    const [layout, setLayout] = useState(0);
    const onClickContinue = () =>{
        setLayout(1);
    } 
    const OnClickCancel= () =>{
        setLayout(0);
    }
 return (
    <div>
         <div className="h-auto bg-creamy-white">
         <NavBar isActive={4} />
            <div className='ml-[110px] mr-[110px]'>
                
            <SubNavBar isActive={1}/>
            <div className='flex flex-col'>

           
            <label className='font-bold text-3xl mb-5 mt-5 '>MỜI CHỌN SẢN PHẨM XUẤT KHO:</label>
            <div className='flex flex-row justify-between ml-[10%] mr-[10%]'>
                <GreenButton text="Cà phê tươi" />
                <GreenButton text="Cà phê nhân" />
                <GreenButton text="Tiêu" />
                <GreenButton text="Phân" />
                <GreenButton text="Tiền"/>

            </div>
            {
                type &&  <div className='mt-5'>
                    <label className='font-bold text-3xl mb-5 mt-5 '>MỜI CHỌN HÌNH THỨC XUẤT:</label>
                <div className='flex flex-row justify-between ml-[10%] mr-[60%] mt-5'>
                    <GreenButton text="Xuất tổng" />
                    <GreenButton text="Xuất theo bao" />
                
    
                </div>
                </div>
            }
            <div className='mr-0 flex justify-end w-full'>
                 <ActivedButton text="Tiếp tục" onClick={onClickContinue}/>
            </div>
           {/* {layout&& <AddBill OnClickCancel={OnClickCancel}/>} */}
            {layout && <BillByItem/>}
            </div> </div>
         </div>
    
    </div>
  )
}
