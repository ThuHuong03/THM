import React from 'react'
import ItemInput from '../../../components/ItemInput'


export default function BillByItem({totalAmount, setTotalAmount, onClickFinish, detailAmount, setDetailAmount}) {
  return (
    <div>
        <ItemInput totalAmount={totalAmount} setTotalAmount={setTotalAmount} onClickFinish={onClickFinish} detailAmount={detailAmount} setDetailAmount={setDetailAmount}/>
    </div>
  )
}
